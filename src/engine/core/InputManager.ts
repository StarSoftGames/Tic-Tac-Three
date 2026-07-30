import { ClickableC } from "../components/ClickableC.js";
import type { Entity } from "../entities/Entity.js";
import { EngineGlobals } from "./EngineGlobals.js";

const KeyState =
    {
        up: "UP",
        downEvent: "DOWN_EVENT",
        justPressed: "JUST_PRESSED",
        heldDown: "HELD_DOWN",
        upEvent: "UP_EVENT",
        justReleased: "JUST_RELEASED",
    } as const;
type KeyState = typeof KeyState[keyof typeof KeyState];
export { KeyState };

const keyStateMachine = new Map<KeyState, KeyState>([
    [KeyState.downEvent, KeyState.justPressed],
    [KeyState.justPressed, KeyState.heldDown],
    [KeyState.upEvent, KeyState.justReleased],
    [KeyState.justReleased, KeyState.up],
]);

export class InputManager
{
    private keyboardMap: Map<string, KeyState>;
    private gamepad: Gamepad | null;
    private gamepadMap: Map<number, KeyState>;
    private _mouseX: number;
    private _mouseY: number;
    private mouseMove: boolean;
    private mouseDown: boolean;
    private mouseUp: boolean;
    private lastHovered: Entity | undefined;
    private draggingEntity: Entity | undefined;
    private draggingOriginParent: Entity | undefined;
    private draggingOriginX: number;
    private draggingOriginY: number;
    private conditionCallback: (entity: Entity) => boolean;

    constructor()
    {
        this.keyboardMap = new Map();
        this.gamepadMap = new Map();
        this.gamepad = null;
        this._mouseX = 0;
        this._mouseY = 0;
        this.mouseMove = false;
        this.mouseDown = false;
        this.mouseUp = false;
        this.lastHovered = undefined;
        this.draggingEntity = undefined;
        this.draggingOriginParent = undefined;
        this.draggingOriginX = 0;
        this.draggingOriginY = 0;
        this.conditionCallback = this.condition.bind(this);

        EngineGlobals.canvas.style.cursor = "default";
        EngineGlobals.canvas.addEventListener("keyup", this.onKeyUp.bind(this));
        EngineGlobals.canvas.addEventListener("keydown", this.onKeyDown.bind(this));
        EngineGlobals.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
        EngineGlobals.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
        EngineGlobals.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
    }

    public get mouseX(): number { return this.mouseX; }
    public get mouseY(): number { return this.mouseY; }

    public isDraggingEntity(): boolean { return this.draggingEntity !== undefined; }

    public isKeyDown(key: string): boolean
    {
        let res = false;
        if (this.keyboardMap.has(key) && this.keyboardMap.get(key) === KeyState.justPressed || this.keyboardMap.get(key) === KeyState.heldDown)
        {
            res = true;
        }
        return res;
    }

    public wasKeyJustPressed(key: string): boolean
    {
        let res = false;
        if (this.keyboardMap.has(key) && this.keyboardMap.get(key) === KeyState.justPressed)
        {
            res = true;
        }
        return res;
    }

    public isGamepadButtonDown(button: number): boolean
    {
        let res = false;
        if (this.gamepadMap.has(button) && this.gamepadMap.get(button) === KeyState.justPressed || this.gamepadMap.get(button) === KeyState.heldDown)
        {
            res = true;
        }
        return res;
    }

    public wasGamepadButtonJustPressed(button: number): boolean
    {
        let res = false;

        if (this.gamepadMap.has(button) && this.gamepadMap.get(button) === KeyState.justPressed)
        {
            res = true;
        }

        return res;
    }

    public gamepadAxisValue(axis: number): number
    {
        let res = 0;

        if (this.gamepad)
        {
            res = this.gamepad.axes[axis]!;
        }

        return res;
    }

    private onKeyDown(event: KeyboardEvent)
    {
        if (!event.repeat)
        {
            this.keyboardMap.set(event.key, KeyState.downEvent);
        }
    }

    private onKeyUp(event: KeyboardEvent)
    {
        this.keyboardMap.set(event.key, KeyState.upEvent);
    }

    private onMouseMove(event: MouseEvent)
    {
        this._mouseX = event.clientX - EngineGlobals.canvas.offsetLeft;
        this._mouseY = event.clientY - EngineGlobals.canvas.offsetTop;
        this.mouseMove = true;
    }

    private onMouseDown(event: MouseEvent)
    {
        if (event.button === 0)
            this.mouseDown = true;
    }

    private onMouseUp(event: MouseEvent)
    {
        if (event.button === 0)
            this.mouseUp = true;
    }

    private condition(entity: Entity): boolean
    {
        let res = true;

        if (
            !entity.hasComponent(ClickableC) ||
            !(entity.getComponent<ClickableC>(ClickableC)?.isEffectivelyEnabled()) ||
            this.draggingEntity === entity ||
            !entity.containsPoint(this._mouseX, this._mouseY)
        )
        {
            res = false;
        }

        return res;
    }

    private updateMouse(): void
    {
        EngineGlobals.scene.camera.transform.apply();
        const entity = EngineGlobals.scene.findFirst(this.conditionCallback);
        EngineGlobals.scene.camera.transform.revert();

        if (entity !== undefined)
        {
            const clickable: ClickableC = entity.getComponent(ClickableC)!;
            EngineGlobals.canvas.style.cursor = clickable.cursorStyle;
            if (this.mouseDown)
            {
                if (!this.isDraggingEntity() && clickable.isDraggable)
                {
                    this.draggingEntity = clickable.entity;
                    this.draggingOriginParent = clickable.entity.parent;
                    this.draggingEntity.setParent(undefined);
                    this.draggingOriginX = this.draggingEntity.transform.position.x;
                    this.draggingOriginY = this.draggingEntity.transform.position.y;
                    clickable._onGrab();
                }
                else
                {
                    clickable._onMouseDown();
                }
            }
            else if (this.mouseUp)
            {
                if (this.draggingEntity)
                {
                    if (clickable.acceptsEntity(this.draggingEntity))
                    {
                        this.draggingEntity.transform.position.x = 0;
                        this.draggingEntity.transform.position.y = 0;
                        this.draggingEntity.setParent(clickable.entity);
                        this.draggingEntity.getComponent<ClickableC>(ClickableC)!._onRelease();
                        clickable.receiveEntity(this.draggingEntity, this.draggingOriginParent);
                        this.draggingEntity = undefined;
                    }
                }
                else
                {
                    clickable._onMouseUp();
                }
            }
            else if (this.mouseMove && entity !== this.lastHovered)
            {
                clickable._onMouseEnter();
            }
            this.lastHovered = entity;
        }
        else if (this.lastHovered)
        {
            EngineGlobals.canvas.style.cursor = "default";
            this.lastHovered.getComponent<ClickableC>(ClickableC)!._onMouseLeave();
            this.lastHovered = undefined;
        }

        if (this.draggingEntity)
        {
            if (this.mouseUp)
            {
                this.draggingEntity.transform.position.x = this.draggingOriginX;
                this.draggingEntity.transform.position.y = this.draggingOriginY;
                this.draggingEntity.setParent(this.draggingOriginParent);
                this.draggingEntity.getComponent<ClickableC>(ClickableC)!._onRelease();
                this.draggingEntity = undefined;
            }
            else
            {
                this.draggingEntity.transform.position.x = this._mouseX/EngineGlobals.scene.camera.transform.scaling.x;
                this.draggingEntity.transform.position.y = this._mouseY/EngineGlobals.scene.camera.transform.scaling.y;
            }
        }

        this.mouseMove = false;
        this.mouseDown = false;
        this.mouseUp = false;
    }

    private updateKeyboard(): void
    {
        for (const entry of this.keyboardMap)
        {
            const key = entry[0];
            const currentState = entry[1];
            const nextState = keyStateMachine.get(currentState);
            if (nextState)
            {
                this.keyboardMap.set(key, nextState);
            }
        }
    }

    private updateGamepad(): void
    {
        const gamepad = navigator.getGamepads()[0];
        if (gamepad)
        {
            this.gamepad = gamepad;
            const buttons = gamepad.buttons;
            for (let i = 0; i < buttons.length; i++)
            {
                const button = buttons[i]!;
                if (button.pressed)
                {
                    if (!this.gamepadMap.has(i) || (this.gamepadMap.get(i) !== KeyState.justPressed && this.gamepadMap.get(i) !== KeyState.heldDown))
                        this.gamepadMap.set(i, KeyState.downEvent);
                }
                else
                {
                    this.gamepadMap.set(i, KeyState.upEvent);
                }
            }
        }

        for (const entry of this.gamepadMap)
        {
            const key = entry[0];
            const currentState = entry[1];
            const nextState = keyStateMachine.get(currentState);
            if (nextState)
            {
                this.gamepadMap.set(key, nextState);
            }
        }
    }

    public update()
    {
        this.updateMouse();
        this.updateKeyboard();
        this.updateGamepad();
    }
}