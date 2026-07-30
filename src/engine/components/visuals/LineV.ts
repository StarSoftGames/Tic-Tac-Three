import { EngineGlobals } from "../../core/EngineGlobals.js";
import { Visual } from "./Visual.js";

export class LineV extends Visual
{
    public width: number;
    public length: number;
    public cap: CanvasLineCap;

    constructor(color: string | CanvasGradient | CanvasPattern, length: number, width: number,)
    {
        super();
        this.strokeStyle = color;
        this.length = length;
        this.width = width;
        this.cap = "round";
    }

    public draw(): void
    {
        EngineGlobals.ctx.beginPath();
        EngineGlobals.ctx.moveTo(-this.length/2, 0);
        EngineGlobals.ctx.lineTo(this.length/2, 0);
        EngineGlobals.ctx.lineWidth = this.width;
        EngineGlobals.ctx.lineCap = this.cap;
        EngineGlobals.ctx.strokeStyle = this.strokeStyle;
        EngineGlobals.ctx.stroke();
    }

}