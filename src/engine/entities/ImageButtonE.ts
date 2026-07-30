import { Assets } from "../../Assets.js";
import { ClickableC } from "../components/ClickableC.js";
import { ImageV } from "../components/visuals/ImageV.js";
import { Entity } from "./Entity.js";

export class ImageButtonE extends Entity
{
    private readonly _image: ImageV;
    private readonly _clickable!: ClickableC;
    private _mouseLeaveImage: HTMLImageElement;
    private _mouseEnterImage: HTMLImageElement;
    private _mouseDownImage: HTMLImageElement;
    private _mouseUpImage: HTMLImageElement;
    private _mouseLeaveSize: number = 1;
    private _mouseEnterSize: number = 1;
    private _mouseDownSize: number = 1;
    private _mouseUpSize: number = 1;

    public constructor(image: HTMLImageElement)
    {
        super();
        this.visual = new ImageV(image);
        this._image = this.visual as ImageV;
        this._mouseLeaveImage = image;
        this._mouseEnterImage = Assets.emptyImage;
        this._mouseDownImage = Assets.emptyImage;
        this._mouseUpImage = Assets.emptyImage;
        this._clickable = new ClickableC;
        this._clickable.addEnterAction(this.onMouseEnter.bind(this));
        this._clickable.addLeaveAction(this.onMouseLeave.bind(this));
        this._clickable.addDownAction(this.onMouseDown.bind(this));
        this._clickable.addUpAction(this.onMouseUp.bind(this));
        this.addComponent(this._clickable);
    }

    public get image(): ImageV { return this._image; }
    public get clickable(): ClickableC { return this._clickable; }
    public get mouseLeaveImage(): HTMLImageElement { return this._mouseLeaveImage; }
    public get mouseEnterImage(): HTMLImageElement { return this._mouseEnterImage; }
    public get mouseDownImage(): HTMLImageElement { return this._mouseDownImage; }
    public get mouseUpImage(): HTMLImageElement { return this._mouseUpImage; }
    public get mouseLeaveSize(): number { return this._mouseLeaveSize; }
    public get mouseEnterSize(): number { return this._mouseEnterSize; }
    public get mouseDownSize(): number { return this._mouseDownSize; }
    public get mouseUpSize(): number { return this._mouseUpSize; }

    public set mouseLeaveImage(newImage: HTMLImageElement) { this._mouseLeaveImage = newImage; }
    public set mouseEnterImage(newImage: HTMLImageElement) { this._mouseEnterImage = newImage; }
    public set mouseDownImage(newImage: HTMLImageElement) { this._mouseDownImage = newImage; }
    public set mouseUpImage(newImage: HTMLImageElement) { this._mouseUpImage = newImage; }
    public set mouseLeaveSize(newSize: number) { this._mouseLeaveSize = newSize; }
    public set mouseEnterSize(newSize: number) { this._mouseEnterSize = newSize; }
    public set mouseDownSize(newSize: number) { this._mouseDownSize = newSize; }
    public set mouseUpSize(newSize: number) { this._mouseUpSize = newSize; }

    private onMouseEnter(): void
    {
        if (this._mouseEnterImage !== Assets.emptyImage)
            this.image.element = this._mouseEnterImage;

        this.transform.scaling.x = this._mouseEnterSize;
        this.transform.scaling.y = this._mouseEnterSize;
    }

    private onMouseLeave(): void
    {
        if (this._mouseLeaveImage !== Assets.emptyImage)
            this.image.element = this._mouseLeaveImage;

        this.transform.scaling.x = this._mouseLeaveSize;
        this.transform.scaling.y = this._mouseLeaveSize;
    }

    private onMouseDown(): void
    {
        if (this._mouseDownImage !== Assets.emptyImage)
            this.image.element = this._mouseDownImage;

        this.transform.scaling.x = this._mouseDownSize;
        this.transform.scaling.y = this._mouseDownSize;
    }

    private onMouseUp(): void
    {
        if (this._mouseUpImage !== Assets.emptyImage)
            this.image.element = this._mouseUpImage;

        this.transform.scaling.x = this._mouseUpSize;
        this.transform.scaling.y = this._mouseUpSize;
    }

}