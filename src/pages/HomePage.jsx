import React, { useRef, useEffect, useState } from 'react';
import PhosphorImageCanvas from '../components/PhosphorImageCanvas';

/* ── Text scramble hook ── */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
const WORDS = ['INNOVATION', 'INTELLIGENCE', 'INTERACTION', 'CREATION'];

function useScramble(words, delay = 2800) {
  const [text, setText] = useState(words[0]);
  const idx = useRef(0);
  useEffect(() => {
    let iter = 0, frame;
    const scramble = () => {
      const target = words[idx.current];
      iter++;
      setText(target.split('').map((c, i) =>
        i < iter / 3 ? c : CHARS[Math.floor(Math.random() * CHARS.length)]
      ).join(''));
      if (iter < target.length * 3) frame = setTimeout(scramble, 28);
      else setText(target);
    };
    const cycle = setInterval(() => { idx.current = (idx.current + 1) % words.length; iter = 0; scramble(); }, delay);
    return () => { clearInterval(cycle); clearTimeout(frame); };
  }, []);
  return text;
}

/* ── Countdown hook ── */
function useCountdown(target) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0, done: false });
  useEffect(() => {
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setT(x => ({ ...x, done: true })); return; }
      setT({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000), done: false });
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, [target]);
  return t;
}

const P2 = n => String(n).padStart(2, '0');
const EVENT_DATE = new Date('2026-11-13T10:00:00').getTime();

/* ── Marquee ticker ── */
const TICKER_ITEMS = ['HACKATHON', 'GAMING', 'AI TALKS', 'ROBO DANGAL', 'CODE WARS', 'VR', 'WEB DESIGN', 'IDEATHON', 'MULTIMEDIA', 'RALLY CROSS', 'HURDLE MANIA', 'ROBO KABADDI'];

export default function HomePage() {
  const videoRef = useRef(null);
  const scrambled = useScramble(WORDS);
  const countdown = useCountdown(EVENT_DATE);

  useEffect(() => { if (videoRef.current) videoRef.current.playbackRate = 0.85; }, []);

  return (
    <>
      {/* ══════════════════════════════════════
          SECTION 01 — HERO
      ══════════════════════════════════════ */}
      <section
        aria-label="Hero"
        style={{ position: 'relative', width: '100%', minHeight: '100vh', minHeight: '680px', background: '#000', overflow: 'hidden' }}
      >
        {/* Background video */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <video ref={videoRef} autoPlay loop muted playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.95) contrast(1.1)' }}>
            <source src="/bg.mp4" type="video/mp4" />
          </video>
          <div className="crt-scanlines" style={{ opacity: 0.45 }} />
          <div className="crt-overlay" />
          <div className="screen-vignette" />
          <div className="scanline-beam" />
          <div className="noise-overlay" />
          {/* Bottom gradient */}
          <div style={{ position: 'absolute', inset: '25% 0 0 0', background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 45%, transparent 100%)', pointerEvents: 'none' }} />
          {/* Top gradient */}
          <div style={{ position: 'absolute', inset: '0 0 85% 0', background: 'linear-gradient(to bottom, rgba(0,0,0,0.65), transparent)', pointerEvents: 'none' }} />
          {/* Left gradient — text area */}
          <div style={{ position: 'absolute', inset: '0 45% 0 0', background: 'linear-gradient(to right, rgba(0,0,0,0.55), transparent)', pointerEvents: 'none' }} />
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10, height: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '0 var(--pad-x)' }}>

          {/* Top bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '7.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.07)', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div className="tag-badge fade-up-1" style={{ background: 'rgba(0,0,0,0.55)' }}>
              <span className="live-dot" style={{ width: 5, height: 5 }} />
              XPLORA TECHFEST&nbsp;<span style={{ color: 'rgba(255,255,255,0.28)' }}>//&nbsp;NOV 13–14, 2026</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hero-meta">
              {[['SECTOR', '07'], ['EVENTS', '12+'], ['STATUS', 'OPEN']].map(([k, v]) => (
                <div key={k} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', display: 'flex', gap: 6 }}>
                  <span style={{ color: 'var(--mag-500)' }}>{k}</span>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Headline */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '1rem', paddingBottom: '2rem' }}>

            <p className="fade-up-1" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--mag-500)', marginBottom: '1.75rem' }}>
              KPS COLLEGE&nbsp;//&nbsp;ANNUAL TECHNOLOGY FESTIVAL
            </p>

            <h1 className="fade-up-2" style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(2.4rem, 9.5vw, 10.5rem)',
              lineHeight: 0.88, letterSpacing: '-0.025em',
              textTransform: 'uppercase', marginBottom: '2rem',
            }}>
              <span style={{ display: 'block', color: '#fff', textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}>XPLORA</span>
              <span style={{ display: 'block', color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.5)', textShadow: 'none' }}>TECHFEST</span>
              <span className="glow-text-lg" style={{ display: 'block', color: 'var(--mag-200)' }}>6.0.</span>
            </h1>

            <p className="fade-up-3" style={{
              maxWidth: 440, fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', lineHeight: 1.6,
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '2.75rem',
              paddingLeft: '1.25rem', borderLeft: '2px solid rgba(229,0,106,0.5)',
            }}>
              Welcome to the future of&nbsp;
              <span style={{ color: '#fff', fontWeight: 600 }}>{scrambled}</span>.&nbsp;
              Join us for two days of innovation, competition, and discovery.
            </p>

            <div className="fade-up-4" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <a href="#about" className="btn btn-solid">EXPLORE XPLORA →</a>
              <a href="/itinerary.pdf" className="btn btn-outline" target="_blank" rel="noopener noreferrer">VIEW ITINERARY ↗</a>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: '1rem', paddingBottom: '2.5rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            fontFamily: 'var(--font-mono)', fontSize: '0.57rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.26)', flexWrap: 'wrap', gap: 8,
          }}>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <span>PLAYER_001&nbsp;//&nbsp;REGISTRATION OPEN</span>
              <span className="hero-res">EVENTS&nbsp;//&nbsp;12 COMPETITIONS</span>
            </div>
            <a href="#countdown" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.38)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--mag-200)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.38)'}
            >
              SCROLL TO INITIATE&nbsp;<span style={{ color: 'var(--mag-200)' }}>↓</span>
            </a>
          </div>
        </div>

        <style>{`
          .hero-meta { display: none; }
          .hero-res  { display: none; }
          @media (min-width: 640px) { .hero-meta { display: flex; } .hero-res { display: inline; } }
        `}</style>
      </section>

      {/* ══════════════════════════════════════
          SECTION 02 — TICKER
      ══════════════════════════════════════ */}
      <div style={{ width: '100%', background: 'var(--mag-900)', borderTop: '1px solid rgba(229,0,106,0.18)', borderBottom: '1px solid rgba(229,0,106,0.18)', overflow: 'hidden', padding: '1rem 0' }}>
        <div className="animate-marquee" style={{ gap: 0 }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(0.9rem, 2vw, 1.3rem)', letterSpacing: '0.12em',
              textTransform: 'uppercase', whiteSpace: 'nowrap',
              padding: '0 2.5rem', color: i % 2 === 0 ? '#fff' : 'var(--mag-200)',
              flexShrink: 0,
            }}>
              {item}&nbsp;<span style={{ color: 'var(--mag-600)', fontSize: '0.7em' }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          SECTION 03 — COUNTDOWN
      ══════════════════════════════════════ */}
      <section id="countdown" style={{ width: '100%', background: '#000', padding: 'var(--space-section) var(--pad-x)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '4rem' }}>
            <span style={{ width: 6, height: 6, background: 'var(--mag-200)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-400)' }}>
              COUNTDOWN&nbsp;//&nbsp;002
            </span>
            <span className="accent-line" style={{ flex: 1, maxWidth: 80 }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'clamp(2rem,5vw,4rem)', alignItems: 'center' }}>
            {/* Left: big label */}
            <div style={{ gridColumn: 'span 5' }}>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontWeight: 900,
                fontSize: 'clamp(2.5rem, 7vw, 8rem)',
                lineHeight: 0.9, letterSpacing: '-0.022em',
                textTransform: 'uppercase', color: '#fff',
              }}>
                UNTIL<br />
                <span className="glow-text" style={{ color: 'var(--mag-200)' }}>XPLORA</span><br />
                BEGINS.
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', marginTop: '1.25rem' }}>
                NOV 13–14, 2026 &middot; KPS COLLEGE
              </p>
            </div>

            {/* Right: countdown digits */}
            <div style={{ gridColumn: 'span 7', display: 'flex', gap: 'clamp(1rem,3vw,2.5rem)', flexWrap: 'wrap' }}>
              {countdown.done ? (
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 6vw, 5rem)', color: 'var(--mag-200)', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                  THE EVENT HAS STARTED!
                </p>
              ) : (
                [['DAYS', P2(countdown.d)], ['HOURS', P2(countdown.h)], ['MINS', P2(countdown.m)], ['SECS', P2(countdown.s)]].map(([label, val]) => (
                  <div key={label} className="panel" style={{ padding: 'clamp(1.2rem,3vw,2rem) clamp(1.5rem,3.5vw,2.5rem)', textAlign: 'center', flex: '1 1 90px' }}>
                    <div style={{
                      fontFamily: 'var(--font-display)', fontWeight: 900,
                      fontSize: 'clamp(2.5rem, 7vw, 7rem)',
                      lineHeight: 1, color: 'var(--mag-200)',
                      textShadow: '0 0 30px rgba(229,0,106,0.65), 0 0 80px rgba(229,0,106,0.25)',
                      letterSpacing: '0.02em',
                    }}>{val}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: '0.65rem' }}>{label}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 04 — ABOUT (MANIFESTO STYLE)
      ══════════════════════════════════════ */}
      <section id="about" style={{ position: 'relative', width: '100%', background: '#000', padding: 'var(--space-section) var(--pad-x)', overflow: 'hidden' }}>
        <div className="dot-matrix-bg" style={{ position: 'absolute', inset: 0, opacity: 0.16, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1600, margin: '0 auto' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '4.5rem' }}>
            <span style={{ width: 6, height: 6, background: 'var(--mag-200)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-400)' }}>ABOUT&nbsp;//&nbsp;003</span>
            <span className="accent-line" style={{ flex: 1, maxWidth: 80 }} />
          </div>

          {/* Giant statement */}
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: 'clamp(2.8rem, 8.5vw, 10rem)',
            lineHeight: 0.88, letterSpacing: '-0.025em',
            textTransform: 'uppercase', color: '#fff',
          }}>
            TECH IS<br />
            <span className="glow-text" style={{ color: 'var(--mag-200)' }}>NO LONGER</span><br />
            A SUBJECT.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'clamp(2rem,5vw,4rem)', marginTop: 'clamp(3rem,6vw,5rem)', alignItems: 'end' }}>
            <div style={{ gridColumn: 'span 7' }}>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontWeight: 900,
                fontSize: 'clamp(1.8rem, 5vw, 5.5rem)',
                lineHeight: 0.93, letterSpacing: '-0.018em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.88)',
              }}>
                IT IS THE&nbsp;<span style={{ borderBottom: '2px solid var(--mag-200)', paddingBottom: '0.05em' }}>ECOSYSTEM.</span>
              </h3>
            </div>
            <div style={{ gridColumn: 'span 5', borderLeft: '1px solid rgba(229,0,106,0.22)', paddingLeft: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                'Xplora Techfest is a premier technology festival that brings together innovators, tech enthusiasts, and industry leaders to explore the latest advancements in technology.',
                'Two days of inspiring talks, hands-on workshops, thrilling competitions, and networking opportunities — for students, professionals, and curious minds.',
              ].map((p, i) => (
                <p key={i} style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)' }}>{p}</p>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 8, marginTop: 'clamp(3.5rem,7vw,6rem)' }}>
            {[
              { val: '2', label: 'DAYS OF FEST'       },
              { val: '12+', label: 'COMPETITIONS'      },
              { val: '500+', label: 'ATTENDEES'         },
              { val: '∞', label: 'INNOVATION'          },
            ].map(({ val, label }) => (
              <div key={label} className="panel" style={{ padding: 'clamp(1.5rem,3vw,2.25rem)', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1, color: 'var(--mag-200)', textShadow: '0 0 20px rgba(229,0,106,0.5)' }}>{val}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', marginTop: 8 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Bottom annotation */}
          <div style={{ marginTop: 'clamp(4rem,8vw,7rem)', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8, fontFamily: 'var(--font-mono)', fontSize: '0.57rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
            <span>03 / 06&nbsp;—&nbsp;ABOUT XPLORA</span>
            <span className="about-mid">KPS COLLEGE&nbsp;::&nbsp;KARACHI, PAKISTAN</span>
            <span>TECHFEST&nbsp;//&nbsp;ANNUAL</span>
          </div>
        </div>

        <style>{`.about-mid { display: none; } @media (min-width: 640px) { .about-mid { display: inline; } }`}</style>
      </section>

      {/* ══════════════════════════════════════
          SECTION 05 — EVENTS PREVIEW
      ══════════════════════════════════════ */}
      <section style={{ width: '100%', background: '#000', padding: 'var(--space-section) var(--pad-x)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto' }}>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem', alignItems: 'end', marginBottom: '4rem' }}>
            <div style={{ gridColumn: 'span 7' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-400)', marginBottom: '1.25rem' }}>
                EVENT CATALOGUE&nbsp;//&nbsp;004
              </p>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontWeight: 900,
                fontSize: 'clamp(2.5rem, 7.5vw, 8.5rem)',
                lineHeight: 0.9, letterSpacing: '-0.022em',
                textTransform: 'uppercase', color: '#fff',
              }}>
                THE&nbsp;<span className="glow-text" style={{ color: 'var(--mag-200)' }}>EVENTS.</span>
              </h2>
            </div>
            <div style={{ gridColumn: 'span 5', borderLeft: '1px solid rgba(255,255,255,0.07)', paddingLeft: '1.5rem' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)' }}>
                From robotics combat to virtual reality exploration — Xplora Techfest pushes the
                boundaries of what students can create.
              </p>
            </div>
          </div>

          {/* Asymmetric feature: canvas visual + top events */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 10, marginBottom: 10 }}>
            {/* Canvas */}
            <div style={{ gridColumn: 'span 8' }}>
              <PhosphorImageCanvas type="grid" height={480} />
            </div>
            {/* Featured events */}
            <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { num: '01', name: 'HACKATHON',  tag: 'CODING // 24H',     icon: '</>' },
                { num: '02', name: 'GAMING',      tag: 'COMPETE // RANKED', icon: '⚡'  },
                { num: '03', name: 'ROBO DANGAL', tag: 'ROBOTICS // COMBAT', icon: '⚙'  },
              ].map(ev => (
                <div key={ev.num} className="panel" style={{ padding: '1.5rem 1.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2rem', color: 'var(--mag-600)', lineHeight: 1 }}>{ev.num}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--mag-400)' }}>{ev.icon}</span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#fff', marginBottom: 4 }}>{ev.name}</h3>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.57rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mag-500)' }}>{ev.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row: more events */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
            {[
              { num: '04', name: 'AI TALKS',    tag: 'KNOWLEDGE', icon: '◉' },
              { num: '05', name: 'CODE WARS',   tag: 'BATTLE',    icon: '⌥' },
              { num: '06', name: 'VR',          tag: 'IMMERSIVE', icon: '◎' },
              { num: '07', name: 'WEB DESIGN',  tag: 'DESIGN',    icon: '{}' },
              { num: '08', name: 'IDEATHON',    tag: 'CREATIVE',  icon: '◈' },
            ].map(ev => (
              <a key={ev.num} href="/#/events" className="panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: 10, textDecoration: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.8rem', color: 'var(--mag-600)', lineHeight: 1 }}>{ev.num}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--mag-400)' }}>{ev.icon}</span>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', textTransform: 'uppercase', color: '#fff', letterSpacing: '-0.01em', marginBottom: 3 }}>{ev.name}</h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mag-500)' }}>{ev.tag}</span>
                </div>
              </a>
            ))}
            {/* See all CTA card */}
            <a href="/#/events" className="panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, textDecoration: 'none', background: 'rgba(229,0,106,0.05)' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2.5rem', color: 'var(--mag-200)', lineHeight: 1, textShadow: '0 0 16px rgba(229,0,106,0.5)' }}>12+</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>VIEW ALL EVENTS ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 06 — CINEMATIC STATEMENT
      ══════════════════════════════════════ */}
      <section style={{ position: 'relative', width: '100%', minHeight: '80vh', background: '#000', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="dot-matrix-dense" style={{ position: 'absolute', inset: 0, opacity: 0.28, pointerEvents: 'none' }} />
        <PhosphorImageCanvas type="planet" height={700} style={{ position: 'absolute', inset: 0, border: 'none', width: '100%', height: '100%', opacity: 0.55 }} />
        <div className="crt-overlay" />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.92) 100%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 20, textAlign: 'center', maxWidth: 1000, padding: '6rem var(--pad-x)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>
          <div className="tag-badge">
            <span className="live-dot" style={{ width: 5, height: 5 }} />
            REGISTRATION OPEN&nbsp;//&nbsp;XPLORA 6.0
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: 'clamp(3rem, 10vw, 11rem)',
            lineHeight: 0.87, letterSpacing: '-0.025em',
            textTransform: 'uppercase', color: '#fff',
            textShadow: '0 0 120px rgba(0,0,0,0.95)',
          }}>
            JOIN THE<br />
            <span className="glow-text-lg" style={{ color: 'var(--mag-200)' }}>SIGNAL.</span>
          </h2>

          <p style={{
            maxWidth: 540, fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
            lineHeight: 1.7, color: 'rgba(255,255,255,0.75)',
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)',
            borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)',
            padding: '1.5rem 2rem',
          }}>
            Don't miss out. Compete, collaborate, create. Xplora Techfest brings the brightest minds together
            for Pakistan's most exciting technology festival.
          </p>

          <a href="/#/contact" className="btn btn-solid" style={{ padding: '1.1rem 3rem', fontSize: '0.75rem' }}>
            REGISTER NOW ↗
          </a>
        </div>
      </section>
    </>
  );
}
