import React, { useEffect, useRef, useState } from 'react';
import { HashRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import IntroSplash from './components/IntroSplash';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import ContactPage from './pages/ContactPage';
import RegisterPage from './pages/RegisterPage';
import SchedulePage from './pages/SchedulePage';
import SpeakersPage from './pages/SpeakersPage';
import SponsorsPage from './pages/SponsorsPage';
import FAQPage from './pages/FAQPage';
import TeamPage from './pages/TeamPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

/* ─────────────────────────────
   SCROLL TO TOP ON ROUTE CHANGE
───────────────────────────── */
function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* ─────────────────────────────
   HEADER
───────────────────────────── */
const NAV = [
  { label: 'HOME', to: '/' },
  { label: 'EVENTS', to: '/events' },
  { label: 'CONTACT', to: '/contact' },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 55);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60,
        padding: scrolled ? '0.85rem 0' : '1.5rem 0',
        background: scrolled ? 'rgba(0,0,0,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(22px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(229,0,106,0.15)'
          : '1px solid rgba(255,255,255,0.04)',
        transition: 'all 0.45s cubic-bezier(0.16,1,0.3,1)',
        willChange: 'padding, background',
      }}>
        <div style={{
          maxWidth: 1600, margin: '0 auto',
          padding: '0 var(--pad-x)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32,
        }}>

          {/* ── Brand ── */}
          <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}>
            <span className="live-dot" />
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: '1rem', letterSpacing: '0.22em',
              textTransform: 'uppercase', color: '#fff',
              lineHeight: 1,
            }}>
              XPLORA<span style={{ color: 'var(--mag-200)' }}>.</span>KPS
            </span>
          </NavLink>

          {/* ── Nav (desktop) ── */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2.75rem' }} className="hdr-desktop-nav">
            {NAV.map(({ label, to }) => (
              <NavLink
                key={to} to={to}
                className="nav-link"
                style={({ isActive }) => ({
                  fontFamily: 'var(--font-mono)', fontSize: '0.63rem',
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: isActive ? 'var(--mag-200)' : 'rgba(255,255,255,0.85)',
                  transition: 'color 0.2s',
                  paddingBottom: 2,
                })}
              >{label}</NavLink>
            ))}
          </nav>

          {/* ── Right controls ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <NavLink to="/events" className="btn btn-outline hdr-cta" style={{ padding: '0.52rem 1.3rem', fontSize: '0.62rem' }}>
              EVENTS ↗
            </NavLink>
            <NavLink to="/register" className="btn btn-solid hdr-cta" style={{ padding: '0.52rem 1.3rem', fontSize: '0.62rem' }}>
              REGISTER →
            </NavLink>
            <button
              className="hdr-burger"
              onClick={() => setOpen(v => !v)}
              aria-label="Toggle navigation"
              style={{ background: 'none', border: 'none', cursor: 'none', padding: '0.4rem', lineHeight: 1 }}
            >
              {open
                ? <span style={{ fontSize: '1.25rem', color: 'var(--mag-200)' }}>✕</span>
                : <span style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)' }}>☰</span>
              }
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen drawer ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 50,
        background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(28px)',
        display: 'flex', flexDirection: 'column',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 0.4s ease',
      }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem var(--pad-x)' }}>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
            letterSpacing: '0.26em', textTransform: 'uppercase',
            color: 'var(--mag-500)', marginBottom: '3rem',
          }}>
            XPLORA TECHFEST&nbsp;//&nbsp;NAVIGATION MATRIX
          </p>

          {NAV.map(({ label, to }, i) => (
            <NavLink
              key={to} to={to}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-display)', fontWeight: 900,
                fontSize: 'clamp(2.2rem, 9vw, 5.5rem)',
                lineHeight: 0.92, letterSpacing: '-0.015em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--mag-200)' : '#fff',
                textDecoration: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                transition: 'color 0.2s',
              })}
            >
              {label}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--mag-400)' }}>
                0{i + 1}&nbsp;→
              </span>
            </NavLink>
          ))}

          <NavLink to="/register" className="btn btn-solid" style={{ marginTop: '3rem', padding: '1.1rem 2.5rem', justifyContent: 'center', alignSelf: 'flex-start' }} onClick={() => setOpen(false)}>
            REGISTER NOW ↗
          </NavLink>
        </div>

        <div style={{
          padding: '1.5rem var(--pad-x)',
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)', fontSize: '0.54rem',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.18)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <span>XPLORA&nbsp;//&nbsp;KPS</span>
          <span>NOV 13–14, 2026</span>
        </div>
      </div>

      <style>{`
        .hdr-desktop-nav { display: none !important; }
        .hdr-cta         { display: none !important; }
        .hdr-burger      { display: flex !important; }
        @media (min-width: 1024px) {
          .hdr-desktop-nav { display: flex !important; }
          .hdr-cta         { display: inline-flex !important; }
          .hdr-burger      { display: none !important; }
        }
      `}</style>
    </>
  );
}

/* ─────────────────────────────
   FOOTER
───────────────────────────── */
function Footer() {
  const FOOT_NAV = ['HOME', 'EVENTS', 'CONTACT'];
  const FOOT_TO = ['/', '/events', '/contact'];
  const FOOT_ABOUT = ['SCHEDULE', 'SPEAKERS', 'SPONSORS', 'TEAM', 'FAQ'];
  const FOOT_ABOUT_TO = ['/schedule', '/speakers', '/sponsors', '/team', '/faq'];
  const TOP_EVENTS = ['HACKATHON', 'CODE WARS', 'ROBO DANGAL', 'AI TALKS', 'GAMING', 'VR'];

  return (
    <footer style={{ position: 'relative', width: '100%', background: '#000', borderTop: '1px solid rgba(229,0,106,0.18)', overflow: 'hidden' }}>
      <div className="dot-matrix-bg" style={{ position: 'absolute', inset: 0, opacity: 0.12, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1600, margin: '0 auto', padding: '0 var(--pad-x)' }}>

        {/* Big CTA statement */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end',
          justifyContent: 'space-between', gap: '2.5rem',
          padding: 'clamp(4.5rem,10vw,7rem) 0 clamp(3rem,6vw,5rem)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--mag-500)', marginBottom: '1.75rem' }}>
              XPLORA TECHFEST 6.0&nbsp;//&nbsp;KPS
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(3rem, 9vw, 9.5rem)',
              lineHeight: 0.87, letterSpacing: '-0.025em',
              textTransform: 'uppercase', color: '#fff',
            }}>
              INNOVATE.<br />
              <span className="glow-text-lg" style={{ color: 'var(--mag-200)' }}>EXPLORE.</span>
            </h2>
          </div>
          <NavLink to="/register" className="btn btn-solid" style={{ padding: '1.2rem 3rem', alignSelf: 'flex-end', fontSize: '0.72rem' }}>
            SECURE YOUR SPOT ↗
          </NavLink>
        </div>

        {/* Four-column links */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'clamp(2rem,4vw,3.5rem)',
          padding: 'clamp(3rem,6vw,4.5rem) 0',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}>
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="live-dot" />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.05rem', letterSpacing: '0.2em', color: 'var(--mag-200)', textTransform: 'uppercase' }}
                className="glow-text">
                XPLORA
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 1vw, 0.95rem)', lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', maxWidth: 240 }}>
              A premier technology festival bringing together innovators, enthusiasts, and industry leaders.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-500)', marginBottom: '1.4rem' }}>
              //&nbsp;NAVIGATE
            </p>
            {FOOT_NAV.map((l, i) => (
              <NavLink key={l} to={FOOT_TO[i]} style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.69rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.42)', textDecoration: 'none', marginBottom: 11, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--mag-200)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.42)'}
              >{l}</NavLink>
            ))}
          </div>

          {/* About */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-500)', marginBottom: '1.4rem' }}>
              //&nbsp;ABOUT
            </p>
            {FOOT_ABOUT.map((l, i) => (
              <NavLink key={l} to={FOOT_ABOUT_TO[i]} style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.69rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.42)', textDecoration: 'none', marginBottom: 11, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--mag-200)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.42)'}
              >{l}</NavLink>
            ))}
          </div>

          {/* Top events */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-500)', marginBottom: '1.4rem' }}>
              //&nbsp;TOP EVENTS
            </p>
            {TOP_EVENTS.map(ev => (
              <NavLink key={ev} to="/events" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.69rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.78)', textDecoration: 'none', marginBottom: 11, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--mag-200)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.78)'}
              >{ev}</NavLink>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-500)', marginBottom: '1.4rem' }}>
              //&nbsp;CONTACT
            </p>
            <a href="mailto:info@xplorakps.tech" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.69rem', color: 'var(--mag-200)', textDecoration: 'none', marginBottom: 14 }}>
              info@xplorakps.tech
            </a>
            {[
              { l: 'INSTAGRAM', h: 'https://www.instagram.com/xplora.kps/' },
              { l: 'LINKEDIN', h: 'https://www.linkedin.com/company/techfest-xplora/' },
              { l: 'YOUTUBE', h: 'https://www.youtube.com/@atlclubkps/videos' },
            ].map(({ l, h }) => (
              <a key={l} href={h} target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.69rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.78)', textDecoration: 'none', marginBottom: 11, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.78)'}
              >{l}&nbsp;↗</a>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8,
          padding: '1.5rem 0', borderTop: '1px solid rgba(255,255,255,0.03)', marginTop: '2rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.54rem',
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.75)',
        }}>
          <span>XPLORA TECHFEST&nbsp;//&nbsp;KRISHNA PUBLIC SCHOOL</span>
        <span>© 2026&nbsp;ALL RIGHTS RESERVED</span>
        <span>PHOSPHOR ENGINE&nbsp;//&nbsp;v4.2</span>
      </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────
   APP ROOT
───────────────────────────── */
export default function App() {
  const progressRef = useRef(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const el = progressRef.current;
    const fn = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (el) el.style.height = max > 0 ? `${(window.scrollY / max) * 100}%` : '0%';
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <Router>
      <div style={{ background: '#000', minHeight: '100vh', userSelect: 'none' }}>
        {showIntro && <IntroSplash onComplete={() => setShowIntro(false)} />}
        <div ref={progressRef} className="scroll-indicator" aria-hidden="true" />
        <ScrollReset />
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/speakers" element={<SpeakersPage />} />
            <Route path="/sponsors" element={<SponsorsPage />} />
            <Route path="/faq"      element={<FAQPage />} />
            <Route path="/team"     element={<TeamPage />} />
            <Route path="/privacy"  element={<PrivacyPage />} />
            <Route path="/terms"    element={<TermsPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
