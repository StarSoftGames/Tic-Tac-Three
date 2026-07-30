import { Assets } from "../../Assets";

export class AudioManager
{
    private readonly context: AudioContext;
    private readonly soundBuffers: Map<string, AudioBuffer>;
    private readonly musicBuffers: Map<string, AudioBuffer>;
    private readonly globalGain: GainNode;
    private readonly soundGain: GainNode;
    private readonly musicGain: GainNode;
    private currentMusic: AudioBufferSourceNode | undefined;
    private _isMuted: boolean;
    private previousVolume: number;

    constructor()
    {
        this.context = Assets.audioContext;
        this.soundBuffers = Assets.soundBuffers;
        this.musicBuffers = Assets.musicBuffers;
        this.globalGain = this.context.createGain();
        this.soundGain = this.context.createGain();
        this.musicGain = this.context.createGain();
        this.currentMusic = undefined;
        this._isMuted = false;
        this.previousVolume = 1;

        this.soundGain.connect(this.globalGain);
        this.musicGain.connect(this.globalGain);
        this.globalGain.connect(this.context.destination);
        this.globalGain.connect(this.context.destination);
    }

    public get isMuted(): boolean { return this._isMuted; }

    public playSound(name: string): void
    {
        const buffer = this.soundBuffers.get(name);
        if (!buffer)
        {
            console.warn(`Sound "${name}" not found in AudioManager.`);
            return;
        }
        const source = Assets.audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(this.soundGain);
        source.start();
    }

    public playMusic(name: string): void
    {
        this.stopMusic();
        const buffer = this.musicBuffers.get(name);
        if (!buffer)
        {
            console.warn(`Music "${name}" not found in AudioManager.`);
            return;
        }
        const source = this.context.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        source.connect(this.musicGain);
        source.start();
        this.currentMusic = source;
    }

    public stopMusic(): void
    {
        if (this.currentMusic)
        {
            this.currentMusic.stop();
        }
    }

    public setSfxVolume(newVolume: number): void
    {
        this.soundGain.gain.value = newVolume;
    }

    public setMusicVolume(newVolume: number): void
    {
        this.musicGain.gain.value = newVolume;
    }

    public mute(): void
    {
        this.previousVolume = this.globalGain.gain.value;
        this.globalGain.gain.value = 0;
        this._isMuted = true;
    }

    public unMute(): void
    {
        this.globalGain.gain.value = this.previousVolume;
        this._isMuted = false;
    }
}