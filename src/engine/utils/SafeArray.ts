export class SafeArray<Type>
{
    private array: Type[];
    private addQueue: Type[];
    private removeQueue: Set<Type>;

    constructor()
    {
        this.array = [];
        this.addQueue = [];
        this.removeQueue = new Set();
    }

    public get isEmpty(): boolean
    {
        return this.addQueue.length + this.array.length > 0;
    }

    public add(element: Type): void
    {
        this.addQueue.push(element);
    }

    public remove(element: Type): void
    {
        this.removeQueue.add(element);
    }

    public forEach(fn: (element: Type) => void): void
    {
        this.addQueued();
        this.removeQueued();
        for (const element of this.array)
        {
            if (this.removeQueue.has(element))
            {
                continue;
            }
            fn(element);
        }
        this.removeQueued();
    }

    public find(condition: (element: Type) => boolean): Type[]
    {
        this.addQueued();
        this.removeQueued();
        const res = [];

        for (const element of this.array)
        {
            if (!this.removeQueue.has(element) && condition(element))
            {
                res.push(element);
            }
        }

        this.removeQueued();

        return res;
    }

    public findFirst(condition: (element: Type) => boolean): Type | undefined
    {
        this.addQueued();
        this.removeQueued();
        let i = 0;
        let res = undefined;

        while (i < this.array.length && res === undefined)
        {
            const element = this.array[i]!;
            if (!this.removeQueue.has(element) && condition(element))
            {
                res = element;
            }
            i++;
        }

        this.removeQueued();

        return res;
    }

    private addQueued(): void
    {
        if (this.addQueue.length)
        {
            this.array.splice(this.array.length, 0, ...this.addQueue);
            this.addQueue = [];
        }
    }

    private removeQueued(): void
    {
        if (this.removeQueue.size)
        {
            this.array = this.array.filter(element => !this.removeQueue.has(element));
            this.removeQueue.clear();
        }
    }
}