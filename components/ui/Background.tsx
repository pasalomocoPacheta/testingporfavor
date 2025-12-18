import React, { useEffect, useRef } from 'react';

interface BackgroundProps {
  view: 'home' | 'services' | 'contact';
}

export const Background: React.FC<BackgroundProps> = ({ view }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle Resize
    let width = 0;
    let height = 0;
    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // --- ENTITIES SETUP ---
    
    // 1. FLOATING LETTERS (The targets)
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&?!@#%{}[]€$£¥";
    
    interface Particle {
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        text: string;
        health: number;
        maxHealth: number;
        alpha: number;
        targetAlpha: number;
        t: number;
    }
    const particles: Particle[] = [];
    const particleCount = width < 768 ? 40 : 100; 
    
    const createParticle = (startAlpha = 0): Particle => {
        const size = Math.random() * 16 + 10; 
        const maxHealth = Math.ceil(size / 6); 

        return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: size,
            text: CHARS.charAt(Math.floor(Math.random() * CHARS.length)),
            health: maxHealth,
            maxHealth: maxHealth,
            alpha: startAlpha,
            targetAlpha: Math.random() * 0.6 + 0.3,
            t: Math.random() * 100
        };
    };

    for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle(Math.random())); 
    }

    // 2. BULLETS
    interface Bullet {
        x: number;
        y: number;
        speed: number;
        color: string;
        size: number;
    }
    const bullets: Bullet[] = [];

    // 3. EXPLOSION DEBRIS
    interface Debris {
        x: number;
        y: number;
        vx: number;
        vy: number;
        life: number; 
        size: number;
        color: string;
    }
    const debris: Debris[] = [];

    // 4. DOM TARGETS (Real Text on Website)
    interface DomTarget {
        element: HTMLElement;
        rect: DOMRect;
        color: string;
        hit: boolean;
    }
    let domTargets: DomTarget[] = [];
    let domUpdateTimer = 0;

    // Function to scan the DOM for breakable text
    const updateDomTargets = () => {
        const elements = document.querySelectorAll('.destructible-dom-char');
        const newTargets: DomTarget[] = [];
        
        elements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            // Skip if already hidden/destroyed
            if (htmlEl.style.opacity === '0') return;

            const rect = htmlEl.getBoundingClientRect();
            
            // Only add if visible on screen
            if (rect.bottom > 0 && rect.top < height && rect.right > 0 && rect.left < width) {
                // Get computed color for the debris
                const style = window.getComputedStyle(htmlEl);
                newTargets.push({
                    element: htmlEl,
                    rect: rect,
                    color: style.color || '#FFFFFF',
                    hit: false
                });
            }
        });
        domTargets = newTargets;
    };


    // --- INPUT HANDLING ---
    let isMouseDown = false;
    let mouseDownTime = 0; 
    let shootTimer = 0; 
    const SHOOT_DELAY_MS = 100; // Faster shooting for fun

    const handleMouseDown = () => { 
        isMouseDown = true; 
        mouseDownTime = Date.now();
    };
    
    const handleMouseUp = () => { 
        isMouseDown = false; 
        mouseDownTime = 0;
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('blur', handleMouseUp);

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    const updateMouseForCanvas = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    };
    window.addEventListener('mousemove', updateMouseForCanvas);

    // --- ANIMATION LOOP ---
    const animate = () => {
        ctx.clearRect(0, 0, width, height);

        // Update DOM targets occasionally (every 20 frames) to handle scrolling/movement
        // doing it every frame is too expensive, but 20 is fast enough for interaction
        domUpdateTimer++;
        if (domUpdateTimer > 20) {
            updateDomTargets();
            domUpdateTimer = 0;
        }
        
        // A. SHOOTING LOGIC
        // Shoot immediately on click, then rapid fire
        if (isMouseDown) {
            shootTimer++;
            if (shootTimer % 5 === 0) { // Fast fire rate
                bullets.push({
                    x: mouseX,
                    y: mouseY,
                    speed: 15, // Fast bullets
                    color: shootTimer % 10 === 0 ? '#FFD100' : (shootTimer % 20 === 0 ? '#CF0072' : '#64FFDA'),
                    size: 3
                });
            }
        } else {
            shootTimer = 4; // Reset so next click shoots instantly
        }

        // B. UPDATE DEBRIS (Explosions)
        for (let i = debris.length - 1; i >= 0; i--) {
            const d = debris[i];
            d.x += d.vx;
            d.y += d.vy;
            d.life -= 0.03;

            if (d.life <= 0) {
                debris.splice(i, 1);
            } else {
                ctx.fillStyle = d.color;
                ctx.globalAlpha = d.life;
                ctx.beginPath();
                ctx.rect(d.x, d.y, d.size, d.size);
                ctx.fill();
                ctx.globalAlpha = 1.0;
            }
        }

        // C. UPDATE BULLETS & CHECK COLLISIONS
        for (let i = bullets.length - 1; i >= 0; i--) {
            const b = bullets[i];
            b.y -= b.speed;

            // Draw Bullet
            ctx.fillStyle = b.color;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
            ctx.fill();

            let bulletHit = false;

            // 1. COLLISION WITH DOM TARGETS (Real Website Text)
            // Iterate backwards to allow removal if we implemented that (though we just modify opacity here)
            for (let t = 0; t < domTargets.length; t++) {
                const target = domTargets[t];
                
                // Simple box collision
                if (b.x >= target.rect.left && 
                    b.x <= target.rect.right && 
                    b.y >= target.rect.top && 
                    b.y <= target.rect.bottom) {
                    
                    // HIT!
                    bulletHit = true;
                    
                    // Hide the real DOM element
                    target.element.style.opacity = '0';
                    target.element.style.pointerEvents = 'none'; // Stop interacting
                    
                    // Create debris based on text color
                    const debrisCount = 6;
                    for (let k = 0; k < debrisCount; k++) {
                        const angle = Math.random() * Math.PI * 2;
                        const speed = Math.random() * 4 + 2;
                        debris.push({
                            x: b.x, // Spawn at bullet impact roughly
                            y: b.y,
                            vx: Math.cos(angle) * speed,
                            vy: Math.sin(angle) * speed,
                            life: 1.0,
                            size: Math.random() * 3 + 2,
                            color: target.color
                        });
                    }
                    
                    // Only destroy one letter per bullet per frame ideally, but penetrating is cool too.
                    // Let's break loop so one bullet kills one letter.
                    break;
                }
            }

            if (bulletHit) {
                bullets.splice(i, 1);
                continue; // Next bullet
            }
            
            // 2. COLLISION WITH FLOATING PARTICLES (Background)
            for (let j = particles.length - 1; j >= 0; j--) {
                const p = particles[j];
                const dx = p.x - b.x;
                const dy = p.y - b.y;
                const hitRadius = p.size / 1.5; 

                if (Math.abs(dx) < hitRadius && Math.abs(dy) < hitRadius) {
                    p.health -= 1;
                    
                    // Debris
                    const debrisCount = 3;
                    for (let k = 0; k < debrisCount; k++) {
                        const angle = Math.random() * Math.PI * 2;
                        const speed = Math.random() * 3 + 1;
                        debris.push({
                            x: p.x,
                            y: p.y,
                            vx: Math.cos(angle) * speed,
                            vy: Math.sin(angle) * speed,
                            life: 1.0,
                            size: Math.random() * 2 + 1,
                            color: '#FFFFFF'
                        });
                    }

                    if (p.health <= 0) {
                        particles.splice(j, 1);
                        particles.push(createParticle(0));
                        
                        // Kill debris
                        const killDebrisCount = 6;
                        for (let k = 0; k < killDebrisCount; k++) {
                            const angle = Math.random() * Math.PI * 2;
                            const speed = Math.random() * 5 + 2;
                            debris.push({
                                x: p.x,
                                y: p.y,
                                vx: Math.cos(angle) * speed,
                                vy: Math.sin(angle) * speed,
                                life: 1.0,
                                size: Math.random() * 3 + 2,
                                color: b.color 
                            });
                        }
                    } else {
                        p.size = Math.max(5, p.size * 0.85); 
                        p.x += (Math.random() - 0.5) * 5;
                        p.y += (Math.random() - 0.5) * 5;
                    }
                    bulletHit = true;
                    break; 
                }
            }

            if (bulletHit || b.y < -50) {
                bullets.splice(i, 1);
            }
        }

        // D. RENDER FLOATING PARTICLES
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        particles.forEach((p) => {
            p.t += 0.015; 
            p.x += p.vx;
            p.y += p.vy;
            if (p.alpha < p.targetAlpha) p.alpha += 0.02;
            if (p.x < 0 || p.x > width) p.vx *= -1; 
            if (p.y < 0 || p.y > height) p.vy *= -1; 

            // Mouse repulsion
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                const push = ((100 - distance) / 100) * 1.5; 
                p.x -= Math.cos(angle) * push;
                p.y -= Math.sin(angle) * push;
            }

            ctx.font = `bold ${p.size}px "Belfast Grotesk", sans-serif`;
            const pulsedAlpha = Math.max(0, p.alpha + Math.sin(p.t * 2) * 0.1);
            ctx.fillStyle = `rgba(255, 255, 255, ${pulsedAlpha})`;
            ctx.fillText(p.text, p.x, p.y);
        });

        // E. DRAW CONNECTIONS
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100 && particles[i].alpha > 0.1 && particles[j].alpha > 0.1) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
        window.removeEventListener('mousemove', updateMouseForCanvas);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('blur', handleMouseUp);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const getBackgroundStyle = () => {
    switch(view) {
        case 'home': return 'linear-gradient(110deg, #470A68 0%, #CF0072 40%, #FF6600 80%, #FFD100 100%)';
        case 'services': return 'linear-gradient(135deg, #1C0445 0%, #331C9D 50%, #64FFDA 100%)';
        case 'contact': return 'linear-gradient(135deg, #1C0445 0%, #331C9D 100%)';
        default: return '#1C0445';
    }
  };

  return (
    <>
      {/* Background Gradient Layer (Behind everything) */}
      <div 
        className="fixed inset-0 z-0 transition-all duration-1000 ease-in-out bg-fixed"
        style={{ background: getBackgroundStyle() }}
      />
      <div className="bg-noise fixed inset-0 z-10 opacity-[0.05] pointer-events-none"></div>
      
      {/* 
         Canvas Layer (z-50) 
         This places the canvas ON TOP of the white cards (which are z-10 to z-40 usually),
         but BELOW the menu (z-60) and Cursor (z-9999).
         pointer-events-none ensures we can still click buttons underneath.
      */}
      <canvas ref={canvasRef} className="fixed inset-0 z-50 pointer-events-none" />
    </>
  );
};