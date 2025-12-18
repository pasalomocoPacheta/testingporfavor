import React from 'react';

interface BreakableTextProps {
  text: string;
  className?: string;
  tagName?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  wait?: number; // Delay for animation sync
}

export const BreakableText: React.FC<BreakableTextProps> = ({ 
  text, 
  className = "", 
  tagName: Tag = 'div',
  wait = 0
}) => {
  // Split text into characters, preserving spaces
  const chars = text.split('');

  return (
    <Tag className={`${className} inline-block`}>
      {chars.map((char, index) => (
        <span 
          key={index}
          className="destructible-dom-char inline-block transition-opacity duration-200"
          style={{ 
            whiteSpace: 'pre',
            animationDelay: `${wait}ms`
          }}
        >
          {char}
        </span>
      ))}
    </Tag>
  );
};