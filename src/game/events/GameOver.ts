import { Event } from "../../engine/events/Event.js";
import type { PlayerC } from "../components/PlayerC.js";

export class GameOver extends Event
{
    private readonly _winner: PlayerC;
    private readonly _loser: PlayerC;

    constructor(winner: PlayerC, loser: PlayerC)
    {
        super();
        this._winner = winner;
        this._loser = loser;
    }

    public get winner(): PlayerC { return this._winner; }
    public get loser(): PlayerC { return this._loser; }
}