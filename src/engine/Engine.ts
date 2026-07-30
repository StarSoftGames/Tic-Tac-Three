import { AudioManager } from "./core/AudioManager.js";
import { CollisionDetection } from "./core/CollisionDetection.js";
import { EngineConstants } from "./core/EngineConstants.js";
import { EngineGlobals } from "./core/EngineGlobals.js";
import { EventSystem } from "./core/EventSystem.js";
import { InputManager } from "./core/InputManager.js";
import type { Scene } from "./scenes/Scene.js";

export class Engine
{
    private isFullscreen: boolean;
    private previousTime: number;
    private updateCallback: FrameRequestCallback;

    constructor(canvas: HTMLCanvasElement)
    {
        EngineGlobals.engine = this;
        EngineGlobals.canvas = canvas;
        EngineGlobals.canvas.focus();
        EngineGlobals.canvas.style.backgroundColor = "black";
        EngineGlobals.canvas.style.backgroundRepeat = "no-repeat";
        EngineGlobals.canvas.style.backgroundSize = "100% 100%";
        EngineGlobals.canvas.style.top = "0";
        EngineGlobals.canvas.style.left = "0";
        EngineGlobals.canvas.addEventListener('contextmenu', function (event) { event.preventDefault(); return false; });
        EngineGlobals.ctx = EngineGlobals.canvas.getContext("2d")!;
        EngineGlobals.ctx.imageSmoothingEnabled = false;
        this.isFullscreen = false;
        this.resizeCanvas();
        window.addEventListener('resize', this.resizeCanvas.bind(this));
        EngineGlobals.audioManager = new AudioManager();
        EngineGlobals.input = new InputManager();
        EngineGlobals.collisionDetection = new CollisionDetection();
        EngineGlobals.eventSystem = new EventSystem();
        this.previousTime = 0;
        this.updateCallback = this.update.bind(this);
    }

    public start(startingScene: typeof Scene, ...args: unknown[]): void
    {
        EngineGlobals.scene = new startingScene(args);
        requestAnimationFrame(this.updateCallback);
    }

    public changeScene(newSceneType: typeof Scene, ...args: unknown[])
    {
        EngineGlobals.eventSystem.clear();
        EngineGlobals.scene = new newSceneType(args);
    }

    public togglefullscreen(): void
    {
        if (this.isFullscreen)
        {
            EngineGlobals.canvas.style.position = "";
            EngineGlobals.canvas.style.width = "";
            EngineGlobals.canvas.style.height = "";
            EngineGlobals.canvas.style.display = "";
            if (document.fullscreenElement !== null)
                document.exitFullscreen();
            this.isFullscreen = false;
        }
        else
        {
            EngineGlobals.canvas.style.position = "absolute";
            EngineGlobals.canvas.style.width = "100%";
            EngineGlobals.canvas.style.height = "100%";
            EngineGlobals.canvas.style.display = "block";
            EngineGlobals.canvas.requestFullscreen();
            this.isFullscreen = true;
        }
    }

    private resizeCanvas(): void
    {
        if (this.isFullscreen)
        {
            EngineGlobals.canvas.width = window.innerWidth;
            EngineGlobals.canvas.height = window.innerHeight;
        }
        else
        {
            EngineGlobals.canvas.width = EngineConstants.referenceWidth;
            EngineGlobals.canvas.height = EngineConstants.referenceHeight;
        }
        EngineGlobals?.scene?.camera.resize();
    }

    private update(newTime: number): void
    {
        EngineGlobals.time = newTime * 0.001;
        EngineGlobals.deltaTime = Math.min(EngineGlobals.time - this.previousTime, EngineConstants.maxDeltaTime);
        EngineGlobals.ctx.clearRect(0, 0, EngineGlobals.canvas.width, EngineGlobals.canvas.height);
        EngineGlobals.input.update();
        EngineGlobals.collisionDetection.update();
        EngineGlobals.scene.update();
        EngineGlobals.scene.draw();
        this.previousTime = EngineGlobals.time;
        requestAnimationFrame(this.updateCallback);
    }

}