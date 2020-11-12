"use strict";
var L08_Doom_Design;
(function (L08_Doom_Design) {
    var fc = FudgeCore;
    var fcaid = FudgeAid;
    window.addEventListener("load", hndLoad);
    let root;
    let playerCamera;
    let ctrlCamVert;
    let ctrlCamHori;
    let playerVelocity;
    //let walls: fc.Node;
    let txtWall = new fc.TextureImage("../DoomAssets/CEMPOIS.png");
    let mtrWall = new fc.Material("Wall", fc.ShaderTexture, new fc.CoatTextured(null, txtWall));
    let meshQuad = new fc.MeshQuad("Quad");
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        root = new fc.Node("Root");
        playerCamera = new fc.Node("Camera");
        playerCamera.addComponent(new fc.ComponentTransform());
        ctrlCamVert = new fc.Control("VerticalCam");
        ctrlCamHori = new fc.Control("HorizontalCam");
        root.addChild(playerCamera);
        let txtFloor = new fc.TextureImage("../DoomAssets/DEM1_5.png");
        let mtrFloor = new fc.Material("Floor", fc.ShaderTexture, new fc.CoatTextured(null, txtFloor));
        let floor = new fcaid.Node("Floor", fc.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
        floor.mtxLocal.scale(fc.Vector3.ONE(20));
        floor.getComponent(fc.ComponentMaterial).pivot.scale(fc.Vector2.ONE(10));
        root.appendChild(floor);
        let wall = new fcaid.Node("Wall", fc.Matrix4x4.TRANSLATION(fc.Vector3.Y(1)), mtrWall, meshQuad);
        wall.mtxLocal.scale(fc.Vector3.ONE(2));
        wall.getComponent(fc.ComponentMaterial).pivot.scale(fc.Vector2.ONE(1));
        root.appendChild(wall);
        let cmpCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translateY(1.5);
        cmpCamera.pivot.rotateY(180);
        cmpCamera.backgroundColor = fc.Color.CSS("darkblue");
        playerCamera.addComponent(cmpCamera);
        L08_Doom_Design.viewport = new fc.Viewport();
        L08_Doom_Design.viewport.initialize("Viewport", root, cmpCamera, canvas);
        fc.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 60);
    }
    function hndLoop() {
        hndMovement();
        //createWalls();
        L08_Doom_Design.viewport.draw();
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
    function hndMovement() {
        ctrlCamVert.setInput(fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.ARROW_UP]) + fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.ARROW_DOWN]));
        ctrlCamHori.setInput(fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.ARROW_LEFT]) + fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.ARROW_RIGHT]));
        playerVelocity = fc.Vector3.Z(-ctrlCamVert.getOutput());
        let frameTime = fc.Loop.timeFrameGame / 1000;
        let distance = fc.Vector3.SCALE(playerVelocity, frameTime);
        playerCamera.mtxLocal.translate(distance);
        playerCamera.mtxLocal.rotateY(ctrlCamHori.getOutput());
    }
})(L08_Doom_Design || (L08_Doom_Design = {}));
//# sourceMappingURL=Main.js.map