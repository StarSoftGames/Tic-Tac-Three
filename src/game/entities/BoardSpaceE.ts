import { EngineGlobals } from "../../engine/core/EngineGlobals.js";
import { ButtonE } from "../../engine/entities/ButtonE.js";
import { BoardSpaceC } from "../components/BoardSpaceC.js";
import { TurnStarted } from "../events/TurnStarted.js";

export class BoardSpaceE extends ButtonE
{
    private readonly blueRolloverColor: string = "PaleTurquoise";
    private readonly redRolloverColor: string = "LavenderBlush";

    constructor(id: number, size: number)
    {
        super(size, size);
        this.rectangle.fillStyle = "transparent";
        this.mouseLeaveColor = "transparent";
        this.mouseEnterColor = "lightblue";
        this.mouseDownColor = "transparent";
        this.mouseUpColor = "transparent";
        this.name = `Space ${id}`;
        this.tag = "Board Space";
        this.label.text = "";
        this.addComponent(new BoardSpaceC);
        EngineGlobals.eventSystem.subscribe(this.changeRolloverColor.bind(this), TurnStarted);
    }

    private changeRolloverColor(event: TurnStarted): void
    {
        if (event.player.color === "blue")
            this.mouseEnterColor = this.blueRolloverColor;
        else if (event.player.color === "red")
            this.mouseEnterColor = this.redRolloverColor;
    }
}