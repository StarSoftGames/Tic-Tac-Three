import { Component } from "../../engine/components/Component";

export class PlayerC extends Component
{
    private readonly _color: string;

    constructor(color: string)
    {
        super();
        this._color = color;
    }

    public get color(): string { return this._color; }

}