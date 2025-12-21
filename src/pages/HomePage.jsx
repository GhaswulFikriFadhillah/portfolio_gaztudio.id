import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, PenTool, Layout, Image as ImageIcon, ArrowRight } from 'lucide-react';

// --- INLINE COMPONENTS ---

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

// Updated Marquee: Full Width & Easy on Eyes
const Marquee = ({ text, direction = 'left' }) => {
  return (
    <div className="relative z-20 my-12 w-screen left-1/2 -ml-[50vw]">
      <div className="overflow-hidden py-6 bg-[#c07a35] text-white border-y-4 border-[#0a0a0a] shadow-2xl transform -rotate-1 origin-center scale-[1.02]">
        <div className="flex whitespace-nowrap">
          <div className={`flex animate-marquee ${direction === 'right' ? 'direction-reverse' : ''}`}>
            {[...Array(12)].map((_, i) => (
              <span key={i} className="text-4xl md:text-6xl mx-8 font-sans font-black tracking-tighter uppercase italic opacity-90">
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .direction-reverse {
          animation-direction: reverse;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

// Placeholder Image (Gunakan import lokal jika file sudah tersedia)
const profileImage = "src/assets/profil.jpg";

// --- MAIN COMPONENT ---

export default function HomePage({
  isMenuOpen,
  setIsMenuOpen,
  textEnter,
  textLeave,
  navigateToWork
}) {
  return (
    <>
      {/* Background Noise & Grid */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[50] bg-noise"></div>
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-[40] bg-grid-pattern"></div>

      {/* NAVIGATION */}
      <nav className="fixed w-full z-[100] px-6 py-6 mix-blend-difference text-[#f5f5f5]">
        <div className="flex justify-between items-center max-w-[1920px] mx-auto">
          <div
            className="text-2xl font-bold tracking-tighter cursor-none font-serif italic"
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
          >
            GAZTUDIO<span className="text-[#c07a35] not-italic">.</span>ID
          </div>
          <button
            onClick={() => setIsMenuOpen && setIsMenuOpen(!isMenuOpen)}
            className="hover:text-[#c07a35] transition-colors cursor-none group"
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} className="transform group-hover:rotate-180 transition-transform duration-500" />}
          </button>
        </div>
      </nav>

      {/* FULL SCREEN MENU */}
      <div className={`fixed inset-0 bg-[#050505] z-[90] flex items-center justify-center transition-transform duration-700 cubic-bezier(0.7, 0, 0.3, 1) ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col gap-2 text-center text-white">
          {['Home', 'About', 'Services', 'Work', 'Contact'].map((item, index) => (
            <div key={item} className="overflow-hidden">
              <a
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (setIsMenuOpen) setIsMenuOpen(false);
                  if (item.toLowerCase() === 'work') {
                    if (navigateToWork) navigateToWork();
                  } else {
                    const element = document.getElementById(item.toLowerCase());
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
                className={`block text-5xl md:text-8xl font-bold uppercase hover:text-[#c07a35] transition-all transform hover:-translate-y-2 cursor-none ${index % 2 === 0 ? 'font-sans tracking-tight' : 'font-serif italic'}`}
              >
                {item}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content with Softer Dark Background */}
      <main className="relative z-10 pt-32 px-4 md:px-12 max-w-[1920px] mx-auto overflow-x-hidden bg-[#0a0a0a] text-neutral-200">

        {/* SECTION 1: HERO / HOOK */}
        <section id="home" className="min-h-[90vh] flex flex-col justify-center py-20 relative border-b border-white/5">
          
          {/* Decorative Background Text - Reduced Opacity */}
          <h1 className="text-[18vw] leading-[0.8] font-bold tracking-tighter text-white mix-blend-overlay opacity-[0.03] absolute top-0 right-[-5%] select-none font-sans pointer-events-none">
            CREATIVE
          </h1>

          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl">
                <div className="inline-block border border-[#c07a35]/50 px-4 py-2 rounded-full mb-8">
                  <p className="text-sm font-mono text-[#c07a35] tracking-[0.2em] uppercase bg-[#0a0a0a]/80 backdrop-blur-sm">
                    Gaztudio.id — Est. 2021
                  </p>
                </div>
                
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter mb-8 text-[#f5f5f5]">
                  VISUAL YANG <br/>
                  <span className="font-serif italic font-normal text-[#c07a35]">memikat</span> & <br/>
                  BERKARAKTER.
                </h2>

                {/* Improved Readability for Body Text */}
                <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed max-w-2xl font-light mb-10">
                   Membantu brand Anda tampil beda dengan strategi desain yang tidak hanya estetis, tapi juga efektif menyampaikan pesan.
                </p>

                <button
                  onClick={navigateToWork}
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                  className="group w-fit bg-[#c07a35] text-white px-10 py-5 font-bold text-lg hover:bg-[#e0e0e0] hover:text-[#0a0a0a] transition-all duration-300 cursor-none shadow-[0_20px_40px_-15px_rgba(192,122,53,0.3)] rounded-sm"
                >
                  <span className="flex items-center gap-4">
                    LIHAT KARYA
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </button>
            </div>
          </div>
        </section>

        {/* SECTION 2: ABOUT ME */}
        <section id="about" className="py-24 md:py-32 relative bg-[#0a0a0a]">
          <div className="container mx-auto">
             <div className="grid lg:grid-cols-12 gap-16 items-center">
                
                {/* Kolom Kiri: Foto Profil */}
                <div className="lg:col-span-5 relative">
                  <div className="relative z-10 mx-auto w-full max-w-md group">
                    <div className="absolute inset-0 border-2 border-[#c07a35] translate-x-3 translate-y-3 z-0 rounded-sm group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 opacity-80"></div>
                    
                    <div className="relative z-10 aspect-[4/5] overflow-hidden bg-[#141414] rounded-sm">
                      <img
                        src={profileImage}
                        alt="Ghaswul Fikri Fadhillah"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                      />
                      
                      <div className="absolute bottom-6 -right-6 bg-[#f5f5f5] text-[#0a0a0a] p-6 font-bold font-sans shadow-xl">
                        <span className="block text-4xl">3+</span>
                        <span className="text-xs tracking-widest uppercase font-mono">Years Exp.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Kolom Kanan: Deskripsi Tentang Saya */}
                <div className="lg:col-span-7">
                   <h3 className="text-[#c07a35] font-mono tracking-widest uppercase text-sm mb-4">Tentang Saya</h3>
                   <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-8 font-serif italic">
                     "Desain bukan sekadar gambar, tapi solusi visual."
                   </h2>
                   
                   <div className="space-y-6 text-lg text-neutral-300 leading-relaxed font-sans">
                      <p>
                        Halo, saya <b>Ghaswul Fikri Fadhillah</b>. Seorang desainer visual di balik <b className="text-[#c07a35]">Gaztudio.id</b>. 
                        Perjalanan saya di dunia kreatif dimulai dari rasa penasaran bagaimana sebuah visual bisa mempengaruhi keputusan seseorang.
                      </p>
                      <p>
                        Saya percaya bahwa setiap brand memiliki cerita unik yang layak untuk didengar. Tugas saya adalah menerjemahkan cerita tersebut menjadi bahasa visual yang kuat, konsisten, dan relevan dengan audiens Anda.
                      </p>
                      <p className="text-neutral-400 border-l-4 border-[#c07a35] pl-6 py-2 italic bg-white/5 rounded-r-md">
                        Fokus saya adalah menciptakan identitas yang tidak hanya "bagus dilihat", tapi juga "enak diingat" dan "mudah dipahami".
                      </p>
                   </div>

                   {/* Stats Grid */}
                   <div className="grid grid-cols-3 gap-6 mt-12 border-t border-white/10 pt-8">
                      <div className="text-center md:text-left">
                        <div className="text-3xl font-bold text-[#c07a35]">15+</div>
                        <div className="text-xs text-neutral-500 uppercase tracking-widest mt-1">Project</div>
                      </div>
                      <div className="text-center md:text-left">
                        <div className="text-3xl font-bold text-[#c07a35]">100%</div>
                        <div className="text-xs text-neutral-500 uppercase tracking-widest mt-1">Dedikasi</div>
                      </div>
                      <div className="text-center md:text-left">
                        <div className="text-3xl font-bold text-[#c07a35]">24/7</div>
                        <div className="text-xs text-neutral-500 uppercase tracking-widest mt-1">Support</div>
                      </div>
                   </div>
                </div>

             </div>
          </div>
        </section>

        {/* MARQUEE 1 - Full Width */}
        <Marquee text="BRANDING • IDENTITY • STRATEGY • VISUAL •" />

        {/* SKILLS & SERVICES */}
        <section id="services" className="py-24 md:py-32 relative bg-[#0a0a0a]">
          <div className="container mx-auto">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/10 pb-12 mb-20">
              <div>
                <span className="text-[#c07a35] font-mono tracking-widest uppercase text-sm mb-2 block">What I Do</span>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#f5f5f5] font-sans">
                  LAYANAN<span className="text-[#c07a35]">.</span>
                </h2>
              </div>
              <p className="text-xl font-serif italic text-neutral-400 mt-6 md:mt-0 max-w-md text-right">
                Solusi visual komprehensif untuk meningkatkan value brand Anda.
              </p>
            </div>

            {/* Services Grid with Better Contrast Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  id: "01",
                  icon: <Layout className="w-8 h-8" />,
                  title: "Branding Identity",
                  desc: "Membangun wajah brand Anda. Logo, Color Palette, Typography, dan Brand Guidelines yang konsisten."
                },
                {
                  id: "02",
                  icon: <ImageIcon className="w-8 h-8" />,
                  title: "Social Media",
                  desc: "Desain feed, story, dan aset kampanye digital yang engaging, aesthetic, dan terukur."
                },
                {
                  id: "03",
                  icon: <PenTool className="w-8 h-8" />,
                  title: "Visual Art",
                  desc: "Ilustrasi digital dan manipulasi foto untuk kebutuhan editorial, cover art, poster dan komersial."
                }
              ].map((service, index) => (
                <div 
                  key={index} 
                  className="group relative bg-[#141414] border border-white/5 p-10 flex flex-col justify-between hover:bg-[#c07a35] transition-all duration-500 h-full rounded-sm hover:translate-y-[-5px]"
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                >
                  <div>
                    <div className="flex justify-between items-start mb-10">
                      <div className="text-[#c07a35] group-hover:text-[#0a0a0a] transition-colors">{service.icon}</div>
                      <span className="font-mono text-xs text-neutral-500 group-hover:text-[#0a0a0a]/60 border border-white/10 group-hover:border-[#0a0a0a]/20 px-2 py-1 rounded-full">{service.id}</span>
                    </div>
                    <h3 className="text-3xl font-serif italic mb-6 text-[#f5f5f5] group-hover:text-[#0a0a0a] transition-colors">{service.title}</h3>
                  </div>
                  <p className="text-sm font-sans leading-relaxed text-neutral-400 group-hover:text-[#0a0a0a]/80 transition-colors">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Skills Tags */}
            <RevealOnScroll delay={200}>
              <div className="mt-20 pt-10 border-t border-white/10">
                 <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-6">Tools & Expertise</h3>
                 <div className="flex flex-wrap gap-3">
                    {[
                      "Brand Identity", "UI/UX Design", "Typography",
                      "Color Theory", "Adobe Photoshop", "Adobe Illustrator", "Figma",
                      "Layouting", "Print Design"
                    ].map((skill, index) => (
                      <span
                        key={index}
                        className="bg-[#141414] border border-white/10 text-neutral-300 px-6 py-3 rounded-full text-sm font-sans hover:bg-[#f5f5f5] hover:text-[#0a0a0a] hover:border-[#f5f5f5] transition-all cursor-none uppercase tracking-wide"
                        onMouseEnter={textEnter}
                        onMouseLeave={textLeave}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
              </div>
            </RevealOnScroll>

          </div>
        </section>

        {/* QUOTE SECTION */}
        <section className="py-24 border-y border-white/10 bg-[#0c0c0c]">
          <RevealOnScroll>
            <div className="container mx-auto text-center max-w-4xl">
              <div className="mb-8 flex justify-center">
                <div className="w-16 h-16 bg-[#c07a35]/10 rounded-full flex items-center justify-center text-[#c07a35]">
                  <PenTool />
                </div>
              </div>
              <h3 className="text-3xl md:text-5xl leading-tight font-serif text-[#f5f5f5] mb-8">
                "Bikin desain itu gampang, <br/>
                <span className="text-neutral-500 italic">semua orang juga bisa.</span>"
              </h3>
              <div className="inline-block bg-[#c07a35] text-white px-8 py-3 font-bold font-sans tracking-wider uppercase transform -rotate-2 shadow-lg rounded-sm">
                Yang susah itu bikin efektif
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-32 bg-[#0a0a0a]">
          <div className="container mx-auto">
             <div className="flex flex-col md:flex-row gap-12 items-start">
               <div className="md:w-1/3">
                 <h3 className="text-4xl font-bold font-sans mb-4 text-[#f5f5f5]">APA KATA <br/> <span className="text-[#c07a35]">CLIENT</span></h3>
                 <p className="text-neutral-400 font-serif italic">Kolaborasi yang menghasilkan dampak nyata.</p>
               </div>
               
               <div className="md:w-2/3 grid gap-8">
                  {[
                    {
                      initial: "A",
                      name: "Anonim Client",
                      role: "F&B Business Owner",
                      text: "Logo yang dibuat sangat memorable. Brand kami jadi punya karakter yang kuat di pasar."
                    },
                    {
                      initial: "B",
                      name: "Creative Studio",
                      role: "Agency Partner",
                      text: "Workflow yang sangat rapi dan hasil visual art yang selalu 'out of the box'. Sangat merekomendasikan Ghaswul."
                    }
                  ].map((testi, idx) => (
                    <div key={idx} className="bg-[#141414] p-8 border-l-4 border-[#c07a35] hover:bg-[#1a1a1a] transition-colors rounded-sm">
                      <p className="text-xl md:text-2xl font-serif italic text-neutral-300 mb-6">"{testi.text}"</p>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#c07a35] rounded-full flex items-center justify-center font-bold text-[#0a0a0a]">{testi.initial}</div>
                        <div>
                          <div className="font-bold text-[#f5f5f5] font-sans">{testi.name}</div>
                          <div className="text-xs text-neutral-500 uppercase tracking-widest">{testi.role}</div>
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
             </div>
          </div>
        </section>

        {/* MARQUEE 2 - Bottom */}
        <Marquee text="CREATIVE • BOLD • TIMELESS • ICONIC •" direction="right" />

        {/* FOOTER */}
        <footer id="contact" className="py-24 bg-[#c07a35] text-[#0a0a0a] -mx-4 md:-mx-12 px-4 md:px-12 relative overflow-hidden mt-20">
          <div className="container mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-16 mb-24 items-end">
              <div>
                <p className="font-mono text-sm uppercase tracking-widest mb-6 opacity-70 font-bold">Start a Project</p>
                <h2 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-none font-sans text-black">
                  LET'S MAKE <br/>
                  SOMETHING <br/>
                  <span className="font-serif italic text-white font-normal">iconic.</span>
                </h2>
                <a
                  href="mailto:ghaswul@email.com"
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                  className="inline-block text-2xl md:text-3xl border-b-2 border-black pb-2 hover:text-white hover:border-white transition-all font-sans font-bold"
                >
                  ghaswul@email.com
                </a>
              </div>
              
              <div className="flex flex-col justify-end items-start md:items-end gap-4">
                {['LinkedIn', 'Instagram', 'Behance'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    onMouseEnter={textEnter} 
                    onMouseLeave={textLeave} 
                    className="text-4xl md:text-5xl font-serif italic hover:text-white transition-all"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-black/20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono tracking-widest uppercase opacity-70 font-semibold">
              <p>© {new Date().getFullYear()} Gaztudio.id | Ghaswul Fikri Fadhillah</p>
              <p>Made with Passion & Code</p>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}