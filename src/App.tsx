import { useState, useEffect, useRef, useCallback } from 'react'
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
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
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
  
  // New state for line-by-line typing
  const [contextLines, setContextLines] = useState([0, 0, 0, 0]); // [line1, line2, line3, line4]
  const [section3Lines, setSection3Lines] = useState([0, 0, 0, 0, 0]); // [line1, line2, line3, line4, line5]
  const [section4Lines, setSection4Lines] = useState([0, 0, 0, 0]); // [line1, line2, line3, line4]
  const [section5Lines, setSection5Lines] = useState([0, 0, 0]); // [line1, line2, line3]
  const [section6Lines, setSection6Lines] = useState([0, 0, 0, 0, 0, 0]); // [line1, line2, line3, line4, line5, line6]
  const [section7Lines, setSection7Lines] = useState([0, 0, 0]); // [line1, line2, line3]
  
  // State to track which line is currently being typed
  const [contextActiveLine, setContextActiveLine] = useState(0);
  const [section3ActiveLine, setSection3ActiveLine] = useState(0);
  const [section4ActiveLine, setSection4ActiveLine] = useState(0);
  const [section5ActiveLine, setSection5ActiveLine] = useState(0);
  const [section6ActiveLine, setSection6ActiveLine] = useState(0);
  const [section7ActiveLine, setSection7ActiveLine] = useState(0);
  
  useEffect(() => {
    // Disable scroll restoration to prevent browser from remembering position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top
    window.scrollTo(0, 0);
    
    // Always start fresh at section 1 on reload
    setCurrentSection(0);
    
    // Reset all animation states to fresh
    setTextAnimated(false);
    setTypingProgress(0);
    setContextAnimated(false);
    setContextProgress(0);
    setSection3Animated(false);
    setSection3Progress(0);
    setSection4Animated(false);
    setSection4Progress(0);
    setSection5Animated(false);
    setSection5Progress(0);
    setSection6Animated(false);
    setSection6Progress(0);
    setSection7Animated(false);
    setSection7Progress(0);
    
    // Reset all line-by-line typing states
    setContextLines([0, 0, 0, 0, 0]);
    setSection3Lines([0, 0, 0, 0, 0]);
    setSection4Lines([0, 0, 0, 0]);
    setSection5Lines([0, 0, 0]);
    setSection6Lines([0, 0, 0, 0, 0, 0]);
    setSection7Lines([0, 0, 0]);
    
    // Reset all active line states
    setContextActiveLine(0);
    setSection3ActiveLine(0);
    setSection4ActiveLine(0);
    setSection5ActiveLine(0);
    setSection6ActiveLine(0);
    setSection7ActiveLine(0);
    
    // Force immediate visual reset to section 1 with a more robust approach
    setTimeout(() => {
      const firstComponent = document.getElementById('FirstComponent');
      if (firstComponent) {
        firstComponent.style.transform = 'translateY(0vh)';
        firstComponent.style.transition = 'none';
        // Force a reflow
        firstComponent.offsetHeight;
        setTimeout(() => {
          firstComponent.style.transition = 'transform 0.8s ease-in-out';
        }, 10);
      }
    }, 0);
  }, []);
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    
    if (isTransitioning) return;
    
    if (e.deltaY > 0) {
      // Scroll down - go to next section
      setCurrentSection(prev => {
        // If we're already at the last section (7), don't allow further scrolling
        if (prev >= 7) {
          return prev;
        }
        setIsTransitioning(true);
        return prev + 1;
      });
    } else {
      // Scroll up - go to previous section
      setCurrentSection(prev => {
        const newSection = Math.max(prev - 1, 0);
        setIsTransitioning(true);
        return newSection;
      });
    }
    
    // Reset transition after animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  }, [isTransitioning]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);
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
  
  // Context block animation trigger based on currentSection
  useEffect(() => {
    if (currentSection === 1 && !contextAnimated) {
      setContextAnimated(true);
      
      // Start line-by-line typing
      const lineTexts = [
        'The world is overwhelmed.',
        'Burnout, overstimulation, and emotional fatigue have become part of everyday life. But support systems aren\'t scaling fast enough — especially in moments of silence, in the midnight thoughts, or when someone needs to be heard right now.',
        'HealMind_AI was born from this gap.',
        'It\'s not a replacement. It\'s not a shortcut.',
        'It\'s a new dimension of emotional support — a highly intuitive, deeply aware voice-based AI that listens, learns, and responds with context, care, and calm.'
      ];
      
      let currentLine = 0;
      let currentChar = 0;
      
             const typeNextLine = () => {
         if (currentLine >= lineTexts.length) return;
         
         setContextActiveLine(currentLine);
         
         const interval = setInterval(() => {
           currentChar++;
           setContextLines(prev => {
             const newLines = [...prev];
             newLines[currentLine] = currentChar;
             return newLines;
           });
           
           if (currentChar >= lineTexts[currentLine].length) {
             clearInterval(interval);
             currentLine++;
             currentChar = 0;
             setTimeout(typeNextLine, 200); // Pause between lines
           }
         }, 15);
       };
       
       typeNextLine();
     }
   }, [currentSection, contextAnimated]);
   
   // Section 3 animation trigger based on currentSection
   useEffect(() => {
     if (currentSection === 2 && !section3Animated) {
       setSection3Animated(true);
       
       // Start line-by-line typing
       const lineTexts = [
         'Always Available. Always Respectful. Always Yours.',
         'HealMind_AI doesn\'t just respond — it adapts to your emotional tone, your silence, and your pace. With unparalleled sensitivity and clarity, it becomes a companion for your mind — built to assist without intruding, support without diagnosing, and understand without labeling.',
         '• Works in real time, through conversation.',
         '• Prioritizes your privacy and emotional safety.',
         '• Designed to scale personal reflection and daily balance.'
       ];
       
       let currentLine = 0;
       let currentChar = 0;
       
       const typeNextLine = () => {
         if (currentLine >= lineTexts.length) return;
         
         setSection3ActiveLine(currentLine);
         
         const interval = setInterval(() => {
           currentChar++;
           setSection3Lines(prev => {
             const newLines = [...prev];
             newLines[currentLine] = currentChar;
             return newLines;
           });
           
           if (currentChar >= lineTexts[currentLine].length) {
             clearInterval(interval);
             currentLine++;
             currentChar = 0;
             setTimeout(typeNextLine, 200); // Pause between lines
           }
         }, 15);
       };
       
       typeNextLine();
     }
   }, [currentSection, section3Animated]);
   
   // Section 4 animation trigger based on currentSection
   useEffect(() => {
     if (currentSection === 3 && !section4Animated) {
       setSection4Animated(true);
       
       // Start line-by-line typing
       const lineTexts = [
         'A New Standard for Emotional Intelligence',
         'HealMind_AI is not a chatbot. It\'s not an app that parrots back scripted affirmations. It\'s a thoughtfully engineered system designed to support how people actually feel, especially when they can\'t always put it into words.',
         'Behind the scenes, it interprets, adapts, and speaks — not just from data, but from a deep architecture trained to understand nuance, tone, and timing.',
         'All of this is built to feel invisible — just natural, intuitive support that\'s with you when you need it.'
       ];
       
       let currentLine = 0;
       let currentChar = 0;
       
       const typeNextLine = () => {
         if (currentLine >= lineTexts.length) return;
         
         setSection4ActiveLine(currentLine);
         
         const interval = setInterval(() => {
           currentChar++;
           setSection4Lines(prev => {
             const newLines = [...prev];
             newLines[currentLine] = currentChar;
             return newLines;
           });
           
           if (currentChar >= lineTexts[currentLine].length) {
             clearInterval(interval);
             currentLine++;
             currentChar = 0;
             setTimeout(typeNextLine, 200); // Pause between lines
           }
         }, 15);
       };
       
       typeNextLine();
     }
   }, [currentSection, section4Animated]);
   
   // Section 5 animation trigger based on currentSection
   useEffect(() => {
     if (currentSection === 4 && !section5Animated) {
       setSection5Animated(true);
       
       // Start line-by-line typing
       const lineTexts = [
         'Designed for This Generation — and the Next',
         'We believe emotional well-being shouldn\'t be reactive. HealMind_AI is a proactive system — not in place of human connection, but in harmony with it. It meets people where they are: through conversation, on their terms, in their time.',
         'Whether you\'re a student, entrepreneur, parent, artist, or simply navigating this fast-moving world — HealMind_AI is here to walk with you, not ahead or behind.'
       ];
       
       let currentLine = 0;
       let currentChar = 0;
       
       const typeNextLine = () => {
         if (currentLine >= lineTexts.length) return;
         
         setSection5ActiveLine(currentLine);
         
         const interval = setInterval(() => {
           currentChar++;
           setSection5Lines(prev => {
             const newLines = [...prev];
             newLines[currentLine] = currentChar;
             return newLines;
           });
           
           if (currentChar >= lineTexts[currentLine].length) {
             clearInterval(interval);
             currentLine++;
             currentChar = 0;
             setTimeout(typeNextLine, 200); // Pause between lines
           }
         }, 15);
       };
       
       typeNextLine();
     }
   }, [currentSection, section5Animated]);
   
   // Section 6 animation trigger based on currentSection
   useEffect(() => {
     if (currentSection === 5 && !section6Animated) {
       setSection6Animated(true);
       
       // Start line-by-line typing
       const lineTexts = [
         'Built for the Future. Grounded in Responsibility.',
         'HealMind_AI is developed with deep attention to ethical boundaries, data privacy, and long-term reliability. Every feature is designed with:',
         '• Security as the foundation, not an afterthought.',
         '• Compliance with healthcare best practices, from privacy to access.',
         '• Scalability to grow with users, not grow away from them.',
         'We\'re not chasing hype. We\'re building trust — line by line, session by session.'
       ];
       
       let currentLine = 0;
       let currentChar = 0;
       
       const typeNextLine = () => {
         if (currentLine >= lineTexts.length) return;
         
         setSection6ActiveLine(currentLine);
         
         const interval = setInterval(() => {
           currentChar++;
           setSection6Lines(prev => {
             const newLines = [...prev];
             newLines[currentLine] = currentChar;
             return newLines;
           });
           
           if (currentChar >= lineTexts[currentLine].length) {
             clearInterval(interval);
             currentLine++;
             currentChar = 0;
             setTimeout(typeNextLine, 200); // Pause between lines
           }
         }, 15);
       };
       
       typeNextLine();
     }
   }, [currentSection, section6Animated]);
   
   // Section 7 animation trigger based on currentSection
   useEffect(() => {
     if (currentSection === 6 && !section7Animated) {
       setSection7Animated(true);
       
       // Start line-by-line typing
       const lineTexts = [
         'Join the Waitlist',
         'Be among the first to experience the future of voice-based emotional intelligence.',
         'This is not an app launch — this is a movement toward deeper, more present digital care.'
       ];
       
       let currentLine = 0;
       let currentChar = 0;
       
       const typeNextLine = () => {
         if (currentLine >= lineTexts.length) return;
         
         setSection7ActiveLine(currentLine);
         
         const interval = setInterval(() => {
           currentChar++;
           setSection7Lines(prev => {
             const newLines = [...prev];
             newLines[currentLine] = currentChar;
             return newLines;
           });
           
           if (currentChar >= lineTexts[currentLine].length) {
             clearInterval(interval);
             currentLine++;
             currentChar = 0;
             setTimeout(typeNextLine, 200); // Pause between lines
           }
         }, 15);
       };
       
       typeNextLine();
     }
   }, [currentSection, section7Animated]);
   
   // Simple fade values for sections
   const fade = 1;
   const contextFade = 1;
   const section3Fade = 1;
   const section4Fade = 1;
   const section5Fade = 1;
   const section6Fade = 1;
   const section7Fade = 1;

  return (
    <>
      <CursorFollower />
      <ParticleBackground />
      <div id="FirstComponent" style={{
        transform: `translateY(-${currentSection * 100}vh)`,
        transition: 'transform 0.8s ease-in-out'
      }}>
         <div className="intro-block-full">
                                               <div style={{
                          position: 'absolute',
                          top: '2rem',
                          left: '6vw',
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                          color: '#8B5CF6',
                          zIndex: 3,
                          opacity: fade,
                          transition: 'opacity 0.2s',
                          letterSpacing: '0.2em'
                        }}>
                          NEURALYN
                        </div>
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
                    opacity: contextAnimated ? contextFade : 0,
                    transition: 'opacity 0.8s ease-out'
                  }}
                >
                                     <b>{contextAnimated ? 'The world is overwhelmed.'.slice(0, contextLines[0]) : ''}</b>
                   {contextAnimated && contextActiveLine === 0 && contextLines[0] > 0 && contextLines[0] < 'The world is overwhelmed.'.length ? <span className="cursor">|</span> : ''}
                   <br />
                   {contextAnimated && contextLines[1] > 0 ? 'Burnout, overstimulation, and emotional fatigue have become part of everyday life. But support systems aren\'t scaling fast enough — especially in moments of silence, in the midnight thoughts, or when someone needs to be heard right now.'.slice(0, contextLines[1]) : ''}
                   {contextAnimated && contextActiveLine === 1 && contextLines[1] > 0 && contextLines[1] < 'Burnout, overstimulation, and emotional fatigue have become part of everyday life. But support systems aren\'t scaling fast enough — especially in moments of silence, in the midnight thoughts, or when someone needs to be heard right now.'.length ? <span className="cursor">|</span> : ''}
                </p>
                                                           <p 
                  className="typewriter-text"
                  style={{
                    marginBottom: '1.2em',
                    opacity: contextAnimated ? contextFade : 0,
                    transition: 'opacity 0.8s ease-out'
                  }}
                >
                                     {contextAnimated && contextLines[2] > 0 ? 'HealMind_AI was born from this gap.'.slice(0, contextLines[2]) : ''}
                                     {contextAnimated && contextActiveLine === 2 && contextLines[2] > 0 && contextLines[2] < 'HealMind_AI was born from this gap.'.length ? <span className="cursor">|</span> : ''}
                 </p>
                                <p 
                   className="typewriter-text"
                   style={{
                     marginBottom: '1.2em',
                     opacity: contextAnimated ? contextFade : 0,
                     transition: 'opacity 0.8s ease-out'
                   }}
                 >
                   {contextAnimated && contextLines[3] > 0 ? 'It\'s not a replacement. It\'s not a shortcut.'.slice(0, contextLines[3]) : ''}
                   {contextAnimated && contextActiveLine === 3 && contextLines[3] > 0 && contextLines[3] < 'It\'s not a replacement. It\'s not a shortcut.'.length ? <span className="cursor">|</span> : ''}
                 </p>
                                <p 
                   className="typewriter-text"
                   style={{
                     marginBottom: 0,
                     opacity: contextAnimated ? contextFade : 0,
                     transition: 'opacity 0.8s ease-out'
                   }}
                 >
                   {contextAnimated && contextLines[4] > 0 ? 'It\'s a new dimension of emotional support — a highly intuitive, deeply aware voice-based AI that listens, learns, and responds with context, care, and calm.'.slice(0, contextLines[4]) : ''}
                   {contextAnimated && contextActiveLine === 4 && contextLines[4] > 0 && contextLines[4] < 'It\'s a new dimension of emotional support — a highly intuitive, deeply aware voice-based AI that listens, learns, and responds with context, care, and calm.'.length ? <span className="cursor">|</span> : ''}
                </p>
            </div>
          </section>
         <section className="section3-block">
           <div className="context-content">
                                                       <p 
                 className="typewriter-text" 
                 style={{
                   marginBottom: '0.5em',
                   opacity: section3Animated ? 1 : 0,
                   transition: 'opacity 0.8s ease-out'
                 }}
               >
                                  {section3Animated && section3Lines[0] > 0 ? (
                    <>
                      <b>Always Available. Always Respectful. Always Yours.</b>
                      {section3ActiveLine === 0 && section3Lines[0] < 'Always Available. Always Respectful. Always Yours.'.length ? <span className="cursor">|</span> : ''}
                    </>
                  ) : ''}
               </p>
                           <p 
                className="typewriter-text" 
                style={{
                  marginBottom: '1.2em',
                  opacity: section3Animated ? 1 : 0,
                  transition: 'opacity 0.8s ease-out'
                }}
              >
                                                                   {section3Animated && section3Lines[1] > 0 ? 'HealMind_AI doesn\'t just respond — it adapts to your emotional tone, your silence, and your pace. With unparalleled sensitivity and clarity, it becomes a companion for your mind — built to assist without intruding, support without diagnosing, and understand without labeling.'.slice(0, section3Lines[1]) : ''}
                                  {section3Animated && section3ActiveLine === 1 && section3Lines[1] > 0 && section3Lines[1] < 'HealMind_AI doesn\'t just respond — it adapts to your emotional tone, your silence, and your pace. With unparalleled sensitivity and clarity, it becomes a companion for your mind — built to assist without intruding, support without diagnosing, and understand without labeling.'.length ? <span className="cursor">|</span> : ''}
               </p>
                                                         <p 
                  className="typewriter-text" 
                  style={{
                    marginBottom: '0.8em',
                    opacity: section3Animated ? 1 : 0,
                    transition: 'opacity 0.8s ease-out'
                  }}
                >
                                    {section3Animated && section3Lines[2] > 0 ? '• Works in real time, through conversation.'.slice(0, section3Lines[2]) : ''}
                   {section3Animated && section3ActiveLine === 2 && section3Lines[2] > 0 && section3Lines[2] < '• Works in real time, through conversation.'.length ? <span className="cursor">|</span> : ''}
                </p>
                             <p 
                  className="typewriter-text" 
                  style={{
                    marginBottom: '0.8em',
                    opacity: section3Animated ? 1 : 0,
                    transition: 'opacity 0.8s ease-out'
                  }}
                >
                                    {section3Animated && section3Lines[3] > 0 ? '• Prioritizes your privacy and emotional safety.'.slice(0, section3Lines[3]) : ''}
                   {section3Animated && section3ActiveLine === 3 && section3Lines[3] > 0 && section3Lines[3] < '• Prioritizes your privacy and emotional safety.'.length ? <span className="cursor">|</span> : ''}
                </p>
                            <p 
                 className="typewriter-text" 
                 style={{
                   marginBottom: 0,
                   opacity: section3Animated ? 1 : 0,
                   transition: 'opacity 0.8s ease-out'
                 }}
               >
                                   {section3Animated && section3Lines[4] > 0 ? '• Designed to scale personal reflection and daily balance.'.slice(0, section3Lines[4]) : ''}
                  {section3Animated && section3ActiveLine === 4 && section3Lines[4] > 0 && section3Lines[4] < '• Designed to scale personal reflection and daily balance.'.length ? <span className="cursor">|</span> : ''}
              </p>
           </div>
                   </section>
          <section className="section4-block">
            <div className="context-content">
                             <p 
                 className="typewriter-text" 
                 style={{
                   marginBottom: '1.2em',
                   opacity: section4Animated ? 1 : 0,
                   transition: 'opacity 0.8s ease-out'
                 }}
               >
                                   {section4Animated && section4Lines[0] > 0 ? (
                    <>
                      <b>A New Standard for Emotional Intelligence</b>
                      {section4ActiveLine === 0 && section4Lines[0] < 'A New Standard for Emotional Intelligence'.length ? <span className="cursor">|</span> : ''}
                    </>
                  ) : ''}
               </p>
                             <p 
                 className="typewriter-text" 
                 style={{
                   marginBottom: '1.2em',
                   opacity: section4Animated ? 1 : 0,
                   transition: 'opacity 0.8s ease-out'
                 }}
               >
                                                                       {section4Animated && section4Lines[1] > 0 ? 'HealMind_AI is not a chatbot. It\'s not an app that parrots back scripted affirmations. It\'s a thoughtfully engineered system designed to support how people actually feel, especially when they can\'t always put it into words.'.slice(0, section4Lines[1]) : ''}
                                    {section4Animated && section4ActiveLine === 1 && section4Lines[1] > 0 && section4Lines[1] < 'HealMind_AI is not a chatbot. It\'s not an app that parrots back scripted affirmations. It\'s a thoughtfully engineered system designed to support how people actually feel, especially when they can\'t always put it into words.'.length ? <span className="cursor">|</span> : ''}
                </p>
                              <p 
                  className="typewriter-text" 
                  style={{
                    marginBottom: '1.2em',
                    opacity: section4Animated ? 1 : 0,
                    transition: 'opacity 0.8s ease-out'
                  }}
                >
                                     {section4Animated && section4Lines[2] > 0 ? 'Behind the scenes, it interprets, adapts, and speaks — not just from data, but from a deep architecture trained to understand nuance, tone, and timing.'.slice(0, section4Lines[2]) : ''}
                   {section4Animated && section4ActiveLine === 2 && section4Lines[2] > 0 && section4Lines[2] < 'Behind the scenes, it interprets, adapts, and speaks — not just from data, but from a deep architecture trained to understand nuance, tone, and timing.'.length ? <span className="cursor">|</span> : ''}
                </p>
                              <p 
                  className="typewriter-text" 
                  style={{
                    marginBottom: 0,
                    opacity: section4Animated ? 1 : 0,
                    transition: 'opacity 0.8s ease-out'
                  }}
                >
                                     {section4Animated && section4Lines[3] > 0 ? 'All of this is built to feel invisible — just natural, intuitive support that\'s with you when you need it.'.slice(0, section4Lines[3]) : ''}
                   {section4Animated && section4ActiveLine === 3 && section4Lines[3] > 0 && section4Lines[3] < 'All of this is built to feel invisible — just natural, intuitive support that\'s with you when you need it.'.length ? <span className="cursor">|</span> : ''}
               </p>
            </div>
                     </section>
           <section className="section5-block">
             <div className="context-content">
                               <p 
                  className="typewriter-text" 
                  style={{
                    marginBottom: '1.2em',
                    opacity: section5Animated ? 1 : 0,
                    transition: 'opacity 0.8s ease-out'
                  }}
                >
                                     {section5Animated && section5Lines[0] > 0 ? (
                     <>
                       <b>Designed for This Generation — and the Next</b>
                                               {section5ActiveLine === 0 && section5Lines[0] < 'Designed for This Generation — and the Next'.length ? <span className="cursor">|</span> : ''}
                     </>
                   ) : ''}
                </p>
                               <p 
                  className="typewriter-text" 
                  style={{
                    marginBottom: '1.2em',
                    opacity: section5Animated ? 1 : 0,
                    transition: 'opacity 0.8s ease-out'
                  }}
                >
                                     {section5Animated && section5Lines[1] > 0 ? 'We believe emotional well-being shouldn\'t be reactive. HealMind_AI is a proactive system — not in place of human connection, but in harmony with it. It meets people where they are: through conversation, on their terms, in their time.'.slice(0, section5Lines[1]) : ''}
                   {section5Animated && section5ActiveLine === 1 && section5Lines[1] > 0 && section5Lines[1] < 'We believe emotional well-being shouldn\'t be reactive. HealMind_AI is a proactive system — not in place of human connection, but in harmony with it. It meets people where they are: through conversation, on their terms, in their time.'.length ? <span className="cursor">|</span> : ''}
                </p>
                               <p 
                  className="typewriter-text" 
                  style={{
                    marginBottom: 0,
                    opacity: section5Animated ? 1 : 0,
                    transition: 'opacity 0.8s ease-out'
                  }}
                >
                                     {section5Animated && section5Lines[2] > 0 ? 'Whether you\'re a student, entrepreneur, parent, artist, or simply navigating this fast-moving world — HealMind_AI is here to walk with you, not ahead or behind.'.slice(0, section5Lines[2]) : ''}
                   {section5Animated && section5ActiveLine === 2 && section5Lines[2] > 0 && section5Lines[2] < 'Whether you\'re a student, entrepreneur, parent, artist, or simply navigating this fast-moving world — HealMind_AI is here to walk with you, not ahead or behind.'.length ? <span className="cursor">|</span> : ''}
                </p>
             </div>
                       </section>
            <section className="section6-block">
              <div className="context-content">
                                 <p 
                   className="typewriter-text" 
                   style={{
                     marginBottom: '1.2em',
                     opacity: section6Animated ? 1 : 0,
                     transition: 'opacity 0.8s ease-out'
                   }}
                 >
                                       {section6Animated && section6Lines[0] > 0 ? (
                      <>
                        <b>Built for the Future. Grounded in Responsibility.</b>
                                                 {section6ActiveLine === 0 && section6Lines[0] < 'Built for the Future. Grounded in Responsibility.'.length ? <span className="cursor">|</span> : ''}
                      </>
                    ) : ''}
                 </p>
                                 <p 
                   className="typewriter-text" 
                   style={{
                     marginBottom: '1.2em',
                     opacity: section6Animated ? 1 : 0,
                     transition: 'opacity 0.8s ease-out'
                   }}
                 >
                                       {section6Animated && section6Lines[1] > 0 ? 'HealMind_AI is developed with deep attention to ethical boundaries, data privacy, and long-term reliability. Every feature is designed with:'.slice(0, section6Lines[1]) : ''}
                    {section6Animated && section6ActiveLine === 1 && section6Lines[1] > 0 && section6Lines[1] < 'HealMind_AI is developed with deep attention to ethical boundaries, data privacy, and long-term reliability. Every feature is designed with:'.length ? <span className="cursor">|</span> : ''}
                 </p>
                                 <p 
                   className="typewriter-text" 
                   style={{
                     marginBottom: '1.2em',
                     opacity: section6Animated ? 1 : 0,
                     transition: 'opacity 0.8s ease-out'
                   }}
                 >
                                       {section6Animated && section6Lines[2] > 0 ? '• Security as the foundation, not an afterthought.'.slice(0, section6Lines[2]) : ''}
                    {section6Animated && section6ActiveLine === 2 && section6Lines[2] > 0 && section6Lines[2] < '• Security as the foundation, not an afterthought.'.length ? <span className="cursor">|</span> : ''}
                 </p>
                                 <p 
                   className="typewriter-text" 
                   style={{
                     marginBottom: '1.2em',
                     opacity: section6Animated ? 1 : 0,
                     transition: 'opacity 0.8s ease-out'
                   }}
                 >
                                       {section6Animated && section6Lines[3] > 0 ? '• Compliance with healthcare best practices, from privacy to access.'.slice(0, section6Lines[3]) : ''}
                    {section6Animated && section6ActiveLine === 3 && section6Lines[3] > 0 && section6Lines[3] < '• Compliance with healthcare best practices, from privacy to access.'.length ? <span className="cursor">|</span> : ''}
                 </p>
                                 <p 
                   className="typewriter-text" 
                   style={{
                     marginBottom: '1.2em',
                     opacity: section6Animated ? 1 : 0,
                     transition: 'opacity 0.8s ease-out'
                   }}
                 >
                                       {section6Animated && section6Lines[4] > 0 ? '• Scalability to grow with users, not grow away from them.'.slice(0, section6Lines[4]) : ''}
                    {section6Animated && section6ActiveLine === 4 && section6Lines[4] > 0 && section6Lines[4] < '• Scalability to grow with users, not grow away from them.'.length ? <span className="cursor">|</span> : ''}
                 </p>
                                 <p 
                   className="typewriter-text" 
                   style={{
                     marginBottom: 0,
                     opacity: section6Animated ? 1 : 0,
                     transition: 'opacity 0.8s ease-out'
                   }}
                 >
                                       {section6Animated && section6Lines[5] > 0 ? 'We\'re not chasing hype. We\'re building trust — line by line, session by session.'.slice(0, section6Lines[5]) : ''}
                    {section6Animated && section6ActiveLine === 5 && section6Lines[5] > 0 && section6Lines[5] < 'We\'re not chasing hype. We\'re building trust — line by line, session by session.'.length ? <span className="cursor">|</span> : ''}
                 </p>
              </div>
                         </section>
                                                       <section className="section7-block">
                 <div className="context-content">
                                     <p 
                      className="typewriter-text" 
                      style={{
                        marginBottom: '1.2em',
                        opacity: section7Animated ? 1 : 0,
                        transition: 'opacity 0.8s ease-out'
                      }}
                    >
                                           {section7Animated && section7Lines[0] > 0 ? (
                         <>
                           <b>Join the Waitlist</b>
                                                       {section7ActiveLine === 0 && section7Lines[0] < 'Join the Waitlist'.length ? <span className="cursor">|</span> : ''}
                         </>
                       ) : ''}
                    </p>
                                     <p 
                      className="typewriter-text" 
                      style={{
                        marginBottom: '1.2em',
                        opacity: section7Animated ? 1 : 0,
                        transition: 'opacity 0.8s ease-out'
                      }}
                    >
                                             {section7Animated && section7Lines[1] > 0 ? 'Be among the first to experience the future of voice-based emotional intelligence.'.slice(0, section7Lines[1]) : ''}
                       {section7Animated && section7ActiveLine === 1 && section7Lines[1] > 0 && section7Lines[1] < 'Be among the first to experience the future of voice-based emotional intelligence.'.length ? <span className="cursor">|</span> : ''}
                    </p>
                                     <p 
                      className="typewriter-text" 
                      style={{
                        marginBottom: '2.5em',
                        opacity: section7Animated ? 1 : 0,
                        transition: 'opacity 0.8s ease-out'
                      }}
                    >
                                             {section7Animated && section7Lines[2] > 0 ? 'This is not an app launch — this is a movement toward deeper, more present digital care.'.slice(0, section7Lines[2]) : ''}
                       {section7Animated && section7ActiveLine === 2 && section7Lines[2] > 0 && section7Lines[2] < 'This is not an app launch — this is a movement toward deeper, more present digital care.'.length ? <span className="cursor">|</span> : ''}
                    </p>
                 </div>
                 <div 
                   style={{
                     position: 'absolute',
                     bottom: '15vh',
                     left: '50%',
                     transform: 'translateX(-50%)',
                     opacity: section7Animated && section7Lines[2] > 0 ? 1 : 0,
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
