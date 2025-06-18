
class AudioManagerClass {
  private sounds: { [key: string]: HTMLAudioElement } = {};
  private backgroundMusic: HTMLAudioElement | null = null;

  constructor() {
    this.initializeSounds();
  }

  private initializeSounds() {
    // Create audio contexts for different sounds
    this.sounds.success = this.createBeepSound(800, 0.1);
    this.sounds.error = this.createNoiseSound(0.2);
    this.sounds.coffee = this.createCoffeeSound();
    this.sounds.bell = this.createBellSound();
  }

  private createBeepSound(frequency: number, duration: number): HTMLAudioElement {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    // Convert to audio element for easier management
    const audio = new Audio();
    audio.volume = 0.3;
    return audio;
  }

  private createNoiseSound(duration: number): HTMLAudioElement {
    const audio = new Audio();
    audio.volume = 0.2;
    return audio;
  }

  private createCoffeeSound(): HTMLAudioElement {
    const audio = new Audio();
    audio.volume = 0.4;
    return audio;
  }

  private createBellSound(): HTMLAudioElement {
    const audio = new Audio();
    audio.volume = 0.5;
    return audio;
  }

  playSuccess() {
    // Simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  }

  playError() {
    // Static noise sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const bufferSize = 2 * audioContext.sampleRate;
    const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    const whiteNoise = audioContext.createBufferSource();
    const gainNode = audioContext.createGain();
    
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    whiteNoise.start(audioContext.currentTime);
    whiteNoise.stop(audioContext.currentTime + 0.2);
  }

  playCoffeeBrewing() {
    console.log('Coffee brewing sound effect');
    // In a real implementation, this would play a coffee brewing sound
  }

  playBellChime() {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
  }

  startBackgroundMusic() {
    console.log('Background music started');
    // In a real implementation, this would start ambient music
  }

  stopBackgroundMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    }
  }
}

const AudioManager = new AudioManagerClass();
export default AudioManager;
