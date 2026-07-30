import { Component } from "./Component.js";
import { EngineGlobals } from "../core/EngineGlobals.js";
import { Utils } from "../utils/Utils.js";
import type { LabelV } from "./visuals/LabelV.js";

export class ScreensaverC extends Component
{
    private label: LabelV;
    private speed: number;
    private turn_wait: number;

    constructor()
    {
        super();
        this.speed = 15;
        this.turn_wait = 0;
    }

    public awake(): void
    {
        this.entity.rotate(Utils.random(0, 360));
        this.entity.hideRotation = true;
        this.label = this.entity.visual as LabelV;
    }

    public update(): void
    {
        const x = this.entity.transform.position.x;
        const y = this.entity.transform.position.y;

        this.entity.moveForward(this.speed * EngineGlobals.deltaTime);

        if (this.turn_wait > 0)
        {
            this.turn_wait--;
        }
        else if (x + this.label.width/2 > EngineGlobals.canvas.width ||
                 x - this.label.width/2 < 0 ||
                 y - this.label.height/2 < 0 ||
                 y + this.label.height/2 > EngineGlobals.canvas.height
        )
        {
            const angle = 180 + Utils.random(-30, 30);
            this.entity.rotate(angle);
            this.turn_wait = 10;
        }
    }

}