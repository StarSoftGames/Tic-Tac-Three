import { ColliderC } from "../components/ColliderC.js";
import { RectangleV } from "../components/visuals/RectangleV.js";
import { Entity } from "./Entity.js";

export class PlatformE extends Entity
{
    constructor(x: number, y: number, color: string, width: number, height: number)
    {
        super();
        this.translate(x, y);
        this.visual = new RectangleV(color, width, height);
        const collider = new ColliderC;
        collider.width = width;
        collider.height = height;
        this.addComponent(collider);
    }
}