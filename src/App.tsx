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
    }
  };

  return (
    <button ref={btnRef} className="magnetic-btn" onClick={handleClick}>
      Magnetic Ripple Button
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
  // Calculate fade-out opacity for intro text
  const introHeight = window.innerHeight;
  const fadeStart = introHeight * 0.3;
  const fadeEnd = introHeight * 0.5;
  let fade = 1;
  if (scrollY > fadeStart) {
    fade = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
    fade = Math.max(0, Math.min(1, fade));
  }

  return (
    <>
      <CursorFollower />
      <ParticleBackground />
      <div id="FirstComponent">
         <div className="intro-block-full">
           <h1 className="typewriter-text" style={{fontSize: '4.5rem', marginBottom: '0.5em', position: 'relative', zIndex: 2, opacity: fade, transition: 'opacity 0.2s'}}>
             {textAnimated ? 'HealMind_AI'.slice(0, Math.floor(typingProgress / 100 * 11)) : ''}
             <span className="cursor">|</span>
           </h1>
           <p className="typewriter-text" style={{fontSize: '2.1rem', fontWeight: 400, position: 'relative', zIndex: 2, opacity: fade, transition: 'opacity 0.2s'}}>
             {textAnimated && typingProgress > 30 ? 'A revolution in how we understand and support the human mind.'.slice(0, Math.floor((typingProgress - 30) / 70 * 60)) : ''}
             {textAnimated && typingProgress > 30 ? <span className="cursor">|</span> : ''}
           </p>
         </div>
         <section className="context-block">
           <div className="context-content">
             <p style={{marginBottom: '1.2em'}}><b>The world is overwhelmed.</b><br/>Burnout, overstimulation, and emotional fatigue have become part of everyday life. But support systems aren’t scaling fast enough — especially in moments of silence, in the midnight thoughts, or when someone needs to be heard right now.</p>
             <p style={{marginBottom: '1.2em'}}><b>HealMind_AI was born from this gap.</b></p>
             <p style={{marginBottom: '1.2em'}}>It’s not a replacement. It’s not a shortcut.</p>
             <p style={{marginBottom: 0}}>It’s a new dimension of emotional support — a highly intuitive, deeply aware voice-based AI that listens, learns, and responds with context, care, and calm.</p>
           </div>
         </section>
         <div className='parallax' id="parallax1"> <h1>DIV 1</h1> </div>
         <div className='parallax' id="parallax2"> <h1>DIV 2</h1> </div>
         <div className='parallax' id="parallax3"> <h1>DIV 3</h1> </div>
         <div className='parallax' id="parallax4"> <h1>DIV 4</h1> </div>
         <div style={{display:'flex', justifyContent:'center', marginTop: 40}}>
           <MagneticButton />
         </div>
      </div>
    </>
  )
}

export default App
