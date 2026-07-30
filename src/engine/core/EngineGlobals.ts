import type { CollisionDetection } from "./CollisionDetection.js";
import type { EventSystem } from "./EventSystem.js";
import type { InputManager } from "./InputManager.js";
import type { Engine } from "../Engine.js";
import type { Scene } from "../scenes/Scene.js";
import type { AudioManager } from "./AudioManager.js";

export class EngineGlobals
{
    public static engine: Engine;
    public static canvas: HTMLCanvasElement;
    public static ctx: CanvasRenderingContext2D;
    public static audioManager: AudioManager;
    public static input: InputManager;
    public static collisionDetection: CollisionDetection;
    public static eventSystem: EventSystem;
    public static scene: Scene;
    public static time: number;
    public static deltaTime: number;
}
