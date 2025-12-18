import React from 'react';
import { BreakableText } from '../components/ui/BreakableText';

export const Home: React.FC = () => {
  return (
    <div className="relative w-full max-w-7xl mx-auto mt-8 px-6 py-12 md:py-24 flex flex-col justify-center min-h-[80vh]">
      
      {/* Centered Main Container */}
      <div className="w-full max-w-5xl mx-auto">
      
        {/* --- HERO SECTION --- */}
        <div className="border border-transparent px-8 md:px-12 mb-[100px]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start md:items-center">
                
                {/* COL 1: HEADER (5 Cols) */}
                <div className="md:col-span-5 flex flex-col items-start text-left z-10">
                     {/* Line 1 */}
                     <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black text-white leading-[0.9] tracking-tight drop-shadow-xl animate-slide-up" style={{ animationDelay: '200ms' }}>
                         <BreakableText text="LANGUAGE" tagName="span" className="block" />
                         <BreakableText text="SERVICES" tagName="span" className="block" />
                     </div>

                     {/* Line 2 */}
                     <div className="mt-4 md:mt-6 relative animate-slide-up" style={{ animationDelay: '400ms' }}>
                         <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black text-white leading-[0.9] tracking-tight drop-shadow-xl">
                             <span className="relative inline-block">
                                 {/* Subtle Glow */}
                                 <span className="absolute -inset-8 bg-[#CF0072] opacity-30 blur-2xl rounded-full"></span>
                                 
                                 <BreakableText text="NAH," className="text-[#FFD100] italic pr-4" tagName="span" />
                                 <BreakableText text="WE SPEAK HUMAN" tagName="span" />
                             </span>
                         </div>
                     </div>
                </div>

                {/* COL 2: BIO TEXT (7 Cols) */}
                <div className="md:col-span-7 flex justify-start animate-slide-up" style={{ animationDelay: '600ms' }}>
                    <div className="font-sans font-medium text-lg md:text-2xl leading-relaxed drop-shadow-lg text-left text-[#1C0445]">
                        <BreakableText text="Forget word counts. Forget strings." tagName="span" className="mr-2" />
                        <BreakableText text="Think people." className="font-bold text-[#FFD100] mr-2" tagName="span" />
                        <BreakableText text="We don't just translate; we build bridges. Beluga is about transparency, evolution, and the brutal power of human connection." tagName="span" />
                    </div>
                </div>

            </div>
        </div>

        {/* --- THE BELUGA WAY CARD --- */}
        <div className="w-full relative animate-slide-up" style={{ animationDelay: '900ms' }}>
             
             <div className="absolute -top-8 -right-8 w-48 h-48 bg-[#64FFDA] rounded-full blur-[60px] opacity-60 animate-pulse-slow"></div>
             <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#CF0072] rounded-full blur-[60px] opacity-60 animate-pulse-slow" style={{ animationDelay: '2.5s' }}></div>
             
             <div className="relative z-10 bg-white rounded-[40px] p-8 md:p-12 shadow-2xl border border-white/50 overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-gradient-to-br from-[#FFD100]/20 to-transparent rounded-full blur-2xl pointer-events-none"></div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
                    {/* Title */}
                    <div className="md:col-span-5 text-left">
                        <h2 className="text-4xl md:text-5xl font-display font-black text-[#1C0445] leading-[0.95] tracking-tight">
                            <BreakableText text="THE" tagName="div" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CF0072] to-[#FFD100] block">
                                <BreakableText text="BELUGA" className="text-[#CF0072]" /> 
                                {/* Note: Gradient text clip doesn't work well with split spans individually, so we force a solid color for the destructible version or we'd need complex CSS. Using CF0072 for consistency when broken */}
                            </span>
                            <BreakableText text="WAY" tagName="div" />
                        </h2>
                        <div className="h-2 w-24 bg-[#1C0445] rounded-full mt-6"></div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-7 space-y-6 text-lg md:text-xl font-sans text-[#1C0445] leading-relaxed text-left font-medium">
                        <p>
                            <span className="text-[#CF0072] font-bold">Technology? Absolutely.</span> 
                            But it’s a tool, not a replacement. We use AI to amplify human talent, delivering faster, sharper solutions.
                        </p>
                        <p>
                            Think of it as the <span className="italic text-[#1C0445] font-bold border-b-2 border-[#FFD100]">perfect partner</span>. Together, we seduce, we don't just sell.
                        </p>
                    </div>
                </div>
             </div>
        </div>

        {/* --- BRAND MANIFESTO --- */}
        <div className="w-full mt-16 md:mt-24 animate-slide-up" style={{ animationDelay: '1100ms' }}>
             <div className="relative group max-w-4xl mx-auto text-center">
                
                <div className="absolute -inset-1 md:-inset-2 bg-gradient-to-r from-[#64FFDA] via-[#331C9D] to-[#CF0072] rounded-[40px] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000 animate-pulse-slow"></div>
                
                <div className="relative bg-white rounded-[35px] p-8 md:p-14 shadow-2xl overflow-hidden border border-[#1C0445]/5">
                    
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD100]/10 rounded-bl-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#CF0072]/5 rounded-tr-[80px] pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        
                        <h2 className="text-4xl md:text-6xl font-display font-black text-[#1C0445] leading-[0.9] mb-6 drop-shadow-sm">
                             <BreakableText text="ROBOTS DON'T" tagName="div" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CF0072] to-[#FF6600] block">
                                <BreakableText text="FALL IN LOVE" className="text-[#CF0072]" />
                            </span>
                        </h2>

                        <div className="font-sans text-xl md:text-2xl text-[#1C0445] leading-relaxed max-w-2xl font-medium opacity-90">
                            <BreakableText text="They also don't get sarcasm, nuance, or the beauty of a well-placed pause. We use AI to speed things up, not to dumb things down." tagName="p" />
                        </div>

                        <div className="mt-8 flex items-center gap-4">
                            <div className="h-[2px] w-12 bg-[#FFD100]"></div>
                            <span className="font-display font-black text-lg md:text-xl text-[#1C0445] tracking-widest uppercase">
                                FAST? YOU BET. HUMAN? ALWAYS.
                            </span>
                            <div className="h-[2px] w-12 bg-[#FFD100]"></div>
                        </div>

                    </div>
                </div>
             </div>
        </div>

      </div>
    </div>
  );
};