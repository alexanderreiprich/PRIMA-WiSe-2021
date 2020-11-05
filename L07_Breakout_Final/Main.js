"use strict";
var L07_BreakOut_Final;
(function (L07_BreakOut_Final) {
    var fc = FudgeCore;
    let GAMESTATE;
    (function (GAMESTATE) {
        GAMESTATE[GAMESTATE["START"] = 0] = "START";
        GAMESTATE[GAMESTATE["PLAY"] = 1] = "PLAY";
        GAMESTATE[GAMESTATE["GAMEOVER"] = 2] = "GAMEOVER";
        GAMESTATE[GAMESTATE["WIN"] = 3] = "WIN";
    })(GAMESTATE || (GAMESTATE = {}));
    window.addEventListener("load", hndLoad);
    let ball;
    let walls;
    let bricks;
    let paddle;
    let powerUp;
    let gamestate;
    gamestate = GAMESTATE.START;
    let control = new fc.Control("PaddleControl", 20, 0 /* PROPORTIONAL */);
    control.setDelay(100);
    let score = 0;
    let root;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        // fc.Debug.log(canvas);
        root = new fc.Node("Root");
        ball = new L07_BreakOut_Final.Moveable("Ball", new fc.Vector2(0, 0), new fc.Vector2(1, 1), "WHITE");
        root.addChild(ball);
        walls = new fc.Node("Walls");
        root.addChild(walls);
        paddle = new L07_BreakOut_Final.Paddle("Paddle", new fc.Vector2(0, -10), new fc.Vector2(4, 1), "CYAN");
        root.addChild(paddle);
        walls.addChild(new L07_BreakOut_Final.GameObject("WallLeft", new fc.Vector2(-18, -1.5), new fc.Vector2(1, 28), "WHITE"));
        walls.addChild(new L07_BreakOut_Final.GameObject("WallRight", new fc.Vector2(18, -1.5), new fc.Vector2(1, 28), "WHITE"));
        walls.addChild(new L07_BreakOut_Final.GameObject("WallTop", new fc.Vector2(0, 12), new fc.Vector2(35, 1), "WHITE"));
        walls.addChild(new L07_BreakOut_Final.GameObject("WallBottom", new fc.Vector2(0, -15), new fc.Vector2(35, 1), "BLACK"));
        bricks = new fc.Node("Bricks");
        addBricks(28);
        root.addChild(bricks);
        powerUp = new L07_BreakOut_Final.PowerUp("PowerUp", fc.Vector2.Y(-10), fc.Vector2.ONE(), "WHITE");
        root.addChild(powerUp);
        let cmpCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);
        L07_BreakOut_Final.viewport = new fc.Viewport();
        L07_BreakOut_Final.viewport.initialize("Viewport", root, cmpCamera, canvas);
        document.getElementById("status").innerHTML = " ";
        score = 0;
        document.getElementById("score").innerHTML = "Score: " + score;
        fc.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 60);
        gamestate = GAMESTATE.PLAY;
    }
    function hndLoop(_event) {
        ball.move();
        paddle.movePaddle();
        /* control.setInput(
            fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.A, fc.KEYBOARD_CODE.ARROW_LEFT])
            + fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.D, fc.KEYBOARD_CODE.ARROW_RIGHT])
        ); */
        paddle.velocity = fc.Vector3.X(control.getOutput());
        powerUp.move();
        hndCollision();
        L07_BreakOut_Final.viewport.draw();
    }
    function hndCollision() {
        for (let wall of walls.getChildren()) {
            ball.checkCollision(wall);
        }
        for (let brick of bricks.getChildren()) {
            if (ball.checkCollision(brick)) {
                brick.hit();
                score += 100;
                document.getElementById("score").innerHTML = "Score: " + score;
            }
        }
        if (ball.checkCollision(walls.getChildrenByName("WallBottom")[0])) {
            hndLoss();
        }
        hndWin();
        ball.checkCollision(paddle);
        if (paddle.checkCollision(powerUp)) {
            root.removeChild(powerUp);
            //paddle.setSize
            console.log("powerup pog");
        }
    }
    function hndLoss() {
        gamestate = GAMESTATE.GAMEOVER;
        document.getElementById("status").innerHTML = "You Lost. Click to restart.";
        window.addEventListener("click", hndLoad);
        fc.Loop.stop();
    }
    function hndWin() {
        if (bricks.getChild(0) == null) {
            gamestate = GAMESTATE.WIN;
            document.getElementById("status").innerHTML = "You Won! Congratulations! Click to restart.";
            window.addEventListener("click", hndLoad);
            fc.Loop.stop();
        }
    }
    function addBricks(_amount) {
        let x = -12;
        let y = 10;
        for (let i = 0; i < _amount; i++) {
            if (x > 12) {
                x = -12;
                y -= 2;
            }
            bricks.addChild(new L07_BreakOut_Final.Brick(`Brick-${i}`, new fc.Vector2(x, y), new fc.Vector2(3, 1), "ORANGE"));
            x += 4;
        }
    }
})(L07_BreakOut_Final || (L07_BreakOut_Final = {}));
//# sourceMappingURL=Main.js.map