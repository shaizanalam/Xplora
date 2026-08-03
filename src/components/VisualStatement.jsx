import React from 'react';
import PhosphorImageCanvas from './PhosphorImageCanvas';
import { playPhosphorClick } from '../utils/audioSystem';

export default function VisualStatement() {
  return (
    <section
      className="relative w-full bg-black overflow-hidden"
      style={{ padding: 'var(--space-section) 0' }}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 xl:px-16">

        {/* ── Section label ── */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <span className="w-1.5 h-1.5 bg-[var(--mag-200)]" />
            <span className="text-label text-[10px] text-[var(--mag-400)]">VISUAL STATEMENT&nbsp;//&nbsp;003</span>
          </div>
          <span className="text-label text-[10px] text-white/25 hidden sm:block">OPTICAL DOT ARCHITECTURE</span>
        </div>

        {/* ── Asymmetric grid: 65% visual / 35% text ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-stretch">

          {/* Visual canvas — 8/12 cols */}
          <div className="lg:col-span-8 relative group">
            <PhosphorImageCanvas type="controller" height={540} className="h-full min-h-[400px]" />

            {/* Floating metadata pill — bottom-left */}
            <div
              className="absolute bottom-5 left-5 font-mono text-[10px] bg-black/90 px-4 py-3 space-y-1.5"
              style={{ border: '1px solid rgba(255,0,127,0.3)' }}
            >
              <div className="text-[var(--mag-100)] font-bold tracking-widest">EMISSION SIGNAL DETECTED</div>
              <div className="text-white/50">LATENCY&nbsp;::&nbsp;0.04ms</div>
              <div className="text-white/50">DENSITY&nbsp;::&nbsp;4,800 DOTS / SQ INCH</div>
            </div>
          </div>

          {/* Text panel — 4/12 cols */}
          <div
            className="lg:col-span-4 flex flex-col justify-between p-8 xl:p-10"
            style={{ background: 'linear-gradient(160deg, var(--mag-800) 0%, #000 60%)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            {/* Top */}
            <div>
              <span className="text-label text-[10px] text-[var(--mag-400)] block mb-6">ARCHITECTURE&nbsp;//&nbsp;ENGINE</span>

              <h3 className="text-display-md text-white uppercase leading-tight mb-6">
                SYSTEM <br />
                <span className="text-[var(--mag-200)] glow-text">PHOSPHOR</span><br />
                ENGINE.
              </h3>

              <p className="font-mono text-[13px] text-white/60 leading-relaxed tracking-wide">
                Traditional displays frame the action. Phosphor projects the signal directly into
                the user's field of vision using dynamic monochrome LED array reconstruction.
              </p>
            </div>

            {/* Bottom metadata grid */}
            <div
              className="pt-8 mt-8 space-y-6"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="grid grid-cols-2 gap-6 font-mono text-[11px]">
                <div>
                  <div className="text-white/35 mb-1">COLOR MODEL</div>
                  <div className="text-white font-bold">MONOCHROME 535nm</div>
                </div>
                <div>
                  <div className="text-white/35 mb-1">LUMINANCE</div>
                  <div className="text-[var(--mag-200)] font-bold glow-text">12,000 NITS</div>
                </div>
              </div>

              <button
                onClick={() => playPhosphorClick(750)}
                className="btn btn-outline w-full text-center justify-center py-3 text-[11px]"
              >
                READ TECHNICAL REPORT →
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
