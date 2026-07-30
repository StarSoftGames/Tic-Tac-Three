import { ClickableC } from "../../engine/components/ClickableC.js";
import { ImageE } from "../../engine/entities/ImageE.js";
import { PieceC } from "../components/PieceC.js";
import type { PlayerC } from "../components/PlayerC.js";

export class PieceE extends ImageE
{
    constructor(owner: PlayerC, images: HTMLImageElement[], size: number)
    {
        super(images[0]!);
        this.image.width = size;
        this.image.height = size;
        this.visual.imageSmoothingEnabled = true;
        this.visual.imageSmoothingQuality = "high";
        this.addComponent(new ClickableC);
        this.addComponent(new PieceC(owner, images));
    }
}