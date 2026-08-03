// Web Audio API synthesizer for retro phosphor audio feedback
let audioCtx = null;
let humOsc = null;
let humGain = null;
let soundEnabled = false;

export const initAudio = () => {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const toggleAudio = () => {
  initAudio();
  soundEnabled = !soundEnabled;
  
  if (soundEnabled && audioCtx) {
    startPhosphorHum();
    playPhosphorClick(880, 0.08);
  } else {
    stopPhosphorHum();
  }
  return soundEnabled;
};

export const getAudioState = () => soundEnabled;

export const playPhosphorClick = (freq = 600, duration = 0.04) => {
  if (!soundEnabled || !audioCtx) return;
  
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + duration);

    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Ignore audio errors
  }
};

export const playPhosphorBlip = () => {
  if (!soundEnabled || !audioCtx) return;
  playPhosphorClick(1200, 0.03);
};

const startPhosphorHum = () => {
  if (!audioCtx) return;
  try {
    humOsc = audioCtx.createOscillator();
    humGain = audioCtx.createGain();

    humOsc.type = 'sine';
    humOsc.frequency.setValueAtTime(60, audioCtx.currentTime); // 60Hz CRT Hum

    humGain.gain.setValueAtTime(0.008, audioCtx.currentTime);

    humOsc.connect(humGain);
    humGain.connect(audioCtx.destination);

    humOsc.start();
  } catch (e) {
    // Ignore
  }
};

const stopPhosphorHum = () => {
  if (humGain && audioCtx) {
    try {
      humGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);
      setTimeout(() => {
        if (humOsc) {
          humOsc.stop();
          humOsc.disconnect();
          humOsc = null;
        }
      }, 300);
    } catch (e) {
      // Ignore
    }
  }
};
