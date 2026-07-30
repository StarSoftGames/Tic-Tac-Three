import { Component } from "../../engine/components/Component.js";
import { EngineGlobals } from "../../engine/core/EngineGlobals.js";
import { GameGlobals } from "../core/GameGlobals.js";
import { GameOver } from "../events/GameOver.js";
import { TurnStarted } from "../events/TurnStarted.js";
import { BoardC } from "./BoardC.js";

export class GameManagerC extends Component
{
    private board: BoardC;

    public start(): void
    {
        this.board = EngineGlobals.scene.findFirst(o => o.hasComponent(BoardC))!.getComponent(BoardC)!;
    }

    public startGame(): void
    {
        EngineGlobals.eventSystem.broadcast(new TurnStarted(GameGlobals.turnPlayer));
    }

    public endTurn(): void
    {
        if (this.board.checkWin(GameGlobals.turnPlayer))
        {
            this.showWinner();
        }
        else
        {
            this.passTurn();
        }
    }

    private showWinner(): void
    {
        if (GameGlobals.turnPlayer.color === "blue")
        {
            GameGlobals.playerBluePoints++;
        }
        else
        {
            GameGlobals.playerRedPoints++;
        }
        EngineGlobals.eventSystem.broadcast(new GameOver(GameGlobals.turnPlayer, GameGlobals.opponent));
        EngineGlobals.audioManager.playMusic("victory");
    }

    private passTurn(): void
    {
        const aux = GameGlobals.turnPlayer;
        GameGlobals.turnPlayer = GameGlobals.opponent;
        GameGlobals.opponent = aux;
        EngineGlobals.eventSystem.broadcast(new TurnStarted(GameGlobals.turnPlayer));
    }
}