import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, PenTool, Layout, Image as ImageIcon, ArrowRight } from 'lucide-react';

// ==========================================
// PENTING: BACA PETUNJUK DI BAWAH INI
// ==========================================

// 1. SAAT DI LAPTOP (HAPUS TANDA KOMENTAR '//' DI BARIS BAWAH INI):
import profileImage from '../assets/profil.jpg';

// 2. UNTUK SEMENTARA (AGAR PREVIEW DISINI JALAN), KITA PAKAI INI:
// (Nanti di laptop, baris di bawah ini BOLEH DIHAPUS/KOMENTAR jika import di atas sudah aktif)
// const profileImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80";

// ==========================================

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

// Updated Marquee: Ukuran Font Diturunkan
const Marquee = ({ text, direction = 'left' }) => {
  return (
    <div className="relative z-20 my-8 md:my-12 w-screen left-1/2 -ml-[50vw]">
      <div className="overflow-hidden py-4 bg-[#c07a35] text-white border-y-2 border-[#0a0a0a] shadow-xl transform -rotate-1 origin-center scale-[1.01]">
        <div className="flex whitespace-nowrap">
          <div className={`flex animate-marquee ${direction === 'right' ? 'direction-reverse' : ''}`}>
            {[...Array(12)].map((_, i) => (
              <span key={i} className="text-3xl md:text-5xl mx-6 font-sans font-black tracking-tighter uppercase italic opacity-90">
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

// --- MAIN COMPONENT ---

export default function HomePage({
  isMenuOpen,
  setIsMenuOpen,
  textEnter,
  textLeave,
  navigateToWork,
  navigateToAdmin
}) {
  const [keySequence, setKeySequence] = useState('');

  useEffect(() => {
    const handleKeyPress = (e) => {
      const newSequence = (keySequence + e.key.toLowerCase()).slice(-5);
      setKeySequence(newSequence);
      
      // Secret sequence: 'admin'
      if (newSequence === 'admin') {
        if (navigateToAdmin) navigateToAdmin();
        setKeySequence('');
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [keySequence, navigateToAdmin]);
  return (
    <>
      {/* Background Noise & Grid */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[50] bg-noise"></div>
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-[40] bg-grid-pattern"></div>

      {/* NAVIGATION */}
      <nav className="fixed w-full z-[100] px-6 py-5 mix-blend-difference text-[#f5f5f5]">
        <div className="flex justify-between items-center max-w-[1920px] mx-auto">
          <div
            className="text-xl md:text-2xl font-bold tracking-tighter cursor-none font-serif italic"
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
            {isMenuOpen ? <X size={28} /> : <Menu size={28} className="transform group-hover:rotate-180 transition-transform duration-500" />}
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
                className={`block text-4xl md:text-7xl font-bold uppercase hover:text-[#c07a35] transition-all transform hover:-translate-y-2 cursor-none ${index % 2 === 0 ? 'font-sans tracking-tight' : 'font-serif italic'}`}
              >
                {item}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 pt-24 px-4 md:px-12 max-w-[1920px] mx-auto overflow-x-hidden bg-[#0a0a0a] text-neutral-200">

        {/* SECTION 1: HERO / HOOK */}
        {/* Mengurangi min-h dari 90vh ke 80vh agar konten bawah lebih cepat terlihat */}
        <section id="home" className="min-h-[85vh] flex flex-col justify-center py-16 relative border-b border-white/5">
          
          {/* Decorative Background Text - Ukuran diturunkan dari 18vw ke 14vw */}
          <h1 className="text-[14vw] leading-[0.8] font-bold tracking-tighter text-white mix-blend-overlay opacity-[0.03] absolute top-0 right-[-2%] select-none font-sans pointer-events-none">
            CREATIVE
          </h1>

          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl">
                <div className="inline-block border border-[#c07a35]/50 px-3 py-1.5 rounded-full mb-6">
                  <p className="text-xs font-mono text-[#c07a35] tracking-[0.2em] uppercase bg-[#0a0a0a]/80 backdrop-blur-sm">
                    Gaztudio.id — Est. 2021
                  </p>
                </div>
                
                {/* Font Size Reduced: 6xl->5xl, 8xl->7xl, 9xl->8xl */}
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tighter mb-6 text-[#f5f5f5]">
                  VISUAL YANG <br/>
                  <span className="font-serif italic font-normal text-[#c07a35]">memikat</span> & <br/>
                  BERKARAKTER.
                </h2>

                {/* Font Size Reduced: xl/2xl -> lg/xl */}
                <p className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-2xl font-light mb-8">
                   Membantu brand Anda tampil beda dengan strategi desain yang tidak hanya estetis, tapi juga efektif menyampaikan pesan.
                </p>

                <button
                  onClick={navigateToWork}
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                  className="group w-fit bg-[#c07a35] text-white px-8 py-4 font-bold text-base hover:bg-[#e0e0e0] hover:text-[#0a0a0a] transition-all duration-300 cursor-none shadow-[0_15px_30px_-10px_rgba(192,122,53,0.3)] rounded-sm"
                >
                  <span className="flex items-center gap-3">
                    LIHAT KARYA
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </button>
            </div>
          </div>
        </section>

        {/* SECTION 2: ABOUT ME */}
        {/* Padding reduced: py-24/32 -> py-20/24 */}
        <section id="about" className="py-20 md:py-28 relative bg-[#0a0a0a]">
          <div className="container mx-auto">
             <div className="grid lg:grid-cols-12 gap-12 items-center">
                
                {/* Kolom Kiri: Foto Profil - Max width reduced */}
                <div className="lg:col-span-5 relative">
                  <div className="relative z-10 mx-auto w-full max-w-sm group"> {/* max-w-md -> max-w-sm */}
                    <div className="absolute inset-0 border-2 border-[#c07a35] translate-x-3 translate-y-3 z-0 rounded-sm group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 opacity-80"></div>
                    
                    <div className="relative z-10 aspect-[4/5] overflow-hidden bg-[#141414] rounded-sm">
                      <img
                        src={profileImage}
                        alt="Ghaswul Fikri Fadhillah"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                      />
                      
                      <div className="absolute bottom-4 -right-4 bg-[#f5f5f5] text-[#0a0a0a] p-4 font-bold font-sans shadow-xl">
                        <span className="block text-3xl">3+</span>
                        <span className="text-[10px] tracking-widest uppercase font-mono">Years Exp.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Kolom Kanan: Deskripsi Tentang Saya */}
                <div className="lg:col-span-7">
                   <h3 className="text-[#c07a35] font-mono tracking-widest uppercase text-xs mb-3">Tentang Saya</h3>
                   {/* Font size reduced */}
                   <h2 className="text-3xl md:text-4xl font-bold text-[#f5f5f5] mb-6 font-serif italic leading-tight">
                     "Desain bukan sekadar gambar, tapi solusi visual."
                   </h2>
                   
                   <div className="space-y-5 text-base text-neutral-300 leading-relaxed font-sans">
                      <p>
                        Halo, saya <b>Ghaswul Fikri Fadhillah</b>. Seorang desainer visual di balik <b className="text-[#c07a35]">Gaztudio.id</b>. 
                        Perjalanan saya di dunia kreatif dimulai dari rasa penasaran bagaimana sebuah visual bisa mempengaruhi keputusan seseorang.
                      </p>
                      <p>
                        Saya percaya bahwa setiap brand memiliki cerita unik yang layak untuk didengar. Tugas saya adalah menerjemahkan cerita tersebut menjadi bahasa visual yang kuat, konsisten, dan relevan dengan audiens Anda.
                      </p>
                      <p className="text-neutral-400 border-l-4 border-[#c07a35] pl-5 py-2 italic bg-white/5 rounded-r-md text-sm">
                        Fokus saya adalah menciptakan identitas yang tidak hanya "bagus dilihat", tapi juga "enak diingat" dan "mudah dipahami".
                      </p>
                   </div>

                   {/* Stats Grid */}
                   <div className="grid grid-cols-3 gap-6 mt-10 border-t border-white/10 pt-6">
                      <div className="text-center md:text-left">
                        <div className="text-2xl font-bold text-[#c07a35]">15+</div>
                        <div className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">Project</div>
                      </div>
                      <div className="text-center md:text-left">
                        <div className="text-2xl font-bold text-[#c07a35]">100%</div>
                        <div className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">Dedikasi</div>
                      </div>
                      <div className="text-center md:text-left">
                        <div className="text-2xl font-bold text-[#c07a35]">24/7</div>
                        <div className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">Support</div>
                      </div>
                   </div>
                </div>

             </div>
          </div>
        </section>

        {/* MARQUEE 1 */}
        <Marquee text="BRANDING • IDENTITY • STRATEGY • VISUAL •" />

        {/* SKILLS & SERVICES */}
        <section id="services" className="py-20 md:py-28 relative bg-[#0a0a0a]">
          <div className="container mx-auto">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/10 pb-8 mb-16">
              <div>
                <span className="text-[#c07a35] font-mono tracking-widest uppercase text-xs mb-2 block">What I Do</span>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#f5f5f5] font-sans">
                  LAYANAN<span className="text-[#c07a35]">.</span>
                </h2>
              </div>
              <p className="text-lg font-serif italic text-neutral-400 mt-4 md:mt-0 max-w-sm text-right">
                Solusi visual komprehensif untuk meningkatkan value brand Anda.
              </p>
            </div>

            {/* Services Grid - Padding reduced */}
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  id: "01",
                  icon: <Layout className="w-6 h-6" />,
                  title: "Branding Identity",
                  desc: "Membangun wajah brand Anda. Logo, Color Palette, Typography, dan Brand Guidelines yang konsisten."
                },
                {
                  id: "02",
                  icon: <ImageIcon className="w-6 h-6" />,
                  title: "Social Media",
                  desc: "Desain feed, story, dan aset kampanye digital yang engaging, aesthetic, dan terukur."
                },
                {
                  id: "03",
                  icon: <PenTool className="w-6 h-6" />,
                  title: "Visual Art",
                  desc: "Ilustrasi digital dan manipulasi foto untuk kebutuhan editorial, cover art, poster dan komersial."
                }
              ].map((service, index) => (
                <div 
                  key={index} 
                  className="group relative bg-[#141414] border border-white/5 p-8 flex flex-col justify-between hover:bg-[#c07a35] transition-all duration-500 h-full rounded-sm hover:translate-y-[-5px]"
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                >
                  <div>
                    <div className="flex justify-between items-start mb-8">
                      <div className="text-[#c07a35] group-hover:text-[#0a0a0a] transition-colors">{service.icon}</div>
                      <span className="font-mono text-[10px] text-neutral-500 group-hover:text-[#0a0a0a]/60 border border-white/10 group-hover:border-[#0a0a0a]/20 px-2 py-1 rounded-full">{service.id}</span>
                    </div>
                    <h3 className="text-2xl font-serif italic mb-4 text-[#f5f5f5] group-hover:text-[#0a0a0a] transition-colors">{service.title}</h3>
                  </div>
                  <p className="text-sm font-sans leading-relaxed text-neutral-400 group-hover:text-[#0a0a0a]/80 transition-colors">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Skills Tags */}
            <RevealOnScroll delay={200}>
              <div className="mt-16 pt-8 border-t border-white/10">
                 <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-6">Tools & Expertise</h3>
                 <div className="flex flex-wrap gap-2">
                    {[
                      "Brand Identity", "UI/UX Design", "Typography",
                      "Color Theory", "Adobe Photoshop", "Adobe Illustrator", "Figma",
                      "Layouting", "Print Design"
                    ].map((skill, index) => (
                      <span
                        key={index}
                        className="bg-[#141414] border border-white/10 text-neutral-300 px-4 py-2 rounded-full text-xs font-sans hover:bg-[#f5f5f5] hover:text-[#0a0a0a] hover:border-[#f5f5f5] transition-all cursor-none uppercase tracking-wide"
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
        <section className="py-20 border-y border-white/10 bg-[#0c0c0c]">
          <RevealOnScroll>
            <div className="container mx-auto text-center max-w-3xl">
              <div className="mb-6 flex justify-center">
                <div className="w-12 h-12 bg-[#c07a35]/10 rounded-full flex items-center justify-center text-[#c07a35]">
                  <PenTool size={20} />
                </div>
              </div>
              <h3 className="text-2xl md:text-4xl leading-tight font-serif text-[#f5f5f5] mb-6">
                "Bikin desain itu gampang, <br/>
                <span className="text-neutral-500 italic">semua orang juga bisa.</span>"
              </h3>
              <div className="inline-block bg-[#c07a35] text-white px-6 py-2 font-bold font-sans text-sm tracking-wider uppercase transform -rotate-2 shadow-lg rounded-sm">
                Yang susah itu bikin efektif
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 bg-[#0a0a0a]">
          <div className="container mx-auto">
             <div className="flex flex-col md:flex-row gap-10 items-start">
               <div className="md:w-1/3">
                 <h3 className="text-3xl font-bold font-sans mb-3 text-[#f5f5f5]">APA KATA <br/> <span className="text-[#c07a35]">CLIENT</span></h3>
                 <p className="text-neutral-400 font-serif italic text-sm">Kolaborasi yang menghasilkan dampak nyata.</p>
               </div>
               
               <div className="md:w-2/3 grid gap-6">
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
                    <div key={idx} className="bg-[#141414] p-6 border-l-4 border-[#c07a35] hover:bg-[#1a1a1a] transition-colors rounded-sm">
                      <p className="text-lg md:text-xl font-serif italic text-neutral-300 mb-4">"{testi.text}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#c07a35] rounded-full flex items-center justify-center font-bold text-[#0a0a0a] text-sm">{testi.initial}</div>
                        <div>
                          <div className="font-bold text-[#f5f5f5] font-sans text-sm">{testi.name}</div>
                          <div className="text-[10px] text-neutral-500 uppercase tracking-widest">{testi.role}</div>
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
             </div>
          </div>
        </section>

        {/* MARQUEE 2 */}
        <Marquee text="CREATIVE • BOLD • TIMELESS • ICONIC •" direction="right" />

        {/* FOOTER */}
        <footer id="contact" className="py-20 bg-[#c07a35] text-[#0a0a0a] -mx-4 md:-mx-12 px-4 md:px-12 relative overflow-hidden mt-16">
          <div className="container mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-12 mb-16 items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest mb-4 opacity-70 font-bold">Start a Project</p>
                {/* Size reduced: 6xl/8xl -> 5xl/7xl */}
                <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter leading-none font-sans text-black">
                  LET'S MAKE <br/>
                  SOMETHING <br/>
                  <span className="font-serif italic text-white font-normal">iconic.</span>
                </h2>
                <a
                  href="mailto:ghaswul@email.com"
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                  className="inline-block text-xl md:text-2xl border-b-2 border-black pb-1 hover:text-white hover:border-white transition-all font-sans font-bold"
                >
                  ghaswul@email.com
                </a>
              </div>
              
              <div className="flex flex-col justify-end items-start md:items-end gap-3">
                {['LinkedIn', 'Instagram', 'Behance'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    onMouseEnter={textEnter} 
                    onMouseLeave={textLeave} 
                    className="text-3xl md:text-4xl font-serif italic hover:text-white transition-all"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-black/20 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono tracking-widest uppercase opacity-70 font-semibold">
              <p>© {new Date().getFullYear()} Gaztudio.id | Ghaswul Fikri Fadhillah</p>
              <p>Made with Passion & Code</p>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}