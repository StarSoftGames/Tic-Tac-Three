import { Component } from "../../engine/components/Component.js";
import type { LabelV } from "../../engine/components/visuals/LabelV.js";
import { EngineGlobals } from "../../engine/core/EngineGlobals.js";
import { GameGlobals } from "../core/GameGlobals.js";
import { GameOver } from "../events/GameOver.js";
import { TurnStarted } from "../events/TurnStarted.js";
import type { PlayerC } from "./PlayerC.js";

export class PlayerInfoC extends Component
{
    private readonly owner: PlayerC;
    private label: LabelV;

    constructor(owner: PlayerC)
    {
        super();
        this.owner = owner;
    }

    public awake(): void
    {
        this.label = this.entity.visual as LabelV;
        if (this.owner.color === "blue")
            this.label.fillStyle = "cyan";
        else
            this.label.fillStyle = "yellow";
        EngineGlobals.eventSystem.subscribe(this.showCurrentPlayer.bind(this), TurnStarted);
        EngineGlobals.eventSystem.subscribe(this.showWinner.bind(this), GameOver);
    }

    private showCurrentPlayer(event: TurnStarted): void
    {
        if (event.player === this.owner)
            this.label.text = `Your turn`;
        else
            this.label.text = "";
    }

    private showWinner(_event: GameOver): void
    {
        if (this.owner.color === "blue")
            this.label.text = `You have ${GameGlobals.playerBluePoints} points`;
        else
            this.label.text = `You have ${GameGlobals.playerRedPoints} points`;
    }
}