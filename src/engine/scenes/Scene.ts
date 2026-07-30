import { CameraE } from "../entities/CameraE.js";
import { Entity } from "../entities/Entity.js";
import { SafeArray } from "../utils/SafeArray.js";

export class Scene
{
    private readonly _camera: CameraE;
    private readonly _entities: SafeArray<Entity>;

    public constructor(..._args: unknown[])
    {
        this._camera = new CameraE();
        this._entities = new SafeArray();
    }

    public get camera() { return this._camera; }

    public addEntity(entity: Entity): void
    {
        this._entities.add(entity);
        for (const child of entity.children)
        {
            this._entities.add(child);
        }
    }

    public removeEntity(entity: Entity): void
    {
        entity.setParent(undefined);
        this._entities.remove(entity);
    }

    public forEach(fn: (entity: Entity) => void): void
    {
        this._entities.forEach(fn);
    }

    public find(condition: (entity: Entity) => boolean): Entity[]
    {
        return this._entities.find(condition);
    }

    public findFirst(condition: (entity: Entity) => boolean): Entity | undefined
    {
        return this._entities.findFirst(condition);
    }

    public update(): void
    {
        this._entities.forEach((entity: Entity) =>
        {
            if (!entity.hasStarted) entity.start();
            if (entity.isEffectivelyEnabled()) entity.update();
        });
        this.camera.update();
    }

    public draw(): void
    {
        this.camera.transform.apply();
        this._entities.forEach((entity: Entity) =>
        {
            if (entity.isEffectivelyEnabled() && !entity.hasParent())
                entity.draw();
        });
        this.camera.transform.revert();
    }
}