import { ColliderC } from "../components/ColliderC.js";
import type { Entity } from "../entities/Entity.js";
import { Utils } from "../utils/Utils.js";
import { EngineGlobals } from "./EngineGlobals.js";

export class CollisionDetection
{

    /*constructor()
   {

   }*/

    public update(): void
    {
        const entities: Entity[] = EngineGlobals.scene.find((entity) => entity.hasComponent(ColliderC));
        const colliders: ColliderC[] = entities.map((entity) => entity.getComponent(ColliderC)!);

        while (colliders.length > 0)
        {
            const collider = colliders[0]!;
            for (let i = 1; i < colliders.length; i++)
            {
                const other = colliders[i]!;
                if (collider._intersects(other))
                {
                    this.collide(collider, other);
                }
            }
            Utils.removeElement(collider, colliders);
        }
    }

    private collide(collider1: ColliderC, collider2: ColliderC)
    {
        if (collider1.isTrigger)
        {
            if (!collider2.isTrigger)
            {
                collider1._onTriggerEnter(collider2.entity);
            }
        }
        else
        {
            if (!collider2.isTrigger)
            {
                collider1._onCollisionEnter(collider2.entity);
            }
        }

        if (collider2.isTrigger)
        {
            if (!collider1.isTrigger)
            {
                collider2._onTriggerEnter(collider1.entity);
            }
        }
        else
        {
            if (!collider1.isTrigger)
            {
                collider2._onCollisionEnter(collider1.entity);
            }
        }
    }
}