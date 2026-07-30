import { EngineGlobals } from "../../core/EngineGlobals.js";
import { Visual } from "./Visual.js";

export class SpriteSheetV extends Visual
{
    private sheet: HTMLImageElement;
    private lines: number;
    public columns: number;
    private width: number;
    private height: number;
    private sprite_width;
    private sprite_height;
    //private spritesPerLine: number
    public lin: number;
    public col: number;

    constructor(sheet: HTMLImageElement, lines: number, columns: number)
    {
        super();
        this.sheet = sheet;
        this.lines = lines;
        this.columns = columns;
        this.width = this.sheet.width;
        this.height = this.sheet.height;
        this.sprite_height = this.height / this.lines;
        this.sprite_width = this.width / this.columns;
        //this.spritesPerLine = Math.round(this.width / this.sprite_width);
        this.lin = 0;
        this.col = 0;
    }

    public containsPoint(x: number, y: number)
    {
        EngineGlobals.ctx.beginPath();
        EngineGlobals.ctx.lineTo(-this.sprite_width/2, -this.sprite_height/2);
        EngineGlobals.ctx.lineTo(-this.sprite_width/2, this.sprite_height/2);
        EngineGlobals.ctx.lineTo(this.sprite_width/2, this.sprite_height/2);
        EngineGlobals.ctx.lineTo(this.sprite_width/2, -this.sprite_height/2);
        EngineGlobals.ctx.closePath();
        return EngineGlobals.ctx.isPointInPath(x, y);
    }

    public draw(): void
    {
        const img = this.sheet;
        const sx = this.col * this.sprite_width;
        const sy = this.lin * this.sprite_height;
        const swidth = this.sprite_width;
        const sheight = this.sprite_height;
        const x = -swidth/2;
        const y = -sheight/2;
        const width = swidth;
        const height = sheight;
        EngineGlobals.ctx.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
    }

}