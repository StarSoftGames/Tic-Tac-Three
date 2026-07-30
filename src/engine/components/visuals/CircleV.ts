import { EngineGlobals } from "../../core/EngineGlobals";
import { Visual } from "./Visual";

export class CircleV extends Visual
{
    public radius: number;

    constructor(radius: number, color: string | CanvasGradient | CanvasPattern)
    {
        super();
        this.radius = radius;
        this.fillStyle = color;
    }

    public containsPoint(x: number, y: number)
    {
        EngineGlobals.ctx.beginPath();
        EngineGlobals.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
        EngineGlobals.ctx.closePath();
        return EngineGlobals.ctx.isPointInPath(x, y);
    }

    public draw(): void
    {
        EngineGlobals.ctx.fillStyle = this.fillStyle;
        EngineGlobals.ctx.beginPath();
        EngineGlobals.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
        EngineGlobals.ctx.fill();
    }

}