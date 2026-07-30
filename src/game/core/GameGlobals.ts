import type { GameManagerC } from "../components/GameManagerC.js";
import type { PlayerC } from "../components/PlayerC.js";

export class GameGlobals
{
    static gameManager: GameManagerC;
    static turnPlayer: PlayerC;
    static opponent: PlayerC;
    static playerBluePoints: number = 0;
    static playerRedPoints: number = 0;
}