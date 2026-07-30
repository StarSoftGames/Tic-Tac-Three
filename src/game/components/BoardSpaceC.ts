import { ClickableC } from "../../engine/components/ClickableC.js";
import { Component } from "../../engine/components/Component.js";
import { EngineGlobals } from "../../engine/core/EngineGlobals.js";
import type { Entity } from "../../engine/entities/Entity.js";
import { GameGlobals } from "../core/GameGlobals.js";
import { PieceGrabbed } from "../events/PieceGrabbed.js";
import { PieceReleased } from "../events/PieceReleased.js";
import { PieceC } from "./PieceC.js";

export class BoardSpaceC extends Component
{
    private readonly opacityWhileEmpty: number = 0.5;
    private _piece: PieceC | undefined;
    private clickable: ClickableC;

    constructor()
    {
        super();
        this._piece = undefined;
        EngineGlobals.eventSystem.subscribe(this.open.bind(this), PieceGrabbed);
        EngineGlobals.eventSystem.subscribe(this.close.bind(this), PieceReleased);
    }

    public awake(): void
    {
        this.clickable = this.entity.getComponent(ClickableC)!;
        this.clickable.isEnabled = false;
        this.clickable.acceptsEntity = this.acceptsEntity.bind(this);
        this.clickable.receiveEntity = this.receivePiece.bind(this);
    }

    public get piece(): PieceC | undefined { return this._piece; }
    public get hasPiece(): boolean { return this._piece !== undefined; }

    public set piece(newValue: PieceC | undefined) { this._piece = newValue; }

    private acceptsEntity(entity: Entity): boolean
    {
        return entity.hasComponent(PieceC);
    }

    private receivePiece(pieceEntity: Entity, origin: Entity | undefined): void
    {
        this.entity.visual.opacity = 1;
        EngineGlobals.audioManager.playSound("game/place_piece");
        if (origin?.tag === "Board Space")
        {
            origin.getComponent<BoardSpaceC>(BoardSpaceC)!.piece = undefined;
        }
        this._piece = pieceEntity.getComponent(PieceC);
        GameGlobals.gameManager.endTurn();
    }

    private open(_event: PieceGrabbed): void
    {
        if (!this.hasPiece)
        {
            this.clickable.isEnabled = true;
            this.entity.visual.opacity = this.opacityWhileEmpty;
        }
    }

    private close(_event: PieceReleased): void
    {
        this.clickable.isEnabled = false;
    }

}