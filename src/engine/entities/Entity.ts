import { Component } from "../components/Component.js";
import { Transform } from "../components/Transform.js";
import { Visual } from "../components/visuals/Visual.js";
import { Utils } from "../utils/Utils.js";

export class Entity
{
    private _name: string;
    private _tag: string;
    private _isEnabled: boolean;
    private _hasStarted: boolean;
    private _transform: Transform;
    private _visual: Visual;
    private components: Component[];
    private _parent: Entity | undefined;
    private _children: Entity[];

    constructor()
    {
        this._name = this.constructor.name;
        this._tag = "";
        this._isEnabled = true;
        this._hasStarted = false;
        this._visual = new Visual();
        this._transform = new Transform();
        this.components = [];
        this._children = [];
    }

    private addChild(entity: Entity): void
    {
        this._children.push(entity);
    }

    private removeChild(entity: Entity): void
    {
        Utils.removeElement(entity, this._children);
    }

    private disable(): void
    {
        this.components.forEach(c => c.disable());
    }

    private enable(): void
    {
        this.components.forEach(c => c.enable());
    }

    public get name(): string { return this._name; }
    public get tag(): string { return this._tag; }
    public get transform(): Transform { return this._transform; }
    public get visual(): Visual { return this._visual; }
    public get parent(): Entity | undefined { return this._parent; }
    public get children(): Entity[] { return this._children; }
    public get hasStarted(): boolean { return this._hasStarted; }
    public get isEnabled(): boolean { return this._isEnabled; }

    public set tag(tag: string) { this._tag = tag; }
    public set name(name: string){ this._name = name; }
    public set visual(visual: Visual) { this._visual = visual; }
    public set hideRotation(value: boolean) { this.transform.hide_rotation = value; }

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
        let res = true;
        let entity: Entity | undefined = this;

        while (entity !== undefined)
        {
            if (!entity.isEnabled)
                res = false;
            entity = entity.parent;
        }

        return res;
    }

    public hasParent(): boolean { return this._parent !== undefined; }

    public setParent(entity: Entity | undefined): void
    {
        if (this._parent !== undefined)
        {
            this._parent.removeChild(this);
        }
        this._parent = entity;
        if (entity !== undefined)
        {
            entity.addChild(this);
        }
    }

    public addComponent(component: Component): void
    {
        component._assign(this);
        component.awake();
        this.components.push(component);
    }

    public removeComponent(component: Component): void
    {
        Utils.removeElement(component, this.components);
    }

    public getComponent<Type extends Component>(componentType: typeof Component): Type | undefined
    {
        let res: Type | undefined = undefined;
        const found: Component | undefined = this.components.find((c: Component) => c instanceof componentType);
        if (found)
        {
            res = found as Type;
        }
        return res;
    }

    public hasComponent(componentType: typeof Component): boolean
    {
        return this.components.some((c: Component) => c instanceof componentType);
    }

    public translate(x: number, y: number): void { this._transform.translate(x, y); }

    public rotate(angle: number): void { this._transform.rotate(angle); }

    public scale(x: number, y: number): void { this._transform.scale(x, y); }

    public moveForward(distance: number) { this.transform.move_forward(distance); }

    public containsPoint(x: number, y: number): boolean
    {
        const stack: Entity[] = [];
        let current: Entity = this;

        stack.unshift(current);
        while (current._parent !== undefined)
        {
            current = current._parent;
            stack.unshift(current);
        }
        for (const entity of stack)
        {
            entity._transform.apply();
        }
        const res = this._visual.containsPoint(x, y);
        for (const entity of stack.reverse())
        {
            entity._transform.revert();
        }
        return res;
    }

    public start(): void
    {
        if (!this.hasStarted)
        {
            this._hasStarted = true;
            this.components.forEach(c => c.start());
        }
    }

    public update(): void
    {
        for (const component of this.components)
        {
            if (component.isEnabled)
                component.update();
        }
    }

    public draw(): void
    {
        this._transform.apply();
        this._visual.applyTransparency();
        this._visual.applyEffects();
        this._visual.draw();
        for (const child of this._children)
        {
            if (child.isEnabled)
                child.draw();
        }
        this._visual.removeEffects();
        this._visual.revertTransparency();
        this._transform.revert();
    }
}