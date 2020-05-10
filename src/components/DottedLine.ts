import { GameObjects, Geom, Scene } from "phaser";
import { Color, toHex } from "../styles/Color";

interface IPoint {
    x: number;
    y: number;
}

export class DottedLine extends GameObjects.GameObject {
    constructor(scene: Scene, private start: IPoint, private end: IPoint) {
        super(scene, "DottedLine");
        this.draw();
    }

    public draw() {
        const alpha = 0.2;
        const pointsEveryXPixel = 15;
        const lineShortnessFactor = 3;
        const color = Color.White;
        const thickness = 3;
        const graphics = this.scene.add.graphics({
            lineStyle: { width: thickness, color: toHex(color) },
        });
        graphics.setAlpha(alpha);
        const line = new Geom.Line(
            this.start.x,
            this.start.y,
            this.end.x,
            this.end.y
        );
        const length = Geom.Line.Length(line);

        const points = line.getPoints(length / pointsEveryXPixel);
        for (let i = 0; i < points.length / lineShortnessFactor - 1; i++) {
            const start = points[lineShortnessFactor * i];
            const end = points[lineShortnessFactor * i + 1];
            const dot = new Geom.Line(start.x, start.y, end.x, end.y);
            graphics.strokeLineShape(dot);
        }
    }
}
