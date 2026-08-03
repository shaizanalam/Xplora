import React, { useRef, useState, useEffect } from 'react';

export default function IntroSplash({ onComplete }) {
  const videoRef = useRef(null);
  const [fading, setFading] = useState(false);
  const [muted, setMuted] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' && window.matchMedia('(max-width: 767px), (orientation: portrait)').matches;
  });

  const handleFinish = () => {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      onComplete();
    }, 700);
  };

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px), (orientation: portrait)');
    const onChange = (e) => setIsMobile(e.matches);
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
    };
  }, []);

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
  }, [onComplete, isMobile]);

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
      {/* Full-screen intro video: landscape for PC, portrait for Mobile */}
      <video
        key={isMobile ? 'mobile-video' : 'desktop-video'}
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
        {isMobile ? (
          <>
            <source src="/intro-mobile.mp4" type="video/mp4" />
            <source src="/intro_mobile.mp4" type="video/mp4" />
            <source src="/mobile-intro.mp4" type="video/mp4" />
            <source src="/intro.mp4" type="video/mp4" />
          </>
        ) : (
          <source src="/intro.mp4" type="video/mp4" />
        )}
      </video>

      {/* CRT scanlines & overlays */}
      <div className="crt-scanlines" style={{ opacity: 0.3 }} />
      <div className="crt-overlay" />
      <div className="noise-overlay" />

      {/* Skip control button */}
      <div style={{
        position: 'absolute', bottom: '6rem', right: 'var(--pad-x)',
        zIndex: 10000,
        background: '#000', /* Solid black wrapper to hide the logo behind it */
        display: 'inline-block'
      }}>
        <button
          onClick={handleFinish}
          className="btn btn-solid"
          style={{
            padding: '1.2rem 2.5rem', fontSize: '0.8rem',
            boxShadow: 'var(--glow-md)',
          }}
        >
          ENTER XPLORA ↗
        </button>
      </div>
    </div>
  );
}
