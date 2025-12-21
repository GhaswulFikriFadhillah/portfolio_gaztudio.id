import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

// --- INLINE COMPONENTS (Agar tidak error import) ---

const RevealOnScroll = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

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

export default function WorkOverview({ projects = [], onBack, onProjectClick, textEnter, textLeave }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Group projects by category
  const categories = [...new Set(projects.map(project => project.category))];

  const filteredProjects = selectedCategory
    ? projects.filter(project => project.category === selectedCategory)
    : projects;

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
                 Selected Works
               </span>
               <h1 className="text-5xl md:text-7xl font-bold font-sans tracking-tighter mb-6">
                 KARYA <span className="font-serif italic font-normal text-white/50">pilihan</span>
               </h1>
               <div className="w-24 h-1 bg-[#c07a35] mx-auto rounded-full"></div>
            </div>
          </RevealOnScroll>

          {/* Category Filter */}
          <RevealOnScroll delay={200}>
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              <button
                onClick={() => setSelectedCategory(null)}
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
                className={`px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 border ${
                  selectedCategory === null
                    ? 'bg-[#c07a35] text-white border-[#c07a35]'
                    : 'bg-transparent text-neutral-400 border-white/10 hover:border-white hover:text-white'
                }`}
              >
                All Projects
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                  className={`px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 border ${
                    selectedCategory === category
                      ? 'bg-[#c07a35] text-white border-[#c07a35]'
                      : 'bg-transparent text-neutral-400 border-white/10 hover:border-white hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </RevealOnScroll>
        </section>

        {/* Projects Grid */}
        <section className="pb-32">
          {filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <RevealOnScroll key={project.id || index} delay={100 * (index % 3)}>
                  <div
                    onClick={() => onProjectClick(project)}
                    onMouseEnter={textEnter}
                    onMouseLeave={textLeave}
                    className="group cursor-pointer flex flex-col h-full"
                  >
                    {/* Project Image Container */}
                    <div className="relative overflow-hidden aspect-[4/3] bg-[#141414] border border-white/5 rounded-sm mb-6">
                      
                      {/* Placeholder Visual if no image */}
                      <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a] group-hover:scale-105 transition-transform duration-700">
                         {project.image ? (
                           <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                         ) : (
                           <span className="text-8xl font-serif italic text-white/5 font-bold select-none">
                             {project.title.charAt(0)}
                           </span>
                         )}
                      </div>

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                         <div className="w-16 h-16 rounded-full bg-[#c07a35] flex items-center justify-center text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                            <ArrowUpRight size={32} />
                         </div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="flex justify-between items-start border-b border-white/10 pb-6 group-hover:border-[#c07a35]/50 transition-colors">
                      <div className="max-w-[80%]">
                        <h3 className="text-2xl font-bold font-sans mb-2 text-[#f5f5f5] group-hover:text-[#c07a35] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2 mb-4 font-light">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                           {project.technologies && project.technologies.slice(0, 3).map((tech, i) => (
                             <span key={i} className="text-[10px] uppercase tracking-widest font-mono text-neutral-400 border border-white/10 px-2 py-1 rounded-sm">
                               {tech}
                             </span>
                           ))}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className="block text-xs font-mono text-[#c07a35] mb-1 uppercase tracking-widest">
                           {project.category}
                        </span>
                        <span className="block text-xs font-mono text-neutral-600">
                           {project.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          ) : (
             <div className="text-center py-20 text-neutral-500 font-mono">
               No projects found in this category.
             </div>
          )}

          {/* Call to Action */}
          <div className="mt-24 text-center">
            <RevealOnScroll delay={200}>
              <button
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-white/20 text-white font-bold font-sans tracking-wide hover:bg-[#c07a35] hover:border-[#c07a35] transition-all duration-300 rounded-sm overflow-hidden"
              >
                <span className="relative z-10">LIHAT BEHANCE SAYA</span>
                <ArrowUpRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </RevealOnScroll>
          </div>
        </section>
      </main>
    </div>
  );
}