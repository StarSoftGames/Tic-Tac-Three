import { Component } from '../../engine/components/Component.js';
import { EngineGlobals } from '../../engine/core/EngineGlobals.js';

export class EndFadeC extends Component
{
    private readonly targetOpacity: number;
    private readonly fadeSpeed: number;

    constructor(targetOpacity = 0.75, fadeSpeed = 0.5)
    {
        super();
        this.targetOpacity = targetOpacity;
        this.fadeSpeed = fadeSpeed;
    }

    public awake(): void
    {
        this.entity.visual.opacity = 0;
    }

    public update(): void
    {
        if (this.entity.visual.opacity < this.targetOpacity)
        {
            this.entity.visual.opacity += this.fadeSpeed * EngineGlobals.deltaTime;
            if (this.entity.visual.opacity > this.targetOpacity)
                this.entity.visual.opacity = this.targetOpacity;
        }
    }
}
