import { RectangleV } from "../components/visuals/RectangleV.js";
import { Entity } from "./Entity.js";

export class RectangleE extends Entity
{
    private readonly _rectangle: RectangleV;

    public constructor(color: string, width: number, height: number)
    {
        super();
        this.visual = new RectangleV(color, width, height);
        this._rectangle = this.visual as RectangleV;
    }

    public get rectangle(): RectangleV { return this._rectangle; }
}