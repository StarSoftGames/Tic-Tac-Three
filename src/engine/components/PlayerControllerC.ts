import { EngineGlobals } from "../core/EngineGlobals.js";
import { Component } from "./Component.js";
import { RigidbodyC } from "./RigidbodyC.js";
import { SpriteSheetV } from "./visuals/SpriteSheetV.js";

export class PlayerControllerC extends Component
{
    private speed: number;
    private jump_Force: number;
    private spriteSheet: SpriteSheetV;
    private animation_interval: number;
    private animation_time: number;
    private rigidbody: RigidbodyC;

    constructor(speed: number, jump_force: number)
    {
        super();
        this.speed = speed;
        this.jump_Force = jump_force;
        this.animation_interval = 0.05;
        this.animation_time = 0;
    }

    public awake(): void
    {
        this.spriteSheet = this.entity.visual as SpriteSheetV;
        this.spriteSheet.lin = 2;
        this.rigidbody = this.entity.getComponent(RigidbodyC)!;
    }

    public update(): void
    {
        if (this.rigidbody.isGrounded)
        {
            if (EngineGlobals.input.isKeyDown("ArrowRight") || EngineGlobals.input.isKeyDown("d") || EngineGlobals.input.gamepadAxisValue(0) >= 0.5)
            {
                this.rigidbody.addForce(this.speed * EngineGlobals.deltaTime, 0);
                this.spriteSheet.lin = 0;
                this.animation_time += EngineGlobals.deltaTime;
                if (this.animation_time >= this.animation_interval)
                {
                    this.animation_time = 0;
                    this.nextSprite();
                }
            }
            else if (EngineGlobals.input.isKeyDown("ArrowLeft") || EngineGlobals.input.isKeyDown("a") || EngineGlobals.input.gamepadAxisValue(0) <= -0.5)
            {
                this.rigidbody.addForce(-this.speed * EngineGlobals.deltaTime, 0);
                this.spriteSheet.lin = 1;
                this.animation_time += EngineGlobals.deltaTime;
                if (this.animation_time >= this.animation_interval)
                {
                    this.animation_time = 0;
                    this.nextSprite();
                }
            }
            else
            {
                this.spriteSheet.col = 0;
                if (this.spriteSheet.lin === 0)
                {
                    this.spriteSheet.lin = 2;
                }
                else if (this.spriteSheet.lin === 1)
                {
                    this.spriteSheet.lin = 3;
                }
            }

            if (EngineGlobals.input.wasKeyJustPressed("ArrowUp") ||
                EngineGlobals.input.wasKeyJustPressed("w") ||
                EngineGlobals.input.wasKeyJustPressed(" ") ||
                EngineGlobals.input.wasGamepadButtonJustPressed(0))
            {
                this.rigidbody.addForce(0, -this.jump_Force);
            }
        }
    }

    private nextSprite(): void
    {
        this.spriteSheet.col++;
        if (this.spriteSheet.col > this.spriteSheet.columns - 1)
        {
            this.spriteSheet.col = 0;
        }
    }

}