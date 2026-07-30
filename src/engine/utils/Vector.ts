import { Angle } from "./Angle.js";
import type { Point } from "./Point.js";

export class Vector
{
    private _x: number;
    private _y: number;

    constructor(x: number, y: number)
    {
        this._x = x;
        this._y = y;
    }

    public static fromPoint(point: Point)
    {
        return new Vector(point.x, point.y);
    }

    public static get zero(): Vector { return new Vector(0, 0); }
    public static get unit(): Vector { return new Vector(1, 1); }
    public static get right(): Vector { return new Vector(1, 0); }
    public static get up(): Vector { return new Vector(0, 1); }
    public static get left(): Vector { return new Vector(-1, 0); }
    public static get down(): Vector { return new Vector(0, -1); }

    public get x(): number { return this._x; }
    public get y(): number { return this._y; }

    public set x(newX: number) {this._x = newX; }
    public set y(newY: number) {this._y = newY; }

    public normalize(): void
    {
        const length = Math.hypot(this._x, this._y);
        this.x = this._x / length;
        this.y = this._y / length;
    }

    public add(x: number, y: number): void
    {
        this._x += x;
        this._y += y;
    }

    public subtract(x: number, y: number): void
    {
        this._x -= x;
        this._y -= y;
    }

    public multiply(x: number, y: number): void
    {
        this._x *= x;
        this._y *= y;
    }

    public divide(x: number, y: number): void
    {
        this._x /= x;
        this._y /= y;
    }

    public angleTo(other: Vector): Angle
    {
        const radians = Math.atan2(other._y-this._y, other._x-this._x);
        return Angle.fromRadians(radians);
    }
}