namespace L11_Doom_HUD {
  import fc = FudgeCore;
  import fcaid = FudgeAid;

  window.addEventListener("load", hndLoad);

  const clrWhite: fc.Color = fc.Color.CSS("white");
  const sizeWall: number = 3;
  const numWalls: number = 20;

  export let viewport: fc.Viewport;
  export let avatar: fc.Node = new fc.Node("Avatar");
  let root: fc.Node = new fc.Node("Root");
  let walls: fc.Node;
  let enemies: fc.Node;

  let ctrSpeed: fc.Control = new fc.Control("AvatarSpeed", 0.3, fc.CONTROL_TYPE.PROPORTIONAL);
  ctrSpeed.setDelay(100);
  let ctrStrafe: fc.Control = new fc.Control("AvatarSpeed", 0.2, fc.CONTROL_TYPE.PROPORTIONAL);
  ctrStrafe.setDelay(100);
  let ctrRotation: fc.Control = new fc.Control("AvatarRotation", -0.3, fc.CONTROL_TYPE.PROPORTIONAL);
  ctrRotation.setDelay(100);

  async function hndLoad(_event: Event): Promise<void> {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    let meshQuad: fc.MeshQuad = new fc.MeshQuad("Quad");

    let txtFloor: fc.TextureImage = new fc.TextureImage("textures/DEM1_5.png");
    let mtrFloor: fc.Material = new fc.Material("Floor", fc.ShaderTexture, new fc.CoatTextured(clrWhite, txtFloor));
    let floor: fcaid.Node = new fcaid.Node("Floor", fc.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
    floor.mtxLocal.scale(fc.Vector3.ONE(sizeWall * numWalls));
    floor.getComponent(fc.ComponentMaterial).pivot.scale(fc.Vector2.ONE(numWalls));

    root.appendChild(floor);

    let cmpCamera: fc.ComponentCamera = new fc.ComponentCamera();
    cmpCamera.projectCentral(1, 45, fc.FIELD_OF_VIEW.DIAGONAL, 0.2, 10000);
    cmpCamera.pivot.translate(fc.Vector3.Y(1.7));
    cmpCamera.backgroundColor = fc.Color.CSS("darkblue");

    avatar.addComponent(cmpCamera);
    avatar.addComponent(new fc.ComponentTransform());
    avatar.mtxLocal.translate(fc.Vector3.Z(10));
    avatar.mtxLocal.rotate(fc.Vector3.Y(180));
    root.appendChild(avatar);

    enemies = await createEnemies();
    root.appendChild(enemies);

    walls = createWalls();
    root.appendChild(walls);

    viewport = new fc.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    viewport.draw();

    canvas.addEventListener("mousemove", hndMouse);
    canvas.addEventListener("click", canvas.requestPointerLock);

    fc.Loop.addEventListener(fc.EVENT.LOOP_FRAME, hndLoop);
    fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 120);

    // console.log(root.getChildren());

  }

  function hndLoop(_event: Event): void {

    ctrSpeed.setInput(
      fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.S, fc.KEYBOARD_CODE.ARROW_DOWN])
      + fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.W, fc.KEYBOARD_CODE.ARROW_UP])
    );

    ctrStrafe.setInput(
      fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.D, fc.KEYBOARD_CODE.ARROW_RIGHT])
      + fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.A, fc.KEYBOARD_CODE.ARROW_LEFT])
    );

    moveAvatar(ctrSpeed.getOutput(), ctrRotation.getOutput(), ctrStrafe.getOutput());
    ctrRotation.setInput(0);
    for (let enemy of enemies.getChildren() as Enemy[])
      enemy.update();
    
    //hndEnemy();

    viewport.draw();
  }

  function hndMouse(_event: MouseEvent): void {

    ctrRotation.setInput(_event.movementX);

  }

  function moveAvatar(_speed: number, _rotation: number, _strafe: number): void {

    avatar.mtxLocal.rotateY(_rotation);
    let posOld: fc.Vector3 = avatar.mtxLocal.translation;
    avatar.mtxLocal.translateZ(_speed);
    avatar.mtxLocal.translateX(_strafe);

    Hud.displayPosition(posOld);

    let bouncedOff: Wall[] = bounceOffWalls(<Wall[]>walls.getChildren());
    if (bouncedOff.length < 2) {
      return;
    }

    bouncedOff = bounceOffWalls(bouncedOff);
    if (bouncedOff.length == 0) {
      return;
    }
    avatar.mtxLocal.translation = posOld;
  }

  function bounceOffWalls(_walls: Wall[]): Wall[] {

    let bouncedOff: Wall[] = [];
    let posAvatar: fc.Vector3 = avatar.mtxLocal.translation;

    for (let wall of _walls) {
      let posBounce: fc.Vector3 = wall.calculateBounce(posAvatar, 1);
      if (posBounce) {
        avatar.mtxLocal.translation = posBounce;
        bouncedOff.push(wall);
      }
    }

    return bouncedOff;

  }

  async function createEnemies(): Promise<fc.Node> {

    let enemies: fc.Node = new fc.Node("Enemies");
    let txtHellknight: fc.TextureImage = new fc.TextureImage();
    await txtHellknight.load("textures/hellknight_spritesheet.png");
    let coatSprite: fc.CoatTextured = new fc.CoatTextured(clrWhite, txtHellknight);
    Enemy.generateSprites(coatSprite);
    enemies.appendChild(new Enemy("Hellknight0", new fc.Vector3(0, 0, 0)));
/*     enemies.appendChild(new Enemy("Hellknight1", new fc.Vector3(3, 0, 0)));
    enemies.appendChild(new Enemy("Hellknight2", new fc.Vector3(0, 0, 3))); */
    
    // console.log("Enemies", enemies);
    return enemies;

  }

  function createWalls(): fc.Node {
    let walls: fc.Node = new fc.Node("Walls");

    let txtWall: fc.TextureImage = new fc.TextureImage("textures/CEMPOIS.png");
    let mtrWall: fc.Material = new fc.Material("Wall", fc.ShaderTexture, new fc.CoatTextured(clrWhite, txtWall));

    for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++) {
      walls.appendChild(new Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-numWalls / 2, 0.5, i), sizeWall), fc.Vector3.Y(90), mtrWall));

      // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
      walls.appendChild(new Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(numWalls / 2, 0.5, i), sizeWall), fc.Vector3.Y(-90), mtrWall));

      // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
      walls.appendChild(new Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(i, 0.5, -numWalls / 2), sizeWall), fc.Vector3.Y(0), mtrWall));

      // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
      walls.appendChild(new Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(i, 0.5, numWalls / 2), sizeWall), fc.Vector3.Y(180), mtrWall));
    }

    walls.appendChild(new Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-5, 0.5, .5), sizeWall), fc.Vector3.Y(90), mtrWall));
    walls.appendChild(new Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-5, 0.5, 1.5), sizeWall), fc.Vector3.Y(90), mtrWall));
    walls.appendChild(new Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-5, 0.5, 2.5), sizeWall), fc.Vector3.Y(90), mtrWall));
    walls.appendChild(new Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-5, 0.5, 3.5), sizeWall), fc.Vector3.Y(90), mtrWall));
    walls.appendChild(new Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-5, 0.5, .5), sizeWall), fc.Vector3.Y(90), mtrWall));
    walls.appendChild(new Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-5.5, 0.5, 0), sizeWall), fc.Vector3.Y(180), mtrWall));
    walls.appendChild(new Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-6.5, 0.5, 0), sizeWall), fc.Vector3.Y(180), mtrWall));
    walls.appendChild(new Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-7.5, 0.5, 0), sizeWall), fc.Vector3.Y(180), mtrWall));
    walls.appendChild(new Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-8.5, 0.5, 0), sizeWall), fc.Vector3.Y(180), mtrWall));
    walls.appendChild(new Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-9.5, 0.5, 0), sizeWall), fc.Vector3.Y(180), mtrWall));
    walls.appendChild(new Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-5.5, 0.5, 4), sizeWall), fc.Vector3.Y(0), mtrWall));
    walls.appendChild(new Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-6.5, 0.5, 4), sizeWall), fc.Vector3.Y(0), mtrWall)); 
    walls.appendChild(new Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-6.5, 0.5, 3.5), sizeWall), fc.Vector3.Y(180), mtrWall));
    walls.appendChild(new Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-7.5, 0.5, 4), sizeWall), fc.Vector3.Y(0), mtrWall));
    walls.appendChild(new Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-8.5, 0.5, 4), sizeWall), fc.Vector3.Y(0), mtrWall));
    walls.appendChild(new Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-9.5, 0.5, 4), sizeWall), fc.Vector3.Y(0), mtrWall));

    return walls;
  }


}