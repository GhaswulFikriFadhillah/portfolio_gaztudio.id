import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ title, category, year, onMouseEnter, onMouseLeave, onClick }) => (
  <div 
    className="group relative border-t border-black py-12 transition-colors hover:bg-white cursor-none"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
  >
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex items-baseline gap-6">
        <span className="text-lg font-serif italic text-[#c07a35]">No. 0{year.slice(-1)}</span>
        <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tight group-hover:translate-x-4 transition-transform duration-300 font-serif">
          {title}
        </h3>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-sm uppercase tracking-widest border border-black rounded-full px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity font-sans font-bold">
          {category}
        </span>
        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white transform scale-0 group-hover:scale-100 transition-transform duration-300">
          <ArrowUpRight />
        </div>
      </div>
    </div>
    {/* Preview Image Overlay (Only visible on hover) */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] bg-gradient-to-br from-[#c07a35] to-[#a65d2a] opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity duration-300 rotate-6 z-[-1] rounded-lg overflow-hidden shadow-2xl">
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white/50 text-center">
          <div className="w-16 h-16 border-2 border-white/30 rounded-full mx-auto mb-2"></div>
          <div className="w-24 h-2 bg-white/20 rounded mx-auto"></div>
        </div>
      </div>
    </div>
  </div>
);

export default ProjectCard;