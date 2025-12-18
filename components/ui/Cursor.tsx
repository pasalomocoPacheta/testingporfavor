import React, { useEffect, useRef, useState } from 'react';

export const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
         cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
        window.removeEventListener('mousemove', moveCursor);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div 
        ref={cursorRef} 
        className={`custom-cursor fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 ${isClicking ? 'scale-75' : 'scale-100'}`}
        style={{ willChange: 'transform' }}
    >
        <svg viewBox="0 0 616 635" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            <defs>
                <linearGradient id="cursorGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFD100" />
                    <stop offset="100%" stopColor="#FFC600" />
                </linearGradient>
            </defs>
            <path fill="url(#cursorGradient)" d="M 596.00 624.50 L 528.00 624.50 L 519.00 620.50 L 510.50 611.00 L 306.00 172.50 L 303.50 175.00 L 102.50 609.00 L 93.00 620.50 L 84.00 624.50 L 19.00 624.50 L 14.00 622.50 L 10.50 618.00 L 10.50 608.00 L 17.50 590.00 L 271.50 55.00 L 288.50 22.00 L 300.00 10.50 L 311.00 9.50 L 315.00 11.50 L 324.50 22.00 L 333.50 38.00 L 348.50 72.00 L 601.50 598.00 L 605.50 610.00 L 605.50 617.00 L 601.00 622.50 L 596.00 624.50 Z"/>
            <path fill="url(#cursorGradient)" d="M 308.00 537.50 L 303.00 536.50 L 297.50 531.00 L 249.50 453.00 L 243.50 442.00 L 243.50 435.00 L 245.00 433.50 L 367.00 432.50 L 369.50 434.00 L 370.50 441.00 L 366.50 449.00 L 320.50 524.00 L 314.50 533.00 L 308.00 537.50 Z"/>
        </svg>
    </div>
  );
};