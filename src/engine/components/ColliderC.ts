import { Component } from "./Component.js";

import type { Entity } from "../entities/Entity.js";
import { Utils } from "../utils/Utils.js";

export class ColliderC extends Component
{
    private _width: number;
    private _height: number;
    private _isTrigger: boolean;
    private readonly collisionEnterList: Array<(other: Entity) => void>;
    private readonly collisionStayList: Array<(other: Entity) => void>;
    private readonly collisionLeaveList: Array<(other: Entity) => void>;
    private readonly triggerEnterList: Array<(other: Entity) => void>;
    private readonly triggerStayList: Array<(other: Entity) => void>;
    private readonly triggerLeaveList: Array<(other: Entity) => void>;

    constructor()
    {
        super();
        this._width = 0;
        this._height = 0;
        this._isTrigger = false;
        this.collisionEnterList = [];
        this.collisionStayList = [];
        this.collisionLeaveList = [];
        this.triggerEnterList = [];
        this.triggerStayList = [];
        this.triggerLeaveList = [];
    }

    public get width(): number { return this._width; }
    public get height(): number { return this._height; }
    public get isTrigger(): boolean { return this._isTrigger; }

    public set width(width: number) { this._width = width; }
    public set height(height: number) { this._height = height; }
    public set isTrigger(isTrigger: boolean) { this._isTrigger = isTrigger; }

    public addCollisionEnterAction(action: (other: Entity) => void) { this.collisionEnterList.push(action); }
    public addCollisionStayAction(action: (other: Entity) => void) { this.collisionStayList.push(action); }
    public addCollisionLeaveAction(action: (other: Entity) => void) { this.collisionLeaveList.push(action); }
    public addTriggerEnterAction(action: (other: Entity) => void) { this.triggerEnterList.push(action); }
    public addTriggerStayAction(action: (other: Entity) => void) { this.triggerStayList.push(action); }
    public addTriggerLeaveAction(action: (other: Entity) => void) { this.triggerLeaveList.push(action); }

    public removeCollisionEnterAction(action: (other: Entity) => void) { Utils.removeElement(action, this.collisionEnterList); }
    public removeCollisionStayAction(action: (other: Entity) => void) { Utils.removeElement(action, this.collisionStayList); }
    public removeCollisionLeaveAction(action: (other: Entity) => void) { Utils.removeElement(action, this.collisionLeaveList); }
    public removeTriggerEnterAction(action: (other: Entity) => void) { Utils.removeElement(action, this.triggerEnterList); }
    public removeTriggerStayAction(action: (other: Entity) => void) { Utils.removeElement(action, this.triggerStayList); }
    public removeTriggerLeaveAction(action: (other: Entity) => void) { Utils.removeElement(action, this.triggerLeaveList); }

    public _onCollisionEnter(other: Entity): void
    {
        for (const action of this.collisionEnterList)
        {
            action(other);
        }
    }

    public _onCollisionStay(other: Entity): void
    {
        for (const action of this.collisionStayList)
        {
            action(other);
        }
    }

    public _onCollisionLeave(other: Entity): void
    {
        for (const action of this.collisionLeaveList)
        {
            action(other);
        }
    }

    public _onTriggerEnter(other: Entity): void
    {
        for (const action of this.triggerEnterList)
        {
            action(other);
        }
    }

    public _onTriggerStay(other: Entity): void
    {
        for (const action of this.triggerStayList)
        {
            action(other);
        }
    }

    public _onTriggerLeave(other: Entity): void
    {
        for (const action of this.triggerLeaveList)
        {
            action(other);
        }
    }

    public _intersects(other: ColliderC): boolean
    {
        let res = false;

        if (this.entity.transform.position.x + this.width/2 >= other.entity.transform.position.x - other.width/2 &&
            this.entity.transform.position.x - this.width/2 <= other.entity.transform.position.x + other.width/2 &&
            this.entity.transform.position.y + this.height/2 >= other.entity.transform.position.y - other.height/2 &&
            this.entity.transform.position.y - this.height/2 <= other.entity.transform.position.y + other.height/2)
        {
            res = true;
        }

        return res;
    }

}