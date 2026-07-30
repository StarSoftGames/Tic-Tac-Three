import { LabelV } from "../components/visuals/LabelV.js";
import { Entity } from "./Entity.js";

export class LabelE extends Entity
{
    private readonly _label: LabelV;

    constructor(fontName: string, fontSize: number, color: string, text: string)
    {
        super();
        this.visual = new LabelV(fontName, fontSize, color, text);
        this._label = this.visual as LabelV;
    }

    get label(): LabelV { return this._label as LabelV; }

    set image(newLabel: LabelV) { this.visual = newLabel; }
}