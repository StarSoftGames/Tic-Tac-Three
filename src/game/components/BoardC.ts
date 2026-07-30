import { Component } from "../../engine/components/Component.js";
import type { Entity } from "../../engine/entities/Entity.js";
import { BoardSpaceC } from "./BoardSpaceC.js";
import type { PlayerC } from "./PlayerC.js";

export class BoardC extends Component
{
    private readonly _spaces: BoardSpaceC[][];

    constructor()
    {
        super();
        this._spaces = [];
    }

    public get spaces(): BoardSpaceC[][] { return this._spaces; }

    public awake(): void
    {
        const boardSpaceEntities: Entity[] = this.entity.children.filter(c => c.tag === "Board Space");
        const boardSpaces: BoardSpaceC[] = boardSpaceEntities.map(obj => obj.getComponent(BoardSpaceC)!);
        for (let i = 0; i < 3; i++)
        {
            this._spaces[i] = boardSpaces.splice(0, 3);
        }
    }

    public checkWin(player: PlayerC): boolean
    {
        let res = false;

        if
        (
            (this._spaces[0]![0]!.piece?.owner === player && this._spaces[0]![1]!.piece?.owner === player && this._spaces[0]![2]!.piece?.owner === player) ||
            (this._spaces[1]![0]!.piece?.owner === player && this._spaces[1]![1]!.piece?.owner === player && this._spaces[1]![2]!.piece?.owner === player) ||
            (this._spaces[2]![0]!.piece?.owner === player && this._spaces[2]![1]!.piece?.owner === player && this._spaces[2]![2]!.piece?.owner === player) ||
            (this._spaces[0]![0]!.piece?.owner === player && this._spaces[1]![0]!.piece?.owner === player && this._spaces[2]![0]!.piece?.owner === player) ||
            (this._spaces[0]![1]!.piece?.owner === player && this._spaces[1]![1]!.piece?.owner === player && this._spaces[2]![1]!.piece?.owner === player) ||
            (this._spaces[0]![2]!.piece?.owner === player && this._spaces[1]![2]!.piece?.owner === player && this._spaces[2]![2]!.piece?.owner === player) ||
            (this._spaces[0]![0]!.piece?.owner === player && this._spaces[1]![1]!.piece?.owner === player && this._spaces[2]![2]!.piece?.owner === player) ||
            (this._spaces[0]![2]!.piece?.owner === player && this._spaces[1]![1]!.piece?.owner === player && this._spaces[2]![0]!.piece?.owner === player)
        )
            res = true;

        return res;
    }
}