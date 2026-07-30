import { Component } from "../../engine/components/Component.js";
import type { LabelV } from "../../engine/components/visuals/LabelV.js";
import { EngineGlobals } from "../../engine/core/EngineGlobals.js";
import { GameOver } from "../events/GameOver.js";
import { TurnStarted } from "../events/TurnStarted.js";

export class MessageBoardC extends Component
{
    private label: LabelV;

    public awake(): void
    {
        this.label = this.entity.visual as LabelV;
        EngineGlobals.eventSystem.subscribe(this.showCurrentPlayer.bind(this), TurnStarted);
        EngineGlobals.eventSystem.subscribe(this.showWinner.bind(this), GameOver);
    }

    private showCurrentPlayer(event: TurnStarted): void
    {
        this.label.text = `Player ${event.player.color}'s turn.`;
    }

    private showWinner(event: GameOver): void
    {
        this.label.text = `Player ${event.winner.color} wins!`;
    }
}