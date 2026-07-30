import { Component } from "./Component.js";
import { Utils } from "../utils/Utils.js";
import type { Entity } from "../entities/Entity.js";

export class ClickableC extends Component
{
    private readonly enterList: Array<() => void>;
    private readonly leaveList: Array<() => void>;
    private readonly downList: Array<() => void>;
    private readonly upList: Array<() => void>;
    private readonly grabList: Array<() => void>;
    private readonly releaseList: Array<() => void>;
    private _cursorStyle: string;
    private _isDraggable: boolean;

    constructor()
    {
        super();
        this.enterList = [];
        this.leaveList = [];
        this.downList = [];
        this.upList = [];
        this.grabList = [];
        this.releaseList = [];
        this._cursorStyle = "pointer";
        this._isDraggable = false;
    }

    public get cursorStyle(): string { return this._cursorStyle; }
    public get isDraggable(): boolean { return this._isDraggable; }

    public set cursorStyle(cursorStyle: string) { this._cursorStyle = cursorStyle; }
    public set isDraggable(isDraggable: boolean) { this._isDraggable = isDraggable; }

    public addEnterAction(action: () => void): void { this.enterList.push(action); }
    public addLeaveAction(action: () => void): void { this.leaveList.push(action); }
    public addDownAction(action: () => void): void { this.downList.push(action); }
    public addUpAction(action: () => void): void { this.upList.push(action); }
    public addGrabAction(action: () => void): void { this.grabList.push(action); }
    public addReleaseAction(action: () => void): void { this.releaseList.push(action); }

    public removeEnterAction(action: () => void): void { Utils.removeElement(action, this.enterList); }
    public removeLeaveAction(action: () => void): void { Utils.removeElement(action, this.leaveList); }
    public removeDownAction(action: () => void): void { Utils.removeElement(action, this.downList); }
    public removeUpAction(action: () => void): void { Utils.removeElement(action, this.upList); }
    public removeGrabAction(action: () => void): void { Utils.removeElement(action, this.grabList); }

    public acceptsEntity(_entity: Entity): boolean { return false; }
    public receiveEntity(_entity: Entity, _origin: Entity | undefined): void { }

    public _onMouseEnter(): void
    {
        for (const action of this.enterList)
        {
            action();
        }
    }

    public _onMouseLeave(): void
    {
        for (const action of this.leaveList)
        {
            action();
        }
    }

    public _onMouseDown(): void
    {
        for (const action of this.downList)
        {
            action();
        }
    }

    public _onMouseUp(): void
    {
        for (const action of this.upList)
        {
            action();
        }
    }

    public _onGrab(): void
    {
        for (const action of this.grabList)
        {
            action();
        }
    }

    public _onRelease(): void
    {
        for (const action of this.releaseList)
        {
            action();
        }
    }

    public disable(): void
    {
        this._onMouseLeave();
    }
}