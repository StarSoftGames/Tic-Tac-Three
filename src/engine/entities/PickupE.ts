import { ColliderC } from "../components/ColliderC.js";
import { PickupC } from "../components/PickupC.js";
import { RectangleV } from "../components/visuals/RectangleV.js";
import { Entity } from "./Entity.js";

export class PickupE extends Entity
{
    constructor(x: number, y: number, color: string, width: number, height: number)
    {
        super();
        this.translate(x, y);
        this.visual = new RectangleV(color, width, height);
        const collider = new ColliderC;
        collider.isTrigger = true;
        collider.width = width;
        collider.height = height;
        this.addComponent(collider);
        this.addComponent(new PickupC);
    }

}