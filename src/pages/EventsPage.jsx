import React, { useState } from 'react';
import PhosphorImageCanvas from '../components/PhosphorImageCanvas';

const EVENTS = [
  { num: '01', name: 'HACKATHON',    tag: 'CODING // 24H',       icon: '</>', cat: 'DIGITAL',    desc: 'A 24-hour coding marathon where creativity meets technology. Collaborate to build innovative solutions and compete for prizes.' },
  { num: '02', name: 'GAMING',       tag: 'COMPETE // RANKED',   icon: '⚡',  cat: 'DIGITAL',    desc: 'Showcase your gaming skills in ranked competitions. Compete against the best and claim your victory.' },
  { num: '03', name: 'AI TALKS',     tag: 'KNOWLEDGE // EXPERT', icon: '◉',  cat: 'EDUCATION',  desc: 'Insightful talks by industry experts on the latest trends and advancements in Artificial Intelligence.' },
  { num: '04', name: 'IDEATHON',     tag: 'CREATIVE // OPEN',    icon: '◈',  cat: 'INNOVATION', desc: 'Collaborate with like-minded individuals to brainstorm and develop innovative ideas that can make a difference.' },
  { num: '05', name: 'MULTIMEDIA',   tag: 'CREATIVE // VISUAL',  icon: '▣',  cat: 'CREATIVE',   desc: 'Express your creativity through photography, videography, or graphic design. Showcase your talent and win prizes.' },
  { num: '06', name: 'VR',           tag: 'IMMERSIVE // XR',     icon: '◎',  cat: 'TECHNOLOGY', desc: 'Immerse yourself in Virtual Reality. Experience cutting-edge VR technology and explore new dimensions of innovation.' },
  { num: '07', name: 'WEB DESIGN',   tag: 'DESIGN // FRONTEND',  icon: '{}', cat: 'DIGITAL',    desc: 'Showcase your web design and frontend skills. Build stunning, functional interfaces under competition conditions.' },
  { num: '08', name: 'CODE WARS',    tag: 'BATTLE // ALGORITHM', icon: '⌥',  cat: 'DIGITAL',    desc: 'The ultimate coding competition. Test your programming skills against others in a series of algorithmic battles.' },
  { num: '09', name: 'HURDLE MANIA', tag: 'SPORT // AGILITY',    icon: '≋',  cat: 'PHYSICAL',   desc: 'Test your agility and speed as you navigate through challenging obstacle courses and compete for amazing prizes.' },
  { num: '10', name: 'RALLY CROSS',  tag: 'SPORT // RACING',     icon: '⊳',  cat: 'PHYSICAL',   desc: 'Experience the thrill of off-road racing. Compete in challenging courses and showcase your driving skills.' },
  { num: '11', name: 'ROBO DANGAL',  tag: 'ROBOTICS // COMBAT',  icon: '⚙',  cat: 'ROBOTICS',   desc: 'Build and program robots to compete in thrilling combat matches. Showcase your engineering and robotics skills.' },
  { num: '12', name: 'ROBO KABADDI', tag: 'ROBOTICS // SPORT',   icon: '⊕',  cat: 'ROBOTICS',   desc: 'Design and program robots to play kabaddi. Combine robotics engineering with the excitement of competitive sport.' },
];

const CATS = ['ALL', 'DIGITAL', 'ROBOTICS', 'CREATIVE', 'PHYSICAL', 'EDUCATION', 'TECHNOLOGY', 'INNOVATION'];

export default function EventsPage() {
  const [activeCat, setActiveCat] = useState('ALL');
  const [hovered,   setHovered]   = useState(null);
  const [expanded,  setExpanded]  = useState(null);

  const filtered = activeCat === 'ALL' ? EVENTS : EVENTS.filter(e => e.cat === activeCat);

  return (
    <div style={{ width: '100%', background: '#000', minHeight: '100vh', paddingTop: '7rem' }}>
      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 var(--pad-x)' }}>

        {/* ── Page header (editorial style) ── */}
        <div style={{ paddingTop: '2rem', paddingBottom: '3.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '2.5rem' }}>
            <span style={{ width: 6, height: 6, background: 'var(--mag-200)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-400)' }}>
              EVENT CATALOGUE&nbsp;//&nbsp;XPLORA 6.0
            </span>
            <span className="accent-line" style={{ flex: 1, maxWidth: 80 }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem', alignItems: 'end' }}>
            <div style={{ gridColumn: 'span 7' }}>
              <h1 style={{
                fontFamily: 'var(--font-display)', fontWeight: 900,
                fontSize: 'clamp(3.2rem, 9.5vw, 10.5rem)',
                lineHeight: 0.87, letterSpacing: '-0.025em',
                textTransform: 'uppercase', color: '#fff',
              }}>
                THE<br />
                <span className="glow-text-lg" style={{ color: 'var(--cyan-400)' }}>EVENTS.</span>
              </h1>
            </div>
            <div style={{ gridColumn: 'span 5', borderLeft: '1px solid rgba(229,0,106,0.2)', paddingLeft: '1.75rem' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', marginBottom: '1.25rem' }}>
                12 competitions across digital, robotics, creative, physical, and knowledge disciplines. Two days. Unlimited ambition.
              </p>
              <div style={{ display: 'flex', gap: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>
                <span>{EVENTS.length}&nbsp;EVENTS</span>
                <span>NOV 13–14</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Category filter ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '3.5rem' }}>
          {CATS.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', padding: '0.5rem 1.2rem', cursor: 'none',
                border: `1px solid ${activeCat === cat ? 'var(--mag-200)' : 'rgba(255,255,255,0.1)'}`,
                background: activeCat === cat ? 'rgba(229,0,106,0.1)' : 'transparent',
                color: activeCat === cat ? 'var(--mag-100)' : 'rgba(255,255,255,0.42)',
                boxShadow: activeCat === cat ? 'var(--glow-xs)' : 'none',
                transition: 'all 0.22s',
              }}
            >{cat}</button>
          ))}
        </div>

        {/* ── Events grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 10, marginBottom: '5rem' }}>
          {filtered.map((ev) => (
            <div
              key={ev.num}
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
              className="panel"
              style={{
                padding: 'clamp(1.5rem,3vw,2.25rem)',
                display: 'flex', flexDirection: 'column', gap: 14,
                cursor: 'pointer',
                background: (hovered === ev.num || expanded === ev.num)
                  ? 'linear-gradient(155deg, rgba(0,40,45,0.95) 0%, rgba(0,0,0,0.98) 100%)'
                  : 'rgba(34,211,238,0.02)',
                transition: 'all 0.28s var(--ease-out-expo)',
              }}
            >
              {/* Card header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: '1rem' }}>
                <span style={{
                  fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2.4rem', lineHeight: 1,
                  color: (hovered === ev.num || expanded === ev.num) ? 'var(--cyan-400)' : 'var(--cyan-500)',
                  transition: 'color 0.28s',
                  ...((hovered === ev.num || expanded === ev.num) ? { textShadow: '0 0 16px rgba(34,211,238,0.6)' } : {}),
                }}>{ev.num}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', color: (hovered === ev.num || expanded === ev.num) ? 'var(--cyan-400)' : 'rgba(255,255,255,0.18)', transition: 'color 0.28s' }}>
                  {ev.icon}
                </span>
              </div>

              {/* Name + tag */}
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 900,
                  fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  color: (hovered === ev.num || expanded === ev.num) ? 'var(--cyan-400)' : '#fff',
                  marginBottom: '0.35rem',
                  transition: 'color 0.28s',
                }}>{ev.name}</h3>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--mag-100)' }}>{ev.tag}</span>
              </div>

              {/* Description */}
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', flex: 1 }}>
                {ev.desc}
              </p>

              {/* Expanded details */}
              {expanded === ev.num && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', marginTop: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--cyan-500)' }}>TEAM SIZE:</span>
                    <span>2-4 MEMBERS</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--cyan-500)' }}>PRIZE POOL:</span>
                    <span>₹10,000</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--cyan-500)' }}>REG DEADLINE:</span>
                    <span>NOV 10</span>
                  </div>
                  <a href="/#/register" onClick={(e) => e.stopPropagation()} className="btn btn-outline" style={{ width: '100%', marginTop: '1.25rem', borderColor: 'var(--cyan-500)', color: 'var(--cyan-400)' }}>
                    REGISTER TEAM ↗
                  </a>
                </div>
              )}

              {/* Bottom meta */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem',
                fontFamily: 'var(--font-mono)', fontSize: '0.57rem', letterSpacing: '0.18em', textTransform: 'uppercase',
              }}>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>{ev.cat}</span>
                <span style={{ color: (hovered === ev.num || expanded === ev.num) ? 'var(--cyan-400)' : 'rgba(255,255,255,0.22)', transition: 'color 0.28s' }}>
                  {expanded === ev.num ? 'COLLAPSE ↑' : 'LEARN MORE →'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Asymmetric visual feature ── */}
        <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 'var(--space-section)', marginBottom: 'var(--space-section)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 10, alignItems: 'stretch' }}>
            {/* Canvas */}
            <div style={{ gridColumn: 'span 7' }}>
              <PhosphorImageCanvas type="controller" height={500} />
            </div>
            {/* Text panel */}
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
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 900,
                  fontSize: 'clamp(2rem, 4.5vw, 4.5rem)',
                  lineHeight: 0.9, letterSpacing: '-0.02em',
                  textTransform: 'uppercase', color: '#fff', marginBottom: '1.5rem',
                }}>
                  BUILD.<br />
                  <span className="glow-text" style={{ color: 'var(--cyan-400)' }}>COMPETE.</span><br />
                  DOMINATE.
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)' }}>
                  From robotics combat to virtual reality exploration — Xplora Techfest pushes the
                  boundaries of what students can create.
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
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(2.5rem, 7.5vw, 8rem)',
              lineHeight: 0.88, letterSpacing: '-0.022em',
              textTransform: 'uppercase', color: '#fff',
            }}>
              REGISTER<br />
              <span className="glow-text-lg" style={{ color: 'var(--cyan-400)' }}>NOW.</span>
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
