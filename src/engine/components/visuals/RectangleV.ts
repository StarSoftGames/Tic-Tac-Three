import { EngineGlobals } from "../../core/EngineGlobals.js";
import { Visual } from "./Visual.js";

export class RectangleV extends Visual
{
    private _width: number;
    private _height: number;
    private _radii: number | DOMPointInit | Iterable<number | DOMPointInit> | undefined;

    constructor(color: string | CanvasGradient | CanvasPattern, width: number, height: number)
    {
        super();
        this.fillStyle = color;
        this._width = width;
        this._height = height;
        this.lineWidth = Math.min(width, height)*0.035;
        this._radii = undefined;
    }

    public get width(): number { return this._width; }
    public get height(): number { return this._height; }
    public get radii(): number | DOMPointInit | Iterable<number | DOMPointInit> | undefined { return this._radii; }

    public set width(newWidth: number) { this._width = newWidth; }
    public set height(newHeight: number) { this._height = newHeight; }
    public set radii(newRadii: number | DOMPointInit | Iterable<number | DOMPointInit> | undefined) { this._radii = newRadii; }

    public containsPoint(x: number, y: number)
    {
        EngineGlobals.ctx.beginPath();
        EngineGlobals.ctx.lineTo(-this._width/2, -this._height/2);
        EngineGlobals.ctx.lineTo(-this._width/2, this._height/2);
        EngineGlobals.ctx.lineTo(this._width/2, this._height/2);
        EngineGlobals.ctx.lineTo(this._width/2, -this._height/2);
        EngineGlobals.ctx.closePath();
        return EngineGlobals.ctx.isPointInPath(x, y);
    }

    public draw(): void
    {
        const ctx = EngineGlobals.ctx;

        ctx.beginPath();
        ctx.roundRect(-this._width/2, -this._height/2, this._width, this._height, this._radii);

        ctx.fillStyle = this.fillStyle;
        ctx.fill();
        if (this.hasBorder)
        {
            ctx.strokeStyle = this.strokeStyle;
            ctx.lineWidth = this.lineWidth;
            ctx.stroke();
        }
    }

}