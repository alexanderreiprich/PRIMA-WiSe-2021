namespace L10_Doom_States {

  import fc = FudgeCore;
  import fcaid = FudgeAid;

  window.addEventListener("load", hndLoad);

  //export let viewport: fc.Viewport;
  let root: fc.Node;
  let playerCamera: fc.Node;
  let ctrlCamVert: fc.Control;
  let ctrlCamHori: fc.Control;
  let playerVelocity: fc.Vector3;
  //let walls: fc.Node;

  let txtWall: fc.TextureImage = new fc.TextureImage("../DoomAssets/CEMPOIS.png");
  let mtrWall: fc.Material = new fc.Material("Wall", fc.ShaderTexture, new fc.CoatTextured(null, txtWall));
  let meshQuad: fc.MeshQuad = new fc.MeshQuad("Quad");

  function hndLoad(_event: Event): void {

    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    root = new fc.Node("Root");
    playerCamera = new fc.Node("Camera");
    playerCamera.addComponent(new fc.ComponentTransform());
    ctrlCamVert = new fc.Control("VerticalCam");
    ctrlCamHori = new fc.Control("HorizontalCam");
    root.addChild(playerCamera);

    let txtFloor: fc.TextureImage = new fc.TextureImage("../DoomAssets/DEM1_5.png");
    let mtrFloor: fc.Material = new fc.Material("Floor", fc.ShaderTexture, new fc.CoatTextured(null, txtFloor));
    let floor: fcaid.Node = new fcaid.Node("Floor", fc.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
    floor.mtxLocal.scale(fc.Vector3.ONE(20));
    floor.getComponent(fc.ComponentMaterial).pivot.scale(fc.Vector2.ONE(10));

    root.appendChild(floor);

    let wall: fcaid.Node = new fcaid.Node("Wall", fc.Matrix4x4.TRANSLATION(fc.Vector3.Y(1)), mtrWall, meshQuad);
    wall.mtxLocal.scale(fc.Vector3.ONE(2));
    wall.getComponent(fc.ComponentMaterial).pivot.scale(fc.Vector2.ONE(1));

    root.appendChild(wall);

    let cmpCamera: fc.ComponentCamera = new fc.ComponentCamera();
    cmpCamera.pivot.translateY(1.5);

    cmpCamera.pivot.rotateY(180);
    cmpCamera.backgroundColor = fc.Color.CSS("darkblue");
    playerCamera.addComponent(cmpCamera);

    viewport = new fc.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);

    fc.Loop.addEventListener(fc.EVENT.LOOP_FRAME, hndLoop);
    fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 60);

  }

  function hndLoop(): void {
    hndMovement();
    //createWalls();
    viewport.draw();

  }

  /* function createWalls(): void {

    let wall: fcaid.Node = new fcaid.Node("Wall", fc.Matrix4x4.TRANSLATION(fc.Vector3.Y(1)), mtrWall, meshQuad);
    wall.mtxLocal.scale(fc.Vector3.ONE(2));
    wall.getComponent(fc.ComponentMaterial).pivot.scale(fc.Vector2.ONE(1));

    root.appendChild(wall);

    for (let i: number = 10; i < 10; i++) {

      walls.addChild(new (`Wall-${i}`, new fc.Vector2))

    }

  } */

  function hndMovement(): void {

    ctrlCamVert.setInput(
      fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.ARROW_UP]) + fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.ARROW_DOWN])
    );

    ctrlCamHori.setInput(
      fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.ARROW_LEFT]) + fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.ARROW_RIGHT])
    );

    playerVelocity = fc.Vector3.Z(-ctrlCamVert.getOutput() * 2);

    let frameTime: number = fc.Loop.timeFrameGame / 1000;
    let distance: fc.Vector3 = fc.Vector3.SCALE(playerVelocity, frameTime);

    playerCamera.mtxLocal.translate(distance);
    playerCamera.mtxLocal.rotateY(ctrlCamHori.getOutput());

  }

}