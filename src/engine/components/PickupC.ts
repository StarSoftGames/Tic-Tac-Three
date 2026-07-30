import { Component } from "./Component.js";
import { EngineGlobals } from "../core/EngineGlobals.js";
import type { Entity } from "../entities/Entity.js";
import { ColliderC } from "./ColliderC.js";

export class PickupC extends Component
{
    public awake(): void
    {
        const collider = this.entity.getComponent<ColliderC>(ColliderC)!;
        collider.addTriggerEnterAction(this.onPickup.bind(this));
    }

    public update(): void
    {
        this.entity.rotate(45 * EngineGlobals.deltaTime);
    }

    private onPickup(other: Entity): void
    {
        if (other.tag === "player")
        {
            EngineGlobals.scene.removeEntity(this.entity);
        }
    }
}