import { ImageV } from "../components/visuals/ImageV.js";
import { Entity } from "./Entity.js";

export class ImageE extends Entity
{
    private readonly _image: ImageV;

    constructor(image: HTMLImageElement)
    {
        super();
        this.visual = new ImageV(image);
        this._image = this.visual as ImageV;
    }

    get image(): ImageV { return this._image; }

    set image(newImage: ImageV) { this.image = newImage; }
}