import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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
import AdminPage from './pages/AdminPage.jsx';

// Import Services
import { portfolioService } from './services/portfolioService.js';

function AppContent() {
  const navigate = useNavigate();
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [pageTransition, setPageTransition] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(null);

  // Load projects from Supabase
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setProjectsLoading(true);
        setProjectsError(null);
        console.log('Loading projects...');
        const data = await portfolioService.getProjects();
        console.log('Projects loaded:', data);
        setProjects(data);
      } catch (error) {
        console.error('Failed to load projects:', error);
        setProjectsError(error.message);
        // Fallback to localStorage if Supabase fails
        const saved = localStorage.getItem('portfolio_projects');
        if (saved) {
          console.log('Using localStorage fallback');
          setProjects(JSON.parse(saved));
        }
      } finally {
        setProjectsLoading(false);
      }
    };

    loadProjects();
  }, []);

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
      navigate('/work');
      setPageTransition(false);
    }, 500);
  };

  const navigateToProject = (project) => {
    setPageTransition(true);
    setTimeout(() => {
      setSelectedProject(project);
      navigate('/project');
      setPageTransition(false);
    }, 500);
  };

  const navigateBack = () => {
    setPageTransition(true);
    setTimeout(() => {
      if (window.location.pathname === '/project') {
        navigate('/work');
        setSelectedProject(null);
      } else {
        navigate('/');
      }
      setPageTransition(false);
    }, 500);
  };

  const navigateToAdmin = () => {
    navigate('/admin');
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

      <Routes>
        <Route path="/" element={
          <HomePage
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            cursorVariant={cursorVariant}
            textEnter={textEnter}
            textLeave={textLeave}
            navigateToWork={navigateToWork}
            navigateToAdmin={navigateToAdmin}
          />
        } />
        <Route path="/work" element={
          projectsLoading ? (
            <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c07a35] mx-auto mb-4"></div>
                <p>Loading portfolio...</p>
                {projectsError && (
                  <p className="text-red-400 text-sm mt-2">Error: {projectsError}</p>
                )}
              </div>
            </div>
          ) : (
            <WorkOverview
              projects={projects}
              onBack={navigateBack}
              onProjectClick={navigateToProject}
              textEnter={textEnter}
              textLeave={textLeave}
            />
          )
        } />
        <Route path="/project" element={
          <ProjectDetail
            project={selectedProject}
            onBack={navigateBack}
            textEnter={textEnter}
            textLeave={textLeave}
          />
        } />
        <Route path="/admin" element={
          <AdminPage
            onBack={navigateBack}
            textEnter={textEnter}
            textLeave={textLeave}
            projects={projects}
            setProjects={setProjects}
          />
        } />
      </Routes>

      <CustomCursor cursorVariant={cursorVariant} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}