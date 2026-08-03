import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { toggleAudio, playPhosphorClick } from '../utils/audioSystem';

const NAV = [
  { label: 'ABOUT',      href: '#manifesto' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'SYSTEM',     href: '#system'    },
  { label: 'TECH',       href: '#tech'      },
  { label: 'CONTACT',    href: '#footer'    },
];

export default function Header() {
  const [scrolled,    setScrolled]    = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          padding: scrolled ? '0.85rem 0' : '1.4rem 0',
          backgroundColor: scrolled ? 'rgba(0,0,0,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(229,0,106,0.12)' : '1px solid rgba(255,255,255,0.04)',
          transition: 'padding 0.4s ease, background-color 0.4s ease, border-color 0.4s ease',
        }}
      >
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 var(--pad-x)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}>

          {/* ── Brand ── */}
          <a
            href="#"
            aria-label="Phosphor home"
            onClick={() => playPhosphorClick(700)}
            style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}
          >
            <span className="live-dot" />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: '1.05rem',
              letterSpacing: '0.22em',
              color: '#fff',
              textTransform: 'uppercase',
            }}>
              PHOSPHOR
            </span>
          </a>

          {/* ── Navigation (desktop ≥ 1024px) ── */}
          <nav
            aria-label="Main navigation"
            style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}
            className="desktop-nav"
          >
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link"
                onClick={() => playPhosphorClick(460 + i * 60)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.64rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.55)',
                  textDecoration: 'none',
                  transition: 'color 0.22s',
                  paddingBottom: 2,
                }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* ── Right controls ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            {/* Audio toggle */}
            <button
              onClick={() => { const n = toggleAudio(); setAudioActive(n); }}
              aria-label="Toggle audio"
              className="btn btn-ghost"
              style={{ padding: '0.45rem 0.9rem', gap: 8, fontSize: '0.62rem' }}
            >
              {audioActive
                ? <Volume2  style={{ width: 13, height: 13, color: 'var(--mag-200)' }} />
                : <VolumeX  style={{ width: 13, height: 13, opacity: 0.4 }} />
              }
              <span style={{ display: 'none' }} className="sound-label">
                {audioActive ? 'SOUND ON' : 'SOUND OFF'}
              </span>
            </button>

            {/* Enter CTA */}
            <a
              href="#experience"
              className="btn btn-solid"
              style={{ padding: '0.55rem 1.4rem', fontSize: '0.64rem' }}
              onClick={() => playPhosphorClick(900)}
            >
              ENTER&nbsp;↗
            </a>

            {/* Hamburger */}
            <button
              className="hamburger-btn"
              onClick={() => { playPhosphorClick(600); setMenuOpen(v => !v); }}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              style={{ padding: '0.4rem', color: 'rgba(255,255,255,0.7)', background: 'none', border: 'none', cursor: 'none' }}
            >
              {menuOpen
                ? <X     style={{ width: 20, height: 20, color: 'var(--mag-200)' }} />
                : <Menu  style={{ width: 20, height: 20 }} />
              }
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Overlay ── */}
      <div
        aria-hidden={!menuOpen}
        style={{
          position: 'fixed', inset: 0, zIndex: 40,
          background: 'rgba(0,0,0,0.96)',
          backdropFilter: 'blur(24px)',
          display: 'flex', flexDirection: 'column',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem var(--pad-x)', gap: 0 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.22em', color: 'var(--mag-500)', textTransform: 'uppercase', marginBottom: '2.5rem' }}>
            NAVIGATION MATRIX // SECTOR 01
          </p>
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => { playPhosphorClick(500 + i * 80); setMenuOpen(false); }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(2rem, 8vw, 4rem)',
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
                color: '#fff',
                textDecoration: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--mag-200)'}
              onMouseLeave={e => e.currentTarget.style.color = '#fff'}
            >
              {item.label}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--mag-400)' }}>0{i+1}&nbsp;→</span>
            </a>
          ))}
          <a
            href="#experience"
            className="btn btn-solid"
            style={{ marginTop: '2.5rem', padding: '1rem 2.5rem', justifyContent: 'center' }}
            onClick={() => { playPhosphorClick(900); setMenuOpen(false); }}
          >
            ENTER EXPERIENCE ↗
          </a>
        </div>

        <div style={{
          padding: '1.5rem var(--pad-x)',
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.18em',
          color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <span>PHOSPHOR // XPLORA</span>
          <span>SIGNAL ACTIVE</span>
        </div>
      </div>

      {/* Responsive nav visibility via style tag */}
      <style>{`
        .desktop-nav { display: none; }
        .hamburger-btn { display: flex; }
        .sound-label { display: none !important; }
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .hamburger-btn { display: none !important; }
          .sound-label { display: inline !important; }
        }
      `}</style>
    </>
  );
}
