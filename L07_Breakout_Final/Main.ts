namespace L07_BreakOut_Final {
    import fc = FudgeCore;

    enum GAMESTATE {
        START, PLAY, GAMEOVER, WIN
    }

    window.addEventListener("load", hndLoad);

    let ball: Moveable;
    let walls: fc.Node;
    let bricks: fc.Node;
    let paddle: Paddle;
    let powerUp: PowerUp;

    let gamestate: GAMESTATE;
    gamestate = GAMESTATE.START;

    let control: fc.Control = new fc.Control("PaddleControl", 20, fc.CONTROL_TYPE.PROPORTIONAL);
    control.setDelay(100);

    let score: number = 0;

    export let viewport: fc.Viewport;
    let root: fc.Node;


    function hndLoad(_event: Event): void {

        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        // fc.Debug.log(canvas);

        root = new fc.Node("Root");

        ball = new Moveable("Ball", new fc.Vector2(0, 0), new fc.Vector2(1, 1), "WHITE");
        root.addChild(ball);

        walls = new fc.Node("Walls");
        root.addChild(walls);

        paddle = new Paddle("Paddle", new fc.Vector2(0, -10), new fc.Vector2(4, 1), "CYAN");
        root.addChild(paddle);

        walls.addChild(new GameObject("WallLeft", new fc.Vector2(-18, -1.5), new fc.Vector2(1, 28), "WHITE"));
        walls.addChild(new GameObject("WallRight", new fc.Vector2(18, -1.5), new fc.Vector2(1, 28), "WHITE"));
        walls.addChild(new GameObject("WallTop", new fc.Vector2(0, 12), new fc.Vector2(35, 1), "WHITE"));
        walls.addChild(new GameObject("WallBottom", new fc.Vector2(0, -15), new fc.Vector2(35, 1), "BLACK"));

        bricks = new fc.Node("Bricks");
        addBricks(28);
        root.addChild(bricks);

        powerUp = new PowerUp("PowerUp", fc.Vector2.Y(-10), fc.Vector2.ONE(), "WHITE");
        root.addChild(powerUp);

        let cmpCamera: fc.ComponentCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);

        viewport = new fc.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);

        document.getElementById("status").innerHTML = " ";

        score = 0;
        document.getElementById("score").innerHTML = "Score: " + score;

        fc.Loop.addEventListener(fc.EVENT.LOOP_FRAME, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 60);
        gamestate = GAMESTATE.PLAY;
    }

    function hndLoop(_event: Event): void {

        ball.move();
        paddle.movePaddle();
        /* control.setInput(
            fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.A, fc.KEYBOARD_CODE.ARROW_LEFT])
            + fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.D, fc.KEYBOARD_CODE.ARROW_RIGHT])
        ); */

        paddle.velocity = fc.Vector3.X(control.getOutput());

        powerUp.move();

        hndCollision();

        viewport.draw();
    }

    function hndCollision(): void {

        for (let wall of walls.getChildren()) {
            ball.checkCollision(<GameObject>wall);
        }

        for (let brick of bricks.getChildren() as Brick[]) {
            if (ball.checkCollision(brick)) {
                brick.hit();
                score += 100;
                document.getElementById("score").innerHTML = "Score: " + score;

            }
        }

        if (ball.checkCollision(<GameObject>walls.getChildrenByName("WallBottom")[0])) {
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

    function hndLoss(): void {

        gamestate = GAMESTATE.GAMEOVER;
        document.getElementById("status").innerHTML = "You Lost. Click to restart.";
        window.addEventListener("click", hndLoad);
        fc.Loop.stop();

    }

    function hndWin(): void {
        
        if (bricks.getChild(0) == null) {
            gamestate = GAMESTATE.WIN;
            document.getElementById("status").innerHTML = "You Won! Congratulations! Click to restart.";
            window.addEventListener("click", hndLoad);
            fc.Loop.stop();
        }

    }

    function addBricks(_amount: number): void {
        let x: number = -12;
        let y: number = 10;
        for (let i: number = 0; i < _amount; i++) {
            if (x > 12) {
                x = -12;
                y -= 2;
            }

            bricks.addChild(new Brick(`Brick-${i}`, new fc.Vector2(x, y), new fc.Vector2(3, 1), "ORANGE"));
            x += 4;
        }
    }
}