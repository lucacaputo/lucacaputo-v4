import { rand } from "../../utils/functions";

export type Coordinates = { x: number, y: number };

export default class Particle {

    color: string;
    center: Coordinates;
    radius: number;
    maxRadius;
    minRadius;

    constructor(color: string, center: Coordinates, radius: number) {
        this.radius = radius;
        this.color = color;
        this.center = center;
        this.maxRadius = radius * 4;
        this.minRadius = radius;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(this.center.x, this.center.y);
        ctx.moveTo(this.center.x - this.radius, this.center.y);
        ctx.lineTo(this.center.x, this.center.y - this.radius);
        ctx.lineTo(this.center.x + this.radius, this.center.y);
        ctx.lineTo(this.center.x, this.center.y + this.radius);
        ctx.lineTo(this.center.x - this.radius, this.center.y);
        ctx.fill();
        ctx.closePath();
    }

}