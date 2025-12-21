import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowUpRight, Image as ImageIcon } from 'lucide-react';

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

export default function ProjectDetail({ project, onBack, textEnter, textLeave }) {
  if (!project) return null;

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
        <span className="uppercase tracking-widest text-xs font-bold">Back to Projects</span>
      </button>

      <main className="relative z-10 pt-32 px-4 md:px-12 pb-32 max-w-[1920px] mx-auto">
        {/* Project Header */}
        <section className="mb-20">
          <RevealOnScroll>
            <div className="max-w-6xl mx-auto">
              <div className="mb-10 border-b border-white/10 pb-10">
                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none font-sans mb-6 text-[#f5f5f5]">
                  {project.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-lg">
                  <span className="bg-[#c07a35]/10 text-[#c07a35] px-4 py-1 rounded-full font-mono text-sm uppercase tracking-widest border border-[#c07a35]/20">
                    {project.category}
                  </span>
                  <span className="text-neutral-600">•</span>
                  <span className="font-mono text-neutral-400">{project.year}</span>
                </div>
              </div>

              <p className="text-xl md:text-3xl leading-relaxed text-neutral-300 font-serif italic max-w-4xl font-light">
                {project.description}
              </p>
            </div>
          </RevealOnScroll>
        </section>

        {/* Project Images */}
        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-8">
            {project.images && project.images.length > 0 ? (
                project.images.map((image, index) => (
                  <RevealOnScroll key={index} delay={200 * (index + 1)}>
                    <div className="group relative aspect-video bg-[#141414] rounded-sm overflow-hidden border border-white/5 hover:border-[#c07a35]/30 transition-colors duration-500">
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-600 group-hover:text-neutral-400 transition-colors">
                        <ImageIcon size={48} className="mb-4 opacity-50" />
                        <p className="font-mono text-xs uppercase tracking-widest mb-2">Project Image {index + 1}</p>
                        <p className="text-xs opacity-50 truncate max-w-[80%] px-4">{image}</p>
                      </div>
                      {/* Simulate Image Load */}
                      {image.startsWith('http') && (
                          <img src={image} alt={`Detail ${index + 1}`} className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
                      )}
                    </div>
                  </RevealOnScroll>
                ))
            ) : (
                // Fallback placeholders if no images provided
                [1, 2].map((_, index) => (
                    <RevealOnScroll key={index} delay={200 * (index + 1)}>
                        <div className="aspect-video bg-[#141414] rounded-sm flex items-center justify-center border border-white/5">
                            <div className="text-center text-neutral-600">
                                <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
                                <p className="font-mono text-xs uppercase tracking-widest">Visual Preview {index + 1}</p>
                            </div>
                        </div>
                    </RevealOnScroll>
                ))
            )}
          </div>
        </section>

        {/* Project Details */}
        <section className="mb-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 border-t border-white/10 pt-16">
            {/* Technologies */}
            <RevealOnScroll delay={400}>
              <div>
                <h2 className="text-sm font-mono uppercase tracking-widest text-[#c07a35] mb-8">Technologies Used</h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-[#141414] border border-white/10 text-neutral-300 px-6 py-3 rounded-full text-sm font-sans hover:bg-[#f5f5f5] hover:text-[#0a0a0a] hover:border-[#f5f5f5] transition-all cursor-none"
                      onMouseEnter={textEnter}
                      onMouseLeave={textLeave}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* Project Link */}
            <RevealOnScroll delay={600}>
              <div className="flex flex-col justify-start md:items-start">
                <h2 className="text-sm font-mono uppercase tracking-widest text-[#c07a35] mb-8">Project Link</h2>
                <a
                  href={project.link || "#"}
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                  className="group inline-flex items-center gap-4 bg-[#f5f5f5] text-[#0a0a0a] px-8 py-6 rounded-sm font-bold text-xl hover:bg-[#c07a35] hover:text-white transition-all duration-300 w-fit"
                >
                  <span>Open Project</span>
                  <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* Related Projects Suggestion */}
        <section className="py-20 bg-[#141414] -mx-4 md:-mx-12 px-4 md:px-12 mt-20">
          <RevealOnScroll delay={800}>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold font-sans mb-6 text-[#f5f5f5]">EXPLORE MORE</h2>
              <p className="text-neutral-400 mb-10 font-serif italic text-xl">
                Discover other creative works in my portfolio
              </p>
              <button
                onClick={onBack}
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
                className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-[#c07a35] hover:border-[#c07a35] transition-all uppercase tracking-widest text-sm"
              >
                Back to All Projects
              </button>
            </div>
          </RevealOnScroll>
        </section>
      </main>
    </div>
  );
}