import { Assets } from "../../Assets";
import { Anchor } from "../components/Transform";
import { EngineGlobals } from "../core/EngineGlobals";
import { ImageButtonE } from "./ImageButtonE";

export class MuteButtonE extends ImageButtonE
{
    private readonly _muteImage: HTMLImageElement;
    private readonly _unmuteImage: HTMLImageElement;

    constructor()
    {
        super(Assets.getImage("mute"));
        this._muteImage = Assets.getImage("mute");
        this._unmuteImage = Assets.getImage("unmute");
        if (EngineGlobals.audioManager.isMuted)
        {
            this.image.element = Assets.getImage("unmute");
        }
        this.transform.anchor = Anchor.topRight;
        this.translate(-(this.image.width*2.5), this.image.height);
        this.clickable.addUpAction(this.toggleMute.bind(this));
    }

    private toggleMute(): void
    {
        if (EngineGlobals.audioManager.isMuted)
        {
            EngineGlobals.audioManager.unMute();
            this.mouseLeaveImage = this._muteImage;
            this.image.element = this._muteImage;
        }
        else
        {
            EngineGlobals.audioManager.mute();
            this.mouseLeaveImage = this._unmuteImage;
            this.image.element = this._unmuteImage;
        }
    }
}