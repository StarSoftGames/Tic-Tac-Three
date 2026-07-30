import { ClickableC } from "../../engine/components/ClickableC.js";
import { Component } from "../../engine/components/Component.js";
import type { ImageV } from "../../engine/components/visuals/ImageV.js";
import { GameOver } from "../events/GameOver.js";
import { TurnStarted } from "../events/TurnStarted.js";
import type { PlayerC } from "./PlayerC.js";
import { EngineGlobals } from "../../engine/core/EngineGlobals.js";
import { PieceReleased } from "../events/PieceReleased.js";
import { PieceGrabbed } from "../events/PieceGrabbed.js";

export class PieceC extends Component
{
    private readonly blinkSpeed: number = 0.25;
    private readonly _owner: PlayerC;
    private readonly images: HTMLImageElement[];
    private readonly highlightScale: number;
    private readonly grabCallback: (event: PieceGrabbed) => void;
    private readonly releaseCallback: (event: PieceReleased) => void;
    private clickable: ClickableC;
    private sprite: ImageV;
    private isBlinking: boolean;
    private blinkTimer: number;

    constructor(owner: PlayerC, images: HTMLImageElement[])
    {
        super();
        this._owner = owner;
        this.images = images;
        this.highlightScale = 1.25;
        this.grabCallback = this.disableOtherPieces.bind(this);
        this.releaseCallback = this.enableOtherPieces.bind(this);
        this.isBlinking = false;
        this.blinkTimer = 0;
    }

    public get owner(): PlayerC { return this._owner; }

    public awake(): void
    {
        this.sprite = this.entity.visual as ImageV;
        this.clickable = this.entity.getComponent(ClickableC)!;
        this.clickable.isDraggable = true;
        this.clickable.addEnterAction(this.onMouseEnter.bind(this));
        this.clickable.addLeaveAction(this.onMouseLeave.bind(this));
        this.clickable.addGrabAction(this.onGrab.bind(this));
        this.clickable.addReleaseAction(this.onRelease.bind(this));
        EngineGlobals.eventSystem.subscribe(this.enableOrDisable.bind(this), TurnStarted);
        EngineGlobals.eventSystem.subscribe(this.showWinner.bind(this), GameOver);
    }

    private enableOrDisable(event: TurnStarted): void
    {
        if (event.player === this._owner)
        {
            EngineGlobals.eventSystem.subscribe(this.grabCallback, PieceGrabbed);
            EngineGlobals.eventSystem.subscribe(this.releaseCallback, PieceReleased);
            this.clickable.isEnabled = true;
        }
        else
        {
            this.clickable.isEnabled = false;
            EngineGlobals.eventSystem.unSubscribe(this.grabCallback, PieceGrabbed);
            EngineGlobals.eventSystem.unSubscribe(this.releaseCallback, PieceReleased);
        }
    }

    private onMouseEnter(): void
    {
        EngineGlobals.audioManager.playSound("game/rollover_piece");
        this.entity.transform.scaling.x = this.highlightScale;
        this.entity.transform.scaling.y = this.highlightScale;
    }

    private onMouseLeave(): void
    {
        this.entity.transform.scaling.x = 1;
        this.entity.transform.scaling.y = 1;
    }

    private onGrab(): void
    {
        EngineGlobals.audioManager.playSound("game/grab_piece");
        EngineGlobals.eventSystem.broadcast(new PieceGrabbed(this));
    }

    private onRelease(): void
    {
        EngineGlobals.eventSystem.broadcast(new PieceReleased(this));
    }

    private disableOtherPieces(event: PieceGrabbed): void
    {
        if (event.piece !== this)
            this.clickable.isEnabled = false;
    }

    private enableOtherPieces(event: PieceReleased): void
    {
        if (event.piece !== this)
            this.clickable.isEnabled = true;
    }

    private showWinner(event: GameOver): void
    {
        if (event.winner === this.owner)
        {
            this.clickable.isEnabled = false;
            this.isBlinking = true;
        }
    }

    public update(): void
    {
        if (this.isBlinking)
        {
            this.blinkTimer += EngineGlobals.deltaTime;
            if (this.blinkTimer >= this.blinkSpeed)
            {
                if (this.sprite.element === this.images[0]!)
                    this.sprite.element = this.images[1]!;
                else
                    this.sprite.element = this.images[0]!;
                this.blinkTimer = 0;
            }
        }
    }
}