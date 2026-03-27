// Procedural retro sound effects and music using Web Audio API
class SoundManager {
    constructor() {
        this.ctx = null;
        this.musicGain = null;
        this.sfxGain = null;
        this.musicPlaying = false;
        this.musicNodes = [];
        this.musicVolume = 0.25;
        this.sfxVolume = 0.5;
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.musicGain = this.ctx.createGain();
            this.musicGain.gain.value = this.musicVolume;
            this.musicGain.connect(this.ctx.destination);
            this.sfxGain = this.ctx.createGain();
            this.sfxGain.gain.value = this.sfxVolume;
            this.sfxGain.connect(this.ctx.destination);
            this.initialized = true;
        } catch (e) {
            console.warn('Web Audio not supported');
        }
    }

    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // --- Sound Effects ---

    playJump() {
        if (!this.ctx) return;
        this.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(300, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 0.15);
    }

    playCollect() {
        if (!this.ctx) return;
        this.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523, this.ctx.currentTime);
        osc.frequency.setValueAtTime(659, this.ctx.currentTime + 0.06);
        osc.frequency.setValueAtTime(784, this.ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 0.2);
    }

    playCombo() {
        if (!this.ctx) return;
        this.resume();
        // Quick ascending arpeggio
        const notes = [523, 659, 784, 1047];
        notes.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'square';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.2, this.ctx.currentTime + i * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + i * 0.05 + 0.1);
            osc.connect(gain);
            gain.connect(this.sfxGain);
            osc.start(this.ctx.currentTime + i * 0.05);
            osc.stop(this.ctx.currentTime + i * 0.05 + 0.1);
        });
    }

    playHit() {
        if (!this.ctx) return;
        this.resume();
        // Noise burst + low thud
        const bufferSize = this.ctx.sampleRate * 0.2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
        noise.connect(noiseGain);
        noiseGain.connect(this.sfxGain);
        noise.start(this.ctx.currentTime);

        // Low thud
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 0.25);
    }

    playGameOver() {
        if (!this.ctx) return;
        this.resume();
        // Descending sad tones
        const notes = [440, 370, 311, 261];
        notes.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.3, this.ctx.currentTime + i * 0.25);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + i * 0.25 + 0.3);
            osc.connect(gain);
            gain.connect(this.sfxGain);
            osc.start(this.ctx.currentTime + i * 0.25);
            osc.stop(this.ctx.currentTime + i * 0.25 + 0.3);
        });
    }

    playButtonClick() {
        if (!this.ctx) return;
        this.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.value = 800;
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 0.05);
    }

    playNewHighScore() {
        if (!this.ctx) return;
        this.resume();
        // Celebratory fanfare
        const notes = [523, 659, 784, 1047, 784, 1047];
        const durations = [0.12, 0.12, 0.12, 0.2, 0.12, 0.3];
        let time = this.ctx.currentTime;
        notes.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'square';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.25, time);
            gain.gain.exponentialRampToValueAtTime(0.01, time + durations[i]);
            osc.connect(gain);
            gain.connect(this.sfxGain);
            osc.start(time);
            osc.stop(time + durations[i] + 0.02);
            time += durations[i];
        });
    }

    // --- Background Music ---

    startMusic(type) {
        if (!this.ctx) return;
        this.stopMusic();
        this.resume();
        this.musicPlaying = true;

        if (type === 'menu') {
            this._playMenuMusic();
        } else if (type === 'game') {
            this._playGameMusic();
        }
    }

    stopMusic() {
        this.musicPlaying = false;
        this.musicNodes.forEach(node => {
            try { node.stop(); } catch(e) {}
        });
        this.musicNodes = [];
    }

    _playMenuMusic() {
        // Gentle looping melody
        const melody = [
            { note: 392, dur: 0.4 },  // G4
            { note: 440, dur: 0.4 },  // A4
            { note: 523, dur: 0.6 },  // C5
            { note: 440, dur: 0.4 },  // A4
            { note: 392, dur: 0.4 },  // G4
            { note: 349, dur: 0.6 },  // F4
            { note: 330, dur: 0.4 },  // E4
            { note: 349, dur: 0.4 },  // F4
            { note: 392, dur: 0.8 },  // G4
            { note: 0, dur: 0.4 },    // rest
        ];
        this._loopMelody(melody, 'sine', 0.12, 0);
    }

    _playGameMusic() {
        // Upbeat game loop - bass line
        const bass = [
            { note: 131, dur: 0.25 }, // C3
            { note: 131, dur: 0.25 },
            { note: 165, dur: 0.25 }, // E3
            { note: 165, dur: 0.25 },
            { note: 175, dur: 0.25 }, // F3
            { note: 175, dur: 0.25 },
            { note: 165, dur: 0.25 }, // E3
            { note: 147, dur: 0.25 }, // D3
        ];

        // Melody line
        const melody = [
            { note: 523, dur: 0.2 },  // C5
            { note: 0, dur: 0.05 },
            { note: 523, dur: 0.2 },  // C5
            { note: 0, dur: 0.05 },
            { note: 659, dur: 0.3 },  // E5
            { note: 0, dur: 0.2 },
            { note: 587, dur: 0.2 },  // D5
            { note: 523, dur: 0.3 },  // C5
            { note: 0, dur: 0.2 },
            { note: 440, dur: 0.3 },  // A4
        ];

        this._loopMelody(bass, 'triangle', 0.15, 0);
        this._loopMelody(melody, 'square', 0.08, 0.1);
    }

    _loopMelody(notes, waveType, volume, startDelay) {
        if (!this.musicPlaying || !this.ctx) return;

        let totalDuration = notes.reduce((sum, n) => sum + n.dur, 0);
        let time = this.ctx.currentTime + startDelay;

        notes.forEach(({ note, dur }) => {
            if (note > 0) {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = waveType;
                osc.frequency.value = note;
                gain.gain.setValueAtTime(volume, time);
                gain.gain.setValueAtTime(volume, time + dur * 0.7);
                gain.gain.linearRampToValueAtTime(0, time + dur * 0.95);
                osc.connect(gain);
                gain.connect(this.musicGain);
                osc.start(time);
                osc.stop(time + dur);
                this.musicNodes.push(osc);
            }
            time += dur;
        });

        // Schedule next loop
        const loopTimeout = setTimeout(() => {
            if (this.musicPlaying) {
                this._loopMelody(notes, waveType, volume, 0);
            }
        }, (totalDuration + startDelay) * 1000);

        // Store timeout for cleanup
        this._loopTimeout = this._loopTimeout || [];
        this._loopTimeout.push(loopTimeout);
    }

    setMusicVolume(vol) {
        this.musicVolume = vol;
        if (this.musicGain) this.musicGain.gain.value = vol;
    }

    setSfxVolume(vol) {
        this.sfxVolume = vol;
        if (this.sfxGain) this.sfxGain.gain.value = vol;
    }
}

// Global instance
const soundManager = new SoundManager();
