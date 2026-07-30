import { Entity } from "../../engine/entities/Entity.js";
import { Assets } from "../../Assets.js";
import { GameConstants } from "../core/GameConstants.js";
import { Anchor } from "../../engine/components/Transform.js";
import { PlayerInfoE } from "./PlayerInfoE.js";
import { PieceE } from "./PieceE.js";
import { PlayerC } from "../components/PlayerC.js";

export class PlayerE extends Entity
{
    constructor(color: string)
    {
        super();
        this.transform.anchor = Anchor.center;
        const player = new PlayerC(color);
        this.addComponent(player);
        let images: HTMLImageElement[];

        const info = new PlayerInfoE(player);
        info.setParent(this);

        if (color === "blue")
        {
            images = [Assets.getImage("game/blue0"), Assets.getImage("game/blue1")];
            this.translate(-GameConstants.pieceStartingOffset, 0);
        }
        else
        {
            images = [Assets.getImage("game/red0"), Assets.getImage("game/red1")];
            this.translate(GameConstants.pieceStartingOffset, 0);
        }

        for (let i = 0; i < 3; i++)
        {
            const piece = new PieceE(player, images, GameConstants.PieceSize);
            piece.translate(0, (i-1)*GameConstants.boardSpaceOffset);
            piece.setParent(this);
        }
    }
}