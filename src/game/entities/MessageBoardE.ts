import { MessageBoardC } from "../components/MessageBoardC.js";
import { Anchor } from "../../engine/components/Transform.js";
import { EngineConstants } from "../../engine/core/EngineConstants.js";
import { LabelE } from "../../engine/entities/LabelE.js";

export class MessageBoardE extends LabelE
{
    constructor()
    {
        super("arial", 30, "white", "Messages.");
        this.transform.anchor = Anchor.topCenter;
        this.translate(0, EngineConstants.referenceHeight*0.065);
        this.addComponent(new MessageBoardC);
    }
}