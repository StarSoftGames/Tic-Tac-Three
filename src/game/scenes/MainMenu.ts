import { Anchor } from "../../engine/components/Transform.js";
import { EngineGlobals } from "../../engine/core/EngineGlobals.js";
import { EngineConstants } from "../../engine/core/EngineConstants.js";
import { Assets } from "../../Assets.js";
import { Game } from "./Game.js";
import { ImageE } from "../../engine/entities/ImageE.js";
import { FullscreenButtonE } from "../../engine/entities/FullscreenButtonE.js";
import { GameGlobals } from "../core/GameGlobals.js";
import { Scene } from "../../engine/scenes/Scene.js";
import { ImageButtonE } from "../../engine/entities/ImageButtonE.js";
import { MuteButtonE } from "../../engine/entities/MuteButtonE.js";
import { LabelE } from "../../engine/entities/LabelE.js";

export class MainMenu extends Scene
{
    private readonly background: ImageE;
    private readonly playButton: ImageButtonE;
    private readonly instructionsButton: ImageButtonE;
    private readonly copyright: LabelE;
    private readonly backButton: ImageButtonE;
    private readonly instructions: ImageE;

    constructor()
    {
        super();

        this.background = new ImageE(Assets.getImage("menu/background"));
        this.background.image.width = EngineConstants.referenceWidth;
        this.background.image.height = EngineConstants.referenceHeight;
        this.background.visual.imageSmoothingEnabled = true;
        this.background.visual.imageSmoothingQuality = "high";
        this.background.transform.anchor = Anchor.center;
        this.addEntity(this.background);

        this.playButton = new ImageButtonE(Assets.getImage("menu/play"));
        this.playButton.mouseEnterSize = 1.15;
        this.playButton.image.width = this.playButton.image.width*0.625;
        this.playButton.image.height = this.playButton.image.height*0.625;
        this.playButton.visual.imageSmoothingEnabled = true;
        this.playButton.visual.imageSmoothingQuality = "high";
        this.playButton.transform.anchor = Anchor.left;
        this.playButton.translate(this.playButton.image.width/2 + EngineConstants.referenceWidth*0.18, EngineConstants.referenceHeight*0.07);
        this.playButton.clickable.addUpAction(this.startGame.bind(this));
        this.playButton.clickable.addUpAction(() => EngineGlobals.audioManager.playSound("menu/enter"));
        this.playButton.clickable.addEnterAction(() => EngineGlobals.audioManager.playSound("menu/rollover"));
        this.addEntity(this.playButton);

        this.instructionsButton = new ImageButtonE(Assets.getImage("menu/instructions_button"));
        this.instructionsButton.mouseEnterSize = 1.15;
        this.instructionsButton.image.width = this.instructionsButton.image.width*0.55;
        this.instructionsButton.image.height = this.instructionsButton.image.height*0.55;
        this.instructionsButton.transform.anchor = Anchor.left;
        this.instructionsButton.visual.imageSmoothingEnabled = true;
        this.instructionsButton.visual.imageSmoothingQuality = "high";
        this.instructionsButton.translate(this.instructionsButton.image.width/2 + EngineConstants.referenceWidth*0.1075, this.playButton.image.height*1.55);
        this.instructionsButton.clickable.addUpAction(this.showInstructions.bind(this));
        this.instructionsButton.clickable.addUpAction(() => EngineGlobals.audioManager.playSound("menu/enter"));
        this.instructionsButton.clickable.addEnterAction(() => EngineGlobals.audioManager.playSound("menu/rollover"));
        this.addEntity(this.instructionsButton);

        this.copyright = new LabelE("arial", EngineConstants.referenceHeight*0.05, "white", "(c) StarSoft 2026");
        this.copyright.transform.anchor = Anchor.bottomRight;
        this.copyright.transform.translate(-this.copyright.label.width/2 - EngineConstants.referenceWidth*0.117, -this.copyright.label.height*1.5);
        this.addEntity(this.copyright);

        this.instructions = new ImageE(Assets.getImage("menu/instructions"));
        this.instructions.transform.anchor = Anchor.center;
        this.instructions.image.width = 1920;
        this.instructions.image.height = 1200;
        this.instructions.visual.imageSmoothingEnabled = true;
        this.instructions.visual.imageSmoothingQuality = "high";
        this.instructions.isEnabled = false;
        this.instructions.scale(0.5, 0.5);
        this.addEntity(this.instructions);

        this.backButton = new ImageButtonE(Assets.getImage("menu/back"));
        this.backButton.mouseEnterSize = 1.15;
        this.backButton.image.width = this.backButton.image.width*0.5;
        this.backButton.image.height = this.backButton.image.height*0.5;
        this.backButton.visual.imageSmoothingEnabled = true;
        this.backButton.visual.imageSmoothingQuality = "high";
        this.backButton.transform.anchor = Anchor.bottomLeft;
        this.backButton.translate(this.backButton.image.width/2 + EngineConstants.referenceWidth*0.185, -this.backButton.image.height*2.2);
        this.backButton.clickable.addUpAction(this.exitInstructions.bind(this));
        this.backButton.clickable.addUpAction(() => EngineGlobals.audioManager.playSound("menu/back"));
        this.backButton.clickable.addEnterAction(() => EngineGlobals.audioManager.playSound("menu/rollover"));
        this.backButton.isEnabled = false;
        this.addEntity(this.backButton);

        this.addEntity(new FullscreenButtonE);
        this.addEntity(new MuteButtonE);
        EngineGlobals.audioManager.playMusic("menu");
    }

    private showInstructions(): void
    {
        this.background.isEnabled = false;
        this.playButton.isEnabled = false;
        this.instructionsButton.isEnabled = false;
        this.copyright.isEnabled = false;
        this.instructions.isEnabled = true;
        this.backButton.isEnabled = true;
    }

    private exitInstructions(): void
    {
        this.background.isEnabled = true;
        this.playButton.isEnabled = true;
        this.instructionsButton.isEnabled = true;
        this.copyright.isEnabled = true;
        this.instructions   .isEnabled = false;
        this.backButton.isEnabled = false;
    }

    private startGame()
    {
        GameGlobals.playerBluePoints = 0;
        GameGlobals.playerRedPoints = 0;
        EngineGlobals.engine.changeScene(Game, "blue");
    }
}