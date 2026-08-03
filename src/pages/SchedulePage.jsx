import React from 'react';
import PhosphorImageCanvas from '../components/PhosphorImageCanvas';

export default function SchedulePage() {
  return (
    <div style={{ width: '100%', background: '#000', minHeight: '100vh', paddingTop: '6rem', position: 'relative', overflow: 'hidden' }}>
      <div className="dot-matrix-bg" style={{ position: 'absolute', inset: 0, opacity: 0.12, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: '0 0 50% 0', background: 'radial-gradient(circle at 50% 0%, rgba(229,0,106,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1000, margin: '0 auto', padding: '0 var(--pad-x)' }}>
        <div style={{ paddingTop: '3rem', paddingBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '3rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16, marginBottom: '2rem' }}>
            <span style={{ width: 6, height: 6, background: 'var(--mag-200)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-400)' }}>
              EVENT ITINERARY&nbsp;//&nbsp;XPLORA 6.0
            </span>
            <span style={{ width: 6, height: 6, background: 'var(--mag-200)' }} />
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: 'clamp(3rem, 8vw, 7.5rem)', lineHeight: 0.87, letterSpacing: '-0.025em',
            textTransform: 'uppercase', color: '#fff',
          }}>
            THE<br />
            <span className="glow-text-lg" style={{ color: 'var(--mag-200)' }}>SCHEDULE.</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '1.5rem auto 0' }}>
            Two days of innovation, competition, and discovery. Full schedule details will be released soon.
          </p>
        </div>

        <div className="panel" style={{ padding: 'clamp(2rem,5vw,4rem)', textAlign: 'center', marginBottom: '8rem' }}>
          <PhosphorImageCanvas type="grid" height={150} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--mag-200)', marginTop: '2rem', textTransform: 'uppercase' }}>
            COMING SOON
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', marginTop: '1rem' }}>
            The official timeline is being finalized. Please check back later.
          </p>
        </div>
      </div>
    </div>
  );
}
