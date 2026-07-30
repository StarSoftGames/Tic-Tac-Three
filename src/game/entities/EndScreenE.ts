import { RectangleE } from "../../engine/entities/RectangleE.js";
import { Anchor } from "../../engine/components/Transform.js";
import { EndFadeC } from "../components/EndFadeC.js";
import { GameOver } from "../events/GameOver.js";
import { ImageButtonE } from "../../engine/entities/ImageButtonE.js";
import { Game } from "../scenes/Game.js";
import { MainMenu } from "../scenes/MainMenu.js";
import { ImageE } from "../../engine/entities/ImageE.js";
import { EngineGlobals } from "../../engine/core/EngineGlobals.js";
import { GameGlobals } from "../core/GameGlobals.js";
import { EngineConstants } from "../../engine/core/EngineConstants.js";
import { Assets } from "../../Assets.js";
import { Entity } from "../../engine/entities/Entity.js";
import { GameConstants } from "../core/GameConstants.js";

export class EndScreenE extends Entity
{
    private winnerText: ImageE;

    constructor()
    {
        super();
        this.transform.anchor = Anchor.center;
        this.isEnabled = false;
        EngineGlobals.eventSystem.subscribe(this.Show.bind(this), GameOver);

        const background = new RectangleE("black", EngineConstants.referenceWidth, EngineConstants.referenceHeight);
        background.addComponent(new EndFadeC(0.75));
        background.setParent(this);

        const retryButton = new ImageButtonE(Assets.getImage("game/retry0"));
        retryButton.mouseEnterImage = Assets.getImage("game/retry1");
        retryButton.mouseDownImage = Assets.getImage("game/retry2");
        retryButton.image.width = retryButton.image.width/2;
        retryButton.image.height = retryButton.image.height/2;
        retryButton.visual.imageSmoothingEnabled = true;
        retryButton.visual.imageSmoothingQuality = "high";
        retryButton.translate(-EngineConstants.referenceWidth/5, EngineConstants.referenceHeight/7);
        retryButton.clickable.addUpAction(() => EngineGlobals.engine.changeScene(Game, GameGlobals.opponent.color));
        retryButton.clickable.addUpAction(() => EngineGlobals.audioManager.playSound("menu/back"));
        retryButton.clickable.addEnterAction(() => EngineGlobals.audioManager.playSound("menu/rollover"));
        retryButton.addComponent(new EndFadeC(1));
        retryButton.setParent(this);

        const menuButton = new ImageButtonE(Assets.getImage("game/menu0"));
        menuButton.mouseEnterImage = Assets.getImage("game/menu1");
        menuButton.mouseDownImage = Assets.getImage("game/menu2");
        menuButton.image.width = menuButton.image.width/2;
        menuButton.image.height = menuButton.image.height/2;
        menuButton.visual.imageSmoothingEnabled = true;
        menuButton.visual.imageSmoothingQuality = "high";
        menuButton.translate(EngineConstants.referenceWidth/5, EngineConstants.referenceHeight/7);
        menuButton.clickable.addUpAction(() => EngineGlobals.engine.changeScene(MainMenu));
        menuButton.clickable.addUpAction(() => EngineGlobals.audioManager.playSound("menu/quit"));
        menuButton.clickable.addEnterAction(() => EngineGlobals.audioManager.playSound("menu/rollover"));
        menuButton.addComponent(new EndFadeC(1));
        menuButton.setParent(this);

        const winnerText = new ImageE(Assets.getImage("game/blue_wins"));
        winnerText.visual.imageSmoothingEnabled = true;
        winnerText.visual.imageSmoothingQuality = "high";
        winnerText.translate(0, -EngineConstants.referenceHeight/4);
        winnerText.setParent(this);
        winnerText.addComponent(new EndFadeC(1));
        this.winnerText = winnerText;
    }

    private Show(event: GameOver): void
    {
        if (event.winner.color === "red")
        {
            this.winnerText.image.element = Assets.getImage("game/red_wins");
        }
        window.setTimeout(() => this.isEnabled = true, GameConstants.winLineDrawTime*1000 + 500);
    }
}