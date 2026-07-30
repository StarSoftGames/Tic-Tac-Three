import type { Entity } from "../entities/Entity.js";

export class Component
{
    private _entity: Entity;
    private _isEnabled: boolean;

    constructor(..._args: unknown[])
    {
        this._isEnabled = true;
    }

    public get entity(): Entity { return this._entity; }
    public get isEnabled(): boolean { return this._isEnabled; }

    public set isEnabled(newValue: boolean)
    {
        if (newValue && !this._isEnabled)
        {
            this.enable();
            this._isEnabled = newValue;
        }
        else if (!newValue && this._isEnabled)
        {
            this.disable();
            this._isEnabled = newValue;
        }
    }

    public isEffectivelyEnabled(): boolean
    {
        let res = this._isEnabled;

        if (!this._entity.isEffectivelyEnabled())
            res = false;

        return res;
    }

    public _assign(entity: Entity)
    {
        if (this._entity === undefined)
        {
            this._entity = entity;
        }
    }

    public awake(): void { }
    public start(): void { }
    public update(): void { }
    public disable(): void { }
    public enable(): void { }
}