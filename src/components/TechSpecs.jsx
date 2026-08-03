import React, { useState, useEffect } from 'react';
import { playPhosphorClick } from '../utils/audioSystem';

const BASE_SPECS = [
  { label: 'SYSTEM RESOLUTION',  base: '12,480,000 DOTS',           status: 'OPTICAL'      },
  { label: 'DISPLAY MATRIX',     base: 'MONOCHROME MAGENTA',         status: 'CRT-535'      },
  { label: 'SIGNAL PROTOCOL',    base: null,                          status: 'STABLE',  live: true },
  { label: 'RENDER ENGINE',      base: null,                          status: 'GPU-ACCEL', live: true },
  { label: 'PERSISTENCE DECAY',  base: '0.04 MILLISECONDS',           status: 'ANALOG'       },
  { label: 'COLOR HARMONICS',    base: '#FF007F // PURE BLACK',       status: 'MONOCHROME'   },
  { label: 'DYNAMIC RANGE',      base: '1:1,000,000 CONTRAST',        status: 'INFINITE'     },
  { label: 'AUDIO SYNTHESIS',    base: '60HZ CRT HUM + SQUARE WAVE',  status: 'WEB-AUDIO'    },
];

const BARS = [38, 62, 80, 44, 95, 72, 86, 30, 91, 100, 58, 74, 87, 49, 93, 40, 68, 83];

export default function TechSpecs() {
  const [signal, setSignal] = useState(98.4);
  const [fps,    setFps]    = useState(240);

  useEffect(() => {
    const id = setInterval(() => {
      setSignal(+(98 + Math.random() * 1.9).toFixed(2));
      setFps(237 + Math.floor(Math.random() * 6));
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const specs = BASE_SPECS.map(s => ({
    ...s,
    val: s.live
      ? s.label.includes('SIGNAL') ? `ACTIVE // ${signal}%` : `REAL-TIME (${fps} FPS)`
      : s.base,
  }));

  return (
    <section
      id="tech"
      className="relative w-full bg-black"
      style={{ padding: 'var(--space-section) 0' }}
      aria-labelledby="tech-heading"
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 xl:px-16">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-20">
          <div>
            <span className="text-label text-[10px] text-[var(--mag-400)] block mb-4">
              EXPERIMENTAL SPECIFICATION&nbsp;//&nbsp;005
            </span>
            <h2 id="tech-heading" className="text-display-xl text-white uppercase">
              TECHNICAL&nbsp;<span className="text-[var(--mag-200)] glow-text">SPECS.</span>
            </h2>
          </div>

          {/* Live system badge */}
          <div
            className="flex items-center gap-3 px-5 py-3 font-mono text-[11px] self-start sm:self-end"
            style={{ border: '1px solid rgba(255,0,127,0.25)', background: 'rgba(255,0,127,0.04)' }}
          >
            <span className="live-dot" />
            <span className="text-white/50">STATUS</span>
            <span className="text-[var(--mag-200)] font-bold">DIAGNOSTIC RUNNING</span>
          </div>
        </div>

        {/* ── Spec grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 xl:gap-4">
          {specs.map((spec, idx) => (
            <div
              key={idx}
              onClick={() => playPhosphorClick(480 + idx * 50)}
              className="panel flex flex-col justify-between p-6 xl:p-7 cursor-pointer"
            >
              {/* Top */}
              <div>
                <div
                  className="flex items-center justify-between text-label text-[9px] text-white/35 mb-5"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.75rem' }}
                >
                  <span>SPEC&nbsp;// 0{idx + 1}</span>
                  <span className="text-[var(--mag-500)]">{spec.status}</span>
                </div>

                <div className="font-mono text-[11px] text-white/45 tracking-wide mb-2">{spec.label}</div>
                <div className="font-display font-extrabold text-xl xl:text-2xl text-white group-hover:text-[var(--mag-200)] transition-colors tracking-tight leading-snug">
                  {spec.val}
                </div>
              </div>

              {/* Bottom */}
              <div
                className="mt-6 pt-4 flex items-center justify-between font-mono text-[9px] text-white/25"
                style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
              >
                <span>VERIFIED</span>
                <span className="live-dot" style={{ width: 5, height: 5 }} />
              </div>
            </div>
          ))}
        </div>

        {/* ── Live spectrum visualizer ── */}
        <div
          className="mt-10 p-7 xl:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          style={{ border: '1px solid rgba(255,0,127,0.2)', background: 'rgba(255,0,127,0.025)' }}
        >
          <div className="space-y-2 shrink-0">
            <div className="font-mono text-[11px] text-[var(--mag-200)] font-bold tracking-widest">
              REAL-TIME SIGNAL SPECTRUM
            </div>
            <p className="font-mono text-[11px] text-white/45">
              Live phosphor dot density wave monitor.
            </p>
          </div>

          {/* Bar visualizer */}
          <div className="flex items-end gap-0.5 h-14 w-full md:w-80 lg:w-96 pb-1"
               style={{ borderBottom: '1px solid rgba(255,0,127,0.3)' }}>
            {BARS.map((h, i) => (
              <div
                key={i}
                className="flex-1 transition-all duration-300 hover:bg-white"
                style={{
                  height: `${h}%`,
                  background: `rgba(255,0,127,${0.35 + (i % 4) * 0.17})`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
