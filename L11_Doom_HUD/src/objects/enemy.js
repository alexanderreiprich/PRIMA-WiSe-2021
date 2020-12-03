"use strict";
var L11_Doom_HUD;
(function (L11_Doom_HUD) {
    var fc = FudgeCore;
    var fcaid = FudgeAid;
    let ANGLE;
    (function (ANGLE) {
        // N = 0, NE = 1, E = 2, SE = 3, S = 4, SW = 5, W = 6, NW = 7,
        ANGLE[ANGLE["_000"] = 0] = "_000";
        ANGLE[ANGLE["_045"] = 1] = "_045";
        ANGLE[ANGLE["_090"] = 2] = "_090";
        ANGLE[ANGLE["_135"] = 3] = "_135";
        ANGLE[ANGLE["_180"] = 4] = "_180";
        ANGLE[ANGLE["_225"] = 5] = "_225";
        ANGLE[ANGLE["_270"] = 6] = "_270";
        ANGLE[ANGLE["_315"] = 7] = "_315";
    })(ANGLE = L11_Doom_HUD.ANGLE || (L11_Doom_HUD.ANGLE = {}));
    let JOB;
    (function (JOB) {
        JOB[JOB["IDLE"] = 0] = "IDLE";
        JOB[JOB["PATROL"] = 1] = "PATROL";
        JOB[JOB["HUNT"] = 2] = "HUNT";
    })(JOB = L11_Doom_HUD.JOB || (L11_Doom_HUD.JOB = {}));
    class Enemy extends fc.Node {
        constructor(_name, _position) {
            super(_name);
            this.speed = 3;
            this.timerActive = false;
            this.angleView = 0;
            this.job = JOB.PATROL;
            this.addComponent(new fc.ComponentTransform());
            this.mtxLocal.translation = _position;
            this.show = new fcaid.Node("Show", fc.Matrix4x4.IDENTITY());
            this.appendChild(this.show);
            this.sprite = new fcaid.NodeSprite("Sprite");
            this.sprite.addComponent(new fc.ComponentTransform);
            this.show.appendChild(this.sprite);
            this.sprite.setAnimation(Enemy.animations["Idle_000"]);
            // this.sprite.showFrame(0);
            this.sprite.setFrameDirection(1);
            this.sprite.framerate = 2;
            this.chooseTargetPosition();
        }
        static generateSprites(_spritesheet) {
            Enemy.animations = {};
            for (let angle = 0; angle < 5; angle++) {
                let name = "Idle" + ANGLE[angle];
                let sprite = new fcaid.SpriteSheetAnimation(name, _spritesheet);
                sprite.generateByGrid(fc.Rectangle.GET(36 + angle * 90, 28, 58, 78), 2, 32, fc.ORIGIN2D.BOTTOMCENTER, fc.Vector2.Y(110));
                Enemy.animations[name] = sprite;
            }
        }
        update() {
            switch (this.job) {
                case JOB.PATROL:
                    if (this.mtxLocal.translation.equals(L11_Doom_HUD.avatar.mtxLocal.translation, 20)) {
                        this.job = JOB.HUNT;
                        console.log("ich jage >:)");
                    }
                    this.move();
                    if (this.mtxLocal.translation.equals(this.posTarget)) {
                        this.job = JOB.IDLE;
                        break;
                    }
                case JOB.IDLE:
                    if (!this.timerActive) {
                        this.timerActive = true;
                        console.log("ich idle :)");
                        setTimeout(() => {
                            this.timerActive = false;
                            this.chooseTargetPosition();
                            this.job = JOB.PATROL;
                        }, 5000);
                    }
                    break;
                case JOB.HUNT:
                    if (this.mtxLocal.translation.equals(L11_Doom_HUD.avatar.mtxLocal.translation, 20)) {
                        this.posTarget = L11_Doom_HUD.avatar.mtxLocal.translation;
                        this.move();
                        break;
                    }
                    else {
                        this.chooseTargetPosition();
                        this.job = JOB.PATROL;
                        console.log("ich jage nicht mehr :(");
                        break;
                    }
                default:
                    break;
            }
            this.displayAnimation();
        }
        displayAnimation() {
            this.show.mtxLocal.showTo(fc.Vector3.TRANSFORMATION(L11_Doom_HUD.avatar.mtxLocal.translation, this.mtxWorldInverse, true));
            let rotation = this.show.mtxLocal.rotation.y;
            rotation = (rotation + 360 + 22.5) % 360;
            rotation = Math.floor(rotation / 45);
            if (this.angleView == rotation)
                return;
            this.angleView = rotation;
            if (rotation > 4) {
                rotation = 8 - rotation;
                this.flip(true);
            }
            else
                this.flip(false);
            let section = ANGLE[rotation]; // .padStart(3, "0");
            this.sprite.setAnimation(Enemy.animations["Idle" + section]);
        }
        move() {
            this.mtxLocal.showTo(this.posTarget);
            this.mtxLocal.translateZ(this.speed * fc.Loop.timeFrameGame / 1000);
        }
        chooseTargetPosition() {
            let range = 10; //sizeWall * numWalls / 2 - 2;
            this.posTarget = new fc.Vector3(fc.Random.default.getRange(-range, range), 0, fc.Random.default.getRange(-range, range));
            // console.log("New target", this.posTarget.toString());
        }
        flip(_reverse) {
            this.sprite.mtxLocal.rotation = fc.Vector3.Y(_reverse ? 180 : 0);
        }
    }
    L11_Doom_HUD.Enemy = Enemy;
})(L11_Doom_HUD || (L11_Doom_HUD = {}));
//# sourceMappingURL=enemy.js.map