import { Entity } from "../../engine/entities/Entity.js";
import { Scene } from "../../engine/scenes/Scene.js";
import { BoardE } from "../entities/BoardE.js";
import { GameManagerC } from "../components/GameManagerC.js";
import { PlayerC } from "../components/PlayerC.js";
import { PlayerE } from "../entities/PlayerE.js";
import { MessageBoardE } from "../entities/MessageBoardE.js";
import { FullscreenButtonE } from "../../engine/entities/FullscreenButtonE.js";
import { EndScreenE } from "../entities/EndScreenE.js";
import { GameGlobals } from "../core/GameGlobals.js";
import { EngineGlobals } from "../../engine/core/EngineGlobals.js";
import { Assets } from "../../Assets.js";
import { MuteButtonE } from "../../engine/entities/MuteButtonE.js";
import { ImageE } from "../../engine/entities/ImageE.js";
import { EngineConstants } from "../../engine/core/EngineConstants.js";
import { Anchor } from "../../engine/components/Transform.js";

export class Game extends Scene
{
    constructor(args: unknown[])
    {
        super();

        const background = new ImageE(Assets.getImage("game/background"));
        background.image.width = EngineConstants.referenceWidth;
        background.image.height = EngineConstants.referenceHeight;
        background.visual.imageSmoothingEnabled = true;
        background.visual.imageSmoothingQuality = "high";
        background.transform.anchor = Anchor.center;
        this.addEntity(background);

        const gameManager = new Entity;
        gameManager.addComponent(new GameManagerC);
        this.addEntity(gameManager);
        GameGlobals.gameManager = gameManager.getComponent(GameManagerC)!;

        const board = new BoardE;
        this.addEntity(board);

        const player1 = new PlayerE("blue");
        this.addEntity(player1);

        const player2 = new PlayerE("red");
        this.addEntity(player2);

        if (args.length === 0 || args[0] === "blue")
        {
            GameGlobals.turnPlayer = player1.getComponent(PlayerC)!;
            GameGlobals.opponent = player2.getComponent(PlayerC)!;
        }
        else
        {
            GameGlobals.turnPlayer = player2.getComponent(PlayerC)!;
            GameGlobals.opponent = player1.getComponent(PlayerC)!;
        }

        this.addEntity(new MessageBoardE);
        this.addEntity(new EndScreenE);
        this.addEntity(new FullscreenButtonE);
        this.addEntity(new MuteButtonE);

        EngineGlobals.audioManager.playMusic("game");
        GameGlobals.gameManager.startGame();
    }
}