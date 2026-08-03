import React, { useRef, useEffect } from 'react';
import { playPhosphorClick } from '../utils/audioSystem';

/*
  PERFORMANCE FIX: Experience section video is NOT autoplay.
  It uses IntersectionObserver to start playing only when
  the section scrolls into view. This stops wasted GPU decode
  on the hidden section while Hero video is playing.
*/

export default function Experience() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="experience"
      aria-label="Full-screen experience"
      style={{
        position: 'relative', width: '100%',
        minHeight: '100vh', background: '#000', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Video — paused until in view */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video
          ref={videoRef}
          loop muted playsInline
          preload="metadata"
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: 'brightness(1.08) contrast(1.15)',
          }}
        >
          <source src="/download-1.mp4"    type="video/mp4" />
          <source src="/bg.mp4" type="video/mp4" />
        </video>

        <div className="crt-overlay" />
        <div className="screen-vignette" />
        <div className="scanline-beam" />
        <div className="noise-overlay" />

        {/* Gradient overlay for text legibility */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', gap: '2.5rem',
        padding: '2rem var(--pad-x)',
        maxWidth: 1100,
      }}>
        <div className="tag-badge" style={{ background: 'rgba(0,0,0,0.6)' }}>
          <span className="live-dot" style={{ width: 5, height: 5 }} />
          IMMERSIVE TRANSMISSION&nbsp;//&nbsp;SECTOR 06
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 'clamp(3rem, 10vw, 11rem)',
          lineHeight: 0.88,
          letterSpacing: '-0.025em',
          textTransform: 'uppercase',
          color: '#fff',
          textShadow: '0 0 120px rgba(0,0,0,0.95)',
        }}>
          SEE<br />
          <span className="glow-text-lg" style={{ color: 'var(--mag-200)' }}>THE SIGNAL.</span>
        </h2>

        <p style={{
          maxWidth: 520,
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.7rem, 1.1vw, 0.82rem)',
          lineHeight: 1.85,
          color: 'rgba(255,255,255,0.7)',
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(6px)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          padding: '1.2rem 2rem',
        }}>
          Immerse yourself completely in the monochrome magenta matrix. Zero-latency optical
          gaming transmitted straight from low-orbit space.
        </p>

        <a
          href="#interactive"
          className="btn btn-solid"
          style={{ padding: '1rem 2.75rem' }}
          onClick={() => playPhosphorClick(900)}
        >
          INTERACT WITH MATRIX →
        </a>
      </div>

      {/* Bottom meta */}
      <div style={{
        position: 'absolute', bottom: 28, left: 0, right: 0, zIndex: 10,
        display: 'flex', justifyContent: 'space-between',
        padding: '0 var(--pad-x)',
        fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.25)',
      }}>
        <span>TRANSMISSION RATE :: 240.0 FPS</span>
        <span style={{ color: 'var(--mag-400)' }}>PHOSPHOR ENGINE :: ACTIVE</span>
      </div>
    </section>
  );
}
