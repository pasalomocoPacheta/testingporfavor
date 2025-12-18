import React, { useState } from 'react';
import { ArrowRight, SkipForward, X, Check, Trophy, BrainCircuit } from 'lucide-react';

interface TriviaGameProps {
  onComplete: () => void;
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string; // Fun fact after answering
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "In the localization world, what does 'i18n' actually stand for?",
    options: [
      "Innovation 18 New",
      "Internationalization",
      "Internet 18 Networks",
      "I have 18 notes"
    ],
    correctIndex: 1,
    explanation: "It stands for 'Internationalization' because there are 18 letters between the 'i' and the 'n'. Efficiency at its finest."
  },
  {
    id: 2,
    text: "Marketing teams often ask for 'Transcreation'. What is it fundamentally?",
    options: [
      "Translating word-for-word",
      "Creative adaptation to evoke the same emotions in the target culture",
      "Using AI to generate content",
      "Translating only the creation date"
    ],
    correctIndex: 1,
    explanation: "Correct! Transcreation goes beyond meaning. It captures the 'feel', style, and emotional impact of the original message."
  },
  {
    id: 3,
    text: "Why is 'Context' considered the absolute King of Localization?",
    options: [
      "It isn't. The King is the client.",
      "Because 'Home' could mean a house, a web button, or a destination",
      "It makes the word count higher",
      "Because translators like royalty"
    ],
    correctIndex: 1,
    explanation: "Exactly. Without context, a single word like 'Run' could mean 'jog', 'manage', or 'execute'. Ambiguity is the enemy!"
  }
];

export const TriviaGame: React.FC<TriviaGameProps> = ({ onComplete }) => {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'won'>('intro');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  // Track score just in case, though we let everyone in now
  const [score, setScore] = useState(0);

  const currentQuestion = QUESTIONS[currentQIndex];

  const handleStart = () => {
    setGameState('playing');
  };

  const handleAnswer = (index: number) => {
    if (isAnswering) return;
    setIsAnswering(true);
    setSelectedOption(index);

    const isCorrect = index === currentQuestion.correctIndex;
    if (isCorrect) {
        setScore(prev => prev + 1);
    }

    // Always show explanation after a short delay, regardless of correct/incorrect
    setTimeout(() => {
      setShowExplanation(true);
    }, 800);
  };

  const handleNext = () => {
    setShowExplanation(false);
    setSelectedOption(null);
    setIsAnswering(false);

    if (currentQIndex < QUESTIONS.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      setGameState('won');
    }
  };

  // --- RENDER: INTRO SCREEN ---
  if (gameState === 'intro') {
    return (
      <div className="fixed inset-0 z-[5000] flex items-center justify-center p-6 animate-pop-in">
        {/* Dark Backdrop */}
        <div className="absolute inset-0 bg-[#1C0445]/95 backdrop-blur-md"></div>
        
        <div className="relative z-10 max-w-lg w-full bg-white rounded-[40px] p-8 md:p-12 text-center shadow-2xl border-4 border-[#FFD100]">
          <div className="flex justify-center mb-6">
             <div className="p-4 bg-[#CF0072] rounded-full text-white shadow-lg animate-bounce">
                <BrainCircuit size={48} />
             </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-display font-black text-[#1C0445] mb-4 leading-tight">
            LOC <br/><span className="text-[#CF0072]">TRIVIAL</span>
          </h1>
          
          <p className="font-sans text-lg text-[#1C0445]/80 mb-8 font-medium">
            Prove you speak the language of localization to earn your "wedge" and enter the site.
          </p>

          <button 
            onClick={handleStart}
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#1C0445] text-white font-display font-bold text-xl rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,209,0,0.6)] w-full md:w-auto cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              PLAY NOW <ArrowRight size={20} />
            </span>
            <div className="absolute inset-0 bg-[#331C9D] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>

          <div className="mt-8">
            <button 
                onClick={onComplete} 
                className="group flex items-center justify-center gap-2 mx-auto bg-gray-100 hover:bg-[#FFD100] text-[#1C0445] px-6 py-2 rounded-full font-bold font-sans text-sm tracking-widest uppercase transition-all duration-300 cursor-pointer"
            >
                Skip Game <SkipForward size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER: VICTORY SCREEN (THE WEDGE/CHEESE) ---
  if (gameState === 'won') {
    return (
      <div className="fixed inset-0 z-[5000] flex flex-col items-center justify-center p-6 bg-[#1C0445] transition-all duration-1000">
         {/* Confetti effect background */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
             {[...Array(20)].map((_, i) => (
                 <div key={i} className="absolute w-4 h-4 bg-[#FFD100] rounded-full animate-pulse" 
                      style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random()}s`
                      }} 
                 />
             ))}
         </div>

         <div 
            className="relative w-64 h-64 md:w-80 md:h-80 animate-pop-in cursor-pointer hover:scale-105 transition-transform"
            onClick={onComplete}
         >
             {/* THE "CHEESE" (Beluga Triangle Logo) acting as the Trivial Wedge */}
             <svg viewBox="0 0 616 635" className="w-full h-full drop-shadow-[0_0_50px_rgba(255,209,0,0.8)]">
                <defs>
                    <linearGradient id="winnerGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#FFD100" />
                        <stop offset="50%" stopColor="#CF0072" />
                        <stop offset="100%" stopColor="#64FFDA" />
                    </linearGradient>
                </defs>
                <path fill="url(#winnerGradient)" d="M 596.00 624.50 L 528.00 624.50 L 519.00 620.50 L 510.50 611.00 L 306.00 172.50 L 303.50 175.00 L 102.50 609.00 L 93.00 620.50 L 84.00 624.50 L 19.00 624.50 L 14.00 622.50 L 10.50 618.00 L 10.50 608.00 L 17.50 590.00 L 271.50 55.00 L 288.50 22.00 L 300.00 10.50 L 311.00 9.50 L 315.00 11.50 L 324.50 22.00 L 333.50 38.00 L 348.50 72.00 L 601.50 598.00 L 605.50 610.00 L 605.50 617.00 L 601.00 622.50 L 596.00 624.50 Z"/>
                <path fill="#ffffff" fillOpacity="0.3" d="M 308.00 537.50 L 303.00 536.50 L 297.50 531.00 L 249.50 453.00 L 243.50 442.00 L 243.50 435.00 L 245.00 433.50 L 367.00 432.50 L 369.50 434.00 L 370.50 441.00 L 366.50 449.00 L 320.50 524.00 L 314.50 533.00 L 308.00 537.50 Z"/>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center z-10">
                 <Trophy className="text-white drop-shadow-md w-24 h-24 animate-bounce" />
            </div>
         </div>

         <h2 className="mt-8 text-3xl md:text-5xl font-display font-black text-white text-center">
             {score === QUESTIONS.length ? "PERFECT SCORE!" : "WEDGE COLLECTED!"}
         </h2>
         <p className="font-sans mt-4 mb-8 text-xl text-center max-w-md text-[#FFD100] font-bold">
             You officially speak "Human". <br/> Welcome to Beluga.
         </p>
         
         <button 
           onClick={onComplete}
           className="bg-white text-[#1C0445] px-10 py-4 rounded-full font-bold font-display text-xl hover:bg-[#FFD100] transition-colors shadow-xl cursor-pointer"
         >
             ENTER SITE
         </button>
      </div>
    );
  }

  // --- RENDER: PLAYING ---
  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4">
      {/* Background with blur */}
      <div className="absolute inset-0 bg-[#1C0445]/95 backdrop-blur-xl transition-colors duration-500"></div>

      {/* Skip Button (Top Right) - Now Improved for Visibility */}
      <button 
        onClick={onComplete}
        className="absolute top-6 right-6 z-20 bg-white/10 hover:bg-[#FFD100] backdrop-blur-md border border-[#FFD100]/30 text-[#FFD100] hover:text-[#1C0445] px-5 py-2 rounded-full font-bold font-sans flex items-center gap-2 transition-all duration-300 uppercase tracking-widest text-sm cursor-pointer"
      >
        Skip Game <SkipForward size={18} />
      </button>

      <div className="relative z-10 w-full max-w-2xl">
          
          {/* Progress Indicators (Wedges) */}
          <div className="flex gap-2 mb-8 justify-center">
              {QUESTIONS.map((q, idx) => (
                  <div 
                    key={q.id} 
                    className={`h-2 rounded-full transition-all duration-300 ${
                        idx < currentQIndex ? 'w-8 bg-[#64FFDA]' : 
                        idx === currentQIndex ? 'w-16 bg-[#FFD100]' : 'w-4 bg-white/20'
                    }`}
                  />
              ))}
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-[30px] p-6 md:p-10 shadow-2xl overflow-hidden relative border border-[#FFD100]/20">
              
              <div className="flex items-center justify-center mb-6 text-[#1C0445]/60 font-display font-bold tracking-widest">
                  QUESTION {currentQIndex + 1} / {QUESTIONS.length}
              </div>

              <h3 className="text-xl md:text-3xl font-display font-bold text-[#1C0445] mb-8 text-center leading-snug">
                  {currentQuestion.text}
              </h3>

              <div className="grid gap-4">
                  {currentQuestion.options.map((option, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrect = idx === currentQuestion.correctIndex;
                      
                      // Determine button styling based on state
                      let btnClass = "border-[#1C0445]/10 hover:border-[#1C0445] hover:bg-[#1C0445]/5 text-[#1C0445] cursor-pointer";
                      let icon = null;

                      if (isAnswering && isSelected) {
                          if (showExplanation) {
                              // We are showing results
                              if (isCorrect) {
                                  btnClass = "bg-[#64FFDA] border-[#64FFDA] text-[#1C0445]"; // Green
                                  icon = <Check size={20} />;
                              } else {
                                  btnClass = "bg-[#CF0072] border-[#CF0072] text-white"; // Red
                                  icon = <X size={20} />;
                              }
                          } else {
                              // User clicked, waiting for processing
                              btnClass = "bg-[#1C0445] text-white border-[#1C0445]";
                          }
                      } else if (showExplanation && isCorrect) {
                           // Reveal correct answer if user missed it
                           btnClass = "bg-[#64FFDA] border-[#64FFDA] text-[#1C0445] ring-2 ring-offset-2 ring-[#64FFDA]"; 
                           icon = <Check size={20} />;
                      }

                      return (
                          <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            disabled={isAnswering}
                            className={`w-full text-left p-4 md:p-5 rounded-xl border-2 font-sans text-lg font-bold transition-all duration-200 flex items-center justify-between ${btnClass} ${isAnswering && !isSelected && !showExplanation ? 'opacity-30' : ''}`}
                          >
                              {option}
                              {icon}
                          </button>
                      );
                  })}
              </div>

              {/* Explanation Overlay - ALWAYS RENDERS AFTER SELECTION */}
              {showExplanation && (
                  <div className="mt-6 pt-6 border-t-2 border-[#1C0445]/10 animate-slide-up">
                      <p className="font-sans font-bold text-[#1C0445] mb-6 text-lg">
                          💡 {currentQuestion.explanation}
                      </p>
                      <button 
                        onClick={handleNext}
                        className="w-full bg-[#1C0445] text-white font-display font-bold py-4 rounded-xl hover:bg-[#331C9D] transition-colors flex items-center justify-center gap-2 text-xl cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02] transform"
                      >
                          {currentQIndex < QUESTIONS.length - 1 ? "NEXT QUESTION" : "FINISH GAME"} <ArrowRight size={20} />
                      </button>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};