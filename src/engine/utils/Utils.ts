export class Utils
{
    public static removeElement(element: unknown, array: unknown[]): void
    {
        const index = array.indexOf(element);
        if (index !== -1)
        {
            array.splice(index, 1);
        }
    }

    public static random(min: number, max: number): number
    {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    public static reduce(a: number, b: number): number
    {
        if (a > 0)
        {
            a -= b;
            if (a < 0)
            {
                a = 0;
            }
        }
        else if (a < 0)
        {
            a += b;
            if (a > 0)
            {
                a = 0;
            }
        }

        return a;
    }

    public static clamp(value: number, min = 0, max = 1): number
    {
        if (value < min) value = min;
        else if (value > max) value = max;
        return value;
    }

    public static lerp(x: number, y: number, a: number): number
    {
        return x * (1 - a) + y * a;
    }

    public static invlerp(x: number, y: number, a: number): number
    {
        return this.clamp((a - x) / (y - x));
    }

    public static range(x1: number, y1: number, x2: number, y2: number, a: number)
    {
        return this.lerp(x2, y2, this.invlerp(x1, y1, a));
    }

    public static doNothing(): void { }
}