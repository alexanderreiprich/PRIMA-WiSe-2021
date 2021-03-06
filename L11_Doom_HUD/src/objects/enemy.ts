namespace L11_Doom_HUD {

  import fc = FudgeCore;
  import fcaid = FudgeAid;

  export enum ANGLE {
    // N = 0, NE = 1, E = 2, SE = 3, S = 4, SW = 5, W = 6, NW = 7,
    _000 = 0, _045 = 1, _090 = 2, _135 = 3, _180 = 4, _225 = 5, _270 = 6, _315 = 7
  }

  export enum JOB {
    IDLE, PATROL, HUNT
  }

  export class Enemy extends fc.Node {

    private static animations: fcaid.SpriteSheetAnimations;
    public speed: number = 3;
    private show: fc.Node;
    private sprite: fcaid.NodeSprite;
    private posTarget: fc.Vector3;
    private timerActive: boolean = false;
    private angleView: number = 0;
    private job: JOB = JOB.PATROL;
    public constructor(_name: string, _position: fc.Vector3) {

      super(_name);
      this.addComponent(new fc.ComponentTransform());
      this.mtxLocal.translation = _position;

      this.show = new fcaid.Node("Show", fc.Matrix4x4.IDENTITY());
      this.appendChild(this.show);

      this.sprite = new fcaid.NodeSprite("Sprite");
      this.sprite.addComponent(new fc.ComponentTransform);
      this.show.appendChild(this.sprite);

      this.sprite.setAnimation(<fcaid.SpriteSheetAnimation>Enemy.animations["Idle_000"]);
      // this.sprite.showFrame(0);
      this.sprite.setFrameDirection(1);
      this.sprite.framerate = 2;

      this.chooseTargetPosition();

    }
    public static generateSprites(_spritesheet: fc.CoatTextured): void {
      Enemy.animations = {};
      for (let angle: number = 0; angle < 5; angle++) {
        let name: string = "Idle" + ANGLE[angle];
        let sprite: fcaid.SpriteSheetAnimation = new fcaid.SpriteSheetAnimation(name, _spritesheet);
        sprite.generateByGrid(fc.Rectangle.GET(36 + angle * 90, 28, 58, 78), 2, 32, fc.ORIGIN2D.BOTTOMCENTER, fc.Vector2.Y(110));
        Enemy.animations[name] = sprite;
      }
    }

    public update(): void {

      switch (this.job) {
        case JOB.PATROL:
          if (this.mtxLocal.translation.equals(avatar.mtxLocal.translation, 20)) {
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
          },           5000);
          }
          break;

        case JOB.HUNT:
          if (this.mtxLocal.translation.equals(avatar.mtxLocal.translation, 20)) {
            this.posTarget = avatar.mtxLocal.translation;
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

    private displayAnimation(): void {
      this.show.mtxLocal.showTo(fc.Vector3.TRANSFORMATION(avatar.mtxLocal.translation, this.mtxWorldInverse, true));
      let rotation: number = this.show.mtxLocal.rotation.y;
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

      let section: string = ANGLE[rotation]; // .padStart(3, "0");

      this.sprite.setAnimation(<fcaid.SpriteSheetAnimation>Enemy.animations["Idle" + section]);
    }

    private move(): void {
      this.mtxLocal.showTo(this.posTarget);
      this.mtxLocal.translateZ(this.speed * fc.Loop.timeFrameGame / 1000);
    }

    private chooseTargetPosition(): void {
      let range: number = 10; //sizeWall * numWalls / 2 - 2;
      this.posTarget = new fc.Vector3(fc.Random.default.getRange(-range, range), 0, fc.Random.default.getRange(-range, range));
      // console.log("New target", this.posTarget.toString());
    }

    private flip(_reverse: boolean): void {
      this.sprite.mtxLocal.rotation = fc.Vector3.Y(_reverse ? 180 : 0);
    }

  }

}