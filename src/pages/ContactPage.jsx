import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import PhosphorImageCanvas from '../components/PhosphorImageCanvas';

// Inline SVG social icons
const YoutubeSVG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);
const InstagramSVG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const LinkedinSVG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function ContactPage() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [sent, setSent]     = useState(false);
  const [focused, setFocus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  const inputStyle = (field) => ({
    width: '100%',
    background: focused === field ? 'rgba(229,0,106,0.03)' : 'transparent',
    border: `1px solid ${focused === field ? 'var(--mag-200)' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: 0,
    color: '#fff',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.78rem',
    letterSpacing: '0.04em',
    padding: '1rem 1.25rem',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
    boxShadow: focused === field ? 'var(--glow-sm)' : 'none',
    resize: 'none',
  });

  const SOCIALS = [
    { Icon: YoutubeSVG,   label: 'YOUTUBE',   href: 'https://www.youtube.com/@atlclubkps/videos' },
    { Icon: InstagramSVG, label: 'INSTAGRAM', href: 'https://www.instagram.com/xplora.kps/' },
    { Icon: LinkedinSVG,  label: 'LINKEDIN',  href: 'https://www.linkedin.com/company/techfest-xplora/' },
  ];

  return (
    <div style={{ width: '100%', background: '#000', minHeight: '100vh', paddingTop: '6rem', position: 'relative', overflow: 'hidden' }}>
      {/* Background canvas elements */}
      <div className="dot-matrix-bg" style={{ position: 'absolute', inset: 0, opacity: 0.12, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: '0 0 50% 0', background: 'radial-gradient(circle at 50% 0%, rgba(229,0,106,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1600, margin: '0 auto', padding: '0 var(--pad-x)' }}>

        {/* ── Page header (editorial style) ── */}
        <div style={{ paddingTop: '3rem', paddingBottom: '3.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '4.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '2.5rem' }}>
            <span style={{ width: 6, height: 6, background: 'var(--mag-200)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-400)' }}>
              CONTACT PROTOCOL&nbsp;//&nbsp;XPLORA 6.0
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
                INITIATE<br />
                <span className="glow-text-lg" style={{ color: 'var(--mag-200)' }}>CONTACT.</span>
              </h1>
            </div>
            <div style={{ gridColumn: 'span 5', borderLeft: '1px solid rgba(229,0,106,0.2)', paddingLeft: '1.75rem' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', marginBottom: '1.25rem' }}>
                Secure transmission line established. Reach out for registration details, sponsorship inquiries, or general questions about Xplora Techfest.
              </p>
              <div style={{ display: 'flex', gap: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)' }}>
                <span>ENCRYPTED :: YES</span>
                <span>STATUS :: ONLINE</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Content Grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'clamp(3rem,6vw,6rem)', marginBottom: '8rem', alignItems: 'start' }}>

          {/* LEFT: Info & Canvas */}
          <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>

            {/* Direct Line */}
            <div style={{ borderLeft: '2px solid var(--mag-200)', paddingLeft: '1.5rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-500)', marginBottom: '0.75rem' }}>
                // DIRECT LINE
              </p>
              <a href="mailto:info@xplorakps.tech" style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 900,
                color: '#fff', textDecoration: 'none', letterSpacing: '0.02em',
                display: 'flex', alignItems: 'center', gap: 14,
                transition: 'color 0.25s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--mag-200)'}
                onMouseLeave={e => e.currentTarget.style.color = '#fff'}
              >
                <Mail style={{ width: 24, height: 24, color: 'var(--mag-200)', flexShrink: 0 }} />
                info@xplorakps.tech
              </a>
            </div>

            {/* Social Network */}
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-500)', marginBottom: '1.25rem' }}>
                // SOCIAL NETWORK
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {SOCIALS.map(({ Icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="panel"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: '1.1rem 1.5rem', textDecoration: 'none',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--mag-200)';
                      e.currentTarget.style.background = 'linear-gradient(155deg, rgba(20,0,9,0.8) 0%, rgba(0,0,0,0.95) 100%)';
                      e.currentTarget.style.boxShadow = 'var(--glow-sm)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                      e.currentTarget.style.background = 'rgba(229,0,106,0.02)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ color: 'var(--mag-200)' }}><Icon /></div>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff' }}>
                      {label}
                    </span>
                    <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--mag-500)' }}>↗</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Visual element */}
            <div style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
              <PhosphorImageCanvas type="grid" height={220} />
            </div>

          </div>

          {/* RIGHT: Contact Form */}
          <div style={{ gridColumn: 'span 7' }}>
            <div className="panel" style={{ padding: 'clamp(2.5rem,5vw,4.5rem)', background: 'linear-gradient(160deg, rgba(229,0,106,0.03) 0%, rgba(0,0,0,0) 100%)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--mag-400)', marginBottom: '3rem' }}>
                // SECURE TRANSMISSION FORM
              </p>

              {sent ? (
                <div style={{ textAlign: 'center', padding: '6rem 2rem', border: '1px dashed rgba(229,0,106,0.3)', background: 'rgba(229,0,106,0.05)' }}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontWeight: 900,
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)', textTransform: 'uppercase',
                    color: 'var(--mag-200)', letterSpacing: '-0.02em',
                    textShadow: '0 0 30px rgba(229,0,106,0.6)',
                  }}>
                    SIGNAL SENT.
                  </div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', marginTop: '1.25rem', letterSpacing: '0.02em' }}>
                    Transmission received. We'll respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
                    <div>
                      <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-500)', display: 'block', marginBottom: '0.75rem' }}>
                        IDENTIFICATION // NAME
                      </label>
                      <input
                        type="text" required placeholder="Enter your name"
                        value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        onFocus={() => setFocus('name')} onBlur={() => setFocus(null)}
                        style={inputStyle('name')}
                      />
                    </div>
                    <div>
                      <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-500)', display: 'block', marginBottom: '0.75rem' }}>
                        ROUTING // EMAIL
                      </label>
                      <input
                        type="email" required placeholder="Enter your email"
                        value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        onFocus={() => setFocus('email')} onBlur={() => setFocus(null)}
                        style={inputStyle('email')}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-500)', display: 'block', marginBottom: '0.75rem' }}>
                      TRANSMISSION PAYLOAD // MESSAGE
                    </label>
                    <textarea
                      required rows={7} placeholder="Type your message here..."
                      value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      onFocus={() => setFocus('message')} onBlur={() => setFocus(null)}
                      style={inputStyle('message')}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', flexWrap: 'wrap', gap: 16 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.54rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="live-dot" style={{ width: 4, height: 4 }} />
                      ALL SIGNALS ARE ENCRYPTED
                    </div>
                    <button type="submit" className="btn btn-solid" style={{ padding: '1.2rem 3rem', justifyContent: 'center', gap: 12, fontSize: '0.75rem' }}>
                      <Send style={{ width: 14, height: 14 }} />
                      TRANSMIT
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
