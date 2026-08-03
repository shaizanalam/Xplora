import React, { useState } from 'react';
import PhosphorImageCanvas from '../components/PhosphorImageCanvas';

const EVENTS = [
  { num: '01', name: 'HACKATHON',    tag: 'CODING // 24H',       icon: '</>', cat: 'DIGITAL',    featured: true,  desc: 'A 24-hour coding marathon where creativity meets technology. Collaborate to build innovative solutions and compete for prizes.' },
  { num: '02', name: 'GAMING',       tag: 'COMPETE // RANKED',   icon: '⚡',  cat: 'DIGITAL',    featured: false, desc: 'Showcase your gaming skills in ranked competitions. Compete against the best and claim your victory.' },
  { num: '03', name: 'AI TALKS',     tag: 'KNOWLEDGE // EXPERT', icon: '◉',  cat: 'EDUCATION',  featured: false, desc: 'Insightful talks by industry experts on the latest trends and advancements in Artificial Intelligence.' },
  { num: '04', name: 'IDEATHON',     tag: 'CREATIVE // OPEN',    icon: '◈',  cat: 'INNOVATION', featured: false, desc: 'Collaborate with like-minded individuals to brainstorm and develop innovative ideas that can make a difference.' },
  { num: '05', name: 'MULTIMEDIA',   tag: 'CREATIVE // VISUAL',  icon: '▣',  cat: 'CREATIVE',   featured: false, desc: 'Express your creativity through photography, videography, or graphic design. Showcase your talent and win prizes.' },
  { num: '06', name: 'VR',           tag: 'IMMERSIVE // XR',     icon: '◎',  cat: 'TECHNOLOGY', featured: false, desc: 'Immerse yourself in Virtual Reality. Experience cutting-edge VR technology and explore new dimensions of innovation.' },
  { num: '07', name: 'WEB DESIGN',   tag: 'DESIGN // FRONTEND',  icon: '{}', cat: 'DIGITAL',    featured: false, desc: 'Showcase your web design and frontend skills. Build stunning, functional interfaces under competition conditions.' },
  { num: '08', name: 'CODE WARS',    tag: 'BATTLE // ALGORITHM', icon: '⌥',  cat: 'DIGITAL',    featured: false, desc: 'The ultimate coding competition. Test your programming skills against others in a series of algorithmic battles.' },
  { num: '09', name: 'HURDLE MANIA', tag: 'SPORT // AGILITY',    icon: '≋',  cat: 'PHYSICAL',   featured: false, desc: 'Test your agility and speed as you navigate through challenging obstacle courses and compete for amazing prizes.' },
  { num: '10', name: 'RALLY CROSS',  tag: 'SPORT // RACING',     icon: '⊳',  cat: 'PHYSICAL',   featured: false, desc: 'Experience the thrill of off-road racing. Compete in challenging courses and showcase your driving skills.' },
  { num: '11', name: 'ROBO DANGAL',  tag: 'ROBOTICS // COMBAT',  icon: '⚙',  cat: 'ROBOTICS',   featured: false, desc: 'Build and program robots to compete in thrilling combat matches. Showcase your engineering and robotics skills.' },
  { num: '12', name: 'ROBO KABADDI', tag: 'ROBOTICS // SPORT',   icon: '⊕',  cat: 'ROBOTICS',   featured: false, desc: 'Design and program robots to play kabaddi. Combine robotics engineering with the excitement of competitive sport.' },
];

const CATS = ['ALL', 'DIGITAL', 'ROBOTICS', 'CREATIVE', 'PHYSICAL', 'EDUCATION', 'TECHNOLOGY', 'INNOVATION'];

const SCOPED_STYLES = `
  .event-card:focus-visible {
    outline: 2px solid var(--mag-200);
    outline-offset: 3px;
    box-shadow: 0 0 0 4px rgba(229,0,106,0.18), var(--glow-sm);
  }
  .cat-filter-btn:focus-visible {
    outline: 2px solid var(--mag-200);
    outline-offset: 2px;
  }
  .event-card {
    transition: border-color 0.28s var(--ease-out-expo),
                background 0.28s var(--ease-out-expo),
                box-shadow 0.28s var(--ease-out-expo),
                transform 0.18s var(--ease-out-expo);
  }
  .event-card:hover { transform: translateY(-2px); }

  @media (max-width: 900px) {
    .events-main-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .event-card-featured { grid-column: 1 / -1 !important; }
  }
  @media (max-width: 560px) {
    .events-main-grid { grid-template-columns: 1fr !important; }
    .event-card-featured { grid-column: auto !important; }
  }
`;

export default function EventsPage() {
  const [activeCat, setActiveCat] = useState('ALL');
  const [hovered,   setHovered]   = useState(null);
  const [expanded,  setExpanded]  = useState(null);

  const filtered = activeCat === 'ALL' ? EVENTS : EVENTS.filter(e => e.cat === activeCat);

  return (
    <div style={{ width: '100%', background: '#000', minHeight: '100vh', paddingTop: '7rem' }}>
      <style>{SCOPED_STYLES}</style>

      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 var(--pad-x)' }}>

        {/* ── Page header ── */}
        <div style={{ paddingTop: '2rem', paddingBottom: '4rem', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: '2.5rem' }}>
            <span style={{ width: 6, height: 6, background: 'var(--mag-200)', flexShrink: 0, borderRadius: 1 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--mag-400)' }}>
              EVENT CATALOGUE&nbsp;//&nbsp;XPLORA 6.0
            </span>
            <span className="accent-line" style={{ flex: 1, maxWidth: 120 }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem', alignItems: 'end' }}>
            <div style={{ gridColumn: 'span 7' }}>
              <h1 style={{
                fontFamily: 'var(--font-display)', fontWeight: 900,
                fontSize: 'clamp(3.2rem, 9.5vw, 10.5rem)',
                lineHeight: 0.87, letterSpacing: '-0.025em',
                textTransform: 'uppercase', color: '#fff', marginBottom: 0,
              }}>
                THE<br />
                <span className="glow-text-lg" style={{ color: 'var(--mag-200)' }}>EVENTS.</span>
              </h1>
            </div>
            <div style={{ gridColumn: 'span 5', borderLeft: '1px solid rgba(229,0,106,0.2)', paddingLeft: '1.75rem' }}>
              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.88rem, 1.3vw, 1.02rem)',
                lineHeight: 1.7, color: 'rgba(255,255,255,0.78)', marginBottom: '1.5rem',
              }}>
                12 competitions across digital, robotics, creative, physical, and knowledge disciplines.
                Two days. Unlimited ambition.
              </p>
              <div style={{
                display: 'flex', gap: '2rem',
                fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.88)',
              }}>
                <span>{EVENTS.length}&nbsp;EVENTS</span>
                <span>NOV 13–14</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Interactive Network Visual — re-framed as node visualization, sprite removed ── */}
        <div style={{ marginBottom: '4rem', position: 'relative' }}>
          <PhosphorImageCanvas type="grid" height={320} />
        </div>

        {/* ── Category filter ── */}
        <div
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '3.5rem' }}
          role="group"
          aria-label="Filter events by category"
        >
          {CATS.map(cat => (
            <button
              key={cat}
              className="cat-filter-btn"
              onClick={() => setActiveCat(cat)}
              aria-pressed={activeCat === cat}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', padding: '0.55rem 1.2rem', cursor: 'pointer',
                border: `1px solid ${activeCat === cat ? 'var(--mag-200)' : 'rgba(255,255,255,0.12)'}`,
                background: activeCat === cat ? 'rgba(229,0,106,0.12)' : 'transparent',
                color: activeCat === cat ? 'var(--mag-100)' : 'rgba(255,255,255,0.65)',
                boxShadow: activeCat === cat ? 'var(--glow-xs)' : 'none',
                transition: 'all 0.22s',
              }}
            >{cat}</button>
          ))}
        </div>

        {/* ── Events grid — 3 columns desktop, 2 tablet, 1 mobile ── */}
        <div
          className="events-main-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
            marginBottom: '5rem',
          }}
        >
          {filtered.map((ev) => {
            const isActive = hovered === ev.num || expanded === ev.num;
            return (
              <div
                key={ev.num}
                className={`event-card panel${ev.featured ? ' event-card-featured' : ''}`}
                onMouseEnter={() => setHovered(ev.num)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setExpanded(expanded === ev.num ? null : ev.num)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setExpanded(expanded === ev.num ? null : ev.num);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={expanded === ev.num}
                aria-label={`${ev.name} — ${ev.tag}. Press Enter to ${expanded === ev.num ? 'collapse' : 'expand'} details.`}
                style={{
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  display: 'flex', flexDirection: 'column', gap: 14,
                  cursor: 'pointer',
                  background: isActive
                    ? 'linear-gradient(155deg, rgba(40,0,20,0.95) 0%, rgba(0,0,0,0.98) 100%)'
                    : ev.featured ? 'rgba(229,0,106,0.04)' : 'rgba(229,0,106,0.015)',
                  border: ev.featured
                    ? `1px solid ${isActive ? 'var(--mag-200)' : 'rgba(229,0,106,0.28)'}`
                    : `1px solid ${isActive ? 'rgba(229,0,106,0.32)' : 'rgba(255,255,255,0.07)'}`,
                  boxShadow: isActive ? 'var(--glow-sm)' : ev.featured ? 'var(--glow-xs)' : 'none',
                }}
              >
                {/* Card header: number + icon (+FEATURED badge) */}
                <div style={{
                  display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: '0.85rem',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)', fontWeight: 900,
                    fontSize: '2.2rem', lineHeight: 1,
                    color: isActive ? 'var(--mag-200)' : 'var(--mag-500)',
                    transition: 'color 0.28s',
                    textShadow: isActive ? '0 0 16px rgba(229,0,106,0.6)' : 'none',
                    fontVariantNumeric: 'tabular-nums',
                  }}>{ev.num}</span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {ev.featured && (
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                        letterSpacing: '0.22em', textTransform: 'uppercase',
                        color: '#000', background: 'var(--mag-200)',
                        padding: '2px 7px', lineHeight: 1.7, fontWeight: 700, flexShrink: 0,
                      }}>
                        FEATURED
                      </span>
                    )}
                    {/* Icon — larger + higher contrast so legible on small viewports */}
                    <span
                      aria-hidden="true"
                      style={{
                        fontFamily: 'var(--font-mono)', fontSize: '1.55rem',
                        color: isActive ? 'var(--mag-100)' : 'rgba(255,255,255,0.48)',
                        transition: 'color 0.28s', lineHeight: 1,
                      }}
                    >{ev.icon}</span>
                  </div>
                </div>

                {/* Name + tag */}
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontWeight: 900,
                    fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                    textTransform: 'uppercase', letterSpacing: '-0.01em',
                    color: isActive ? 'var(--mag-200)' : '#fff',
                    marginBottom: '0.5rem',
                    transition: 'color 0.28s',
                  }}>{ev.name}</h3>

                  {/* Tag — pill-style with background for WCAG AA contrast */}
                  <span style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-mono)', fontSize: '0.63rem',
                    fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'var(--mag-300)',
                    background: 'rgba(229,0,106,0.1)',
                    padding: '2px 8px',
                    border: '1px solid rgba(229,0,106,0.2)',
                  }}>{ev.tag}</span>
                </div>

                {/* Description */}
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)',
                  lineHeight: 1.65, color: 'rgba(255,255,255,0.72)', flex: 1,
                }}>
                  {ev.desc}
                </p>

                {/* Expanded details */}
                {expanded === ev.num && (
                  <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    paddingTop: '1rem', marginTop: '0.25rem',
                    fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.78)', lineHeight: 1.8,
                  }}>
                    {[['TEAM SIZE', '2–4 MEMBERS'], ['PRIZE POOL', '₹10,000'], ['REG DEADLINE', 'NOV 10']].map(([k, v]) => (
                      <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                        <span style={{ color: 'var(--mag-400)' }}>{k}:</span>
                        <span>{v}</span>
                      </div>
                    ))}
                    <a
                      href="/#/register"
                      onClick={(e) => e.stopPropagation()}
                      className="btn btn-outline"
                      style={{ width: '100%', marginTop: '1.25rem', borderColor: 'var(--mag-400)', color: 'var(--mag-300)' }}
                    >
                      REGISTER TEAM ↗
                    </a>
                  </div>
                )}

                {/* Bottom meta */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.85rem',
                  fontFamily: 'var(--font-mono)', fontSize: '0.57rem',
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                }}>
                  <span style={{ color: 'rgba(255,255,255,0.52)' }}>{ev.cat}</span>
                  <span style={{ color: isActive ? 'var(--mag-200)' : 'rgba(255,255,255,0.3)', transition: 'color 0.28s' }}>
                    {expanded === ev.num ? 'COLLAPSE ↑' : 'DETAILS →'}
                  </span>
                </div>
              </div>
            );
          })}

          {/* ── Browse All CTA tile — dashed border + arrow distinguishes it from event cards ── */}
          {activeCat === 'ALL' && (
            <a
              href="/#/register"
              className="event-card"
              aria-label="Browse all 12+ events and register"
              style={{
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 18, textDecoration: 'none',
                border: '1.5px dashed rgba(229,0,106,0.4)',
                background: 'rgba(229,0,106,0.02)',
                minHeight: 200,
              }}
            >
              <span style={{
                fontFamily: 'var(--font-display)', fontWeight: 900,
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                color: 'var(--mag-200)', lineHeight: 1,
                textShadow: '0 0 18px rgba(229,0,106,0.5)',
              }}>12+</span>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.88)', marginBottom: 6, fontWeight: 600,
                }}>BROWSE ALL EVENTS</div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                  letterSpacing: '0.18em', color: 'var(--mag-400)', textTransform: 'uppercase',
                }}>REGISTER NOW ↗</div>
              </div>
              <div style={{
                width: 34, height: 34,
                border: '1px solid rgba(229,0,106,0.4)',
                borderRadius: '50%', display: 'flex', alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--mag-200)', fontSize: '1rem',
              }}>→</div>
            </a>
          )}
        </div>

        {/* ── Asymmetric visual feature ── */}
        <section
          aria-label="Competition highlight"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 'var(--space-section)', marginBottom: 'var(--space-section)' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 10, alignItems: 'stretch' }}>
            <div style={{ gridColumn: 'span 7' }}>
              <PhosphorImageCanvas type="controller" height={500} />
            </div>
            <div style={{
              gridColumn: 'span 5', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              padding: 'clamp(2rem,4vw,3rem)',
              background: 'linear-gradient(155deg, var(--mag-800) 0%, #000 65%)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-400)', display: 'block', marginBottom: '1.5rem' }}>
                  ENGINEERING&nbsp;//&nbsp;COMPETITION
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 4.5vw, 4.5rem)', lineHeight: 0.9, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#fff', marginBottom: '1.5rem' }}>
                  BUILD.<br />
                  <span className="glow-text" style={{ color: 'var(--mag-200)' }}>COMPETE.</span><br />
                  DOMINATE.
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', lineHeight: 1.65, color: 'rgba(255,255,255,0.72)' }}>
                  From robotics combat to virtual reality exploration — Xplora Techfest pushes the boundaries of what students can create.
                </p>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.75rem', marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[['EVENTS', '12+'], ['DAYS', '2'], ['DISCIPLINES', '6'], ['PRIZES', 'MULTIPLE']].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginBottom: 4 }}>{k}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', color: k === 'EVENTS' ? 'var(--mag-200)' : '#fff', lineHeight: 1 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Register CTA ── */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem',
          padding: 'clamp(3.5rem,8vw,6rem)', marginBottom: 'clamp(4rem,8vw,7rem)',
          border: '1px solid rgba(229,0,106,0.22)',
          background: 'linear-gradient(160deg, rgba(20,0,9,0.55) 0%, rgba(0,0,0,0.85) 100%)',
          textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          <div className="dot-matrix-bg" style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>
            <div className="tag-badge">
              <span className="live-dot" style={{ width: 5, height: 5 }} />
              READY TO PARTICIPATE?
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2.5rem, 7.5vw, 8rem)', lineHeight: 0.88, letterSpacing: '-0.022em', textTransform: 'uppercase', color: '#fff' }}>
              REGISTER<br />
              <span className="glow-text-lg" style={{ color: 'var(--mag-200)' }}>NOW.</span>
            </h2>
            <a href="/#/register" className="btn btn-solid" style={{ padding: '1.1rem 3rem', fontSize: '0.75rem' }}>
              REGISTER FOR XPLORA →
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}