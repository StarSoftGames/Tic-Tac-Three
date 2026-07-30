export class EngineConstants
{
    public static readonly referenceWidth = 1280;
    public static readonly referenceHeight = 720;
    public static readonly shorterDimension = Math.min(this.referenceWidth, this.referenceHeight);
    public static readonly maxDeltaTime = 1 / 20;
    public static readonly radiansToDegrees = Math.PI / 180;
    public static readonly degressToRadians = 180 / Math.PI;
}