import React, { useState, useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

interface NewYearOverlayProps {
  isActivated?: boolean;
}

const NewYearOverlay: React.FC<NewYearOverlayProps> = ({ isActivated = false }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  // Resize canvas to fit window
  const resizeCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  };

  // Countdown logic - only runs if activated
  useEffect(() => {
    if (!isActivated) return;

    const updateCountdown = () => {
      const now = new Date();
      const newYear = new Date(now.getFullYear() + 1, 0, 1);
      const diff = newYear.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown('Happy New Year!');
        setIsVisible(true); // Set isVisible to true when countdown is complete
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [isActivated]);

  // Fireworks animation - only runs if activated and visible
  useEffect(() => {
    if (!isActivated || !isVisible || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Particle[] = [];

    const createParticle = (x: number, y: number): Particle => ({
      x,
      y,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      life: 100,
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        if (p.life <= 0) particles.splice(i, 1);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
        ctx.fill();
      });

      if (particles.length < 100) {
        for (let i = 0; i < 5; i++) {
          particles.push(createParticle(Math.random() * canvas.width, Math.random() * canvas.height));
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isActivated, isVisible]);

  // Don't render anything if not activated
  if (!isActivated) return null;

  return (
    <div
      className={`overlay ${isVisible ? 'show' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        transition: 'opacity 0.5s, visibility 0.5s',
      }}
    >
      <div
        className="overlay-content"
        style={{
          textAlign: 'center',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <h1 style={{ fontSize: '3em', marginBottom: '20px' }}>Happy New Year!</h1>
        <div id="countdown" style={{ fontSize: '2em', marginBottom: '20px' }}>
          {countdown}
        </div>
        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
        <button
          onClick={() => setIsVisible(false)}
          style={{
            background: '#ff4500',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '1em',
            cursor: 'pointer',
            marginTop: '20px',
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = '#ff6347')}
          onMouseOut={(e) => (e.currentTarget.style.background = '#ff4500')}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NewYearOverlay;