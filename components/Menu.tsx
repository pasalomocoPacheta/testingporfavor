
import React, { useState } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';

interface MenuProps {
  onNavigate: (target: string) => void;
  links?: { label: string; href: string }[];
}

export const Menu: React.FC<MenuProps> = ({ onNavigate, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultLinks = [
    { label: "HOME", href: "home" },
    { label: "OUR SERVICES", href: "services" },
    { label: "CONTACT", href: "contact" }
  ];

  const menuLinks = links || defaultLinks;

  const handleLinkClick = (target: string) => {
    onNavigate(target);
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed top-6 left-6 z-[60] animate-slide-up">
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-[var(--accent-color)] transition-transform hover:scale-110 active:scale-95 duration-300 drop-shadow-md"
            aria-label="Menu"
        >
            {isOpen ? <X size={42} strokeWidth={2.5} /> : <MenuIcon size={42} strokeWidth={2.5} />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[55] bg-[var(--primary-color)] flex items-center justify-center animate-pop-in">
            <nav className="flex flex-col gap-8 text-center">
                {menuLinks.map((link, i) => (
                  <button 
                    key={i}
                    onClick={() => handleLinkClick(link.href)} 
                    className="text-4xl font-sans font-bold text-white hover:text-[var(--accent-color)] transition-colors uppercase tracking-widest"
                  >
                    {link.label}
                  </button>
                ))}
            </nav>
        </div>
      )}
    </>
  );
};
