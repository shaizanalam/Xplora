import React from 'react';

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      aria-labelledby="manifesto-heading"
      style={{ position: 'relative', width: '100%', background: '#000', padding: 'var(--space-section) 0', overflow: 'hidden' }}
    >
      <div className="dot-matrix-bg" style={{ position: 'absolute', inset: 0, opacity: 0.18, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1600, margin: '0 auto', padding: '0 var(--pad-x)' }}>

        {/* Label row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '4rem' }}>
          <span style={{ width: 6, height: 6, background: 'var(--mag-200)', boxShadow: '0 0 10px var(--mag-200)', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-400)' }}>
            MANIFESTO&nbsp;//&nbsp;002
          </span>
          <span className="accent-line" style={{ flex: 1, maxWidth: 80 }} />
        </div>

        {/* Primary statement */}
        <h2
          id="manifesto-heading"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(2.8rem, 8vw, 9rem)',
            lineHeight: 0.91,
            letterSpacing: '-0.022em',
            textTransform: 'uppercase',
            color: '#fff',
          }}
        >
          GAMES<br />
          <span className="glow-text" style={{ color: 'var(--mag-200)' }}>ARE NO LONGER</span><br />
          ON THE SCREEN.
        </h2>

        {/* Grid: continuation + body copy */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'clamp(2rem, 5vw, 4rem)',
          marginTop: 'clamp(3rem, 6vw, 5rem)',
          alignItems: 'end',
        }}>
          <div style={{ gridColumn: 'span 7' }}>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(2rem, 5.5vw, 6rem)',
                lineHeight: 0.94,
                letterSpacing: '-0.018em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.88)',
              }}
            >
              THEY ARE THE&nbsp;
              <span style={{ borderBottom: '2px solid var(--mag-200)', paddingBottom: '0.05em' }}>
                ENVIRONMENT.
              </span>
            </h3>
          </div>

          <div style={{
            gridColumn: 'span 5',
            borderLeft: '1px solid rgba(229,0,106,0.22)',
            paddingLeft: '1.75rem',
          }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.7rem, 1.1vw, 0.82rem)',
              lineHeight: 1.85,
              letterSpacing: '0.02em',
              color: 'rgba(255,255,255,0.52)',
              marginBottom: '1rem',
            }}>
              We construct digital realities using pure optical phosphor emission. Every
              controller movement, every pixel, every photon is calculated in real time.
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
              TRANSMISSION ID: 884-PHOSPHOR-CORE // REV 4.2
            </p>
          </div>
        </div>

        {/* Bottom strip */}
        <div style={{
          marginTop: 'clamp(4rem, 8vw, 7rem)',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8,
          fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.2)',
        }}>
          <span>02 / 06 — PERSPECTIVE SHIFT</span>
          <span style={{ display: 'none' }} className="manifesto-mid">OPTICAL EMISSION :: FREQUENCY 240HZ</span>
          <span>PHOSPHOR // 98%</span>
        </div>
      </div>

      <style>{`@media (min-width:768px){ .manifesto-mid { display: inline !important; } }`}</style>
    </section>
  );
}
