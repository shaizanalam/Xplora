import React from 'react';
import PhosphorImageCanvas from './PhosphorImageCanvas';
import { playPhosphorClick } from '../utils/audioSystem';

const SCENES = [
  {
    id: 'haptic',
    num: '01',
    tag: 'HAPTIC MATRIX',
    title: ['SUB-MILLIMETER', 'HAPTIC FREQUENCY.'],
    accent: 1,
    body: 'Every button input emits micro-vibrations across the phosphor lattice. Feel the recoil of photons before the visual pulse reaches the human eye.',
    meta: [['LATENCY', '0.001MS'], ['SYNAPSE', 'DIRECT'], ['MODE', 'ACTIVE']],
    layout: 'image-left',
    canvas: 'controller',
  },
  {
    id: 'signal',
    num: '02',
    tag: 'ORBITAL TELEMETRY',
    title: ['DEEP SPACE', 'SIGNAL RELAY.'],
    accent: 1,
    body: 'Transmitted from low-Earth orbit satellites directly into monochrome cathode ray tubes. Pure uncompressed digital art stream.',
    meta: [['FREQUENCY', '14.2 GHZ'], ['BANDWIDTH', '100 GB/S'], ['ORBIT', '480KM']],
    layout: 'text-left',
    canvas: 'planet',
  },
];

const FEATURES_LIST = [
  { num: '01', label: 'ANALOG', title: 'PURE PHOSPHOR',
    body: 'No backlight bleed. No liquid crystal lag. Emitters decay gracefully with natural analog light persistence.' },
  { num: '02', label: 'VECTOR', title: 'VECTOR RENDERING',
    body: 'Sharp geometric paths drawn with microscopic magnetic deflection coils at 120,000 vectors per second.' },
  { num: '03', label: 'TACTILE', title: 'TACTILE RESONANCE',
    body: 'Synthesized audio hum and physical screen feedback designed to mimic high-end gaming installations.' },
];

export default function FeatureSection() {
  return (
    <section className="relative w-full bg-black" aria-label="Features">
      <div className="section-divider" />

      {/* ── SCENES 01 & 02 — alternating image/text layouts ── */}
      {SCENES.map((scene, idx) => (
        <div key={scene.id} className="relative" style={{ padding: 'var(--space-section) 0' }}>
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12 xl:px-16">
            {/* scene label */}
            <div className={`text-label text-[10px] text-[var(--mag-400)] mb-10 ${scene.layout === 'text-left' ? 'text-right' : ''}`}>
              SCENE&nbsp;{scene.num}&nbsp;//&nbsp;{scene.tag}
            </div>

            <div
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-center
                          ${scene.layout === 'text-left' ? 'direction-rtl' : ''}`}
              style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                paddingTop: '3.5rem',
                paddingBottom: '3.5rem',
              }}
            >
              {scene.layout === 'image-left' && (
                <>
                  {/* Image */}
                  <div className="lg:col-span-7">
                    <PhosphorImageCanvas type={scene.canvas} height={500} />
                  </div>
                  {/* Text */}
                  <SceneText scene={scene} />
                </>
              )}
              {scene.layout === 'text-left' && (
                <>
                  {/* Text */}
                  <SceneText scene={scene} />
                  {/* Image */}
                  <div className="lg:col-span-7">
                    <PhosphorImageCanvas type={scene.canvas} height={500} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* ── SCENE 03 — Full-screen cinematic backdrop ── */}
      <div
        className="relative w-full overflow-hidden flex items-center justify-center"
        style={{ minHeight: '85vh' }}
      >
        <div className="absolute inset-0 dot-matrix-dense opacity-30 pointer-events-none" />
        <div className="crt-overlay" />
        <PhosphorImageCanvas
          type="grid"
          height={900}
          className="absolute inset-0 w-full h-full opacity-50"
          style={{ border: 'none', borderRadius: 0 }}
        />

        {/* Gradient overlays for legibility */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.9) 100%)' }}
        />

        <div className="relative z-20 text-center max-w-5xl px-6 space-y-10">
          <div className="tag-badge mx-auto">CINEMATIC IMMERSION&nbsp;//&nbsp;SCENE 03</div>

          <h3
            className="text-display-2xl text-white uppercase"
            style={{ textShadow: '0 0 80px rgba(0,0,0,1)' }}
          >
            NO BOUNDARIES.<br />
            <span className="text-[var(--mag-200)] glow-text-lg">ONLY SIGNAL.</span>
          </h3>

          <a
            href="#system"
            className="btn btn-solid text-xs py-4 px-10 mx-auto"
            onClick={() => playPhosphorClick(850)}
          >
            ENTER FULL IMMERSION ↗
          </a>
        </div>
      </div>

      {/* ── SCENE 04 — Editorial typography grid ── */}
      <div style={{ padding: 'var(--space-section) 0' }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 xl:px-16">
          <div className="text-label text-[10px] text-[var(--mag-400)] mb-14">
            SCENE 04&nbsp;//&nbsp;EDITORIAL FEATURE MATRIX
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-0"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            {FEATURES_LIST.map((f, i) => (
              <div
                key={i}
                className="panel p-8 xl:p-10 space-y-5"
                style={{
                  borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.07)',
                  borderTop: 'none',
                  borderRight: 'none',
                  borderBottom: 'none',
                  background: 'transparent',
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-label text-[9px] text-[var(--mag-400)]">{f.num}</span>
                  <span className="accent-line w-10" />
                  <span className="text-label text-[9px] text-white/35">{f.label}</span>
                </div>
                <h4 className="text-display-md text-white uppercase">{f.title}</h4>
                <p className="font-mono text-[12px] text-white/55 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-divider" />
    </section>
  );
}

/* ── Scene text sub-component ── */
function SceneText({ scene }) {
  return (
    <div className="lg:col-span-5 space-y-7">
      <span className="text-label text-[10px] text-white/35">FEATURE&nbsp;//&nbsp;{scene.num}</span>
      <h3 className="text-display-lg text-white uppercase">
        {scene.title[0]}<br />
        <span className="text-[var(--mag-200)] glow-text">{scene.title[1]}</span>
      </h3>
      <p className="font-mono text-[13px] text-white/60 leading-relaxed">{scene.body}</p>
      <div
        className="flex flex-wrap gap-x-8 gap-y-2 pt-4 text-label text-[10px]"
        style={{ borderLeft: '2px solid var(--mag-200)', paddingLeft: '1rem' }}
      >
        {scene.meta.map(([k, v]) => (
          <div key={k} className="flex gap-2 text-white/55">
            <span className="text-[var(--mag-500)]">{k}:</span>
            <span>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
