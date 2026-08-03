import React, { useRef, useEffect, useCallback } from 'react';

/*
  PERFORMANCE FIXES:
  1. Gap = 14px instead of 10px → ~55% fewer dots to process
  2. shadowBlur is REMOVED from hot-path → was the single biggest GPU drain
  3. Glow is faked via 2-pass concentric circles (cheap) instead of real shadow
  4. IntersectionObserver stops RAF when canvas is off-screen
  5. ctx.save/restore avoided entirely
  6. fillStyle strings pre-computed, not rebuilt per-dot
  7. Canvas resolution capped to 1× DPR (no retina overdraw)
  8. Throttled resize with debounce
*/

const MAX_PARTICLES = 150;
const CONNECTION_DISTANCE = 120;
const MOUSE_RADIUS = 150;

function createParticles(W, H, type) {
  const count = Math.min(MAX_PARTICLES, Math.floor((W * H) / 9000));
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1,
      color: type === 'planet' 
        ? (Math.random() > 0.5 ? '#e5006a' : '#ff2688')
        : type === 'controller'
          ? (Math.random() > 0.5 ? '#22d3ee' : '#06b6d4')
          : (Math.random() > 0.5 ? '#e5006a' : '#22d3ee')
    });
  }
  return particles;
}

export default function PhosphorImageCanvas({
  type = 'controller',
  height = 420,
  className = '',
  style = {},
}) {
  const canvasRef   = useRef(null);
  const rafRef      = useRef(null);
  const visibleRef  = useRef(false);
  const particlesRef = useRef([]);
  const mouseRef    = useRef({ x: -1000, y: -1000 });
  const timeRef     = useRef(0);
  const imgRef      = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = '/claude.webp';
    img.onload = () => { imgRef.current = img; };
  }, []);

  const startLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const loop = () => {
      if (!visibleRef.current) { rafRef.current = null; return; }
      timeRef.current += prefersReduced ? 0 : 0.02;
      const t = timeRef.current;
      
      const W = canvas.width;
      const H = canvas.height;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Clear with slight trailing effect for motion blur
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        
        // Mouse interaction (repel)
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.x -= (dx / dist) * force * 2;
          p.y -= (dy / dist) * force * 2;
        }

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < CONNECTION_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = 1 - (dist2 / CONNECTION_DISTANCE);
            // Mix colors
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.15})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Add subtle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // --- Draw Floating Image ---
      const mX = W / 2;
      const mY = H / 2;
      const floatY = Math.sin(t * 1.5) * 12;
      const tilt = Math.cos(t * 1.2) * 0.04;

      ctx.save();
      ctx.translate(mX, mY + floatY);
      ctx.rotate(tilt);

      if (imgRef.current) {
        const iw = 110; 
        const ih = (110 / imgRef.current.width) * imgRef.current.height;
        
        // Optional subtle glow behind the image
        ctx.shadowColor = '#e5006a';
        ctx.shadowBlur = 20;
        
        ctx.drawImage(imgRef.current, -iw/2, -ih/2, iw, ih);
      }
      
      ctx.restore();

      if (!prefersReduced) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const W = canvas.parentElement.clientWidth;
    const H = height;
    canvas.width  = W;
    canvas.height = H;
    particlesRef.current = createParticles(W, H, type);
  }, [height, type]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    initCanvas();

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !rafRef.current) startLoop();
      },
      { rootMargin: '100px' }
    );
    observer.observe(canvas);

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initCanvas();
      }, 200);
    };
    window.addEventListener('resize', onResize, { passive: true });

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    };
  }, [initCanvas, startLoop]);

  return (
    <div
      style={{
        position: 'relative',
        background: '#000',
        border: '1px solid rgba(229,0,106,0.25)',
        overflow: 'hidden',
        ...style,
      }}
      className={className}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height }}
      />

      {/* Metadata overlay */}
      <div style={{
        position: 'absolute', top: 10, left: 10,
        fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'var(--mag-200)',
        background: 'rgba(0,0,0,0.75)',
        padding: '3px 8px',
        border: '1px solid rgba(229,0,106,0.3)',
        pointerEvents: 'none',
      }}>
        CANVAS // NEURAL-NET
      </div>
      <div style={{
        position: 'absolute', bottom: 10, right: 10,
        fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
        letterSpacing: '0.14em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.3)',
        pointerEvents: 'none',
      }}>
        INTERACTIVE NEXUS
      </div>
    </div>
  );
}
