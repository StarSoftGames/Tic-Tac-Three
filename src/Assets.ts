export class Assets
{
    public static readonly emptyImage = new Image;

    public static readonly audioContext = new AudioContext();
    public static readonly soundBuffers = new Map<string, AudioBuffer>();
    public static readonly musicBuffers = new Map<string, AudioBuffer>();

    private static readonly rawImageUrls = import.meta.glob<string>("./assets/images/**/*.{png,jpg,jpeg}", {eager: true, import: "default" });
    private static readonly imagePaths: Map<string, string> = new Map();
    private static readonly images: Map<string, HTMLImageElement> = new Map();

    private static readonly rawSoundUrls = import.meta.glob<string>("./assets/sfx/**/*.{mp3,wav}", {eager: true, import: "default" });
    private static readonly soundPaths: Map<string, string> = new Map();

    private static readonly rawMusicUrls = import.meta.glob<string>("./assets/music/**/*.{mp3,wav}", {eager: true, import: "default" });
    private static readonly musicPaths: Map<string, string> = new Map();

    public static async load()
    {
        for (const [path, url] of Object.entries(this.rawImageUrls))
        {
            const key = path
                .replace("./assets/images/", "")
                .replace(/\.[^.]+$/, "");

            this.imagePaths.set(key, url);
            this.images.set(key, new Image());
            this.images.get(key)!.src = url;
            //console.log(`Loaded image: ${key} from ${url}`);
        }

        for (const [path, url] of Object.entries(this.rawSoundUrls))
        {
            const key = path
                .replace("./assets/sfx/", "")
                .replace(/\.[^.]+$/, "");

            this.soundPaths.set(key, url);
            //console.log(`Loaded sound: ${key} from ${url}`);
        }

        for (const [path, url] of Object.entries(this.rawMusicUrls))
        {
            const key = path
                .replace("./assets/music/", "")
                .replace(/\.[^.]+$/, "");

            this.musicPaths.set(key, url);
            //console.log(`Loaded music: ${key} from ${url}`);
        }

        for (const image of this.images.values())
        {
            await image.decode();
        }

        for (const [key, url] of this.soundPaths)
        {
            await this.loadSound(key, url);
        }

        for (const [key, url] of this.musicPaths)
        {
            await this.loadMusic(key, url);
        }
    }

    private static async loadSound(name: string, path: string): Promise<void>
    {
        const response = await fetch(path);
        const data = await response.arrayBuffer();
        const buffer = await this.audioContext.decodeAudioData(data);
        this.soundBuffers.set(name, buffer);
    }

    private static async loadMusic(name: string, path: string): Promise<void>
    {
        const response = await fetch(path);
        const data = await response.arrayBuffer();
        const buffer = await this.audioContext.decodeAudioData(data);
        this.musicBuffers.set(name, buffer);
    }

    public static getImage(key: string): HTMLImageElement
    {
        let res = this.emptyImage;
        if (!this.images.has(key))
        {
            console.warn(`Image "${key}" not found in Assets.`);
        }
        else
        {
            res = this.images.get(key)!;
        }
        return res;
    }

}