import { ClickableC } from "../components/ClickableC.js";
import type { LabelV } from "../components/visuals/LabelV.js";
import { RectangleV } from "../components/visuals/RectangleV.js";
import { EngineGlobals } from "../core/EngineGlobals.js";
import { Entity } from "./Entity.js";
import { LabelE } from "./LabelE.js";

export class ButtonE extends Entity
{
    private _mouseLeaveColor: string | CanvasGradient | CanvasPattern;
    private _mouseEnterColor: string | CanvasGradient | CanvasPattern;
    private _mouseDownColor: string | CanvasGradient | CanvasPattern;
    private _mouseUpColor: string | CanvasGradient | CanvasPattern;
    private readonly _rectangle: RectangleV;
    private readonly _label!: LabelE;
    private readonly _clickable!: ClickableC;

    public constructor(width: number, height: number)
    {
        super();
        this.initColors(width, height);
        this._rectangle = new RectangleV(this._mouseLeaveColor, width, height);
        this.visual = this._rectangle;
        this._label = new LabelE("arial", height*0.35, "white", "Button");
        this._label.setParent(this);
        this._clickable = new ClickableC();
        this._clickable.addEnterAction(this.onMouseEnter.bind(this));
        this._clickable.addLeaveAction(this.onMouseLeave.bind(this));
        this._clickable.addDownAction(this.onMouseDown.bind(this));
        this._clickable.addUpAction(this.onMouseUp.bind(this));
        this.addComponent(this._clickable);
    }

    public get rectangle(): RectangleV { return this._rectangle; }
    public get labelEntity(): LabelE { return this._label; }
    public get label(): LabelV { return this._label.visual as LabelV; }
    public get clickable(): ClickableC { return this._clickable; }
    public get mouseLeaveColor(): string | CanvasGradient | CanvasPattern { return this._mouseLeaveColor; }
    public get mouseEnterColor(): string | CanvasGradient | CanvasPattern { return this._mouseEnterColor; }
    public get mouseDownColor(): string | CanvasGradient | CanvasPattern { return this._mouseDownColor; }
    public get mouseUpColor(): string | CanvasGradient | CanvasPattern { return this._mouseUpColor; }

    public set mouseLeaveColor(newColor: string | CanvasGradient | CanvasPattern) { this._mouseLeaveColor = newColor; }
    public set mouseEnterColor(newColor: string | CanvasGradient | CanvasPattern) { this._mouseEnterColor = newColor; }
    public set mouseDownColor(newColor: string | CanvasGradient | CanvasPattern) { this._mouseDownColor = newColor; }
    public set mouseUpColor(newColor: string | CanvasGradient | CanvasPattern) { this._mouseUpColor = newColor; }

    private initColors(width: number, height: number): void
    {
        const leaveGradient = EngineGlobals.ctx.createRadialGradient(0, 0, 0, 0, 0, Math.min(width, height));
        leaveGradient.addColorStop(0, "cyan");
        leaveGradient.addColorStop(1, "blue");
        this._mouseLeaveColor = leaveGradient;

        const enterGradient = EngineGlobals.ctx.createRadialGradient(0, 0, 0, 0, 0, Math.min(width, height));
        enterGradient.addColorStop(0, "lightgreen");
        enterGradient.addColorStop(1, "darkgreen");
        this._mouseEnterColor = enterGradient;

        const downGradient = EngineGlobals.ctx.createRadialGradient(0, 0, 0, 0, 0, Math.min(width, height));
        downGradient.addColorStop(0, "darkgreen");
        downGradient.addColorStop(1, "lightgreen");
        this._mouseDownColor = downGradient;

        const upGradient = EngineGlobals.ctx.createRadialGradient(0, 0, 0, 0, 0, Math.min(width, height));
        upGradient.addColorStop(0, "darkblue");
        upGradient.addColorStop(1, "lightblue");
        this._mouseUpColor = upGradient;
    }

    private onMouseEnter(): void
    {
        this._rectangle.fillStyle = this._mouseEnterColor;
    }

    private onMouseLeave(): void
    {
        this._rectangle.fillStyle = this._mouseLeaveColor;
    }

    private onMouseDown(): void
    {
        this._rectangle.fillStyle = this._mouseDownColor;
    }

    private onMouseUp(): void
    {
        this._rectangle.fillStyle = this._mouseUpColor;
    }
}