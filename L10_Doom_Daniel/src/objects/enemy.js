"use strict";
var L10_Doom_AI;
(function (L10_Doom_AI) {
    var fc = FudgeCore;
    var fcAid = FudgeAid;
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
    })(ANGLE = L10_Doom_AI.ANGLE || (L10_Doom_AI.ANGLE = {}));
    class Enemy extends fc.Node {
        // private static speedMax: number = 1; // units per second
        // public direction: number = 0; 
        constructor(_name = "Enemy", _position) {
            super(_name);
            this.speed = 1;
            this.oldAngle = ANGLE._000;
            this.addComponent(new fc.ComponentTransform());
            this.mtxLocal.translation = _position;
            this.show = new fcAid.Node("Show", fc.Matrix4x4.IDENTITY());
            this.appendChild(this.show);
            this.sprite = new fcAid.NodeSprite("Sprite");
            this.show.appendChild(this.sprite);
            this.oldAngle = this.changeAngle();
            this.sprite.setAnimation(Enemy.animations["Walk_000"]);
            // this.sprite.showFrame(0);
            this.sprite.setFrameDirection(1);
            this.sprite.framerate = 2;
            this.posTarget = _position;
            // this.appendChild(new fcAid.Node("Cube", fc.Matrix4x4.IDENTITY(), new fc.Material("Cube", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("red"))), new fc.MeshCube()));
        }
        static generateSprites(_spritesheet) {
            Enemy.animations = {};
            for (let angle = 0; angle < 5; angle++) {
                let name = "Walk" + ANGLE[angle];
                let sprite = new fcAid.SpriteSheetAnimation(name, _spritesheet);
                sprite.generateByGrid(fc.Rectangle.GET(40 + angle * 125, 30, 93, 70), 3, 25, fc.ORIGIN2D.BOTTOMCENTER, fc.Vector2.Y(103));
                Enemy.animations[name] = sprite;
            }
        }
        changeAngle() {
            let enemyViewDirection = this.mtxWorld.getZ();
            let avatarToEnemy = fc.Vector3.TRANSFORMATION(L10_Doom_AI.avatar.mtxWorld.translation, this.mtxWorldInverse, true);
            let angle = fc.Vector3.DOT(avatarToEnemy, enemyViewDirection) / (this.pythagoras(avatarToEnemy) * this.pythagoras(enemyViewDirection));
            angle = Math.acos(angle) * 180 / Math.PI;
            console.log("Angle: " + angle + " x-achse: " + avatarToEnemy.x);
            /* if (ANGLE._180 || ANGLE._225 || ANGLE._270 || ANGLE._315) {
              console.log("Test erfolgt");
              this.mtxLocal.rotateY(180);
            } */
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
            /* if (angle < 112.5 && avatarToEnemy.x < 0)
                 return ANGLE._225;
               if (angle < 67.5 && avatarToEnemy.x < 0)
                 return ANGLE._270;
               if (angle < 22.5 && avatarToEnemy.x < 0)
                 return ANGLE._315;  */
            return ANGLE._000;
        }
        pythagoras(_vector) {
            return Math.sqrt(Math.pow(_vector.x, 2) + Math.pow(_vector.z, 2));
        }
        update() {
            if (this.mtxLocal.translation.equals(this.posTarget, 0.1))
                this.chooseTargetPosition();
            let spriteAngle = this.changeAngle();
            //console.log(ANGLE[spriteAngle]);
            if (this.oldAngle !== spriteAngle) {
                this.sprite.setAnimation(Enemy.animations["Walk" + ANGLE[spriteAngle]]);
                this.oldAngle = spriteAngle;
            }
            this.move();
        }
        move() {
            this.mtxLocal.showTo(this.posTarget);
            //this.mtxLocal.translateZ(this.speed * fc.Loop.timeFrameGame / 1000);
            this.show.mtxLocal.showTo(fc.Vector3.TRANSFORMATION(L10_Doom_AI.avatar.mtxLocal.translation, this.mtxWorldInverse, true));
        }
        chooseTargetPosition() {
            let range = 5; //sizeWall * numWalls / 2 - 2;
            this.posTarget = new fc.Vector3(fc.Random.default.getRange(-range, range), 0, fc.Random.default.getRange(-range, range));
        }
    }
    L10_Doom_AI.Enemy = Enemy;
})(L10_Doom_AI || (L10_Doom_AI = {}));
//# sourceMappingURL=enemy.js.map