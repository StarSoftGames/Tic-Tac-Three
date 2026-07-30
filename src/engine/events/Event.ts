export class Event
{
    private readonly _name: string;

    constructor(..._args: unknown[])
    {
        this._name = this.constructor.name;
    }

    public get name(): string { return this._name; }
}