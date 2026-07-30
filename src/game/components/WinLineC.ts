import { Component } from "../../engine/components/Component.js";
import { Point } from "../../engine/utils/Point.js";
import type { LineV } from "../../engine/components/visuals/LineV.js";
import { EngineGlobals } from "../../engine/core/EngineGlobals.js";
import { GameOver } from "../events/GameOver.js";
import { BoardC } from "./BoardC.js";
import type { BoardSpaceC } from "./BoardSpaceC.js";
import { GameConstants } from "../core/GameConstants.js";

export class WinLineC extends Component
{
    private readonly width: number = 15;
    private line: LineV;
    private board: BoardC;
    private startPoint: Point;
    private endPoint: Point;
    private maxLength: number;
    private drawSpeed: number;

    constructor()
    {
        super();
        this.startPoint = Point.origin;
        this.endPoint = Point.origin;
        EngineGlobals.eventSystem.subscribe(this.place.bind(this), GameOver);
    }

    public awake(): void
    {
        this.line = this.entity.visual as LineV;
        this.line.width = this.width;
        this.line.length = 0;
    }

    public start(): void
    {
        this.board = EngineGlobals.scene.findFirst(o => o.hasComponent(BoardC))!.getComponent(BoardC)!;
        this.entity.isEnabled = false;
    }

    place(event: GameOver): void
    {
        const winningSpaces: BoardSpaceC[] = [];
        let l = 0;
        let c = 0;

        do
        {
            if (this.board.spaces[l]![c]!.piece?.owner === event.winner)
            {
                winningSpaces.push(this.board.spaces[l]![c]!);
            }
            c++;
            if (c > this.board.spaces[0]!.length-1)
            {
                c = 0;
                l++;
            }
        } while (winningSpaces.length < 3);

        this.startPoint = Point.fromVector(winningSpaces[0]!.entity.transform.position!);
        this.endPoint = Point.fromVector(winningSpaces[2]!.entity.transform.position!);
        this.maxLength = this.startPoint.distanceTo(this.endPoint);
        this.drawSpeed = this.maxLength / GameConstants.winLineDrawTime;
        this.entity.transform.position.x = this.startPoint.x;
        this.entity.transform.position.y = this.startPoint.y;
        this.entity.transform.rotate(this.startPoint.angleTo(this.endPoint).degrees);
        const grad = EngineGlobals.ctx.createLinearGradient(0, 0, this.maxLength, 0);
        if (event.winner.color === "blue")
        {
            grad.addColorStop(0, "cyan");
            grad.addColorStop(1, "blue");
        }
        else
        {
            grad.addColorStop(0, "yellow");
            grad.addColorStop(1, "red");
        }
        this.line.strokeStyle = grad;
        this.entity.isEnabled = true;
    }

    public update(): void
    {
        if (this.line.length < this.maxLength)
        {
            const delta = Math.min(this.drawSpeed * EngineGlobals.deltaTime, this.maxLength - this.line.length);
            this.entity.moveForward(delta/2);
            this.line.length += delta;
            if (this.line.length > this.maxLength)
                this.line.length = this.maxLength;
        }
    }
}