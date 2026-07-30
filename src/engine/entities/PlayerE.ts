import { ColliderC } from "../components/ColliderC.js";
import { PlayerControllerC } from "../components/PlayerControllerC.js";
import { RigidbodyC } from "../components/RigidbodyC.js";
import { SpriteSheetV } from "../components/visuals/SpriteSheetV.js";
import { Entity } from "./Entity.js";

export class PlayerE extends Entity
{
    public constructor()
    {
        super();
        this.tag = "player";
        const spriteSheetImage = document.getElementById("Cat")! as HTMLImageElement;
        const spriteSheet = new SpriteSheetV(spriteSheetImage, 4, 8);
        this.visual = spriteSheet;
        const collider = new ColliderC;
        collider.width = 50;
        collider.height = 50;
        this.addComponent(collider);
        this.addComponent(new RigidbodyC);
        this.addComponent(new PlayerControllerC(25, 10));
    }

}