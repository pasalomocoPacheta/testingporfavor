
import React from 'react';
import { BreakableText } from '../ui/BreakableText';

export const SectionRenderer: React.FC<{ section: any }> = ({ section }) => {
  switch (section._type) {
    case 'hero':
      return (
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 text-white">
            <h1 className="text-5xl md:text-7xl font-display font-black leading-[0.9]">
              <BreakableText text={section.line1} tagName="span" className="block" />
              <BreakableText text={section.line2} tagName="span" className="block" />
            </h1>
            <div className="mt-8 text-4xl md:text-6xl font-display font-black">
              <span className="text-[var(--accent-color)] italic mr-4">{section.highlight}</span>
              <span className="text-white">{section.subline}</span>
            </div>
          </div>
          <div className="md:col-span-7 text-xl md:text-2xl font-medium leading-relaxed text-[var(--primary-color)] bg-white/10 p-8 rounded-[40px] backdrop-blur-sm">
            {section.bio}
          </div>
        </div>
      );

    case 'manifesto':
      return (
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="bg-white rounded-[40px] p-12 shadow-2xl border border-white/20">
            <h2 className="text-4xl md:text-6xl font-display font-black text-[var(--primary-color)] mb-4">
              {section.title}
            </h2>
            <h3 className="text-3xl md:text-5xl font-display font-black text-[var(--secondary-color)] mb-8">
              {section.subtitle}
            </h3>
            <p className="text-xl md:text-2xl text-[var(--primary-color)] opacity-80 leading-relaxed">
              {section.content}
            </p>
          </div>
        </div>
      );

    default:
      return null;
  }
};
