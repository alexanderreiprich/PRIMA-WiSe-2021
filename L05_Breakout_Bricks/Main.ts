namespace L05_BreakOut_Bricks {
    import fc = FudgeCore;

    window.addEventListener("load", hndLoad);

    let ball: Moveable;
    let walls: fc.Node;
    let bricks: fc.Node;
    let paddle: Paddle;

    export let viewport: fc.Viewport;
    let root: fc.Node;

    function hndLoad(_event: Event): void {

        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        // fc.Debug.log(canvas);

        root = new fc.Node("Root");

        ball = new Moveable("Ball", new fc.Vector2(0, 0), new fc.Vector2(1, 1));
        root.addChild(ball);

        walls = new fc.Node("Walls");
        root.addChild(walls);

        paddle = new Paddle("Paddle", new fc.Vector2(0, -10), new fc.Vector2(4, 1));
        root.addChild(paddle);

        walls.addChild(new GameObject("WallLeft", new fc.Vector2(-18, 0), new fc.Vector2(1, 25)));
        walls.addChild(new GameObject("WallRight", new fc.Vector2(18, 0), new fc.Vector2(1, 25)));
        walls.addChild(new GameObject("WallTop", new fc.Vector2(0, 12), new fc.Vector2(35, 1)));
        walls.addChild(new GameObject("WallBottom", new fc.Vector2(0, -12), new fc.Vector2(35, 1)));

        bricks = new fc.Node("Bricks");
        addBricks(28);
        root.addChild(bricks);

        let cmpCamera: fc.ComponentCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);

        viewport = new fc.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);

        document.getElementById("status").innerHTML = " ";

        fc.Loop.addEventListener(fc.EVENT.LOOP_FRAME, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 60);
    }

    function hndLoop(_event: Event): void {

        ball.move();
        paddle.movePaddle();

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
                //hndLoss();
            }
        }

        ball.checkCollision(paddle);

    }

    /* function hndLoss(): void {

        document.getElementById("status").innerHTML = "You Lost.";
        window.addEventListener("click", hndLoad);

    } */

    function addBricks(_amount: number): void {
        let x: number = -12;
        let y: number = 10;
        for (let i: number = 0; i < _amount; i++) {
            if (x > 12) {
                x = -12;
                y -= 2;
            }

            bricks.addChild(new Brick(`Brick-${i}`, new fc.Vector2(x, y), new fc.Vector2(3, 1)));
            x += 4;
        }
    }
}