import { GameObjects, Scene } from "phaser";

enum State {
    pointerover,
    pointerout,
}

const MsPerSec = 1000;

export class GrowShrinkAnimPlugin extends GameObjects.GameObject {
    public state = State.pointerout;
    private baseScale: number;
    private maxScale: number;

    constructor(
        scene: Scene,
        private target: GameObjects.Image | GameObjects.Text,
        maxRelativeScale = 1.25,
        private speed = 2.3,
        private debug = false
    ) {
        super(scene, "GrowShrinkAnimPlugin");
        scene.add.existing(this);
        this.baseScale = this.target.scale;
        this.maxScale = this.baseScale * maxRelativeScale;
        this.target.on("pointerout", () => this.setPointerOutState());
        this.target.on("pointerover", () => this.setPointerOverState());
    }

    public preUpdate(time: number, delta: number) {
        if (
            this.state === State.pointerout &&
            this.target.scale > this.baseScale
        ) {
            this.shrink(delta);
        }
        if (
            this.state === State.pointerover &&
            this.target.scale < this.maxScale
        ) {
            this.grow(delta);
        }
    }

    private grow(delta: number) {
        this.target.setScale(
            this.target.scaleX + this.speed * (delta / MsPerSec),
            this.target.scaleY + this.speed * (delta / MsPerSec)
        );
    }

    private setPointerOutState() {
        this.state = State.pointerout;
        if (this.debug) {
            // tslint:disable-next-line: no-console
            console.log("pointerout");
        }
    }

    private shrink(delta: number) {
        this.target.setScale(
            this.target.scaleX - this.speed * (delta / MsPerSec),
            this.target.scaleY - this.speed * (delta / MsPerSec)
        );
    }

    private setPointerOverState() {
        this.state = State.pointerover;

        if (this.debug) {
            // tslint:disable-next-line: no-console
            console.log("pointerover");
        }
    }
}
