import React from 'react';

export const Footer: React.FC = () => {
  return (
    // BRAND RULE: #FFD100 used for footer. #1C0445 default text color.
    <footer className="w-full py-8 text-center text-sm bg-[#FFD100] text-[#1C0445] animate-slide-up z-40 relative">
       <div className="flex flex-col gap-2 opacity-90 hover:opacity-100 transition-opacity">
           <p className="font-semibold tracking-wide font-sans">© {new Date().getFullYear()} Beluga Linguistics</p>
           <p className="text-xs tracking-[0.2em] uppercase opacity-70">Made with 🐳 & Code</p>
       </div>
    </footer>
  );
};