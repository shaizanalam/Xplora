import React, { useRef, useState, useEffect } from 'react';

export default function IntroSplash({ onComplete }) {
  const videoRef = useRef(null);
  const [fading, setFading] = useState(false);
  const [muted, setMuted] = useState(false);

  const handleFinish = () => {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      onComplete();
    }, 700);
  };

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {
        // If browser blocks unmuted autoplay, fallback to muted so video plays automatically
        if (videoRef.current) {
          videoRef.current.muted = true;
          setMuted(true);
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: fading ? 0 : 1,
      pointerEvents: fading ? 'none' : 'auto',
      transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
      userSelect: 'none', overflow: 'hidden',
    }}>
      {/* Full-screen intro video */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={muted}
        onEnded={handleFinish}
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          filter: 'brightness(0.95) contrast(1.1)',
        }}
      >
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      {/* CRT scanlines & overlays */}
      <div className="crt-scanlines" style={{ opacity: 0.3 }} />
      <div className="crt-overlay" />
      <div className="noise-overlay" />

      {/* Top brand indicator */}
      <div style={{
        position: 'absolute', top: '2rem', left: 'var(--pad-x)',
        display: 'flex', alignItems: 'center', gap: 10,
        pointerEvents: 'none',
      }}>
        <span className="live-dot" />
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 900,
          fontSize: '0.9rem', letterSpacing: '0.2em', color: '#fff',
          textTransform: 'uppercase',
        }}>
          XPLORA<span style={{ color: 'var(--mag-200)' }}>//</span>INTRO PROTOCOL
        </span>
      </div>

      {/* Controls: Mute toggle & Enter button */}
      <div style={{
        position: 'absolute', bottom: '2rem', right: 'var(--pad-x)', left: 'var(--pad-x)',
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10,
        flexWrap: 'wrap', zIndex: 10000,
      }}>
        <button
          onClick={toggleSound}
          className="btn btn-ghost"
          style={{
            padding: '0.65rem 1.2rem', fontSize: '0.62rem',
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
            borderColor: 'rgba(255,255,255,0.15)',
          }}
        >
          {muted ? '🔊 UNMUTE' : '🔇 MUTE'}
        </button>

        <button
          onClick={handleFinish}
          className="btn btn-solid"
          style={{
            padding: '0.75rem 1.8rem', fontSize: '0.68rem',
            boxShadow: 'var(--glow-md)',
          }}
        >
          ENTER XPLORA ↗
        </button>
      </div>

      {/* Bottom status line */}
      <div style={{
        position: 'absolute', bottom: '2.5rem', left: 'var(--pad-x)',
        fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.35)', pointerEvents: 'none',
      }}>
        INITIALIZING SYSTEM MATRIX...
      </div>
    </div>
  );
}
