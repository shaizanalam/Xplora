import React, { useState } from 'react';
import { Send, UserCheck } from 'lucide-react';
import PhosphorImageCanvas from '../components/PhosphorImageCanvas';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', institution: '', event: 'HACKATHON', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [focused, setFocus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    
    try {
      if (!form.email.includes('@') || !form.email.includes('.')) {
        throw new Error('Please enter a valid email address.');
      }
      if (form.institution.trim().length < 2) {
        throw new Error('Please enter a valid institution name.');
      }

      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      if (response.ok) {
        setStatus('success');
        setForm({ name: '', email: '', institution: '', event: 'HACKATHON', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to register.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
    }
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
  });

  return (
    <div style={{ width: '100%', background: '#000', minHeight: '100vh', paddingTop: '6rem', position: 'relative', overflow: 'hidden' }}>
      <div className="dot-matrix-bg" style={{ position: 'absolute', inset: 0, opacity: 0.12, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: '0 0 50% 0', background: 'radial-gradient(circle at 50% 0%, rgba(229,0,106,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1000, margin: '0 auto', padding: '0 var(--pad-x)' }}>
        
        {/* Header */}
        <div style={{ paddingTop: '3rem', paddingBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '3rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16, marginBottom: '2rem' }}>
            <span style={{ width: 6, height: 6, background: 'var(--mag-200)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-400)' }}>
              REGISTRATION PORTAL&nbsp;//&nbsp;XPLORA 6.0
            </span>
            <span style={{ width: 6, height: 6, background: 'var(--mag-200)' }} />
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: 'clamp(3rem, 8vw, 7.5rem)', lineHeight: 0.87, letterSpacing: '-0.025em',
            textTransform: 'uppercase', color: '#fff',
          }}>
            SECURE YOUR<br />
            <span className="glow-text-lg" style={{ color: 'var(--mag-200)' }}>SPOT.</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '1.5rem auto 0' }}>
            Enter your details below to register for Xplora Techfest. Ensure all information is accurate to confirm your entry pass and event allocations.
          </p>
        </div>

        {/* Form Container */}
        <div className="panel" style={{ padding: 'clamp(2rem,5vw,4rem)', background: 'linear-gradient(160deg, rgba(229,0,106,0.03) 0%, rgba(0,0,0,0) 100%)', marginBottom: '8rem' }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', border: '1px dashed rgba(229,0,106,0.3)', background: 'rgba(229,0,106,0.05)' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 900,
                fontSize: 'clamp(2rem, 4vw, 3rem)', textTransform: 'uppercase',
                color: 'var(--mag-200)', letterSpacing: '-0.02em',
                textShadow: '0 0 30px rgba(229,0,106,0.6)',
              }}>
                REGISTRATION CONFIRMED.
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', marginTop: '1.25rem' }}>
                Your pass has been generated. Further instructions will be sent to your email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {status === 'error' && (
                <div style={{ padding: '1rem', border: '1px solid rgba(255,0,0,0.5)', background: 'rgba(255,0,0,0.1)', color: '#ff6b6b', fontFamily: 'var(--font-sans)', fontSize: '0.85rem' }}>
                  REGISTRATION ERROR: {errorMsg}
                </div>
              )}
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-500)', display: 'block', marginBottom: '0.75rem' }}>
                    FULL NAME
                  </label>
                  <input
                    type="text" required placeholder="John Doe"
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    onFocus={() => setFocus('name')} onBlur={() => setFocus(null)}
                    style={inputStyle('name')}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-500)', display: 'block', marginBottom: '0.75rem' }}>
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email" required placeholder="john@example.com"
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    onFocus={() => setFocus('email')} onBlur={() => setFocus(null)}
                    style={inputStyle('email')}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-500)', display: 'block', marginBottom: '0.75rem' }}>
                    INSTITUTION / COLLEGE
                  </label>
                  <input
                    type="text" required placeholder="e.g. Krishna Public School"
                    value={form.institution} onChange={e => setForm(f => ({ ...f, institution: e.target.value }))}
                    onFocus={() => setFocus('institution')} onBlur={() => setFocus(null)}
                    style={inputStyle('institution')}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-500)', display: 'block', marginBottom: '0.75rem' }}>
                    PRIMARY EVENT
                  </label>
                  <select
                    value={form.event} onChange={e => setForm(f => ({ ...f, event: e.target.value }))}
                    onFocus={() => setFocus('event')} onBlur={() => setFocus(null)}
                    style={{ ...inputStyle('event'), appearance: 'none', cursor: 'pointer', background: 'rgba(0,0,0,0.5)' }}
                  >
                    <option value="HACKATHON">HACKATHON</option>
                    <option value="CODE WARS">CODE WARS</option>
                    <option value="ROBO DANGAL">ROBO DANGAL</option>
                    <option value="AI TALKS">AI TALKS</option>
                    <option value="GAMING">GAMING</option>
                    <option value="VR">VR</option>
                    <option value="OTHER">OTHER (Specify in message)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--mag-500)', display: 'block', marginBottom: '0.75rem' }}>
                  ADDITIONAL TEAM MEMBERS / NOTES (OPTIONAL)
                </label>
                <textarea
                  rows={4} placeholder="Any extra information..."
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  onFocus={() => setFocus('message')} onBlur={() => setFocus(null)}
                  style={{ ...inputStyle('message'), resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', flexWrap: 'wrap', gap: 16, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.54rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="live-dot" style={{ width: 4, height: 4 }} />
                  DATA ENCRYPTED & SECURE
                </div>
                <button type="submit" disabled={status === 'loading'} className="btn btn-solid" style={{ padding: '1.2rem 3.5rem', justifyContent: 'center', gap: 12, fontSize: '0.8rem', opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}>
                  <UserCheck style={{ width: 16, height: 16 }} />
                  {status === 'loading' ? 'SUBMITTING...' : 'COMPLETE REGISTRATION'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
