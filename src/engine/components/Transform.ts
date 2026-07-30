import { Vector } from "../utils/Vector.js";
import { Angle } from "../utils/Angle.js";
import { EngineGlobals } from "../core/EngineGlobals.js";

const Anchor =
    {
        none: "NONE",
        topLeft: "TOP_LEFT",
        topCenter: "TOP_CENTER",
        topRight: "TOP_RIGHT",
        left: "LEFT",
        center: "CENTER",
        right: "RIGHT",
        bottomLeft: "BOTTOM_LEFT",
        bottomCenter: "BOTTOM_CENTER",
        bottomRight: "BOTTOM_RIGHT",

    } as const;
type Anchor = typeof Anchor[keyof typeof Anchor];
export { Anchor };

export class Transform
{
    private _anchor: Anchor;
    private _position: Vector;
    private _rotation: Angle;
    private _scaling: Vector;
    private _hide_rotation: boolean;
    private previousState: DOMMatrix;

    constructor()
    {
        this._anchor = Anchor.none;
        this._position = new Vector(0, 0);
        this._rotation = new Angle(0);
        this._scaling = new Vector(1, 1);
        this._hide_rotation = false;
        this.previousState = new DOMMatrix();
    }

    public get anchor(): Anchor { return this._anchor; }
    public get position(): Vector { return this._position; }
    public get rotation(): Angle { return this._rotation; }
    public get scaling(): Vector { return this._scaling; }
    public get hide_rotation(): boolean { return this._hide_rotation; }

    public set anchor(anchor: Anchor) { this._anchor = anchor; }
    public set hide_rotation(newValue: boolean) { this._hide_rotation = newValue; }

    public translate(x: number, y: number): void
    {
        this._position.add(x, y);
    }

    public rotate(angle: number): void
    {
        this._rotation.add(angle);
    }

    public scale(x: number, y: number): void
    {
        this._scaling.multiply(x, y);
    }

    public move_forward(distance: number): void
    {
        const dx = this._rotation.vector.x * distance;
        const dy = this._rotation.vector.y * distance;
        this.translate(dx, dy);
    }

    public apply(): void
    {
        this.previousState = EngineGlobals.ctx.getTransform();
        const anchor = this.anchorPosition();
        const direction = this._hide_rotation ? Vector.right : this._rotation.vector;
        const xAX = direction.x * this._scaling.x;
        const xAY = direction.y * this._scaling.y;
        const x = this._position.x + anchor.x/EngineGlobals.scene.camera.transform.scaling.x;
        const y = this._position.y + anchor.y/EngineGlobals.scene.camera.transform.scaling.y;
        EngineGlobals.ctx.transform(xAX, xAY, -xAY, xAX, x, y);
    }

    public revert(): void
    {
        EngineGlobals.ctx.setTransform(this.previousState);
    }

    private anchorPosition(): Vector
    {
        const anchor = new Vector(0,0);

        if (this.anchor !== Anchor.none)
        {
            anchor.x += -EngineGlobals.scene.camera.transform.position.x;
            anchor.y += -EngineGlobals.scene.camera.transform.position.y;
        }
        if (this.anchor === Anchor.topLeft)
        {
            anchor.x += 0;
            anchor.y += 0;
        }
        else if (this.anchor === Anchor.topCenter)
        {
            anchor.x += EngineGlobals.canvas.width/2;
            anchor.y += 0;
        }
        else if (this.anchor === Anchor.topRight)
        {
            anchor.x += EngineGlobals.canvas.width;
            anchor.y += 0;
        }
        else if (this.anchor === Anchor.left)
        {
            anchor.x += 0;
            anchor.y += EngineGlobals.canvas.height/2;
        }
        else if (this.anchor === Anchor.center)
        {
            anchor.x += EngineGlobals.canvas.width/2;
            anchor.y += EngineGlobals.canvas.height/2;
        }
        else if (this.anchor === Anchor.right)
        {
            anchor.x += EngineGlobals.canvas.width;
            anchor.y += EngineGlobals.canvas.height/2;
        }
        else if (this.anchor === Anchor.bottomLeft)
        {
            anchor.x += 0;
            anchor.y += EngineGlobals.canvas.height;
        }
        else if (this.anchor === Anchor.bottomCenter)
        {
            anchor.x += EngineGlobals.canvas.width/2;
            anchor.y += EngineGlobals.canvas.height;
        }
        else if (this.anchor === Anchor.bottomRight)
        {
            anchor.x += EngineGlobals.canvas.width;
            anchor.y += EngineGlobals.canvas.height;
        }

        return anchor;
    }

}