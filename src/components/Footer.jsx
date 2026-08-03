import React from 'react';
import { playPhosphorClick } from '../utils/audioSystem';

export default function Footer() {
  const links = [
    { label: 'ABOUT',      href: '#manifesto' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'SYSTEM',     href: '#system'    },
    { label: 'TECH',       href: '#tech'      },
  ];

  const specs = ['COLOR :: MAGENTA MONOCHROME', 'MATRIX :: 12,480,000 DOTS', 'RATE :: 240HZ SCAN'];
  const network = ['STATUS :: ONLINE', 'SECTOR :: 07', 'LATENCY :: 0.04ms'];

  return (
    <footer
      id="footer"
      aria-label="Site footer"
      style={{
        position: 'relative', width: '100%', background: '#000', overflow: 'hidden',
        borderTop: '1px solid rgba(229,0,106,0.18)',
      }}
    >
      <div className="dot-matrix-bg" style={{ position: 'absolute', inset: 0, opacity: 0.12, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1600, margin: '0 auto', padding: '0 var(--pad-x)' }}>

        {/* ── Final statement ── */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between',
          gap: '2.5rem',
          padding: 'clamp(4rem, 9vw, 7rem) 0 clamp(3rem, 6vw, 5rem)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-400)', marginBottom: '1.5rem' }}>
              TRANSMISSION TERMINAL&nbsp;//&nbsp;END OF SIGNAL
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 8.5vw, 9rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.022em',
              textTransform: 'uppercase',
              color: '#fff',
            }}>
              ENTER<br />
              <span className="glow-text-lg" style={{ color: 'var(--mag-200)' }}>THE SIGNAL.</span>
            </h2>
          </div>
          <a
            href="#system"
            className="btn btn-solid"
            style={{ padding: '1.1rem 2.75rem', alignSelf: 'flex-end' }}
            onClick={() => playPhosphorClick(950)}
          >
            INITIALIZE SYSTEM ↗
          </a>
        </div>

        {/* ── Navigation grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '3rem',
          padding: 'clamp(3rem, 6vw, 4.5rem) 0',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}>
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="live-dot" />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '0.2em', color: 'var(--mag-200)', textTransform: 'uppercase' }}
                    className="glow-text">
                PHOSPHOR
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.38)', maxWidth: 220 }}>
              A premium editorial gaming experience transmitted through a futuristic magenta
              phosphor CRT display.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--mag-500)', marginBottom: '1.25rem' }}>// INDEX</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {links.map((l, i) => (
                <a key={i} href={l.href}
                   onClick={() => playPhosphorClick(480 + i * 40)}
                   style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.48)', textDecoration: 'none', transition: 'color 0.2s' }}
                   onMouseEnter={e => e.target.style.color = 'var(--mag-200)'}
                   onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.48)'}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Specs */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--mag-500)', marginBottom: '1.25rem' }}>// SPECIFICATION</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {specs.map((s, i) => (
                <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)' }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Network */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--mag-500)', marginBottom: '1.25rem' }}>// NETWORK</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {network.map((n, i) => (
                <span key={i} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em',
                  color: i === 0 ? 'var(--mag-200)' : 'rgba(255,255,255,0.4)',
                  ...(i === 0 ? { textShadow: '0 0 8px rgba(229,0,106,0.5)' } : {}),
                }}>{n}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8,
          padding: '1.5rem 0',
          fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.18)',
        }}>
          <span>SYSTEM // 001</span>
          <span>© 2026 PHOSPHOR DIGITAL EXPERIENCE</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </footer>
  );
}
