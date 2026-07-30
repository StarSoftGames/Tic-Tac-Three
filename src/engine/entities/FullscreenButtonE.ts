import { Assets } from "../../Assets.js";
import { Anchor } from "../components/Transform.js";
import { EngineGlobals } from "../core/EngineGlobals.js";
import { ImageButtonE } from "./ImageButtonE.js";

export class FullscreenButtonE extends ImageButtonE
{
    constructor()
    {
        super(Assets.getImage("fullscreen"));
        this.transform.anchor = Anchor.topRight;
        this.translate(-(this.image.width), this.image.height);
        this.clickable.addUpAction(() => EngineGlobals.engine.togglefullscreen());
    }
}