import { EngineGlobals } from "../../core/EngineGlobals.js";
import { Visual } from "./Visual.js";

export class LabelV extends Visual
{
    public fontName: string;
    public fontSize: number;
    public isItalic: boolean;
    public isBold: boolean;
    public text: string;

    constructor(fontName: string, fontSize: number, color: string | CanvasGradient | CanvasPattern, text: string)
    {
        super();
        this.fontName = fontName;
        this.fontSize = fontSize;
        this.isItalic = false;
        this.isBold = false;
        this.fillStyle = color;
        this.text = text;
    }

    private get font(): string
    {
        let font = "";

        if (this.isItalic) font += "italic ";
        if (this.isBold) font += "bold ";
        font += `${this.fontSize}px `;
        font += this.fontName;

        return font;
    }

    public get width(): number
    {
        EngineGlobals.ctx.font = this.font;
        return EngineGlobals.ctx.measureText(this.text).width;
    }

    public get height(): number { return this.fontSize; }

    public draw(): void
    {
        EngineGlobals.ctx.font = this.font;
        EngineGlobals.ctx.fillStyle = this.fillStyle;
        EngineGlobals.ctx.fillText(this.text, -this.width/2, this.fontSize/4);
    }
}