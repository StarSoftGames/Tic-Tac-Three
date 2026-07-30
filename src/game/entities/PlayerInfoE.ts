import { LabelE } from "../../engine/entities/LabelE.js";
import type { PlayerC } from "../components/PlayerC.js";
import { PlayerInfoC } from "../components/PlayerInfoC.js";
import { GameConstants } from "../core/GameConstants.js";

export class PlayerInfoE extends LabelE
{
    constructor(onwer: PlayerC)
    {
        super("arial", 30, "white", "Messages.");
        this.translate(0, GameConstants.boardSpaceOffset*1.6);
        this.addComponent(new PlayerInfoC(onwer));
    }
}