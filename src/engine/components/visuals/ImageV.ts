import { EngineGlobals } from "../../core/EngineGlobals";
import { Visual } from "./Visual";

export class ImageV extends Visual
{
    private _element: HTMLImageElement;
    private _width: number;
    private _height: number;

    constructor(image: HTMLImageElement)
    {
        super();
        this._element = image;
        this._width = this._element.width;
        this._height = this._element.height;
    }

    public get element(): HTMLImageElement { return this._element; }
    public get width(): number { return this._width; }
    public get height(): number { return this._height; }

    public set height(newHeight: number) { this._height = newHeight; }
    public set width(newWidth: number) { this._width = newWidth; }
    public set element(newElement: HTMLImageElement) { this._element = newElement; }

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
        EngineGlobals.ctx.drawImage(this._element, -this._width/2, -this._height/2, this._width, this._height);
    }

}