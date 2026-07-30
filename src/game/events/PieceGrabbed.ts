import { Event } from "../../engine/events/Event.js";
import type { PieceC } from "../components/PieceC.js";

export class PieceGrabbed extends Event
{
    private readonly _piece: PieceC;

    constructor(piece: PieceC)
    {
        super();
        this._piece = piece;
    }

    public get piece(): PieceC { return this._piece; }
}