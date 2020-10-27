"use strict";
var L04_BreakoutReflection;
(function (L04_BreakoutReflection) {
    var fc = FudgeCore;
    window.addEventListener("load", sceneLoad);
    window.addEventListener("click", sceneLoad);
    let root = new fc.Node("Root");
    let ball;
    L04_BreakoutReflection.walls = new fc.Node("Walls");
    let cubeSize = new fc.Vector3(0.1, 0.1, 0);
    let velocityVector = new fc.Vector3(fc.Random.default.getRange(-1, 1), fc.Random.default.getRange(-1, 1), 0);
    let speed = 0.5;
    velocityVector.normalize(speed);
    function sceneLoad(_event) {
        const canvas = document.querySelector("canvas");
        fc.Debug.log(canvas);
        root.addComponent(new fc.ComponentTransform());
        createGameEnviroment();
        //Camera
        let cCamera = new fc.ComponentCamera();
        cCamera.pivot.translateZ(4);
        cCamera.pivot.rotateY(180);
        L04_BreakoutReflection.viewport = new fc.Viewport();
        L04_BreakoutReflection.viewport.initialize("Viewport", root, cCamera, canvas);
        fc.Debug.log(L04_BreakoutReflection.viewport);
        fc.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_REAL, 60);
    }
    function hndLoop(_event) {
        let frameTime = fc.Time.game.getElapsedSincePreviousCall() / 1000;
        let tempVector = velocityVector.copy;
        tempVector.scale(frameTime);
        ball.mtxLocal.translate(tempVector);
        updateMovement();
        L04_BreakoutReflection.viewport.draw();
        hndCollision();
    }
    function updateMovement() {
        if (ball.mtxLocal.translation.x >= 21 || ball.mtxLocal.translation.x <= -21) {
            let tempVector = new fc.Vector3(-velocityVector.x, velocityVector.y, 0);
            ball.mtxLocal.translate(tempVector);
            velocityVector = tempVector;
            console.log("boink");
        }
        else if (ball.mtxLocal.translation.y >= 14 || ball.mtxLocal.translation.y <= -14) {
            let tempVector = new fc.Vector3(velocityVector.x, -velocityVector.y, 0);
            ball.mtxLocal.translate(tempVector);
            velocityVector = tempVector;
            console.log("boink");
        }
        else {
            ball.mtxLocal.translate(velocityVector);
        }
    }
    function createGameEnviroment() {
        //Ball
        ball = new L04_BreakoutReflection.GameObject("Ball", new fc.Vector2(0, 0), new fc.Vector2(1, 1));
        root.appendChild(ball);
        root.mtxLocal.scale(cubeSize);
        //Wall
        root.addChild(L04_BreakoutReflection.walls);
        L04_BreakoutReflection.walls.addChild(new L04_BreakoutReflection.GameObject("WallLeft", new fc.Vector2(-18, 0), new fc.Vector2(1, 25)));
        L04_BreakoutReflection.walls.addChild(new L04_BreakoutReflection.GameObject("WallRight", new fc.Vector2(18, 0), new fc.Vector2(1, 25)));
        L04_BreakoutReflection.walls.addChild(new L04_BreakoutReflection.GameObject("WallBottom", new fc.Vector2(0, -12), new fc.Vector2(35, 1)));
        L04_BreakoutReflection.walls.addChild(new L04_BreakoutReflection.GameObject("WallTop", new fc.Vector2(0, 12), new fc.Vector2(35, 1)));
    }
    function hndCollision() {
        for (let wall of L04_BreakoutReflection.walls.getChildren()) {
            let intersection = ball.rect.getIntersection(wall.rect);
            if (intersection) {
                console.log("Ball collides!");
                if (intersection.size.x > intersection.size.y) {
                    velocityVector.y *= -1;
                }
                else {
                    velocityVector.x *= -1;
                }
            }
        }
    }
})(L04_BreakoutReflection || (L04_BreakoutReflection = {}));
//# sourceMappingURL=Main.js.map