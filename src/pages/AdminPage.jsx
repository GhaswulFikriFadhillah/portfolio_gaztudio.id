import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload, Search, Filter, Plus, Edit, Trash2 } from 'lucide-react';
import { portfolioService } from '../services/portfolioService.js';

const RevealOnScroll = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s cubic-bezier(0.5, 0, 0, 1), transform 0.8s cubic-bezier(0.5, 0, 0, 1)'
      }}
    >
      {children}
    </div>
  );
};

export default function AdminPage({ onBack, textEnter, textLeave, projects, setProjects }) {
  const [password, setPassword] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '',
    category: '',
    year: new Date().getFullYear().toString(),
    description: '',
    technologies: [],
    image: null, // Main image
    image2: null, // Secondary image
    images: [],
    link: ''
  });
  const [uploading, setUploading] = useState(false);

  // Dummy data for categories and technologies
  const availableCategories = [
    'Web Design',
    'Mobile App',
    'UI/UX Design',
    'Logo Design',
    'Branding',
    'Print Design',
    'Illustration',
    'Motion Graphics',
    'Photography',
    'Other'
  ];

  const availableTechnologies = [
    // Design Tools
    'Figma',
    'Adobe XD',
    'Sketch',
    'Adobe Photoshop',
    'Adobe Illustrator',
    'Adobe InDesign',
    'Adobe After Effects',
    'Adobe Premiere Pro',
    'Blender',
    'Cinema 4D',
    'Maya',
    '3ds Max',
    'ZBrush',
    'Substance Painter',
    'Affinity Designer',
    'Affinity Photo',
    'CorelDRAW',
    'GIMP',
    'Inkscape',
    'Procreate',
    'Clip Studio Paint',
    'Autodesk Fusion 360',
    'Rhino',
    'SketchUp',
    'Revit',
    'AutoCAD',
    'Lightroom',
    'Capture One',
    'DaVinci Resolve',
    'Final Cut Pro',
    'Logic Pro',
    'Audacity',
    'Ableton Live',
    'FL Studio',
    'Principle',
    'Framer',
    'InVision Studio',
    'Marvel',
    'Zeplin',
    'Miro',
    'Notion',
    'Trello',
    'Slack',
    'Asana',
    'Jira',
    'GitHub',
    'VS Code',
    'Sublime Text',
    'Atom'
  ];

  // Simple authentication (in production, use proper auth)
  const ADMIN_PASSWORD = 'admin123'; // Change this to a secure password

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setShowPasswordPrompt(false);
    } else {
      alert('Password salah!');
    }
  };

  const handleAddProject = async () => {
    if (!newProject.title || !newProject.category) {
      alert('Judul dan kategori wajib diisi!');
      return;
    }

    try {
      setUploading(true);
      let imageUrl = '';
      let image2Url = '';

      // Upload main image if exists
      if (newProject.image && newProject.image instanceof File) {
        imageUrl = await portfolioService.uploadImage(newProject.image);
      }

      // Upload secondary image if exists
      if (newProject.image2 && newProject.image2 instanceof File) {
        image2Url = await portfolioService.uploadImage(newProject.image2);
      }

      const projectData = {
        ...newProject,
        image: imageUrl,
        image2: image2Url,
        technologies: newProject.technologies.filter(tech => tech.trim() !== '')
      };

      const addedProject = await portfolioService.addProject(projectData);
      setProjects([...projects, addedProject]);

      // Reset form
      setNewProject({
        title: '',
        category: '',
        year: new Date().getFullYear().toString(),
        description: '',
        technologies: [],
        image: null,
        image2: null,
        images: [],
        link: ''
      });
      setShowAddForm(false);
    } catch (error) {
      alert('Gagal menambah project: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setNewProject({ ...project });
    setShowAddForm(true);
  };

  const handleUpdateProject = async () => {
    if (!newProject.title || !newProject.category) {
      alert('Judul dan kategori wajib diisi!');
      return;
    }

    try {
      setUploading(true);
      let imageUrl = editingProject.image; // Keep existing image by default
      let image2Url = editingProject.image2; // Keep existing secondary image by default

      // Upload new main image if provided
      if (newProject.image && newProject.image instanceof File) {
        imageUrl = await portfolioService.uploadImage(newProject.image);
      }

      // Upload new secondary image if provided
      if (newProject.image2 && newProject.image2 instanceof File) {
        image2Url = await portfolioService.uploadImage(newProject.image2);
      }

      const projectData = {
        ...newProject,
        image: imageUrl,
        image2: image2Url,
        technologies: newProject.technologies.filter(tech => tech.trim() !== '')
      };

      const updatedProject = await portfolioService.updateProject(editingProject.id, projectData);
      const updatedProjects = projects.map(p =>
        p.id === editingProject.id ? updatedProject : p
      );
      setProjects(updatedProjects);
      setEditingProject(null);
      setNewProject({
        title: '',
        category: '',
        year: new Date().getFullYear().toString(),
        description: '',
        technologies: [],
        image: null,
        image2: null,
        images: [],
        link: ''
      });
      setShowAddForm(false);
    } catch (error) {
      alert('Gagal mengupdate project: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus project ini?')) {
      try {
        await portfolioService.deleteProject(id);
        setProjects(projects.filter(p => p.id !== id));
      } catch (error) {
        alert('Gagal menghapus project: ' + error.message);
      }
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(projects.map(project => project.category))];

  if (showPasswordPrompt) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] flex items-center justify-center">
        <div className="bg-[#141414] p-8 rounded-lg border border-white/10 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-3 bg-[#1a1a1a] border border-white/10 rounded mb-4 text-white"
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-[#c07a35] text-white py-3 rounded font-bold hover:bg-[#a6652a] transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[#f5f5f5] bg-[#0a0a0a]">
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[40] bg-noise"></div>
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-[30] bg-grid-pattern"></div>

      {/* Back Button */}
      <button
        onClick={onBack}
        onMouseEnter={textEnter}
        onMouseLeave={textLeave}
        className="fixed top-6 left-6 z-[100] flex items-center gap-3 text-white/80 hover:text-[#c07a35] transition-colors font-sans group bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="uppercase tracking-widest text-xs font-bold">Back</span>
      </button>

      <main className="relative z-10 pt-32 px-4 md:px-12 max-w-[1920px] mx-auto">
        {/* Header */}
        <section className="mb-20">
          <RevealOnScroll>
            <div className="text-center max-w-4xl mx-auto mb-16">
              <span className="text-[#c07a35] font-mono tracking-widest uppercase text-sm mb-4 block">
                Admin Panel
              </span>
              <h1 className="text-5xl md:text-7xl font-bold font-sans tracking-tighter mb-6">
                MANAGE <span className="font-serif italic font-normal text-white/50">portfolio</span>
              </h1>
              <div className="w-24 h-1 bg-[#c07a35] mx-auto rounded-full"></div>
            </div>
          </RevealOnScroll>

          {/* Controls */}
          <RevealOnScroll delay={200}>
            <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-[#141414] border border-white/10 rounded-lg text-white placeholder-neutral-400 focus:border-[#c07a35] focus:outline-none"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-[#141414] border border-white/10 rounded-lg text-white focus:border-[#c07a35] focus:outline-none"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <button
                onClick={() => {
                  setShowAddForm(true);
                  setEditingProject(null);
                  setNewProject({
                    title: '',
                    category: '',
                    year: new Date().getFullYear().toString(),
                    description: '',
                    technologies: [],
                    image: '',
                    images: [],
                    link: ''
                  });
                }}
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
                className="flex items-center gap-2 px-6 py-2 bg-[#c07a35] text-white rounded-lg hover:bg-[#a6652a] transition-colors font-bold"
              >
                <Plus size={20} />
                Add Project
              </button>
            </div>
          </RevealOnScroll>
        </section>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
            <div className="bg-[#141414] p-8 rounded-lg border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold mb-6">{editingProject ? 'Edit Project' : 'Add New Project'}</h3>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  className="w-full p-3 bg-[#1a1a1a] border border-white/10 rounded text-white"
                />

                <select
                  value={newProject.category}
                  onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                  className="w-full p-3 bg-[#1a1a1a] border border-white/10 rounded text-white"
                >
                  <option value="">Select Category</option>
                  {availableCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Year"
                  value={newProject.year}
                  onChange={(e) => setNewProject({...newProject, year: e.target.value})}
                  className="w-full p-3 bg-[#1a1a1a] border border-white/10 rounded text-white"
                />

                <textarea
                  placeholder="Description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  rows={4}
                  className="w-full p-3 bg-[#1a1a1a] border border-white/10 rounded text-white"
                />

                <div className="w-full p-3 bg-[#1a1a1a] border border-white/10 rounded text-white">
                  <label className="block text-sm font-medium mb-2">Technologies</label>
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                    {availableTechnologies.map(tech => (
                      <label key={tech} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={newProject.technologies.includes(tech)}
                          onChange={(e) => {
                            const updatedTechs = e.target.checked
                              ? [...newProject.technologies, tech]
                              : newProject.technologies.filter(t => t !== tech);
                            setNewProject({...newProject, technologies: updatedTechs});
                          }}
                          className="rounded border-white/10 bg-[#2a2a2a] text-[#c07a35] focus:ring-[#c07a35]"
                        />
                        <span>{tech}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="w-full p-3 bg-[#1a1a1a] border border-white/10 rounded text-white">
                  <label className="block text-sm font-medium mb-2">Main Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewProject({...newProject, image: e.target.files[0]})}
                    className="w-full text-sm"
                  />
                  {newProject.image && newProject.image instanceof File && (
                    <p className="text-xs text-neutral-400 mt-1">Selected: {newProject.image.name}</p>
                  )}
                  {editingProject && editingProject.image && (
                    <p className="text-xs text-neutral-400 mt-1">Current image will be kept if no new file selected</p>
                  )}
                </div>

                <div className="w-full p-3 bg-[#1a1a1a] border border-white/10 rounded text-white">
                  <label className="block text-sm font-medium mb-2">Secondary Image (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewProject({...newProject, image2: e.target.files[0]})}
                    className="w-full text-sm"
                  />
                  {newProject.image2 && newProject.image2 instanceof File && (
                    <p className="text-xs text-neutral-400 mt-1">Selected: {newProject.image2.name}</p>
                  )}
                  {editingProject && editingProject.image2 && (
                    <p className="text-xs text-neutral-400 mt-1">Current secondary image will be kept if no new file selected</p>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="Project Link"
                  value={newProject.link}
                  onChange={(e) => setNewProject({...newProject, link: e.target.value})}
                  className="w-full p-3 bg-[#1a1a1a] border border-white/10 rounded text-white"
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={editingProject ? handleUpdateProject : handleAddProject}
                  disabled={uploading}
                  className="flex-1 bg-[#c07a35] text-white py-3 rounded font-bold hover:bg-[#a6652a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Uploading...' : (editingProject ? 'Update' : 'Add') + ' Project'}
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingProject(null);
                  }}
                  disabled={uploading}
                  className="px-6 py-3 border border-white/10 rounded text-white hover:border-white/20 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Projects List */}
        <section className="pb-32">
          <div className="grid gap-6">
            {filteredProjects.map((project) => (
              <RevealOnScroll key={project.id} delay={100}>
                <div className="bg-[#141414] border border-white/10 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-neutral-400">
                        <span>{project.category}</span>
                        <span>{project.year}</span>
                      </div>
                      <p className="text-neutral-300 mt-2 line-clamp-2">{project.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProject(project)}
                        onMouseEnter={textEnter}
                        onMouseLeave={textLeave}
                        className="p-2 text-neutral-400 hover:text-[#c07a35] transition-colors"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        onMouseEnter={textEnter}
                        onMouseLeave={textLeave}
                        className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="text-xs uppercase tracking-widest font-mono text-neutral-400 border border-white/10 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-neutral-500 font-mono">
              No projects found.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}