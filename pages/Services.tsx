import React from 'react';
import { BreakableText } from '../components/ui/BreakableText';

// UPDATED: Added h-full and flex/flex-col to ensure cards stretch to same height in grid
const ServiceCard: React.FC<{ title: string; items: { subtitle?: string; text: string }[] }> = ({ title, items }) => (
  <div className="bg-white/80 backdrop-blur-sm border border-[#1C0445]/10 rounded-3xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group h-full flex flex-col">
    <h3 className="text-2xl md:text-3xl font-display font-bold text-[#1C0445] mb-6 border-b border-[#FFD100] pb-4 inline-block">
      <BreakableText text={title} />
    </h3>
    <ul className="space-y-4 flex-grow">
      {items.map((item, idx) => (
        <li key={idx} className="text-[#1C0445]/80 font-sans leading-relaxed">
          {item.subtitle && (
            <span className="font-bold block text-[#1C0445] mb-1">
               <BreakableText text={item.subtitle} tagName="span" />
            </span>
          )}
          <BreakableText text={item.text} tagName="span" />
        </li>
      ))}
    </ul>
  </div>
);

export const Services: React.FC = () => {
  const servicesData = [
    {
      title: "TRANSLATION & LOCALIZATION",
      items: [
        { subtitle: "WEBSITES & APPS", text: "Web applications, E-commerce, Portal web app, iOS & Android." },
        { subtitle: "DIGITAL CONTENT", text: "App Store descriptions, Marketing & Blogs, Press releases, Help Center & FAQ." },
        { subtitle: "MEDIA", text: "Subtitling, Voiceover, Transcription, E-learning." },
        { subtitle: "MACHINE TRANSLATIONS", text: "MT Evaluation, Post-editing, Engine training." }
      ]
    },
    {
      title: "QUALITY ASSURANCE",
      items: [
        { subtitle: "ONLINE TESTING", text: "Functional testing, Linguistic testing, Layout & UI design testing, User experience (UX) testing." },
        { subtitle: "THIRD-PARTY REVIEW", text: "Structural QA, Reporting, Mediation, Training." },
        { subtitle: "SUBJECT MATTER EXPERTS", text: "Recruitment, Onboarding, Project coordination, Reporting." }
      ]
    },
    {
      title: "PROJECT MANAGEMENT",
      items: [
        { subtitle: "LINGUISTIC ENGINEERING", text: "Glossary creation, Terminology, Management, Style guide compilation." },
        { subtitle: "I18N CONSULTING", text: "TMS Demos, Workflow Design, Optimization, Integrations, Trainings." },
        { subtitle: "MEDIA & SEO", text: "SEO optimization & Content creation, Content Marketing Strategy, Keywords." },
        { subtitle: "UX TESTING & ASO", text: "Market fit/user insights audits, ASO audit strategy." }
      ]
    },
    {
      title: "TRAINING & TEAMS",
      items: [
        { text: "Professional linguists selection & recruitment." },
        { text: "Negotiation of translation & proofreading rates." },
        { text: "Team building (translators & proofreaders) & Training." },
        { text: "Translation costs optimization & Payment distribution." }
      ]
    }
  ];

  return (
    <div className="w-full min-h-screen pt-24 pb-20 px-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-4 drop-shadow-lg">
             <BreakableText text="OUR SOLUTIONS" />
          </h1>
          <p className="text-[#FFD100] font-sans text-xl tracking-widest uppercase font-bold">
             <BreakableText text="Forget Services, Think People" />
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
          {servicesData.map((service, index) => (
            <ServiceCard key={index} title={service.title} items={service.items} />
          ))}
          
          {/* Full Width Card for Multilingual Content */}
          <div className="md:col-span-2 bg-[#1C0445] text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group">
             {/* Decorative Background Orb */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#CF0072] rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>

             <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-8 border-b border-[#FFD100] pb-4 inline-block relative z-10">
               <BreakableText text="MULTILINGUAL CONTENT MANAGEMENT" />
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-white/80 relative z-10">
                <ul className="space-y-3 list-disc list-inside marker:text-[#FFD100]">
                  <li><BreakableText tagName="span" text="Project setup, Time schedule & deadlines" /></li>
                  <li><BreakableText tagName="span" text="Content check & staff briefings" /></li>
                  <li><BreakableText tagName="span" text="Distribution & compilation of translation files" /></li>
                  <li><BreakableText tagName="span" text="IT 1st level support (system bugs, missing i18n tags)" /></li>
                </ul>
                <ul className="space-y-3 list-disc list-inside marker:text-[#FFD100]">
                   <li><BreakableText tagName="span" text="IT last level support with the client" /></li>
                   <li><BreakableText tagName="span" text="Content & linguistic support for the teams" /></li>
                   <li><BreakableText tagName="span" text="Control of Translation & Quality Assurance" /></li>
                   <li><BreakableText tagName="span" text="Last minute changes before release" /></li>
                </ul>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};