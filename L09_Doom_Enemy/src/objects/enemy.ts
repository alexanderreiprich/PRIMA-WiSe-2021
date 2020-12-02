namespace L09_Doom_Enemy {

    import fc = FudgeCore;
    import fcaid = FudgeAid;

    export enum ANGLE {
        // N = 0, NE = 1, E = 2, SE = 3, S = 4, SW = 5, W = 6, NW = 7,
        _000 = 0, _045 = 1, _090 = 2, _135 = 3, _180 = 4, _225 = 5, _270 = 6, _315 = 7
    }

    export enum JOB {
      IDLE, PATROL
    }

    export class Enemy extends fc.Node {

        private static animations: fcaid.SpriteSheetAnimations;
        public speed: number = 1;
        private show: fc.Node;
        private sprite: fcaid.NodeSprite;
        private posTarget: fc.Vector3;
        public constructor(_name: string, _position: fc.Vector3) {

            super(_name);
            this.addComponent(new fc.ComponentTransform());
            this.mtxLocal.translation = _position;

            this.show = new fcaid.Node("Show", fc.Matrix4x4.IDENTITY());
            this.appendChild(this.show);

            this.sprite = new fcaid.NodeSprite("Sprite");
            this.show.appendChild(this.sprite);

            this.sprite.setAnimation(<fcaid.SpriteSheetAnimation>Enemy.animations["Idle_000"]);
            // this.sprite.showFrame(0);
            this.sprite.setFrameDirection(1);
            this.sprite.framerate = 2;

            this.posTarget = _position;

        }
        public static generateSprites(_spritesheet: fc.CoatTextured): void {
            Enemy.animations = {};
            for (let angle: number = 0; angle < 5; angle++) {
                let name: string = "Idle" + ANGLE[angle];
                let sprite: fcaid.SpriteSheetAnimation = new fcaid.SpriteSheetAnimation(name, _spritesheet);
                sprite.generateByGrid(fc.Rectangle.GET(36, 28, 58, 78), 2, 32, fc.ORIGIN2D.BOTTOMCENTER, fc.Vector2.Y(110));
                Enemy.animations[name] = sprite;
            }
        }

        public changeAngle(): ANGLE {
            let enemyViewDirection: fc.Vector3 = this.mtxWorld.getZ();
            let avatarToEnemy: fc.Vector3 = fc.Vector3.TRANSFORMATION(avatar.mtxWorld.translation, this.mtxWorldInverse, true);
            let angle: number = fc.Vector3.DOT(avatarToEnemy, enemyViewDirection) / (this.pythagoras(avatarToEnemy) * this.pythagoras(enemyViewDirection));
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
      
          public pythagoras(_vector: fc.Vector3): number {
            return Math.sqrt(Math.pow(_vector.x, 2) + Math.pow(_vector.z , 2));
          }
      

        public update(): void {

            if (this.mtxLocal.translation.equals(this.posTarget, 0.1))
                this.chooseTargetPosition();

            this.move();
        }

        private move(): void {
            this.mtxLocal.showTo(this.posTarget);
            this.mtxLocal.translateZ(this.speed * fc.Loop.timeFrameGame / 1000);
            this.show.mtxLocal.showTo(fc.Vector3.TRANSFORMATION(avatar.mtxLocal.translation, this.mtxWorldInverse, true));
        }

        private chooseTargetPosition(): void {
            let range: number = 5; //sizeWall * numWalls / 2 - 2;
            this.posTarget = new fc.Vector3(fc.Random.default.getRange(-range, range), 0, fc.Random.default.getRange(-range, range));
            // console.log("New target", this.posTarget.toString());
        }

    }

}