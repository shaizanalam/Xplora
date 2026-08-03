import React from 'react';
import PhosphorImageCanvas from '../components/PhosphorImageCanvas';

export default function PrivacyPage() {
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
            PRIVACY<br />
            <span className="glow-text-lg" style={{ color: 'var(--mag-200)' }}>POLICY.</span>
          </h1>
        </div>

        <div className="panel" style={{ padding: 'clamp(2rem,5vw,4rem)', marginBottom: '8rem' }}>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
            At Xplora Techfest, we are committed to protecting your privacy and ensuring the security of your personal data. 
            Information collected through our registration and contact forms is used solely for the purpose of organizing and managing the event.
            <br /><br />
            We do not share, sell, or distribute your personal information to third parties. If you have any questions or concerns regarding our privacy practices, please contact us at info@xplorakps.tech.
          </p>
        </div>
      </div>
    </div>
  );
}
