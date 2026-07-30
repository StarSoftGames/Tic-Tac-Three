import { Anchor } from "../components/Transform.js";
import { ImageV } from "../components/visuals/ImageV.js";
import { ButtonE } from "../entities/ButtonE.js";
import { PickupE } from "../entities/PickupE.js";
import { PlatformE } from "../entities/PlatformE.js";
import { PlayerE } from "../entities/PlayerE.js";
import { EngineGlobals } from "../core/EngineGlobals.js";
import { Scene } from "./Scene.js";

export class Game extends Scene
{
    public constructor()
    {
        super();
        const player = new PlayerE();
        this.addEntity(player);
        player.translate(150, 700);
        this.addEntity(new PlatformE(1000, 1000, "lightblue", 2000, 50));
        this.addEntity(new PlatformE(700, 700, "lightblue", 300, 25));
        this.addEntity(new PlatformE(1250, 500, "lightblue", 300, 25));
        this.addEntity(new PickupE(325, 950, "yellow", 25, 25));
        this.addEntity(new PickupE(700, 650, "yellow", 25, 25));
        this.addEntity(new PickupE(1250, 450, "yellow", 25, 25));
        this.addEntity(new PickupE(1850, 950, "yellow", 25, 25));
        this.camera.follow(player);

        const image = document.getElementById("fullscreen")! as HTMLImageElement;
        const button = new ButtonE(image.width, image.height);
        button.visual = new ImageV(image);
        button.label.text = "";
        button.transform.anchor = Anchor.topRight;
        button.clickable.addUpAction(() => EngineGlobals.engine.togglefullscreen());
        this.addEntity(button);
        button.translate(-(image.width/2 + 25), image.height/2 + 25);
        //button.rotate(15);
        //button.scale(1/2, 1/2);
    }
}