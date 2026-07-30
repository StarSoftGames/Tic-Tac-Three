import { Scene } from "./Scene.js";
import { LabelE } from "../entities/LabelE.js";
import { ButtonE } from "../entities/ButtonE.js";
import { ScreensaverC } from "../components/ScreensaverC.js";
import { Game } from "./Game.js";
import { EngineGlobals } from "../core/EngineGlobals.js";

export class Main_Menu extends Scene
{
    public constructor()
    {
        super();
        const label = new LabelE("arial", 30, "lightgreen", "Hello, world!");
        this.addEntity(label);
        label.translate(250, 100);
        label.addComponent(new ScreensaverC);

        const button = new ButtonE(200, 100);
        this.addEntity(button);
        //button.translate(300, 350)
        //button.rotate(15);
        //button.scale(1/2, 1/2);
        button.label.text = "Start Game";
        button.clickable.addUpAction(() => this.start_game());
    }

    private start_game(): void
    {
        EngineGlobals.engine.changeScene(Game);
    }
}