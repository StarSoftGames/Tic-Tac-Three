import { Entity } from "../../engine/entities/Entity.js";
import { LineV } from "../../engine/components/visuals/LineV.js";
import { BoardSpaceE } from "./BoardSpaceE.js";
import { BoardC } from "../components/BoardC.js";
import { Anchor } from "../../engine/components/Transform.js";
import { WinLineC } from "../components/WinLineC.js";
import { GameConstants } from "../core/GameConstants.js";

export class BoardE extends Entity
{
    constructor()
    {
        super();
        this.transform.anchor = Anchor.center;

        const horizontalTop = new Entity;
        horizontalTop.visual = new LineV(GameConstants.lineColor, GameConstants.lineLength, GameConstants.lineWidth);
        horizontalTop.translate(0, -GameConstants.lineOffset);
        horizontalTop.setParent(this);

        const horizontalBottom = new Entity;
        horizontalBottom.visual = new LineV(GameConstants.lineColor, GameConstants.lineLength, GameConstants.lineWidth);
        horizontalBottom.translate(0, GameConstants.lineOffset);
        horizontalBottom.setParent(this);

        const verticalLeft = new Entity;
        verticalLeft.visual = new LineV(GameConstants.lineColor, GameConstants.lineLength, GameConstants.lineWidth);
        verticalLeft.rotate(90);
        verticalLeft.translate(-GameConstants.lineOffset, 0);
        verticalLeft.setParent(this);

        const verticalRight = new Entity;
        verticalRight.visual = new LineV(GameConstants.lineColor, GameConstants.lineLength, GameConstants.lineWidth);
        verticalRight.rotate(90);
        verticalRight.translate(GameConstants.lineOffset, 0);
        verticalRight.setParent(this);

        const topLeft = new BoardSpaceE(1, GameConstants.boardSpaceSize);
        topLeft.translate(-GameConstants.boardSpaceOffset, -GameConstants.boardSpaceOffset);
        topLeft.setParent(this);

        const topCenter = new BoardSpaceE(2, GameConstants.boardSpaceSize);
        topCenter.translate(0, -GameConstants.boardSpaceOffset);
        topCenter.setParent(this);

        const topRight = new BoardSpaceE(3, GameConstants.boardSpaceSize);
        topRight.translate(GameConstants.boardSpaceOffset, -GameConstants.boardSpaceOffset);
        topRight.setParent(this);

        const left = new BoardSpaceE(4, GameConstants.boardSpaceSize);
        left.translate(-GameConstants.boardSpaceOffset, 0);
        left.setParent(this);

        const center = new BoardSpaceE(5, GameConstants.boardSpaceSize);
        center.translate(0, 0);
        center.setParent(this);

        const right = new BoardSpaceE(6, GameConstants.boardSpaceSize);
        right.translate(GameConstants.boardSpaceOffset, 0);
        right.setParent(this);

        const bottomLeft = new BoardSpaceE(7, GameConstants.boardSpaceSize);
        bottomLeft.translate(-GameConstants.boardSpaceOffset, GameConstants.boardSpaceOffset);
        bottomLeft.setParent(this);

        const bottomCenter = new BoardSpaceE(8, GameConstants.boardSpaceSize);
        bottomCenter.translate(0, GameConstants.boardSpaceOffset);
        bottomCenter.setParent(this);

        const bottomRight = new BoardSpaceE(9, GameConstants.boardSpaceSize);
        bottomRight.translate(GameConstants.boardSpaceOffset, GameConstants.boardSpaceOffset);
        bottomRight.setParent(this);

        const winLine = new Entity;
        winLine.visual = new LineV("white", 0, 0);
        winLine.addComponent(new WinLineC);
        winLine.setParent(this);

        this.addComponent(new BoardC);
    }
}