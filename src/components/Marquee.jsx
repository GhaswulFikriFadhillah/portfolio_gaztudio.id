import React from 'react';

const Marquee = ({ text, direction = 'left', fontClass = "font-sans" }) => (
  <div className="relative flex overflow-x-hidden bg-black text-[#ebeae8] py-6 rotate-[-1deg] scale-110 border-y-4 border-[#c07a35] my-12 z-20">
    <div className={`py-2 animate-marquee whitespace-nowrap flex gap-12 text-4xl font-bold uppercase tracking-tighter ${direction === 'right' ? 'flex-row-reverse' : ''} ${fontClass}`}>
      {[...Array(6)].map((_, i) => (
        <span key={i} className="flex items-center gap-4">
          {text} <span className="text-[#c07a35]">✦</span>
        </span>
      ))}
    </div>
    <div className={`absolute top-0 py-2 animate-marquee2 whitespace-nowrap flex gap-12 text-4xl font-bold uppercase tracking-tighter ${direction === 'right' ? 'flex-row-reverse' : ''} ${fontClass}`}>
      {[...Array(6)].map((_, i) => (
        <span key={i} className="flex items-center gap-4">
          {text} <span className="text-[#c07a35]">✦</span>
        </span>
      ))}
    </div>
  </div>
);

export default Marquee;