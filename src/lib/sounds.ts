const audioCtx = typeof window !== "undefined" ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

function playTone(freq: number, duration: number, type: OscillatorType = "sine", vol = 0.08) {
  if (!audioCtx) return;
  if (audioCtx.state === "suspended") audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(vol, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

export function playFlipSound() {
  playTone(800, 0.1, "sine", 0.06);
}

export function playMatchSound() {
  playTone(523, 0.15, "sine", 0.1);
  setTimeout(() => playTone(659, 0.15, "sine", 0.1), 100);
  setTimeout(() => playTone(784, 0.2, "sine", 0.1), 200);
}

export function playMismatchSound() {
  playTone(300, 0.15, "triangle", 0.05);
}

export function playWinSound() {
  [523, 659, 784, 1047].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.3, "sine", 0.08), i * 150);
  });
}

export function playSwapSound() {
  playTone(400, 0.12, "sawtooth", 0.04);
  setTimeout(() => playTone(600, 0.12, "sawtooth", 0.04), 80);
}

export function playLevelUpSound() {
  [440, 554, 659, 880].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.25, "sine", 0.1), i * 120);
  });
}

let bgMusic: HTMLAudioElement | null = null;

export function startBgMusic() {
  if (bgMusic) { bgMusic.play(); return; }
  bgMusic = new Audio("/audio/love_me_not.mp3");
  bgMusic.loop = true;
  bgMusic.volume = 0.25;
  bgMusic.currentTime = 0;
  bgMusic.play().catch(() => {});
}

export function stopBgMusic() {
  if (bgMusic) { bgMusic.pause(); }
}
