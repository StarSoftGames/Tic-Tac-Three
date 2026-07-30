import { Event } from "../../engine/events/Event.js";
import type { PlayerC } from "../components/PlayerC.js";

export class TurnStarted extends Event
{
    private readonly _player: PlayerC;

    constructor(player: PlayerC)
    {
        super();
        this._player = player;
    }

    public get player(): PlayerC { return this._player; }
}