import React from 'react';
import PhosphorImageCanvas from '../components/PhosphorImageCanvas';

export default function TermsPage() {
  return (
    <div style={{ width: '100%', background: '#000', minHeight: '100vh', paddingTop: '6rem', position: 'relative', overflow: 'hidden' }}>
      <div className="dot-matrix-bg" style={{ position: 'absolute', inset: 0, opacity: 0.12, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1000, margin: '0 auto', padding: '0 var(--pad-x)' }}>
        <div style={{ paddingTop: '3rem', paddingBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '3rem' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.87, letterSpacing: '-0.025em',
            textTransform: 'uppercase', color: '#fff',
          }}>
            TERMS &<br />
            <span className="glow-text-lg" style={{ color: 'var(--mag-200)' }}>CONDITIONS.</span>
          </h1>
        </div>

        <div className="panel" style={{ padding: 'clamp(2rem,5vw,4rem)', marginBottom: '8rem' }}>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
            By registering for and attending Xplora Techfest, you agree to abide by the rules and guidelines set forth by the organizing committee and Krishna Public School.
            <br /><br />
            All attendees are expected to maintain professional conduct. The organizers reserve the right to revoke passes for any violations of the event code of conduct.
          </p>
        </div>
      </div>
    </div>
  );
}
