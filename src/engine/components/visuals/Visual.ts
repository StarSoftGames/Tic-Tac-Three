import { EngineGlobals } from "../../core/EngineGlobals";

export class Visual
{
    private static readonly defaultLineWidth = 3;
    private static readonly defaultShadowColor = "rgba(0, 0, 0, 0)";
    private static readonly defaultShadowBlur = 8;
    private static readonly defaultShadowOffsetX = 5;
    private static readonly defaultShadowOffsetY = 5;
    private static readonly defaultImageSmoothingEnabled = false;
    private static readonly defaultImageSmoothingQuality = "low";

    private _fillStyle: string | CanvasGradient | CanvasPattern;
    private _strokeStyle: string | CanvasGradient | CanvasPattern;
    private _hasBorder: boolean;
    private _lineWidth: number;
    private _opacity: number;
    private previousOpacity: number;
    private _shadowColor: string;
    private _shadowBlur: number;
    private _shadowOffsetX: number;
    private _shadowOffsetY: number;
    private _imageSmoothingEnabled: boolean;
    private _imageSmoothingQuality: ImageSmoothingQuality;

    constructor()
    {
        this._fillStyle = "#000000";
        this._strokeStyle = "#000000";
        this._hasBorder = false;
        this._lineWidth = Visual.defaultLineWidth;
        this._opacity = 1;
        this.previousOpacity = 1;
        this._shadowColor = Visual.defaultShadowColor;
        this._shadowBlur = Visual.defaultShadowBlur;
        this._shadowOffsetX = Visual.defaultShadowOffsetX;
        this._shadowOffsetY = Visual.defaultShadowOffsetY;
        this._imageSmoothingEnabled = Visual.defaultImageSmoothingEnabled;
        this._imageSmoothingQuality = Visual.defaultImageSmoothingQuality;
    }

    public get fillStyle(): string | CanvasGradient | CanvasPattern { return this._fillStyle; }
    public get strokeStyle(): string | CanvasGradient | CanvasPattern { return this._strokeStyle; }
    public get hasBorder(): boolean { return this._hasBorder; }
    public get lineWidth(): number { return this._lineWidth; }
    public get opacity(): number { return this._opacity; }
    public get shadowColor(): string { return this._shadowColor; }
    public get shadowBlur(): number { return this._shadowBlur; }
    public get shadowOffsetX(): number { return this._shadowOffsetX; }
    public get shadowOffsetY(): number { return this._shadowOffsetY; }
    public get imageSmoothingEnabled(): boolean { return this._imageSmoothingEnabled; }
    public get imageSmoothingQuality(): ImageSmoothingQuality { return this._imageSmoothingQuality; }

    public set fillStyle(newStyle: string | CanvasGradient | CanvasPattern) { this._fillStyle = newStyle; }
    public set strokeStyle(newStyle: string | CanvasGradient | CanvasPattern) { this._strokeStyle = newStyle; }
    public set hasBorder(newValue: boolean) { this._hasBorder = newValue; }
    public set lineWidth(newSize: number) { this._lineWidth = newSize; }
    public set opacity(newOpacity: number) { this._opacity = newOpacity; }
    public set shadowColor(newColor: string) { this._shadowColor = newColor; }
    public set shadowBlur(newBlur: number) { this._shadowBlur = newBlur; }
    public set shadowOffsetX(newOffset: number) { this._shadowOffsetX = newOffset; }
    public set shadowOffsetY(newOffset: number) { this._shadowOffsetY = newOffset; }
    public set imageSmoothingEnabled(newValue: boolean) { this._imageSmoothingEnabled = newValue; }
    public set imageSmoothingQuality(newQuality: ImageSmoothingQuality) { this._imageSmoothingQuality = newQuality; }

    public applyTransparency(): void
    {
        this.previousOpacity = EngineGlobals.ctx.globalAlpha;
        EngineGlobals.ctx.globalAlpha *= this._opacity;
    }

    public revertTransparency(): void
    {
        EngineGlobals.ctx.globalAlpha = this.previousOpacity;
    }

    public applyEffects(): void
    {
        EngineGlobals.ctx.shadowColor = this._shadowColor;
        EngineGlobals.ctx.shadowBlur = this._shadowBlur;
        EngineGlobals.ctx.shadowOffsetX = this._shadowOffsetX;
        EngineGlobals.ctx.shadowOffsetY = this._shadowOffsetY;
        EngineGlobals.ctx.imageSmoothingEnabled = this._imageSmoothingEnabled;
        EngineGlobals.ctx.imageSmoothingQuality = this._imageSmoothingQuality;
    }

    public removeEffects(): void
    {
        EngineGlobals.ctx.shadowColor = Visual.defaultShadowColor;
        EngineGlobals.ctx.shadowBlur = Visual.defaultShadowBlur;
        EngineGlobals.ctx.shadowOffsetX = Visual.defaultShadowOffsetX;
        EngineGlobals.ctx.shadowOffsetY = Visual.defaultShadowOffsetY;
        EngineGlobals.ctx.imageSmoothingEnabled = Visual.defaultImageSmoothingEnabled;
        EngineGlobals.ctx.imageSmoothingQuality = Visual.defaultImageSmoothingQuality;
    }

    public containsPoint(_x: number, _y: number) { return false; }

    public draw(): void { }
}