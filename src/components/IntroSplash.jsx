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
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onComplete();
      return;
    }

    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setMuted(true);
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, [onComplete]);

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

      {/* Skip control button */}
      <div style={{
        position: 'absolute', bottom: '2rem', right: 'var(--pad-x)',
        zIndex: 10000,
      }}>
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
    </div>
  );
}
