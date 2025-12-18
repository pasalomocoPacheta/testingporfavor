import React, { useEffect, useState } from 'react';

interface IntroProps {
  onComplete: () => void;
}

// Expanded phases for realistic consumption
type Phase = 'enter' | 'prepare' | 'anticipate' | 'bite' | 'chew' | 'look' | 'exit' | 'reveal' | 'finished';

// STRICT CORPORATE PALETTE
const CONFETTI_COLORS = [
    '#CF0072', // Magenta
    '#FFD100', // Amarillo
    '#CE0058', // Rojo Frambuesa
    '#FFC600', // Amarillo Dorado
    '#331C9D', // Violeta Azulado
    '#FF6600', // Naranja
    '#7B1FA2', // Violeta Medio
    '#62686D', // Gris
    '#470A68', // Berenjena
    '#453536', // Marrón Grisáceo
    '#1C0445', // Morado Muy Oscuro
    '#64FFDA'  // Turquesa
];

export const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<Phase>('enter');
  const [chewCount, setChewCount] = useState(0);

  useEffect(() => {
    // Timeline orchestration
    const t1 = setTimeout(() => setPhase('prepare'), 1200);
    const t2 = setTimeout(() => setPhase('anticipate'), 1700);
    const t3 = setTimeout(() => setPhase('bite'), 2000);
    const tChew = setTimeout(() => {
        setPhase('chew');
        let count = 0;
        const chewInterval = setInterval(() => {
            count++;
            setChewCount(prev => prev + 1);
            if (count >= 4) clearInterval(chewInterval);
        }, 150);
    }, 2250);
    const t4 = setTimeout(() => setPhase('look'), 3500);
    const t5 = setTimeout(() => setPhase('exit'), 4800);
    const t6 = setTimeout(() => setPhase('reveal'), 5300);
    const t7 = setTimeout(() => {
        setPhase('finished');
        setTimeout(onComplete, 800);
    }, 8000);

    return () => {
        clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(tChew);
        clearTimeout(t4); clearTimeout(t5); clearTimeout(t6); clearTimeout(t7);
    };
  }, [onComplete]);

  const getJawRotation = () => {
      if (phase === 'anticipate') return 'rotate(50deg)'; 
      if (phase === 'bite') return 'rotate(0deg)';
      if (phase === 'chew') {
          return chewCount % 2 === 0 ? 'rotate(10deg)' : 'rotate(0deg)';
      }
      return 'rotate(0deg)';
  };

  return (
    <div 
        className={`fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${phase === 'finished' ? 'opacity-0' : 'opacity-100'}`}
        style={{
            // STRICT CORPORATE GRADIENT: #1C0445 -> #331C9D -> #64FFDA
            background: 'linear-gradient(135deg, #1C0445 0%, #331C9D 60%, #64FFDA 100%)',
            pointerEvents: phase === 'finished' ? 'none' : 'auto'
        }}
    >
        <div className="absolute inset-0 bg-noise opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[150px] opacity-5 mix-blend-overlay"></div>

        {/* --- Target 'A' (The one being eaten) --- */}
        <div 
            className="absolute z-10 select-none w-[16rem] h-[16rem]"
            style={{
                opacity: ['chew', 'look', 'exit', 'reveal', 'finished'].includes(phase) ? 0 : 1,
                animation: phase === 'bite' ? 'targetSuckedIn 0.4s ease-in forwards' : 'none',
                transformOrigin: 'center right',
            }}
        >
            <svg viewBox="0 0 616 635" className="w-full h-full drop-shadow-[0_0_35px_rgba(255,209,0,0.5)]">
                <defs>
                    <linearGradient id="logoGradientIntro" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#FFD100" />
                        <stop offset="100%" stopColor="#FFC600" />
                    </linearGradient>
                </defs>
                <path fill="url(#logoGradientIntro)" d="M 596.00 624.50 L 528.00 624.50 L 519.00 620.50 L 510.50 611.00 L 306.00 172.50 L 303.50 175.00 L 102.50 609.00 L 93.00 620.50 L 84.00 624.50 L 19.00 624.50 L 14.00 622.50 L 10.50 618.00 L 10.50 608.00 L 17.50 590.00 L 271.50 55.00 L 288.50 22.00 L 300.00 10.50 L 311.00 9.50 L 315.00 11.50 L 324.50 22.00 L 333.50 38.00 L 348.50 72.00 L 601.50 598.00 L 605.50 610.00 L 605.50 617.00 L 601.00 622.50 L 596.00 624.50 Z"/>
                <path fill="url(#logoGradientIntro)" d="M 308.00 537.50 L 303.00 536.50 L 297.50 531.00 L 249.50 453.00 L 243.50 442.00 L 243.50 435.00 L 245.00 433.50 L 367.00 432.50 L 369.50 434.00 L 370.50 441.00 L 366.50 449.00 L 320.50 524.00 L 314.50 533.00 L 308.00 537.50 Z"/>
            </svg>
        </div>

        {/* --- Final Logo (Revealed at end) --- */}
        <div 
            className="absolute z-30 flex items-center justify-center w-full px-4 md:px-0 max-w-[95vw] md:max-w-4xl"
            style={{
                opacity: phase === 'reveal' ? 1 : 0,
                transition: 'opacity 0.8s ease-in-out',
                animation: phase === 'reveal' ? 'logoBurst 1s ease-out forwards' : 'none'
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2047 830" className="w-full h-auto drop-shadow-2xl overflow-visible">
                <path d="M 1375.00,558.50 L 1356.00,558.50 L 1340.00,556.50 L 1314.00,549.50 L 1291.00,538.50 L 1277.00,528.50 L 1253.50,505.00 L 1240.50,484.00 L 1232.50,466.00 L 1225.50,431.00 L 1225.50,404.00 L 1228.50,384.00 L 1232.50,373.00 L 1232.50,367.00 L 1244.50,341.00 L 1255.50,325.00 L 1278.00,302.50 L 1296.00,290.50 L 1321.00,279.50 L 1352.00,272.50 L 1388.00,272.50 L 1425.00,280.50 L 1458.00,295.50 L 1469.00,302.50 L 1474.50,309.00 L 1472.50,319.00 L 1462.50,333.00 L 1455.00,338.50 L 1446.00,335.50 L 1443.00,332.50 L 1435.00,329.50 L 1426.00,323.50 L 1392.00,312.50 L 1366.00,310.50 L 1349.00,312.50 L 1338.00,315.50 L 1317.00,324.50 L 1307.00,331.50 L 1285.50,354.00 L 1274.50,376.00 L 1268.50,404.00 L 1268.50,427.00 L 1274.50,455.00 L 1279.50,466.00 L 1282.50,469.00 L 1284.50,475.00 L 1293.50,486.00 L 1308.00,499.50 L 1322.00,508.50 L 1350.00,518.50 L 1393.00,518.50 L 1408.00,515.50 L 1430.00,508.50 L 1434.50,504.00 L 1435.50,426.00 L 1439.00,422.50 L 1472.00,422.50 L 1475.50,426.00 L 1474.50,529.00 L 1470.00,533.50 L 1460.00,538.50 L 1431.00,549.50 L 1426.00,549.50 L 1404.00,555.50 L 1375.00,558.50 Z M 373.00,552.50 L 270.00,552.50 L 266.50,549.00 L 265.50,283.00 L 270.00,276.50 L 373.00,276.50 L 404.00,281.50 L 425.00,290.50 L 436.00,298.50 L 445.50,309.00 L 452.50,323.00 L 456.50,339.00 L 456.50,361.00 L 454.50,372.00 L 444.50,392.00 L 437.00,399.50 L 422.00,407.50 L 420.50,410.00 L 436.00,416.50 L 446.00,424.50 L 456.50,437.00 L 459.50,443.00 L 464.50,464.00 L 464.50,480.00 L 458.50,507.00 L 447.50,524.00 L 431.00,537.50 L 416.00,544.50 L 403.00,548.50 L 373.00,552.50 Z M 674.00,553.50 L 517.00,553.50 L 512.50,550.00 L 511.50,282.00 L 515.00,277.50 L 672.00,276.50 L 676.00,277.50 L 678.50,280.00 L 678.50,312.00 L 677.00,314.50 L 674.00,315.50 L 555.00,315.50 L 553.50,317.00 L 553.50,372.00 L 555.00,373.50 L 661.00,373.50 L 664.50,376.00 L 666.50,381.00 L 666.50,405.00 L 664.50,410.00 L 660.00,412.50 L 555.00,412.50 L 553.50,414.00 L 553.50,513.00 L 555.00,514.50 L 677.00,515.50 L 679.50,520.00 L 679.50,547.00 L 678.50,551.00 L 674.00,553.50 Z M 898.00,553.50 L 740.00,553.50 L 733.50,549.00 L 733.50,281.00 L 737.00,277.50 L 769.00,276.50 L 773.50,280.00 L 774.50,283.00 L 774.50,512.00 L 777.00,514.50 L 898.00,514.50 L 903.50,519.00 L 903.50,549.00 L 901.00,552.50 L 898.00,553.50 Z M 1067.00,558.50 L 1054.00,558.50 L 1031.00,555.50 L 1006.00,547.50 L 984.50,533.00 L 971.50,519.00 L 961.50,503.00 L 951.50,473.00 L 949.50,455.00 L 949.50,281.00 L 952.00,277.50 L 982.00,276.50 L 988.00,278.50 L 990.50,283.00 L 990.50,448.00 L 992.50,465.00 L 1002.50,489.00 L 1014.00,502.50 L 1022.00,508.50 L 1036.00,515.50 L 1048.00,518.50 L 1076.00,518.50 L 1085.00,516.50 L 1100.00,508.50 L 1103.00,508.50 L 1117.50,496.00 L 1117.50,494.00 L 1126.50,482.00 L 1133.50,461.00 L 1135.50,450.00 L 1136.50,281.00 L 1139.00,277.50 L 1142.00,276.50 L 1169.00,276.50 L 1173.00,277.50 L 1176.50,281.00 L 1177.50,438.00 L 1175.50,462.00 L 1168.50,490.00 L 1154.50,516.00 L 1133.00,537.50 L 1111.00,549.50 L 1107.00,549.50 L 1090.00,555.50 L 1067.00,558.50 Z M 371.50,394.00 L 388.00,390.50 L 401.00,383.50 L 407.50,377.00 L 413.50,363.00 L 414.50,355.00 L 413.50,345.00 L 407.50,332.00 L 395.00,321.50 L 375.00,315.50 L 359.00,313.50 L 310.00,313.50 L 306.50,318.00 L 307.50,393.00 L 309.00,394.50 L 371.50,394.00 Z M 364.50,515.00 L 382.00,513.50 L 400.00,508.50 L 406.00,505.50 L 416.50,495.00 L 421.50,479.00 L 421.50,465.00 L 416.50,451.00 L 406.00,441.50 L 393.00,435.50 L 382.00,433.50 L 381.00,434.50 L 370.00,432.50 L 309.00,432.50 L 306.50,436.00 L 307.50,513.00 L 310.00,515.50 L 364.50,515.00 Z" fill="#FFFFFF" fillRule="evenodd" />
                <g transform="translate(1502.666,266.127) scale(0.460333)">
                    <path fill="#FFD100" d="M 596.00 624.50 L 528.00 624.50 L 519.00 620.50 L 510.50 611.00 L 306.00 172.50 L 303.50 175.00 L 102.50 609.00 L 93.00 620.50 L 84.00 624.50 L 19.00 624.50 L 14.00 622.50 L 10.50 618.00 L 10.50 608.00 L 17.50 590.00 L 271.50 55.00 L 288.50 22.00 L 300.00 10.50 L 311.00 9.50 L 315.00 11.50 L 324.50 22.00 L 333.50 38.00 L 348.50 72.00 L 601.50 598.00 L 605.50 610.00 L 605.50 617.00 L 601.00 622.50 L 596.00 624.50 Z" />
                    <path fill="#FFD100" d="M 308.00 537.50 L 303.00 536.50 L 297.50 531.00 L 249.50 453.00 L 243.50 442.00 L 243.50 435.00 L 245.00 433.50 L 367.00 432.50 L 369.50 434.00 L 370.50 441.00 L 366.50 449.00 L 320.50 524.00 L 314.50 533.00 L 308.00 537.50 Z" />
                </g>
            </svg>
        </div>

        {/* --- Beluga Whale --- */}
        <div 
            className="absolute z-20 w-[450px] h-auto pointer-events-none"
            style={{
                animation: 
                    phase === 'enter' ? 'belugaSwimIn 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' :
                    phase === 'prepare' ? 'none' : 
                    phase === 'anticipate' ? 'belugaAnticipate 0.3s ease-out forwards' :
                    phase === 'bite' ? 'belugaBite 0.25s cubic-bezier(0.2, 0, 0.2, 1) forwards' :
                    phase === 'chew' ? 'belugaChewBody 0.3s linear infinite' :
                    phase === 'look' ? 'none' : 
                    ['exit', 'reveal', 'finished'].includes(phase) ? 'belugaDashOut 0.8s ease-in forwards' : 'none',
                transform: phase === 'prepare' ? 'translateX(-22%)' : undefined
            }}
        >
            <svg viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
                <defs>
                    {/* STRICT PALETTE REPLACEMENT: Using White and Grays for the Beluga */}
                    <radialGradient id="bodyGradIntro" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 120) rotate(90) scale(120 200)">
                        <stop stopColor="white"/>
                        <stop offset="0.7" stopColor="#F5F5F5"/> {/* Lightest Gray */}
                        <stop offset="1" stopColor="#E6E6E6"/> {/* Very Light Gray */}
                    </radialGradient>
                    <linearGradient id="finGradIntro" x1="0" y1="0" x2="0" y2="1">
                         <stop stopColor="#FFF"/>
                         <stop offset="1" stopColor="#E6E6E6"/>
                    </linearGradient>
                </defs>

                <g id="side-view" style={{ opacity: phase === 'look' ? 0 : 1, transition: 'opacity 0.2s ease', transformOrigin: 'center' }}>
                    {/* Flipper Shadow: #62686D (Gray) */}
                    <path d="M230 160 C 230 160 250 190 220 200" fill="#62686D" opacity="0.5" />
                    <path d="M360 130 C 360 180 300 210 200 210 C 100 210 50 180 20 160 C 10 155 0 140 10 130 C 20 120 60 130 80 130 C 120 130 150 110 180 90 C 210 70 240 60 280 70 C 320 80 360 90 360 130 Z" fill="url(#bodyGradIntro)" mask="url(#jaw-cutout)" />
                    <path d="M280 70 C 240 60 210 70 180 90 C 150 110 120 130 80 130 C 60 130 20 120 10 130 C 0 140 10 155 20 160 C 50 180 100 210 200 210 C 250 210 280 180 280 180" stroke="none" fill="url(#bodyGradIntro)" />
                    <path d="M20 160 C 10 180 -10 170 -20 150 C -10 140 10 140 20 160" fill="url(#bodyGradIntro)" />
                    <path d="M260 180 C 260 180 280 180 300 175 C 330 165 370 145 365 130 C 360 90 320 80 280 70 C 280 70 260 180 260 180" fill="url(#bodyGradIntro)" stroke="none"/>
                    <path d="M280 70 C 310 70 340 85 350 110 C 340 90 310 80 280 80" fill="white" opacity="0.6" />
                    <path d="M240 160 C 240 160 270 190 230 200 C 220 205 210 190 220 170" fill="url(#finGradIntro)" />
                    {/* Eye: #1C0445 (Beluga Web Purple) */}
                    <circle cx="290" cy="125" r="3" fill="#1C0445" />
                    <g style={{ transform: getJawRotation(), transformOrigin: '290px 150px', transition: phase === 'chew' ? 'transform 0.1s linear' : 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
                        <path d="M290 150 C 290 150 320 150 350 145 C 345 155 330 165 300 165 C 290 165 290 150 290 150" fill="#E6E6E6" />
                        {/* Mouth Inside: #CE0058 (Raspberry Red) */}
                        <path d="M295 152 L 345 147 L 300 160 Z" fill="#CE0058" />
                    </g>
                </g>

                <g id="front-view" style={{ opacity: phase === 'look' ? 1 : 0, transition: 'opacity 0.2s ease', animation: phase === 'look' ? 'belugaFloat 2s ease-in-out infinite' : 'none' }}>
                    <ellipse cx="200" cy="140" rx="90" ry="80" fill="url(#bodyGradIntro)" />
                    <ellipse cx="200" cy="100" rx="50" ry="30" fill="white" opacity="0.7" />
                    <path d="M120 160 Q 90 190 110 210" fill="url(#finGradIntro)" />
                    <path d="M280 160 Q 310 190 290 210" fill="url(#finGradIntro)" />
                    <g style={{ animation: 'eyeBlink 3s infinite', transformOrigin: 'center' }}>
                        {/* Eyes: #1C0445 (Beluga Web Purple) */}
                        <circle cx="170" cy="140" r="4" fill="#1C0445" />
                        <circle cx="230" cy="140" r="4" fill="#1C0445" />
                    </g>
                    {/* Smile Line: #62686D (Gray) */}
                    <path d="M185 155 Q 200 165 215 155" stroke="#62686D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    {/* Cheeks: #CE0058 (Raspberry Red) */}
                    <circle cx="160" cy="150" r="6" fill="#CE0058" opacity="0.3" />
                    <circle cx="240" cy="150" r="6" fill="#CE0058" opacity="0.3" />
                </g>
            </svg>
        </div>

        {/* --- Confetti --- */}
        {(phase === 'bite' || phase === 'chew') && (
            <div className="absolute z-15 ml-24" style={{ transform: 'translateX(20px)' }}>
                {[...Array(80)].map((_, i) => {
                     const tx = (Math.random() - 0.5) * 600 + 'px';
                     const ty = (Math.random() - 0.5) * 600 + 'px';
                     const rot = (Math.random() * 720 + 360) + 'deg'; 
                     const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
                     const size = Math.random() * 5 + 2 + 'rem';
                     return (
                        <div 
                            key={i}
                            className="absolute font-display font-black select-none"
                            style={{
                                left: 0, top: 0, color: color, fontSize: size,
                                '--tx': tx, '--ty': ty, '--rot': rot,
                                animation: `crumbBlast ${0.6 + Math.random() * 0.4}s cubic-bezier(0.25, 1, 0.5, 1) forwards`,
                                animationDelay: `${Math.random() * 0.1}s`,
                                zIndex: Math.floor(Math.random() * 50)
                            } as React.CSSProperties}
                        >A</div>
                     );
                })}
            </div>
        )}
    </div>
  );
};