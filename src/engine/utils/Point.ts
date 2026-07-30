import { Angle } from "./Angle.js";
import type { Vector } from "./Vector.js";

export class Point
{
    private _x: number;
    private _y: number;

    constructor(x: number, y: number)
    {
        this._x = x;
        this._y = y;
    }

    public static fromVector(vector: Vector): Point
    {
        return new Point(vector.x, vector.y);
    }

    public static get origin(): Point { return new Point(0,0); }

    public get x(): number { return this._x; }
    public get y(): number { return this._y; }

    public distanceTo(other: Point): number
    {
        return Math.sqrt( ( (other._x-this._x)*(other._x-this._x) ) + ( (other._y-this._y)*(other._y-this._y) ) );
    }

    public middleTo(other: Point): Point
    {
        return new Point((this._x+other._x)/2, (this._y+other._y));
    }

    public angleTo(other: Point): Angle
    {
        const radians = Math.atan2(other._y-this._y, other._x-this._x);
        return Angle.fromRadians(radians);
    }
}