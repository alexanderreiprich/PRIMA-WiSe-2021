"use strict";
var L06_BreakOut_Control;
(function (L06_BreakOut_Control) {
    var fc = FudgeCore;
    window.addEventListener("load", hndLoad);
    let ball;
    let walls;
    let bricks;
    let paddle;
    let root;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        // fc.Debug.log(canvas);
        root = new fc.Node("Root");
        ball = new L06_BreakOut_Control.Moveable("Ball", new fc.Vector2(0, 0), new fc.Vector2(1, 1));
        root.addChild(ball);
        walls = new fc.Node("Walls");
        root.addChild(walls);
        paddle = new L06_BreakOut_Control.Paddle("Paddle", new fc.Vector2(0, -10), new fc.Vector2(4, 1));
        root.addChild(paddle);
        walls.addChild(new L06_BreakOut_Control.GameObject("WallLeft", new fc.Vector2(-18, 0), new fc.Vector2(1, 25)));
        walls.addChild(new L06_BreakOut_Control.GameObject("WallRight", new fc.Vector2(18, 0), new fc.Vector2(1, 25)));
        walls.addChild(new L06_BreakOut_Control.GameObject("WallTop", new fc.Vector2(0, 12), new fc.Vector2(35, 1)));
        walls.addChild(new L06_BreakOut_Control.GameObject("WallBottom", new fc.Vector2(0, -12), new fc.Vector2(35, 1)));
        bricks = new fc.Node("Bricks");
        addBricks(28);
        root.addChild(bricks);
        let cmpCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);
        L06_BreakOut_Control.viewport = new fc.Viewport();
        L06_BreakOut_Control.viewport.initialize("Viewport", root, cmpCamera, canvas);
        document.getElementById("status").innerHTML = " ";
        fc.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 60);
    }
    function hndLoop(_event) {
        ball.move();
        paddle.movePaddle();
        hndCollision();
        L06_BreakOut_Control.viewport.draw();
    }
    function hndCollision() {
        for (let wall of walls.getChildren()) {
            ball.checkCollision(wall);
        }
        for (let brick of bricks.getChildren()) {
            if (ball.checkCollision(brick)) {
                brick.hit();
                //hndLoss();
            }
        }
        ball.checkCollision(paddle);
    }
    /* function hndLoss(): void {

        document.getElementById("status").innerHTML = "You Lost.";
        window.addEventListener("click", hndLoad);

    } */
    function addBricks(_amount) {
        let x = -12;
        let y = 10;
        for (let i = 0; i < _amount; i++) {
            if (x > 12) {
                x = -12;
                y -= 2;
            }
            bricks.addChild(new L06_BreakOut_Control.Brick(`Brick-${i}`, new fc.Vector2(x, y), new fc.Vector2(3, 1)));
            x += 4;
        }
    }
})(L06_BreakOut_Control || (L06_BreakOut_Control = {}));
//# sourceMappingURL=Main.js.map