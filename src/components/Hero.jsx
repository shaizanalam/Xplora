import React, { useRef, useEffect } from 'react';
import { playPhosphorClick } from '../utils/audioSystem';
import { Activity, Radio, Cpu, Shield } from 'lucide-react';

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.playbackRate = 0.85;
  }, []);

  return (
    <section
      aria-label="Hero — Play Beyond The Screen"
      style={{ position: 'relative', width: '100%', height: '100vh', minHeight: 640, background: '#000', overflow: 'hidden' }}
    >
      {/* ── Background video + atmospheric layers ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video
          ref={videoRef}
          autoPlay loop muted playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(1.05) contrast(1.1)' }}
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>

        {/* CRT texture layers */}
        <div className="crt-scanlines" style={{ opacity: 0.5 }} />
        <div className="crt-overlay" />
        <div className="screen-vignette" />
        <div className="scanline-beam" />
        <div className="noise-overlay" />

        {/* Bottom gradient fade to black — important for text legibility */}
        <div style={{
          position: 'absolute', inset: '30% 0 0 0',
          background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 45%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        {/* Top fade */}
        <div style={{
          position: 'absolute', inset: '0 0 80% 0',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        {/* Left fade — text area */}
        <div style={{
          position: 'absolute', inset: '0 50% 0 0',
          background: 'linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Main content ── */}
      <div style={{
        position: 'relative', zIndex: 10, height: '100%',
        display: 'flex', flexDirection: 'column',
        padding: '0 var(--pad-x)',
      }}>

        {/* Top annotation bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: '7rem', paddingBottom: '1.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          flexWrap: 'wrap', gap: '0.75rem',
        }}
          className="fade-up-1"
        >
          {/* System tag */}
          <div className="tag-badge" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <span className="live-dot" style={{ width: 5, height: 5 }} />
            <span>PHOSPHOR SYSTEM&nbsp;<span style={{ color: 'rgba(255,255,255,0.3)' }}>//&nbsp;001</span></span>
          </div>

          {/* Annotations — hidden on small */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hero-annotations">
            {[
              { Icon: Activity, k: 'SIGNAL',  v: '98.4%'  },
              { Icon: Radio,    k: 'SECTOR',  v: '07'     },
              { Icon: Cpu,      k: 'ENGINE',  v: 'ACTIVE' },
            ].map(({ Icon, k, v }) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.45)' }}>
                <Icon style={{ width: 11, height: 11, color: 'var(--mag-400)', flexShrink: 0 }} />
                <span style={{ color: 'var(--mag-400)' }}>{k}</span>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Online status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em' }} className="hero-online">
            <Shield style={{ width: 11, height: 11, color: 'var(--mag-200)' }} />
            <span className="glow-text" style={{ color: 'var(--mag-200)' }}>ONLINE</span>
          </div>
        </div>

        {/* ── Headline block ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '1rem', paddingBottom: '2rem' }}>

          {/* Transmission label */}
          <p
            className="fade-up-1"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.24em',
              textTransform: 'uppercase', color: 'var(--mag-400)',
              marginBottom: '1.5rem',
            }}
          >
            TRANSMISSION PROTOCOL&nbsp;// OPTICAL DOT-MATRIX
          </p>

          {/* === Main headline === */}
          {/*
              Key typographic decisions:
              - "PLAY" = pure white, maximum weight
              - "BEYOND" = outlined stroke text, readable ghost
              - "THE SCREEN." = magenta phosphor, glow
              - Max size capped at 10rem so video shows on desktop
          */}
          <h1
            className="fade-up-2"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(3.2rem, 9.5vw, 10rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.025em',
              textTransform: 'uppercase',
              marginBottom: '2rem',
            }}
          >
            {/* Line 1: PLAY — solid white */}
            <span style={{ display: 'block', color: '#ffffff', textShadow: '0 4px 30px rgba(0,0,0,0.7)' }}>
              PLAY
            </span>

            {/* Line 2: BEYOND — clear outline, visible contrast */}
            <span style={{
              display: 'block',
              color: 'transparent',
              WebkitTextStroke: '1.5px rgba(255,255,255,0.55)',
              textShadow: 'none',
            }}>
              BEYOND
            </span>

            {/* Line 3: THE SCREEN. — magenta phosphor */}
            <span
              className="glow-text-lg"
              style={{ display: 'block', color: 'var(--mag-200)' }}
            >
              THE SCREEN.
            </span>
          </h1>

          {/* Subtext */}
          <p
            className="fade-up-3"
            style={{
              maxWidth: 420,
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.7rem, 1.1vw, 0.82rem)',
              lineHeight: 1.8,
              letterSpacing: '0.02em',
              color: 'rgba(255,255,255,0.6)',
              marginBottom: '2.5rem',
              paddingLeft: '1rem',
              borderLeft: '2px solid var(--mag-200)',
            }}
          >
            A next-generation gaming experience synthesized from millions of magenta
            phosphor particles. No boundaries. Pure optical immersion.
          </p>

          {/* CTAs */}
          <div className="fade-up-4" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <a href="#system"     className="btn btn-solid"   onClick={() => playPhosphorClick(800)}>EXPLORE SYSTEM →</a>
            <a href="#experience" className="btn btn-outline"  onClick={() => playPhosphorClick(600)}>ENTER EXPERIENCE ↗</a>
          </div>
        </div>

        {/* ── Bottom info strip ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: '1rem', paddingBottom: '2.5rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.28)',
          flexWrap: 'wrap', gap: 8,
        }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <span>PLAYER_001 // VERIFIED</span>
            <span className="hero-res">RES // 12,480,000 DOTS</span>
          </div>
          <a
            href="#manifesto"
            onClick={() => playPhosphorClick(400)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--mag-200)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
          >
            SCROLL FOR TRANSMISSION
            <span style={{ color: 'var(--mag-200)' }}>↓</span>
          </a>
        </div>
      </div>

      {/* Responsive helpers */}
      <style>{`
        .hero-annotations { display: none; }
        .hero-online      { display: none; }
        .hero-res         { display: none; }
        @media (min-width: 768px)  { .hero-annotations { display: flex; } .hero-res { display: inline; } }
        @media (min-width: 1024px) { .hero-online { display: flex; } }
      `}</style>
    </section>
  );
}
