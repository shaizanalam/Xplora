import React, { useRef, useEffect, useState, useCallback } from 'react';
import { playPhosphorClick } from '../utils/audioSystem';

/*
  PERFORMANCE FIXES:
  1. IntersectionObserver — only runs RAF when section is on screen
  2. Removed shadowBlur entirely
  3. Dot positions pre-allocated as typed array
  4. Default dot gap increased to 20px for off-cursor areas (fewer particles)
  5. No state updates inside RAF — only ref reads
  6. Debounced resize
*/

export default function InteractiveSection() {
  const canvasRef  = useRef(null);
  const mousePos   = useRef({ x: -2000, y: -2000 });
  const visibleRef = useRef(false);
  const rafRef     = useRef(null);
  const timeRef    = useRef(0);
  const dotsRef    = useRef(null);

  // Controls kept in state — only read via ref in RAF
  const [gap,   setGap]   = useState(20);
  const [speed, setSpeed] = useState(1);
  const gapRef   = useRef(20);
  const speedRef = useRef(1);

  const buildDots = (W, H, g) => {
    const cols = Math.floor(W / g);
    const rows = Math.floor(H / g);
    const buf  = new Float32Array(cols * rows * 2);
    let i = 0;
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) {
        buf[i++] = c * g + g * 0.5;
        buf[i++] = r * g + g * 0.5;
      }
    dotsRef.current = { buf, count: cols * rows };
  };

  const startLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });

    const loop = () => {
      if (!visibleRef.current) { rafRef.current = null; return; }
      timeRef.current += 0.016 * speedRef.current;
      const t   = timeRef.current;
      const W   = canvas.width;
      const H   = canvas.height;
      const mx  = mousePos.current.x;
      const my  = mousePos.current.y;
      const { buf, count } = dotsRef.current || { buf: null, count: 0 };
      if (!buf) { rafRef.current = requestAnimationFrame(loop); return; }

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);

      const maxR = 170;

      for (let i = 0; i < count; i++) {
        const x = buf[i * 2];
        const y = buf[i * 2 + 1];

        const dx   = x - mx;
        const dy   = y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Cursor illumination
        let intensity = dist < maxR ? 0.9 * (1 - dist / maxR) : 0;

        // Wave scan
        const wave = Math.sin(y * 0.04 - t * 3);
        if (wave > 0.68) intensity = Math.max(intensity, 0.3 + wave * 0.38);

        // Background base
        intensity = Math.min(1, intensity + 0.05);

        if (intensity < 0.06) continue;

        const radius = Math.max(0.7, Math.min(4, intensity * 4));

        // Soft outer glow (cheap, no shadowBlur)
        if (intensity > 0.5) {
          ctx.beginPath();
          ctx.arc(x, y, radius * 2.5, 0, 6.2832);
          ctx.fillStyle = `rgba(229,0,106,${(intensity - 0.5) * 0.16})`;
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 6.2832);
        if (intensity > 0.6) {
          ctx.fillStyle = `rgba(255,38,136,${Math.min(1, intensity)})`;
        } else if (intensity > 0.25) {
          ctx.fillStyle = `rgba(229,0,106,${intensity * 0.82})`;
        } else {
          ctx.fillStyle = `rgba(160,0,60,${intensity * 0.6})`;
        }
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
  }, []);

  // Init / resize canvas
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const W = canvas.parentElement.clientWidth;
    const H = 420;
    canvas.width  = W;
    canvas.height = H;
    buildDots(W, H, gapRef.current);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    initCanvas();

    // Intersection observer — stop RAF when off-screen
    const obs = new IntersectionObserver(
      ([e]) => {
        visibleRef.current = e.isIntersecting;
        if (e.isIntersecting && !rafRef.current) startLoop();
      },
      { rootMargin: '80px' }
    );
    obs.observe(canvas);

    // Mouse tracking
    const onMove  = (e) => {
      const r = canvas.getBoundingClientRect();
      mousePos.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mousePos.current = { x: -2000, y: -2000 }; };
    canvas.addEventListener('mousemove', onMove,  { passive: true });
    canvas.addEventListener('mouseleave', onLeave);

    // Debounced resize
    let rt;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(initCanvas, 250); };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      obs.disconnect();
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    };
  }, [initCanvas, startLoop]);

  // Rebuild dots when gap changes
  useEffect(() => {
    gapRef.current = gap;
    const canvas = canvasRef.current;
    if (canvas) buildDots(canvas.width, canvas.height, gap);
  }, [gap]);

  useEffect(() => { speedRef.current = speed; }, [speed]);

  return (
    <section
      id="interactive"
      aria-label="Interactive phosphor matrix"
      style={{ position: 'relative', width: '100%', background: '#000', padding: 'var(--space-section) 0' }}
    >
      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 var(--pad-x)' }}>

        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem', alignItems: 'end', marginBottom: '3.5rem' }}>
          <div style={{ gridColumn: 'span 7' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-400)', marginBottom: '1.2rem' }}>
              INTERACTIVE SYNAPSE MATRIX&nbsp;//&nbsp;007
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(2.2rem, 6vw, 6.5rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#fff',
            }}>
              CURSOR-REACTIVE<br />
              <span className="glow-text" style={{ color: 'var(--mag-200)' }}>PHOSPHOR MATRIX.</span>
            </h2>
          </div>
          <p style={{
            gridColumn: 'span 5',
            fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.68rem, 1vw, 0.8rem)', lineHeight: 1.8, color: 'rgba(255,255,255,0.45)',
            borderLeft: '1px solid rgba(229,0,106,0.22)', paddingLeft: '1.5rem',
          }}>
            Move your cursor across the canvas below to illuminate the magenta phosphor emitter lattice in real time.
          </p>
        </div>

        {/* Canvas container */}
        <div style={{ border: '1px solid rgba(229,0,106,0.25)', background: '#000' }}>
          {/* Controls */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16,
            padding: '0.85rem 1.25rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.45)' }}>
                <span style={{ color: 'var(--mag-400)' }}>DOT GAP</span>
                <input type="range" min="14" max="32" value={gap}
                  style={{ accentColor: 'var(--mag-200)', width: 100, cursor: 'none' }}
                  onChange={e => { setGap(+e.target.value); playPhosphorClick(400); }}
                />
                <span style={{ color: 'rgba(255,255,255,0.6)', minWidth: 30 }}>{gap}px</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.45)' }}>
                <span style={{ color: 'var(--mag-400)' }}>SCAN</span>
                <input type="range" min="0.5" max="3" step="0.5" value={speed}
                  style={{ accentColor: 'var(--mag-200)', width: 100, cursor: 'none' }}
                  onChange={e => { setSpeed(+e.target.value); playPhosphorClick(500); }}
                />
                <span style={{ color: 'rgba(255,255,255,0.6)', minWidth: 24 }}>{speed}×</span>
              </label>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--mag-400)' }}>
              <span className="live-dot" style={{ width: 5, height: 5 }} />
              INTERACTIVE STATUS :: ONLINE
            </div>
          </div>

          {/* Canvas */}
          <div style={{ position: 'relative', height: 420, background: '#000' }}>
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', cursor: 'crosshair' }} />
            <div style={{
              position: 'absolute', bottom: 12, left: 12,
              fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.28)',
              background: 'rgba(0,0,0,0.65)', padding: '3px 10px',
              border: '1px solid rgba(255,255,255,0.07)',
              pointerEvents: 'none',
            }}>
              HOVER TO ILLUMINATE
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
