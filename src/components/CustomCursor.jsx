import React, { useRef, useEffect } from 'react';

/*
  PERFORMANCE: Zero React state updates on mouse move.
  All cursor positioning is done via direct DOM style manipulation
  inside RAF. React state only used for hover/click (infrequent).
  Outer ring lerps smoothly behind the cursor.
*/

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const posRef  = useRef({ mx: -100, my: -100, rx: -100, ry: -100 });
  const stateRef = useRef({ hover: false, click: false, visible: false });
  const rafRef   = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const lerp = (a, b, n) => a + (b - a) * n;

    const tick = () => {
      const { mx, my } = posRef.current;
      let { rx, ry }   = posRef.current;
      const { hover, click } = stateRef.current;

      rx = lerp(rx, mx, 0.11);
      ry = lerp(ry, my, 0.11);
      posRef.current.rx = rx;
      posRef.current.ry = ry;

      // Dot — instant snap
      dot.style.transform  = `translate(${mx - 3}px, ${my - 3}px) scale(${click ? 0.5 : 1})`;

      // Ring — lagged follow
      const rSize = hover ? 36 : 20;
      ring.style.transform = `translate(${rx - rSize / 2}px, ${ry - rSize / 2}px)`;
      ring.style.width     = `${rSize}px`;
      ring.style.height    = `${rSize}px`;
      ring.style.borderColor  = hover ? 'rgba(229,0,106,0.75)' : 'rgba(229,0,106,0.28)';
      ring.style.backgroundColor = hover ? 'rgba(229,0,106,0.06)' : 'transparent';
      ring.style.boxShadow = hover ? '0 0 12px rgba(229,0,106,0.4)' : 'none';

      rafRef.current = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      posRef.current.mx = e.clientX;
      posRef.current.my = e.clientY;
      if (!stateRef.current.visible) {
        stateRef.current.visible = true;
        dot.style.opacity  = '1';
        ring.style.opacity = '1';
      }
    };

    const onLeave  = () => { dot.style.opacity = '0'; ring.style.opacity = '0'; stateRef.current.visible = false; };
    const onEnter  = () => { dot.style.opacity = '1'; ring.style.opacity = '1'; stateRef.current.visible = true;  };
    const onDown   = () => { stateRef.current.click = true;  };
    const onUp     = () => { stateRef.current.click = false; };

    const onOver = (e) => {
      const t = e.target;
      stateRef.current.hover =
        t.tagName === 'A' ||
        t.tagName === 'BUTTON' ||
        t.tagName === 'INPUT' ||
        t.closest('a') ||
        t.closest('button') ||
        t.style?.cursor === 'pointer' ||
        getComputedStyle(t).cursor === 'pointer';
    };

    window.addEventListener('mousemove',  onMove,  { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    window.addEventListener('mousedown',  onDown);
    window.addEventListener('mouseup',    onUp);
    window.addEventListener('mouseover',  onOver, { passive: true });

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('mousedown',  onDown);
      window.removeEventListener('mouseup',    onUp);
      window.removeEventListener('mouseover',  onOver);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none', overflow: 'hidden' }}
    >
      {/* Inner phosphor point */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 6, height: 6,
          borderRadius: '50%',
          background: 'var(--mag-200)',
          boxShadow: '0 0 8px var(--mag-200)',
          opacity: 0,
          transition: 'transform 0ms, opacity 0.2s, scale 0.1s',
          willChange: 'transform',
          pointerEvents: 'none',
        }}
      />

      {/* Outer trailing ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 20, height: 20,
          borderRadius: '50%',
          border: '1px solid rgba(229,0,106,0.28)',
          opacity: 0,
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.25s, background-color 0.25s, box-shadow 0.25s, opacity 0.2s',
          willChange: 'transform, width, height',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
