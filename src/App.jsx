import React, { useState, useEffect } from 'react';
import { 
  Palette, 
  PenTool, 
  Layout, 
  Image as ImageIcon, 
  Mail, 
  ArrowRight, 
  ArrowUpRight,
  Menu, 
  X
} from 'lucide-react';

// Import Components dengan ekstensi eksplisit
import CustomCursor from './components/CustomCursor.jsx';
import RevealOnScroll from './components/RevealOnScroll.jsx';
import Marquee from './components/Marquee.jsx';
import ProjectCard from './components/ProjectCard.jsx';

// Import Pages
import WorkOverview from './pages/WorkOverview.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import HomePage from './pages/HomePage.jsx';

export default function App() {
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'work', 'project'
  const [pageTransition, setPageTransition] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Logo Collection",
      category: "Logo Design",
      year: "2023",
      description: "Koleksi desain logo untuk berbagai project pribadi dan freelance awal. Fokus pada kesederhanaan, readability, dan karakter yang kuat untuk setiap brand.",
      images: ["/placeholder1.jpg", "/placeholder2.jpg"],
      technologies: ["Adobe Illustrator", "Photoshop"],
      link: "#"
    },
    {
      id: 2,
      title: "Social Media Graphics",
      category: "Instagram Design",
      year: "2023",
      description: "Desain grafis untuk platform sosial media dengan fokus pada engagement dan visual consistency. Termasuk feed design, stories, dan highlight covers.",
      images: ["/placeholder3.jpg", "/placeholder4.jpg"],
      technologies: ["Adobe Illustrator", "Canva", "Photoshop"],
      link: "#"
    },
    {
      id: 3,
      title: "Event Posters",
      category: "Poster Design",
      year: "2022",
      description: "Koleksi poster untuk berbagai acara dan kampanye. Menggabungkan typography yang menarik dengan elemen visual yang impactful untuk menarik perhatian.",
      images: ["/placeholder5.jpg", "/placeholder6.jpg"],
      technologies: ["Adobe Illustrator", "Photoshop", "InDesign"],
      link: "#"
    },
    {
      id: 4,
      title: "Data Visualization",
      category: "Infographics",
      year: "2022",
      description: "Infografis untuk menyampaikan informasi kompleks dengan cara yang mudah dipahami. Fokus pada clarity, hierarchy, dan visual appeal.",
      images: ["/placeholder7.jpg", "/placeholder8.jpg"],
      technologies: ["Adobe Illustrator", "Photoshop", "PowerPoint"],
      link: "#"
    },
    {
      id: 5,
      title: "Presentation Templates",
      category: "PPT Design",
      year: "2022",
      description: "Template presentasi yang profesional dan mudah digunakan. Dirancang untuk berbagai keperluan presentasi dengan konsistensi visual yang kuat.",
      images: ["/placeholder9.jpg", "/placeholder10.jpg"],
      technologies: ["PowerPoint", "Google Slides", "Adobe Illustrator"],
      link: "#"
    }
  ];

  useEffect(() => {
    // Show text after component mounts
    const textTimer = setTimeout(() => setTextVisible(true), 300);
    return () => clearTimeout(textTimer);
  }, []);

  const handleIntroClick = () => {
    setIntroComplete(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const navigateToWork = () => {
    setPageTransition(true);
    setTimeout(() => {
      setCurrentPage('work');
      setPageTransition(false);
    }, 500);
  };

  const navigateToProject = (project) => {
    setPageTransition(true);
    setTimeout(() => {
      setSelectedProject(project);
      setCurrentPage('project');
      setPageTransition(false);
    }, 500);
  };

  const navigateBack = () => {
    setPageTransition(true);
    setTimeout(() => {
      if (currentPage === 'project') {
        setCurrentPage('work');
        setSelectedProject(null);
      } else {
        setCurrentPage('home');
      }
      setPageTransition(false);
    }, 500);
  };

  const textEnter = () => setCursorVariant("hover");
  const textLeave = () => setCursorVariant("default");

  if (loading) {
    return (
      <div 
        className="fixed inset-0 bg-[#ebeae8] flex items-center justify-center z-[10000] overflow-hidden cursor-pointer"
        onClick={handleIntroClick}
      >
        {/* Left Panel */}
        <div className={`absolute inset-y-0 left-0 w-1/2 bg-black transition-transform duration-1000 ease-in-out ${introComplete ? '-translate-x-full' : 'translate-x-0'}`}></div>
        
        {/* Right Panel */}
        <div className={`absolute inset-y-0 right-0 w-1/2 bg-black transition-transform duration-1000 ease-in-out ${introComplete ? 'translate-x-full' : 'translate-x-0'}`}></div>
        
        {/* Center Text */}
        <div className={`relative z-10 text-center transition-all duration-1000 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${introComplete ? 'opacity-0' : ''}`}>
          <div className="text-6xl md:text-8xl font-bold tracking-tighter font-sans text-white">
            GAZTUDIO<span className="text-[#c07a35]">.</span>ID
          </div>
          <div className="mt-4 font-mono text-sm tracking-widest text-white/80">VISUAL DESIGN STUDIO</div>
          <div className="mt-8 text-xs font-mono text-white/60 uppercase tracking-widest">
            Click to Enter
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Page Transition Animation */}
      <div className={`fixed inset-0 z-[150] pointer-events-none ${pageTransition ? 'block' : 'hidden'}`}>
        {/* Top Panel */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-black animate-slide-down"></div>
        {/* Bottom Panel */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-black animate-slide-up"></div>
      </div>

      {/* Render Current Page */}
      {currentPage === 'home' && (
        <HomePage
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          cursorVariant={cursorVariant}
          textEnter={textEnter}
          textLeave={textLeave}
          navigateToWork={navigateToWork}
        />
      )}

      {currentPage === 'work' && (
        <WorkOverview
          projects={projects}
          onBack={navigateBack}
          onProjectClick={navigateToProject}
          textEnter={textEnter}
          textLeave={textLeave}
        />
      )}

      {currentPage === 'project' && (
        <ProjectDetail
          project={selectedProject}
          onBack={navigateBack}
          textEnter={textEnter}
          textLeave={textLeave}
        />
      )}

      <CustomCursor cursorVariant={cursorVariant} />
    </div>
  );
}