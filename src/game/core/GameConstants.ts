import { EngineConstants } from "../../engine/core/EngineConstants.js";

export class GameConstants
{
    public static readonly lineColor = "white";
    public static readonly lineLength = EngineConstants.shorterDimension*0.75;
    public static readonly lineWidth = EngineConstants.shorterDimension*0.01;
    public static readonly lineOffset = EngineConstants.shorterDimension/7;
    public static readonly boardSpaceSize = this.lineOffset*1.5;
    public static readonly boardSpaceOffset = this.lineLength/2.75;
    public static readonly PieceSize = this.boardSpaceSize*0.85;
    public static readonly pieceStartingOffset = this.boardSpaceOffset*2;
    public static readonly winLineDrawTime = 2.5;
}