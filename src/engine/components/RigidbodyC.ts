import { Component } from "./Component.js";
import { EngineGlobals } from "../core/EngineGlobals.js";
import { ColliderC } from "./ColliderC.js";
import type { Transform } from "./Transform.js";
import { Utils } from "../utils/Utils.js";

export class RigidbodyC extends Component
{
    private transform: Transform;
    private collider: ColliderC;
    private max_speed: number;
    private gravity: number;
    private friction: number;
    private airResistance: number;
    private ground: number;
    private ax: number;
    private ay: number;
    private dx: number;
    private dy: number;

    public constructor()
    {
        super();
        this.max_speed = 5;
        this.gravity = 9.8*2;
        this.friction = 15;
        this.airResistance = 1;
        this.ground = Infinity;
        this.ax = 0;
        this.ay = 0;
        this.dx = 0;
        this.dy = 0;
    }

    public awake(): void
    {
        this.transform = this.entity.transform;
        this.collider = this.entity.getComponent(ColliderC)!;
    }

    public update(): void
    {
        this.findGround();
        this.ay += this.gravity * EngineGlobals.deltaTime;
        this.dx += this.ax;
        if (this.isGrounded)
            this.dx = Utils.reduce(this.dx, this.friction * EngineGlobals.deltaTime);
        this.dx = Utils.reduce(this.dx, this.airResistance * EngineGlobals.deltaTime);
        this.dx = Utils.clamp(this.dx, -this.max_speed, this.max_speed);
        this.dy += this.ay;
        this.entity.translate(this.dx, this.dy);
        this.ax = 0;
        this.ay = 0;
        /*if (this.transform.position.x < 50)
        {
            this.transform.position.x = 50;
        }
        else if (this.transform.position.x > Globals.canvas.width - 50)
        {
            this.transform.position.x = Globals.canvas.width - 50;
        }*/
        if (this.transform.position.y + this.collider.height/2 > this.ground)
        {
            this.transform.position.y = this.ground - this.collider.height/2;
        }
        if (this.isGrounded)
        {
            this.dy = 0;
        }
    }

    public addForce(ax: number, ay: number): void
    {
        this.ax += ax;
        this.ay += ay;
    }

    public get isGrounded(): boolean
    {
        return this.transform.position.y + this.collider.height/2 >= this.ground;
    }

    private findGround(): void
    {
        this.ground = Infinity;
        const colliders = EngineGlobals.scene.find((entity) => entity.hasComponent(ColliderC));
        Utils.removeElement(this.entity, colliders);
        for (const other of colliders)
        {
            const otherCollider: ColliderC = other.getComponent(ColliderC)!;
            if (!otherCollider.isTrigger &&
                other.transform.position.y - otherCollider.height/2 < this.ground &&
                this.transform.position.x + this.collider.width/2 >= other.transform.position.x - otherCollider.width/2 &&
                this.transform.position.x - this.collider.width/2 <= other.transform.position.x + otherCollider.width/2 &&
                this.transform.position.y + this.collider.height/2 <= other.transform.position.y - otherCollider.height/2
            )
                this.ground = other.transform.position.y - otherCollider.height/2;
        }
    }
}