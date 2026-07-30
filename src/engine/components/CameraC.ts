import type { Entity } from "../entities/Entity.js";
import { Component } from "./Component.js";
import { EngineConstants } from "../core/EngineConstants.js";
import { EngineGlobals } from "../core/EngineGlobals.js";

export class CameraC extends Component
{
    private followTarget: Entity;

    public awake(): void
    {
        this.resize();
    }

    public update(): void
    {
        if (this.followTarget)
        {
            this.entity.transform.position.x = - this.followTarget.transform.position.x*this.entity.transform.scaling.x + EngineGlobals.canvas.width/2;
            this.entity.transform.position.y = - this.followTarget.transform.position.y*this.entity.transform.scaling.y + EngineGlobals.canvas.height/2;
        }
    }

    public resize(): void
    {
        const factorX = EngineGlobals.canvas.width / EngineConstants.referenceWidth;
        const factorY = EngineGlobals.canvas.height / EngineConstants.referenceHeight;
        const factor = Math.min(factorX, factorY);

        this.entity.transform.scaling.x = factor;
        this.entity.transform.scaling.y = factor;
    }

    public follow(target: Entity)
    {
        this.followTarget = target;
    }
}