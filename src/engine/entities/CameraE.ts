import { CameraC } from "../components/CameraC.js";
import { Entity } from "./Entity.js";

export class CameraE extends Entity
{
    private camera: CameraC;

    constructor()
    {
        super();
        this.camera = new CameraC;
        this.addComponent(this.camera);
    }

    public resize(): void
    {
        this.camera.resize();
    }

    public follow(target: Entity): void
    {
        this.camera.follow(target);
    }
}