"use strict";
var L02_BreakoutBounce;
(function (L02_BreakoutBounce) {
    var fc = FudgeCore;
    window.addEventListener("load", sceneLoad);
    window.addEventListener("click", sceneLoad);
    let root = new fc.Node("Root");
    let ball = new fc.Node("Ball");
    let slider = new fc.Node("Slider");
    let cubeSize = new fc.Vector3(0.1, 0.1, 0);
    //let sliderSize: fc.Vector3 = new fc.Vector3(1, 0.1, 0);
    let velocityVector = new fc.Vector3(Math.random() / 4, Math.random() / 4, 0);
    function sceneLoad(_event) {
        const canvas = document.querySelector("canvas");
        fc.Debug.log(canvas);
        root.addComponent(new fc.ComponentTransform());
        //Ball
        let meshBall = new fc.MeshCube();
        let cmpBall = new fc.ComponentMesh(meshBall);
        ball.addComponent(cmpBall);
        let mtrSolidWhite = new fc.Material("SolidWhite", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("WHITE")));
        let cMaterial = new fc.ComponentMaterial(mtrSolidWhite);
        ball.addComponent(cMaterial);
        root.appendChild(ball);
        root.mtxLocal.scale(cubeSize);
        //Slider [WIP]
        let meshSlider = new fc.MeshCube();
        let cmpSlider = new fc.ComponentMesh(meshSlider);
        slider.addComponent(cmpSlider);
        slider.addComponent(cMaterial);
        root.appendChild(slider);
        //Camera
        let cCamera = new fc.ComponentCamera();
        cCamera.pivot.translateZ(4);
        cCamera.pivot.rotateY(180);
        L02_BreakoutBounce.viewport = new fc.Viewport();
        L02_BreakoutBounce.viewport.initialize("Viewport", root, cCamera, canvas);
        fc.Debug.log(L02_BreakoutBounce.viewport);
        fc.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_REAL);
    }
    function hndLoop(_event) {
        move();
        L02_BreakoutBounce.viewport.draw();
    }
    function move() {
        if (root.mtxLocal.translation.x >= 2 || root.mtxLocal.translation.x <= -2) {
            let tempVector = new fc.Vector3(-velocityVector.x, velocityVector.y, 0);
            root.mtxLocal.translate(tempVector);
            velocityVector = tempVector;
            console.log("boink");
        }
        else if (root.mtxLocal.translation.y >= 1.3 || root.mtxLocal.translation.y <= -1.3) {
            let tempVector = new fc.Vector3(velocityVector.x, -velocityVector.y, 0);
            root.mtxLocal.translate(tempVector);
            velocityVector = tempVector;
            console.log("boink");
        }
        else {
            root.mtxLocal.translate(velocityVector);
        }
    }
})(L02_BreakoutBounce || (L02_BreakoutBounce = {}));
//# sourceMappingURL=Main.js.map