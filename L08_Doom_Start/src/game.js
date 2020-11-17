"use strict";
var L08_Doom_Design;
(function (L08_Doom_Design) {
    var fc = FudgeCore;
    //import fcaid = FudgeAid;
    window.addEventListener("load", hndLoad);
    const CENTER = new fc.Vector3(0, 0, 0);
    let root;
    let floor;
    let playerCamera;
    let ctrlCamVert;
    let ctrlCamHori;
    let playerVelocity;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        root = new fc.Node("Root");
        //Floor
        floor = new L08_Doom_Design.Floor(CENTER, new fc.Vector3(1, 1, 0));
        floor.mtxLocal.scale(fc.Vector3.ONE(20));
        floor.getComponent(fc.ComponentMaterial).pivot.scale(fc.Vector2.ONE(10));
        root.addChild(floor);
        //Walls
        let wall = new L08_Doom_Design.Wall(new fc.Vector3(-50, 5, 0), new fc.Vector3(10, 100, 0), 0);
        root.addChild(wall);
        let wall1 = new L08_Doom_Design.Wall(new fc.Vector3(50, 5, 0), new fc.Vector3(10, 100, 0), 180);
        root.addChild(wall1);
        let wall2 = new L08_Doom_Design.Wall(new fc.Vector3(-50, 5, 0), new fc.Vector3(10, 100, 0), 90);
        root.addChild(wall2);
        playerCamera = new fc.Node("Camera");
        playerCamera.addComponent(new fc.ComponentTransform());
        ctrlCamVert = new fc.Control("VerticalCam");
        ctrlCamHori = new fc.Control("HorizontalCam");
        root.addChild(playerCamera);
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
        L08_Doom_Design.viewport.draw();
    }
    function hndMovement() {
        ctrlCamVert.setInput(fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.ARROW_UP]) + fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.ARROW_DOWN]));
        ctrlCamHori.setInput(fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.ARROW_LEFT]) + fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.ARROW_RIGHT]));
        playerVelocity = fc.Vector3.Z(-ctrlCamVert.getOutput() * 2);
        let frameTime = fc.Loop.timeFrameGame / 1000;
        let distance = fc.Vector3.SCALE(playerVelocity, frameTime);
        playerCamera.mtxLocal.translate(distance);
        playerCamera.mtxLocal.rotateY(ctrlCamHori.getOutput());
    }
})(L08_Doom_Design || (L08_Doom_Design = {}));
//# sourceMappingURL=game.js.map