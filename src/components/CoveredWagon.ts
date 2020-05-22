import { inRange } from "lodash";
import { Curves, GameObjects, Math, Scene } from "phaser";

export class CoveredWagon extends GameObjects.PathFollower {
    constructor(scene: Scene, curve: Curves.Spline) {
        // TODO somehow it works with spline for now, but should be improved later
        super(
            scene,
            curve as any,
            curve.points[0].x,
            curve.points[0].y,
            "wagon"
        );
        this.setRotateToPath(true);
        this.configureAnims();
        this.setScale(0.4);
        scene.add.existing(this);
    }

    public update() {
        if (!this.anims) {
            return;
        }
        this.playAnimation(this.rotation);
        // rotation gets set to some value by startFollow() on each preUpdate(), so next frame this will be an actual value again
        this.setRotation(0);
    }

    private playAnimation(rotation: number) {
        const PiEighth = Math.PI2 / 16;
        if (inRange(rotation, -PiEighth, PiEighth)) {
            this.anims.play("right");
        }
        if (inRange(rotation, PiEighth, 3 * PiEighth)) {
            this.anims.play("bottom-right");
        }
        if (inRange(rotation, 3 * PiEighth, 5 * PiEighth)) {
            this.anims.play("bottom");
        }
        if (inRange(rotation, 5 * PiEighth, 7 * PiEighth)) {
            this.anims.play("bottom-left");
        }
        if (inRange(rotation, 7 * PiEighth, 8 * PiEighth)) {
            this.anims.play("left");
        }
        // negative
        if (inRange(rotation, -PiEighth, -3 * PiEighth)) {
            this.anims.play("top-right");
        }
        if (inRange(rotation, -3 * PiEighth, -5 * PiEighth)) {
            this.anims.play("top");
        }
        if (inRange(rotation, -5 * PiEighth, -7 * PiEighth)) {
            this.anims.play("top-left");
        }
        if (inRange(rotation, -7 * PiEighth, -8 * PiEighth)) {
            this.anims.play("left");
        }
    }

    private configureAnims() {
        this.configureAnim("top-left", 0);
        this.configureAnim("top", 1);
        this.configureAnim("top-right", 2);
        this.configureAnim("left", 3);
        this.configureAnim("idle", 4);
        this.configureAnim("right", 5);
        this.configureAnim("bottom-left", 6);
        this.configureAnim("bottom", 7);
        this.configureAnim("bottom-right", 8);
    }

    private configureAnim(key: string, frame: number) {
        const cfg: Phaser.Types.Animations.Animation = {
            key,
            frames: this.scene.anims.generateFrameNumbers(this.texture.key, {
                start: frame,
                end: frame,
            }),
            frameRate: 1,
            repeat: -1,
        };
        this.scene.anims.create(cfg);
        this.anims.load(key);
    }
}
