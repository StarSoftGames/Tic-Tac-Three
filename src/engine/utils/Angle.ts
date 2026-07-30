import { EngineConstants } from "../core/EngineConstants.js";
import { Vector } from "./Vector.js";

export class Angle
{
    private _degrees: number;

    constructor(degrees: number = 0)
    {
        this._degrees = degrees;
    }

    public static fromRadians(radians: number): Angle
    {
        return new Angle(radians * EngineConstants.degressToRadians);
    }

    public get degrees(): number { return this._degrees; }
    public get radians(): number { return this._degrees * EngineConstants.radiansToDegrees; }

    public get vector(): Vector
    {
        const x = Math.cos(this.radians);
        const y = Math.sin(this.radians);

        return new Vector(x, y);
    }

    public add(degrees: number): void
    {
        this._degrees += degrees;

        if (this._degrees > 360)
        {
            this._degrees -= 360;
        }
        else if (this._degrees < 0)
        {
            this._degrees += 360;
        }
    }

}