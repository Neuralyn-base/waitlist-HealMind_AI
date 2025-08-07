import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './style.css'


function CursorFollower() {
  const followerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const moveFollower = (e: MouseEvent) => {
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;
      }
    };
    window.addEventListener('mousemove', moveFollower);
    return () => window.removeEventListener('mousemove', moveFollower);
  }, []);
  return <div ref={followerRef} className="cursor-follower" />;
}

function MagneticButton() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);

  // Magnetic effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const dist = Math.sqrt(x * x + y * y);
      if (dist < 120) {
        btnRef.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      } else {
        btnRef.current.style.transform = '';
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Ripple effect
  const handleClick = (e: React.MouseEvent) => {
    const btn = btnRef.current;
    const ripple = rippleRef.current;
    if (btn && ripple) {
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.classList.remove('show');
      void ripple.offsetWidth; // force reflow
      ripple.classList.add('show');
      
      // Add gradient animation
      btn.classList.add('clicked');
      setTimeout(() => {
        btn.classList.remove('clicked');
      }, 600);
    }
  };

  return (
    <button ref={btnRef} className="magnetic-btn" onClick={handleClick}>
      Join the Movement
      <span ref={rippleRef} className="ripple" />
    </button>
  );
}

function ParticleBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    // Soft, calming color palette
    const colors = [
      'rgba(173, 216, 230, 0.18)', // light blue
      'rgba(186, 230, 201, 0.18)', // soft green
      'rgba(221, 214, 243, 0.18)', // lavender
      'rgba(255, 255, 255, 0.13)'  // soft white
    ];
    let particles = Array.from({length: 28}, () => {
      const r = 12 + Math.random() * 18;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r,
        baseR: r,
        dx: -0.06 + Math.random() * 0.12,
        dy: -0.06 + Math.random() * 0.12,
        color: colors[Math.floor(Math.random() * colors.length)],
        breathing: Math.random() > 0.5,
        phase: Math.random() * Math.PI * 2
      };
    });
    function draw(time) {
      ctx.clearRect(0, 0, width, height);
      for (let p of particles) {
        let radius = p.r;
        if (p.breathing) {
          radius = p.baseR + Math.sin(time / 1200 + p.phase) * 3;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
    function update() {
      for (let p of particles) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < -40 || p.x > width + 40) p.dx *= -1;
        if (p.y < -40 || p.y > height + 40) p.dy *= -1;
      }
    }
    let animationId;
    function animate(time) {
      draw(time || 0);
      update();
      animationId = requestAnimationFrame(animate);
    }
    animate();
    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return <canvas ref={canvasRef} className="particle-canvas" />;
}

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [textAnimated, setTextAnimated] = useState(false);
  const [typingProgress, setTypingProgress] = useState(0);
  const [contextAnimated, setContextAnimated] = useState(false);
  const [contextProgress, setContextProgress] = useState(0);
  const [section3Animated, setSection3Animated] = useState(false);
  const [section3Progress, setSection3Progress] = useState(0);
  const [section4Animated, setSection4Animated] = useState(false);
  const [section4Progress, setSection4Progress] = useState(0);
  const [section5Animated, setSection5Animated] = useState(false);
  const [section5Progress, setSection5Progress] = useState(0);
  const [section6Animated, setSection6Animated] = useState(false);
  const [section6Progress, setSection6Progress] = useState(0);
  const [section7Animated, setSection7Animated] = useState(false);
  const [section7Progress, setSection7Progress] = useState(0);
  
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'auto';
    }
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    // Start typing animation
    const timer = setTimeout(() => {
      setTextAnimated(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 2;
        setTypingProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 50);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  
  // Context block animation trigger based on scroll
  useEffect(() => {
    const contextBlock = document.querySelector('.context-block');
    if (contextBlock) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !contextAnimated) {
            setContextAnimated(true);
            let progress = 0;
            const interval = setInterval(() => {
              progress += 2;
              setContextProgress(progress);
              if (progress >= 100) {
                clearInterval(interval);
              }
            }, 50);
          }
        });
      }, { threshold: 0.3 });
      
      observer.observe(contextBlock);
      return () => observer.disconnect();
    }
  }, [contextAnimated]);
  
  // Section 3 animation trigger based on scroll
  useEffect(() => {
    const section3Block = document.querySelector('.section3-block');
    if (section3Block) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !section3Animated) {
            setSection3Animated(true);
            let progress = 0;
            const interval = setInterval(() => {
              progress += 2;
              setSection3Progress(progress);
              if (progress >= 100) {
                clearInterval(interval);
              }
            }, 50);
          }
        });
      }, { threshold: 0.3 });
      
      observer.observe(section3Block);
      return () => observer.disconnect();
    }
  }, [section3Animated]);
  
  // Section 4 animation trigger based on scroll
  useEffect(() => {
    const section4Block = document.querySelector('.section4-block');
    if (section4Block) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !section4Animated) {
            setSection4Animated(true);
            let progress = 0;
            const interval = setInterval(() => {
              progress += 2;
              setSection4Progress(progress);
              if (progress >= 100) {
                clearInterval(interval);
              }
            }, 50);
          }
        });
      }, { threshold: 0.3 });
      
      observer.observe(section4Block);
      return () => observer.disconnect();
    }
  }, [section4Animated]);
  
  // Section 5 animation trigger based on scroll
  useEffect(() => {
    const section5Block = document.querySelector('.section5-block');
    if (section5Block) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !section5Animated) {
            setSection5Animated(true);
            let progress = 0;
            const interval = setInterval(() => {
              progress += 2;
              setSection5Progress(progress);
              if (progress >= 100) {
                clearInterval(interval);
              }
            }, 50);
          }
        });
      }, { threshold: 0.3 });
      
      observer.observe(section5Block);
      return () => observer.disconnect();
    }
  }, [section5Animated]);
  
  // Section 6 animation trigger based on scroll
  useEffect(() => {
    const section6Block = document.querySelector('.section6-block');
    if (section6Block) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !section6Animated) {
            setSection6Animated(true);
            let progress = 0;
            const interval = setInterval(() => {
              progress += 2;
              setSection6Progress(progress);
              if (progress >= 100) {
                clearInterval(interval);
              }
            }, 50);
          }
        });
      }, { threshold: 0.3 });
      
      observer.observe(section6Block);
      return () => observer.disconnect();
    }
  }, [section6Animated]);
  
  // Section 7 animation trigger based on scroll
  useEffect(() => {
    const section7Block = document.querySelector('.section7-block');
    if (section7Block) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !section7Animated) {
            setSection7Animated(true);
            let progress = 0;
            const interval = setInterval(() => {
              progress += 2;
              setSection7Progress(progress);
              if (progress >= 100) {
                clearInterval(interval);
              }
            }, 50);
          }
        });
      }, { threshold: 0.3 });
      
      observer.observe(section7Block);
      return () => observer.disconnect();
    }
  }, [section7Animated]);
  
  // Calculate fade-out opacity for intro text
  const introHeight = window.innerHeight;
  const fadeStart = introHeight * 0.3;
  const fadeEnd = introHeight * 0.5;
  let fade = 1;
  if (scrollY > fadeStart) {
    fade = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
    fade = Math.max(0, Math.min(1, fade));
  }

  // Calculate fade-out opacity for each section
  const sectionHeight = window.innerHeight;
  const sectionFadeStart = sectionHeight * 0.3;
  const sectionFadeEnd = sectionHeight * 0.5;
  
  let contextFade = 1;
  let section3Fade = 1;
  let section4Fade = 1;
  let section5Fade = 1;
  let section6Fade = 1;
  let section7Fade = 1;
  
  // Calculate fade for each section based on scroll position
  if (scrollY > sectionHeight + sectionFadeStart) {
    contextFade = 1 - (scrollY - (sectionHeight + sectionFadeStart)) / (sectionFadeEnd - sectionFadeStart);
    contextFade = Math.max(0, Math.min(1, contextFade));
  }
  
  if (scrollY > sectionHeight * 2 + sectionFadeStart) {
    section3Fade = 1 - (scrollY - (sectionHeight * 2 + sectionFadeStart)) / (sectionFadeEnd - sectionFadeStart);
    section3Fade = Math.max(0, Math.min(1, section3Fade));
  }
  
  if (scrollY > sectionHeight * 3 + sectionFadeStart) {
    section4Fade = 1 - (scrollY - (sectionHeight * 3 + sectionFadeStart)) / (sectionFadeEnd - sectionFadeStart);
    section4Fade = Math.max(0, Math.min(1, section4Fade));
  }
  
  if (scrollY > sectionHeight * 4 + sectionFadeStart) {
    section5Fade = 1 - (scrollY - (sectionHeight * 4 + sectionFadeStart)) / (sectionFadeEnd - sectionFadeStart);
    section5Fade = Math.max(0, Math.min(1, section5Fade));
  }
  
  if (scrollY > sectionHeight * 5 + sectionFadeStart) {
    section6Fade = 1 - (scrollY - (sectionHeight * 5 + sectionFadeStart)) / (sectionFadeEnd - sectionFadeStart);
    section6Fade = Math.max(0, Math.min(1, section6Fade));
  }
  
  if (scrollY > sectionHeight * 6 + sectionFadeStart) {
    section7Fade = 1 - (scrollY - (sectionHeight * 6 + sectionFadeStart)) / (sectionFadeEnd - sectionFadeStart);
    section7Fade = Math.max(0, Math.min(1, section7Fade));
  }

  return (
    <>
      <CursorFollower />
      <ParticleBackground />
      <div id="FirstComponent">
         <div className="intro-block-full">
                       <h1 className="typewriter-text" style={{fontSize: '7rem', marginBottom: '0.5em', position: 'relative', zIndex: 2, opacity: fade, transition: 'opacity 0.2s'}}>
              {textAnimated ? 'HealMind_AI'.slice(0, Math.floor(typingProgress / 100 * 11)) : ''}
              <span className="cursor">|</span>
            </h1>
            <p className="typewriter-text" style={{fontSize: '2.4rem', fontWeight: 400, position: 'relative', zIndex: 2, opacity: fade, transition: 'opacity 0.2s'}}>
              {textAnimated && typingProgress > 30 ? 'A revolution in how we understand and support the human mind.'.slice(0, Math.floor((typingProgress - 30) / 70 * 60)) : ''}
              {textAnimated && typingProgress > 30 ? <span className="cursor">|</span> : ''}
            </p>
         </div>
                   <section className="context-block">
            <div className="context-content">
                                             <p 
                  className="typewriter-text"
                  style={{
                    marginBottom: '1.2em',
                    opacity: contextAnimated ? Math.min(1, (contextProgress - 0) / 25) * contextFade : 0,
                    transition: 'opacity 0.8s ease-out'
                  }}
                >
                  <b>The world is overwhelmed.</b>
                  <br />
                  {contextAnimated && contextProgress > 10 ? 'Burnout, overstimulation, and emotional fatigue have become part of everyday life. But support systems aren\'t scaling fast enough — especially in moments of silence, in the midnight thoughts, or when someone needs to be heard right now.'.slice(0, Math.floor((contextProgress - 10) / 90 * 150)) : ''}
                  {contextAnimated && contextProgress > 10 ? <span className="cursor">|</span> : ''}
                </p>
                                                           <p 
                  className="typewriter-text"
                  style={{
                    marginBottom: '1.2em',
                    opacity: contextAnimated ? Math.min(1, (contextProgress - 25) / 25) * contextFade : 0,
                    transition: 'opacity 0.8s ease-out'
                  }}
                >
                  {contextAnimated && contextProgress > 25 ? 'HealMind_AI was born from this gap.'.slice(0, Math.floor((contextProgress - 25) / 75 * 35)) : ''}
                  {contextAnimated && contextProgress > 25 ? <span className="cursor">|</span> : ''}
                </p>
                               <p 
                  className="typewriter-text"
                  style={{
                    marginBottom: '1.2em',
                    opacity: contextAnimated ? Math.min(1, (contextProgress - 50) / 25) * contextFade : 0,
                    transition: 'opacity 0.8s ease-out'
                  }}
                >
                  {contextAnimated && contextProgress > 50 ? 'It\'s not a replacement. It\'s not a shortcut.'.slice(0, Math.floor((contextProgress - 50) / 50 * 45)) : ''}
                  {contextAnimated && contextProgress > 50 ? <span className="cursor">|</span> : ''}
                </p>
                               <p 
                  className="typewriter-text"
                  style={{
                    marginBottom: 0,
                    opacity: contextAnimated ? Math.min(1, (contextProgress - 75) / 25) * contextFade : 0,
                    transition: 'opacity 0.8s ease-out'
                  }}
                >
                  {contextAnimated && contextProgress > 75 ? 'It\'s a new dimension of emotional support — a highly intuitive, deeply aware voice-based AI that listens, learns, and responds with context, care, and calm.'.slice(0, Math.floor((contextProgress - 75) / 25 * 120)) : ''}
                  {contextAnimated && contextProgress > 75 ? <span className="cursor">|</span> : ''}
                </p>
            </div>
          </section>
         <section className="section3-block">
           <div className="context-content">
                           <p 
                className="typewriter-text" 
                style={{
                  marginBottom: '1.2em',
                  opacity: section3Animated ? Math.min(1, (section3Progress - 0) / 25) : 0,
                  transition: 'opacity 0.8s ease-out'
                }}
              >
                                 {section3Animated && section3Progress > 0 ? (
                   <>
                     <b>Always Available. Always Respectful. Always Yours.</b>
                     {Math.floor((section3Progress - 0) / 25 * 50) > 50 ? <span className="cursor">|</span> : ''}
                   </>
                 ) : ''}
              </p>
                           <p 
                className="typewriter-text" 
                style={{
                  marginBottom: '1.2em',
                  opacity: section3Animated ? Math.min(1, (section3Progress - 25) / 25) : 0,
                  transition: 'opacity 0.8s ease-out'
                }}
              >
                {section3Animated && section3Progress > 25 ? 'HealMind_AI doesn\'t just respond — it adapts to your emotional tone, your silence, and your pace. With unparalleled sensitivity and clarity, it becomes a companion for your mind — built to assist without intruding, support without diagnosing, and understand without labeling.'.slice(0, Math.floor((section3Progress - 25) / 75 * 180)) : ''}
                {section3Animated && section3Progress > 25 ? <span className="cursor">|</span> : ''}
              </p>
                           <p 
                className="typewriter-text" 
                style={{
                  marginBottom: '1.2em',
                  opacity: section3Animated ? Math.min(1, (section3Progress - 50) / 25) : 0,
                  transition: 'opacity 0.8s ease-out'
                }}
              >
                {section3Animated && section3Progress > 50 ? '• Works in real time, through conversation'.slice(0, Math.floor((section3Progress - 50) / 50 * 40)) : ''}
                {section3Animated && section3Progress > 50 ? <span className="cursor">|</span> : ''}
              </p>
                           <p 
                className="typewriter-text" 
                style={{
                  marginBottom: '1.2em',
                  opacity: section3Animated ? Math.min(1, (section3Progress - 75) / 25) : 0,
                  transition: 'opacity 0.8s ease-out'
                }}
              >
                {section3Animated && section3Progress > 75 ? '• Prioritizes your privacy and emotional safety'.slice(0, Math.floor((section3Progress - 75) / 25 * 45)) : ''}
                {section3Animated && section3Progress > 75 ? <span className="cursor">|</span> : ''}
              </p>
                           <p 
                className="typewriter-text" 
                style={{
                  marginBottom: 0,
                  opacity: section3Animated ? Math.min(1, (section3Progress - 100) / 25) : 0,
                  transition: 'opacity 0.8s ease-out'
                }}
              >
                {section3Animated && section3Progress > 100 ? '• Designed to scale personal reflection and daily balance'.slice(0, Math.floor((section3Progress - 100) / 25 * 55)) : ''}
                {section3Animated && section3Progress > 100 ? <span className="cursor">|</span> : ''}
              </p>
           </div>
                   </section>
          <section className="section4-block">
            <div className="context-content">
                             <p 
                 className="typewriter-text" 
                 style={{
                   marginBottom: '1.2em',
                   opacity: section4Animated ? Math.min(1, (section4Progress - 0) / 25) : 0,
                   transition: 'opacity 0.8s ease-out'
                 }}
               >
                                   {section4Animated && section4Progress > 0 ? (
                    <>
                      <b>A New Standard for Emotional Intelligence</b>
                      {Math.floor((section4Progress - 0) / 25 * 45) > 45 ? <span className="cursor">|</span> : ''}
                    </>
                  ) : ''}
               </p>
                             <p 
                 className="typewriter-text" 
                 style={{
                   marginBottom: '1.2em',
                   opacity: section4Animated ? Math.min(1, (section4Progress - 25) / 25) : 0,
                   transition: 'opacity 0.8s ease-out'
                 }}
               >
                 {section4Animated && section4Progress > 25 ? 'HealMind_AI is not a chatbot. It\'s not an app that parrots back scripted affirmations. It\'s a thoughtfully engineered system designed to support how people actually feel, especially when they can\'t always put it into words.'.slice(0, Math.floor((section4Progress - 25) / 75 * 160)) : ''}
                 {section4Animated && section4Progress > 25 ? <span className="cursor">|</span> : ''}
               </p>
                             <p 
                 className="typewriter-text" 
                 style={{
                   marginBottom: '1.2em',
                   opacity: section4Animated ? Math.min(1, (section4Progress - 50) / 25) : 0,
                   transition: 'opacity 0.8s ease-out'
                 }}
               >
                 {section4Animated && section4Progress > 50 ? 'Behind the scenes, it interprets, adapts, and speaks — not just from data, but from a deep architecture trained to understand nuance, tone, and timing.'.slice(0, Math.floor((section4Progress - 50) / 50 * 120)) : ''}
                 {section4Animated && section4Progress > 50 ? <span className="cursor">|</span> : ''}
               </p>
                             <p 
                 className="typewriter-text" 
                 style={{
                   marginBottom: 0,
                   opacity: section4Animated ? Math.min(1, (section4Progress - 75) / 25) : 0,
                   transition: 'opacity 0.8s ease-out'
                 }}
               >
                 {section4Animated && section4Progress > 75 ? 'All of this is built to feel invisible — just natural, intuitive support that\'s with you when you need it.'.slice(0, Math.floor((section4Progress - 75) / 25 * 100)) : ''}
                 {section4Animated && section4Progress > 75 ? <span className="cursor">|</span> : ''}
               </p>
            </div>
                     </section>
           <section className="section5-block">
             <div className="context-content">
                               <p 
                  className="typewriter-text" 
                  style={{
                    marginBottom: '1.2em',
                    opacity: section5Animated ? Math.min(1, (section5Progress - 0) / 25) : 0,
                    transition: 'opacity 0.8s ease-out'
                  }}
                >
                                     {section5Animated && section5Progress > 0 ? (
                     <>
                       <b>Designed for This Generation — and the Next</b>
                       {Math.floor((section5Progress - 0) / 25 * 50) > 50 ? <span className="cursor">|</span> : ''}
                     </>
                   ) : ''}
                </p>
                               <p 
                  className="typewriter-text" 
                  style={{
                    marginBottom: '1.2em',
                    opacity: section5Animated ? Math.min(1, (section5Progress - 25) / 25) : 0,
                    transition: 'opacity 0.8s ease-out'
                  }}
                >
                  {section5Animated && section5Progress > 25 ? 'We believe emotional well-being shouldn\'t be reactive. HealMind_AI is a proactive system — not in place of human connection, but in harmony with it. It meets people where they are: through conversation, on their terms, in their time.'.slice(0, Math.floor((section5Progress - 25) / 75 * 160)) : ''}
                  {section5Animated && section5Progress > 25 ? <span className="cursor">|</span> : ''}
                </p>
                               <p 
                  className="typewriter-text" 
                  style={{
                    marginBottom: 0,
                    opacity: section5Animated ? Math.min(1, (section5Progress - 50) / 25) : 0,
                    transition: 'opacity 0.8s ease-out'
                  }}
                >
                  {section5Animated && section5Progress > 50 ? 'Whether you\'re a student, entrepreneur, parent, artist, or simply navigating this fast-moving world — HealMind_AI is here to walk with you, not ahead or behind.'.slice(0, Math.floor((section5Progress - 50) / 50 * 130)) : ''}
                  {section5Animated && section5Progress > 50 ? <span className="cursor">|</span> : ''}
                </p>
             </div>
                       </section>
            <section className="section6-block">
              <div className="context-content">
                                 <p 
                   className="typewriter-text" 
                   style={{
                     marginBottom: '1.2em',
                     opacity: section6Animated ? Math.min(1, (section6Progress - 0) / 25) : 0,
                     transition: 'opacity 0.8s ease-out'
                   }}
                 >
                                       {section6Animated && section6Progress > 0 ? (
                      <>
                        <b>Built for the Future. Grounded in Responsibility.</b>
                        {Math.floor((section6Progress - 0) / 25 * 50) > 50 ? <span className="cursor">|</span> : ''}
                      </>
                    ) : ''}
                 </p>
                                 <p 
                   className="typewriter-text" 
                   style={{
                     marginBottom: '1.2em',
                     opacity: section6Animated ? Math.min(1, (section6Progress - 25) / 25) : 0,
                     transition: 'opacity 0.8s ease-out'
                   }}
                 >
                   {section6Animated && section6Progress > 25 ? 'HealMind_AI is developed with deep attention to ethical boundaries, data privacy, and long-term reliability. Every feature is designed with:'.slice(0, Math.floor((section6Progress - 25) / 75 * 120)) : ''}
                   {section6Animated && section6Progress > 25 ? <span className="cursor">|</span> : ''}
                 </p>
                                 <p 
                   className="typewriter-text" 
                   style={{
                     marginBottom: '1.2em',
                     opacity: section6Animated ? Math.min(1, (section6Progress - 50) / 25) : 0,
                     transition: 'opacity 0.8s ease-out'
                   }}
                 >
                   {section6Animated && section6Progress > 50 ? '• Security as the foundation, not an afterthought'.slice(0, Math.floor((section6Progress - 50) / 50 * 45)) : ''}
                   {section6Animated && section6Progress > 50 ? <span className="cursor">|</span> : ''}
                 </p>
                                 <p 
                   className="typewriter-text" 
                   style={{
                     marginBottom: '1.2em',
                     opacity: section6Animated ? Math.min(1, (section6Progress - 75) / 25) : 0,
                     transition: 'opacity 0.8s ease-out'
                   }}
                 >
                   {section6Animated && section6Progress > 75 ? '• Compliance with healthcare best practices, from privacy to access'.slice(0, Math.floor((section6Progress - 75) / 25 * 65)) : ''}
                   {section6Animated && section6Progress > 75 ? <span className="cursor">|</span> : ''}
                 </p>
                                 <p 
                   className="typewriter-text" 
                   style={{
                     marginBottom: '1.2em',
                     opacity: section6Animated ? Math.min(1, (section6Progress - 100) / 25) : 0,
                     transition: 'opacity 0.8s ease-out'
                   }}
                 >
                   {section6Animated && section6Progress > 100 ? '• Scalability to grow with users, not grow away from them'.slice(0, Math.floor((section6Progress - 100) / 25 * 55)) : ''}
                   {section6Animated && section6Progress > 100 ? <span className="cursor">|</span> : ''}
                 </p>
                                 <p 
                   className="typewriter-text" 
                   style={{
                     marginBottom: 0,
                     opacity: section6Animated ? Math.min(1, (section6Progress - 125) / 25) : 0,
                     transition: 'opacity 0.8s ease-out'
                   }}
                 >
                   {section6Animated && section6Progress > 125 ? 'We\'re not chasing hype. We\'re building trust — line by line, session by session.'.slice(0, Math.floor((section6Progress - 125) / 25 * 80)) : ''}
                   {section6Animated && section6Progress > 125 ? <span className="cursor">|</span> : ''}
                 </p>
              </div>
                         </section>
                                                       <section className="section7-block">
                 <div className="context-content">
                                     <p 
                      className="typewriter-text" 
                      style={{
                        marginBottom: '1.2em',
                        opacity: section7Animated ? Math.min(1, (section7Progress - 0) / 25) : 0,
                        transition: 'opacity 0.8s ease-out'
                      }}
                    >
                                           {section7Animated && section7Progress > 0 ? (
                         <>
                           <b>Join the Waitlist</b>
                           {Math.floor((section7Progress - 0) / 25 * 15) > 15 ? <span className="cursor">|</span> : ''}
                         </>
                       ) : ''}
                    </p>
                                     <p 
                      className="typewriter-text" 
                      style={{
                        marginBottom: '1.2em',
                        opacity: section7Animated ? Math.min(1, (section7Progress - 25) / 25) : 0,
                        transition: 'opacity 0.8s ease-out'
                      }}
                    >
                      {section7Animated && section7Progress > 25 ? 'Be among the first to experience the future of voice-based emotional intelligence.'.slice(0, Math.floor((section7Progress - 25) / 75 * 85)) : ''}
                      {section7Animated && section7Progress > 25 ? <span className="cursor">|</span> : ''}
                    </p>
                                     <p 
                      className="typewriter-text" 
                      style={{
                        marginBottom: '2.5em',
                        opacity: section7Animated ? Math.min(1, (section7Progress - 50) / 25) : 0,
                        transition: 'opacity 0.8s ease-out'
                      }}
                    >
                      {section7Animated && section7Progress > 50 ? 'This is not an app launch — this is a movement toward deeper, more present digital care.'.slice(0, Math.floor((section7Progress - 50) / 50 * 95)) : ''}
                      {section7Animated && section7Progress > 50 ? <span className="cursor">|</span> : ''}
                    </p>
                 </div>
                 <div 
                   style={{
                     position: 'absolute',
                     bottom: '15vh',
                     left: '50%',
                     transform: 'translateX(-50%)',
                     opacity: section7Animated ? Math.min(1, (section7Progress - 75) / 25) : 0,
                     transition: 'opacity 0.8s ease-out'
                   }}
                 >
                   <MagneticButton />
                 </div>
                             </section>
      </div>
    </>
  )
}

export default App
