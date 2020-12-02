"use strict";
var L10_Doom_States;
(function (L10_Doom_States) {
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
    })(ANGLE = L10_Doom_States.ANGLE || (L10_Doom_States.ANGLE = {}));
    let JOB;
    (function (JOB) {
        JOB[JOB["IDLE"] = 0] = "IDLE";
        JOB[JOB["PATROL"] = 1] = "PATROL";
    })(JOB = L10_Doom_States.JOB || (L10_Doom_States.JOB = {}));
    class Enemy extends fc.Node {
        constructor(_name, _position) {
            super(_name);
            this.speed = 1;
            this.angleView = 0;
            this.job = JOB.PATROL;
            this.addComponent(new fc.ComponentTransform());
            this.mtxLocal.translation = _position;
            this.show = new fcaid.Node("Show", fc.Matrix4x4.IDENTITY());
            this.appendChild(this.show);
            this.sprite = new fcaid.NodeSprite("Sprite");
            this.show.appendChild(this.sprite);
            fc.Time.game.setTimer(5000, 1, () => console.log("zeit um"));
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
                sprite.generateByGrid(fc.Rectangle.GET(36, 28, 58, 78), 2, 32, fc.ORIGIN2D.BOTTOMCENTER, fc.Vector2.Y(110));
                Enemy.animations[name] = sprite;
            }
        }
        changeAngle() {
            let enemyViewDirection = this.mtxWorld.getZ();
            let avatarToEnemy = fc.Vector3.TRANSFORMATION(L10_Doom_States.avatar.mtxWorld.translation, this.mtxWorldInverse, true);
            let angle = fc.Vector3.DOT(avatarToEnemy, enemyViewDirection) / (this.pythagoras(avatarToEnemy) * this.pythagoras(enemyViewDirection));
            angle = Math.acos(angle) * 180 / Math.PI;
            console.log("Angle: " + angle + " x-achse: " + avatarToEnemy.x);
            if (angle < 22.5)
                return ANGLE._000;
            if (angle < 67.5 && avatarToEnemy.x > 0)
                return ANGLE._045;
            if (angle < 112.5 && avatarToEnemy.x > 0)
                return ANGLE._090;
            if (angle < 157.5 && avatarToEnemy.x > 0)
                return ANGLE._135;
            if (angle > 157.5)
                return ANGLE._180;
            return ANGLE._000;
        }
        pythagoras(_vector) {
            return Math.sqrt(Math.pow(_vector.x, 2) + Math.pow(_vector.z, 2));
        }
        update() {
            switch (this.job) {
                case JOB.PATROL:
                    if (this.mtxLocal.translation.equals(this.posTarget, 0.1))
                        //this.chooseTargetPosition();
                        this.job = JOB.IDLE;
                    this.move();
                    break;
                case JOB.IDLE:
                    if (this.mtxLocal.translation.equals(L10_Doom_States.avatar.mtxLocal.translation, 1)) {
                        this.chooseTargetPosition();
                        this.job = JOB.PATROL;
                    }
                default:
                    break;
            }
            this.displayAnimation();
        }
        displayAnimation() {
            this.show.mtxLocal.showTo(fc.Vector3.TRANSFORMATION(L10_Doom_States.avatar.mtxLocal.translation, this.mtxWorldInverse, true));
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
            console.log(section);
            this.sprite.setAnimation(Enemy.animations["Idle" + section]);
        }
        move() {
            this.mtxLocal.showTo(this.posTarget);
            this.mtxLocal.translateZ(this.speed * fc.Loop.timeFrameGame / 1000);
        }
        chooseTargetPosition() {
            let range = 5; //sizeWall * numWalls / 2 - 2;
            this.posTarget = new fc.Vector3(fc.Random.default.getRange(-range, range), 0, fc.Random.default.getRange(-range, range));
            // console.log("New target", this.posTarget.toString());
        }
        flip(_reverse) {
            this.sprite.mtxLocal.rotation = ƒ.Vector3.Y(_reverse ? 180 : 0);
        }
    }
    L10_Doom_States.Enemy = Enemy;
})(L10_Doom_States || (L10_Doom_States = {}));
//# sourceMappingURL=enemy.js.map