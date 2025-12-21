import React from 'react';
import useMousePosition from '../hooks/useMousePosition.js';

const CustomCursor = ({ cursorVariant }) => {
  const { x, y } = useMousePosition();
  
  return (
    <>
      {/* Dot kecil (Cursor utama) */}
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-[#c07a35] rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ transform: `translate(${x}px, ${y}px)` }}
      />
      {/* Lingkaran pengikut (Trailing) */}
      <div 
        className={`fixed top-0 left-0 border border-black rounded-full pointer-events-none z-[9998] transition-transform duration-100 ease-out hidden md:flex items-center justify-center mix-blend-multiply`}
        style={{ 
          transform: `translate(${x - 24}px, ${y - 24}px) scale(${cursorVariant === 'hover' ? 1.5 : 1})`,
          width: '48px',
          height: '48px',
          backgroundColor: cursorVariant === 'hover' ? 'rgba(192, 122, 53, 0.2)' : 'transparent',
          borderColor: cursorVariant === 'hover' ? 'transparent' : '#000'
        }}
      >
      </div>
    </>
  );
};

export default CustomCursor;