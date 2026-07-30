import { Component } from "../../engine/components/Component";
import type { LabelV } from "../../engine/components/visuals/LabelV";
import { EngineGlobals } from "../../engine/core/EngineGlobals";
import { Utils } from "../../engine/utils/Utils";

export class HighlightTextC extends Component
{
    private label: LabelV;
    private minOpacity: number;
    private maxOpacity: number;
    private minFontSize: number;
    private maxFontSize: number;
    private visibility: number;
    private speed: number;
    private isIncreasing: boolean;

    constructor()
    {
        super();
        this.visibility = 0;
        this.speed = 0.5;
        this.isIncreasing = true;
        this.minOpacity = 0.5;
        this.maxOpacity = 1;
    }

    public awake(): void
    {
        this.label = this.entity.visual as LabelV;
        this.label.shadowColor = "#008CFF";
        this.label.opacity = this.minOpacity;
        this.minFontSize = this.label.fontSize*0.75;
        this.maxFontSize = this.label.fontSize*1.25;
        this.label.fontSize = this.minFontSize;
    }

    public update(): void
    {
        if (this.isIncreasing)
        {
            this.visibility += this.speed * EngineGlobals.deltaTime;
            if (this.visibility >= 1)
            {
                this.visibility = 1;
                this.isIncreasing = false;
            }
        }
        else
        {
            this.visibility -= this.speed * EngineGlobals.deltaTime;
            if (this.visibility <= 0)
            {
                this.visibility = 0;
                this.isIncreasing = true;
            }
        }
        this.label.opacity = Utils.lerp(this.minOpacity, this.maxOpacity, this.visibility);
        this.label.fontSize = Utils.lerp(this.minFontSize, this.maxFontSize, this.visibility);
    }
}