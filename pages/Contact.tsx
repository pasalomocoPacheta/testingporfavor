import React from 'react';
import { ArrowDown, Check } from 'lucide-react';
import { BreakableText } from '../components/ui/BreakableText';

export const Contact: React.FC = () => {
  return (
    <div className="w-full min-h-screen pt-24 pb-12 px-6 flex flex-col items-center justify-start overflow-y-auto">
      
      {/* Background changed to #FCFCFC as per "ALL gradients must fade to solid #FCFCFC" rule logic */}
      <div className="max-w-4xl w-full bg-[#FCFCFC] rounded-[40px] p-8 md:p-16 shadow-2xl animate-slide-up text-[#1C0445]">
        
        {/* Header Section */}
        <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
                <BreakableText text="TELL US ABOUT YOUR PROJECT" tagName="span" />
            </h1>
            <p className="font-sans text-lg opacity-70">
                <BreakableText text="If your source language is not here, please tell us!" tagName="span" />
            </p>
        </div>

        {/* Form Structure based on PDF Page 53/54 */}
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            
            {/* Company Name */}
            <div className="group">
                <label className="block font-display font-bold text-xl mb-2">
                    <BreakableText text="Company Name*" tagName="span" />
                </label>
                <input 
                    type="text" 
                    className="w-full bg-transparent border-b-2 border-[#1C0445]/20 focus:border-[#1C0445] outline-none py-3 text-xl transition-colors placeholder:text-[#1C0445]/30"
                    placeholder="Your company"
                />
            </div>

            {/* Source Language - Radios */}
            <div>
                <label className="block font-display font-bold text-xl mb-4">
                     <BreakableText text="Source Language*" tagName="span" />
                </label>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                    {['English', 'Chinese', 'Spanish', 'French', 'German', 'Other'].map((lang) => (
                        <label key={lang} className="flex items-center gap-3 cursor-pointer group">
                            <div className="w-6 h-6 rounded-full border-2 border-[#1C0445] flex items-center justify-center group-hover:scale-110 transition-transform">
                                <div className="w-3 h-3 rounded-full bg-[#1C0445] opacity-0 group-hover:opacity-20 peer-checked:opacity-100 transition-opacity" />
                            </div>
                            <input type="radio" name="language" className="hidden peer" />
                            <span className="font-sans text-lg">{lang}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Timing Dropdown (Styled as PDF Page 54) */}
            <div>
                <label className="block font-sans text-sm mb-2 opacity-70">
                    When do you plan to start this project?
                </label>
                <label className="block font-display font-bold text-xl mb-2">
                    <BreakableText text="Timing*" tagName="span" />
                </label>
                <div className="relative">
                    <select className="w-full appearance-none bg-[#1C0445]/5 hover:bg-[#1C0445]/10 rounded-[30px] px-6 py-4 text-lg font-sans outline-none cursor-pointer transition-colors border border-transparent focus:border-[#1C0445]">
                        <option>Please Select</option>
                        <option>Immediately</option>
                        <option>1-2 Weeks</option>
                        <option>1 Month+</option>
                    </select>
                    <ArrowDown className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none" size={24} />
                </div>
            </div>

            {/* Submit Button */}
            <div className="pt-8 flex justify-end">
                <button className="bg-[#1C0445] text-white font-sans font-bold py-4 px-12 rounded-full hover:bg-[#FFD100] hover:text-[#1C0445] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    SEND
                </button>
            </div>
        </form>

      </div>

      {/* Footer Contact Info (PDF Page 70 Style) */}
      <div className="mt-16 text-center animate-slide-up" style={{ animationDelay: '300ms' }}>
          <h2 className="text-5xl font-display font-bold text-white mb-6">
              <BreakableText text="CONTACT" />
          </h2>
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 inline-block">
              <p className="text-[#FFD100] font-display font-bold text-2xl mb-2">
                  <BreakableText text="BELUGA LINGUISTICS" />
              </p>
              <a href="mailto:hello@belugalinguistics.com" className="block text-white font-sans text-xl hover:text-[#64FFDA] transition-colors mb-1">
                  hello@belugalinguistics.com
              </a>
              <a href="https://belugalinguistics.com" target="_blank" rel="noreferrer" className="text-white/60 font-sans hover:text-white transition-colors">
                  belugalinguistics.com
              </a>
          </div>
      </div>

    </div>
  );
};