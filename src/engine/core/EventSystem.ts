import type { Event } from "../events/Event.js";
import { Utils } from "../utils/Utils.js";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
type EventHandler = Function;

export class EventSystem
{
    private map: Map<string, Array<EventHandler>>;

    constructor()
    {
        this.map = new Map;
    }

    public broadcast(event: Event): void
    {
        const list = this.map.get(event.name);

        if (list === undefined)
        {
            console.warn(`Event type not registered: ${event.name}.`);
        }
        else
        {
            for (const callback of list)
            {
                callback(event);
            }
        }
    }

    public subscribe(callback: EventHandler, event: typeof Event): void
    {
        if (!this.map.has(event.name))
        {
            this.map.set(event.name, []);
        }

        const list = this.map.get(event.name)!;

        list.push(callback);
    }

    public unSubscribe(callback: EventHandler, event: typeof Event): void
    {
        const list: Array<EventHandler> | undefined = this.map.get(event.name);

        if (list === undefined)
            console.warn(`Event type not registered: ${event.name}.`);
        else
            Utils.removeElement(callback, list);
    }

    public clear(): void
    {
        this.map.clear();
    }
}