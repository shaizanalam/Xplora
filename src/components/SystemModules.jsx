import React, { useState } from 'react';
import { playPhosphorClick } from '../utils/audioSystem';

const MODULES = [
  {
    num: '01', title: 'PHOSPHOR', subtitle: 'OPTICAL MATRIX EMISSION',
    desc: 'Replaces conventional flat RGB pixels with concentrated hot-pink phosphor emitters. Each pixel carries continuous analog brightness state.',
    specs: ['12.4M DOTS', 'MAGENTA MONO', '240HZ REFRESH'],
  },
  {
    num: '02', title: 'IMMERSION', subtitle: 'FIELD-OF-VIEW OVERLAY',
    desc: 'Simulates high-speed CRT phosphor persistence that tracks eye movement and spatial depth, eliminating motion blur entirely.',
    specs: ['0.1ms PERSIST', '3D SPATIAL MAP', 'ZERO LATENCY'],
  },
  {
    num: '03', title: 'INTERACTION', subtitle: 'DIRECT SYNAPSE HAPTICS',
    desc: 'Cursor and controller interactions trigger localized electromagnetic wave bursts, creating tactile feedback through visual resonance.',
    specs: ['RESONANT HAPTICS', '1000HZ SCAN', 'ANALOG MODE'],
  },
  {
    num: '04', title: 'EXPERIENCE', subtitle: 'SYNTHETIC REALITY ENGINE',
    desc: 'Full environmental synthesis combining high-end gaming logic with experimental editorial aesthetics and dark space technology.',
    specs: ['PHOSPHOR CORE v4', 'GPU ACCEL', 'FULLY SYNCED'],
  },
];

export default function SystemModules() {
  const [active, setActive] = useState(null);

  return (
    <section
      id="system"
      aria-labelledby="system-heading"
      style={{ position: 'relative', width: '100%', background: '#000', padding: 'var(--space-section) 0' }}
    >
      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 var(--pad-x)' }}>

        {/* Section header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: '2rem', alignItems: 'end', marginBottom: '4rem' }}>
          <div style={{ gridColumn: 'span 7' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-400)', marginBottom: '1.25rem' }}>
              SYSTEM SPECIFICATION&nbsp;//&nbsp;004
            </p>
            <h2
              id="system-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(2.4rem, 7vw, 7.5rem)',
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: '#fff',
              }}
            >
              THE&nbsp;
              <span className="glow-text" style={{ color: 'var(--mag-200)' }}>SYSTEM.</span>
            </h2>
          </div>
          <div style={{ gridColumn: 'span 5', borderLeft: '1px solid rgba(255,255,255,0.07)', paddingLeft: '1.5rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.68rem, 1vw, 0.8rem)', lineHeight: 1.8, color: 'rgba(255,255,255,0.48)' }}>
              Four core architectural modules engineered for zero-latency transmission
              across monochrome CRT interfaces.
            </p>
          </div>
        </div>

        {/* Modules */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {MODULES.map((mod, idx) => (
            <div
              key={idx}
              className="panel"
              onMouseEnter={() => { setActive(idx); playPhosphorClick(580 + idx * 90); }}
              onMouseLeave={() => setActive(null)}
              style={{
                padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                cursor: 'pointer',
                background: active === idx
                  ? 'linear-gradient(155deg, rgba(20,0,9,0.9) 0%, rgba(0,0,0,0.95) 100%)'
                  : 'rgba(229,0,106,0.02)',
                boxShadow: active === idx ? 'var(--glow-md)' : 'none',
                transition: 'all 0.3s var(--ease-out-expo)',
              }}
            >
              {/* Top */}
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                    lineHeight: 1,
                    color: active === idx ? 'var(--mag-200)' : 'var(--mag-600)',
                    transition: 'color 0.3s',
                    ...(active === idx ? { textShadow: '0 0 16px rgba(229,0,106,0.6)' } : {}),
                  }}>
                    {mod.num}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
                    MOD&nbsp;// 0{idx + 1}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
                  letterSpacing: '-0.01em',
                  textTransform: 'uppercase',
                  color: active === idx ? 'var(--mag-200)' : '#fff',
                  transition: 'color 0.3s',
                  marginBottom: '0.4rem',
                }}>
                  {mod.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mag-500)', marginBottom: '1.25rem' }}>
                  {mod.subtitle}
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.68rem, 1vw, 0.76rem)', lineHeight: 1.75, color: 'rgba(255,255,255,0.48)' }}>
                  {mod.desc}
                </p>
              </div>

              {/* Specs */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem', marginTop: '1.5rem' }}>
                {mod.specs.map((s, si) => (
                  <div key={si} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>
                    <span style={{ color: 'var(--mag-600)' }}>›</span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>

              {/* Active bottom line */}
              <div style={{
                position: 'absolute', inset: '-1px -1px auto -1px', height: 1,
                background: active === idx ? 'var(--mag-200)' : 'transparent',
                boxShadow: active === idx ? '0 0 8px var(--mag-200)' : 'none',
                transition: 'all 0.3s',
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
