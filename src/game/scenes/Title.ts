import { Assets } from "../../Assets";
import { Anchor } from "../../engine/components/Transform";
import { EngineConstants } from "../../engine/core/EngineConstants";
import { EngineGlobals } from "../../engine/core/EngineGlobals";
import { ImageButtonE } from "../../engine/entities/ImageButtonE";
import { LabelE } from "../../engine/entities/LabelE";
import { Scene } from "../../engine/scenes/Scene";
import { HighlightTextC } from "../components/HighlightTextC";
import { MainMenu } from "./MainMenu";

export class Title extends Scene
{
    constructor()
    {
        super();

        const backgroundImage = Assets.getImage("title_screen");
        const background = new ImageButtonE(backgroundImage);
        background.image.width = EngineConstants.referenceWidth;
        background.image.height = EngineConstants.referenceHeight;
        background.visual.imageSmoothingEnabled = true;
        background.visual.imageSmoothingQuality = "high";
        background.transform.anchor = Anchor.center;
        background.clickable.addUpAction(() => EngineGlobals.engine.changeScene(MainMenu));
        this.addEntity(background);

        const startText = new LabelE("Arial", EngineConstants.referenceHeight/25, "white", "Click to start");
        startText.transform.anchor = Anchor.bottomCenter;
        startText.translate(0, -startText.label.fontSize*2 - EngineConstants.referenceHeight/25);
        startText.addComponent(new HighlightTextC);
        this.addEntity(startText);
    }
}