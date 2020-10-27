namespace L04_BreakoutReflection {

    import fc = FudgeCore;

    window.addEventListener("load", sceneLoad);
    window.addEventListener("click", sceneLoad);

    export let viewport: fc.Viewport;

    let root: fc.Node = new fc.Node("Root");
    let ball: GameObject;
    export let walls: fc.Node = new fc.Node("Walls");

    let cubeSize: fc.Vector3 = new fc.Vector3(0.1, 0.1, 0);

    let velocityVector: fc.Vector3 = new fc.Vector3(fc.Random.default.getRange(-1, 1), fc.Random.default.getRange(-1, 1), 0);
    let speed: number = 0.5;
    velocityVector.normalize(speed);

    function sceneLoad(_event: Event): void {
        
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fc.Debug.log(canvas);


        root.addComponent(new fc.ComponentTransform());

        createGameEnviroment();

        //Camera
        let cCamera: fc.ComponentCamera = new fc.ComponentCamera();
        cCamera.pivot.translateZ(4);
        cCamera.pivot.rotateY(180);

        viewport = new fc.Viewport();
        viewport.initialize("Viewport", root, cCamera, canvas);
        fc.Debug.log(viewport);

        fc.Loop.addEventListener(fc.EVENT.LOOP_FRAME, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_REAL, 60);
       
    }

    function hndLoop(_event: Event): void {

        let frameTime: number = fc.Time.game.getElapsedSincePreviousCall() / 1000;
        let tempVector: fc.Vector3 = velocityVector.copy;
        
        tempVector.scale(frameTime);
        ball.mtxLocal.translate(tempVector);
        updateMovement();

        viewport.draw();
        hndCollision();

    }

    function updateMovement(): void {

        if (ball.mtxLocal.translation.x >= 21 || ball.mtxLocal.translation.x <= -21) {

            let tempVector: fc.Vector3 = new fc.Vector3(-velocityVector.x, velocityVector.y, 0);
            ball.mtxLocal.translate(tempVector);
            velocityVector = tempVector;

            console.log("boink");
            
        }
        else if (ball.mtxLocal.translation.y >= 14 || ball.mtxLocal.translation.y <= -14) {

            let tempVector: fc.Vector3 = new fc.Vector3(velocityVector.x, -velocityVector.y, 0);
            ball.mtxLocal.translate(tempVector);
            velocityVector = tempVector;

            console.log("boink");

        }
        else {

            ball.mtxLocal.translate(velocityVector);

        }

    }

    function createGameEnviroment(): void {
        

        //Ball
        ball = new GameObject("Ball", new fc.Vector2(0, 0), new fc.Vector2(1, 1));

        root.appendChild(ball);
        root.mtxLocal.scale(cubeSize);

        //Wall
        root.addChild(walls);
        walls.addChild(new GameObject("WallLeft", new fc.Vector2(-18, 0), new fc.Vector2(1, 25)));
        walls.addChild(new GameObject("WallRight", new fc.Vector2(18, 0), new fc.Vector2(1, 25)));
        walls.addChild(new GameObject("WallBottom", new fc.Vector2(0, -12), new fc.Vector2(35, 1)));
        walls.addChild(new GameObject("WallTop", new fc.Vector2(0, 12), new fc.Vector2(35, 1)));


    }

    function hndCollision(): void {
        
        for (let wall of walls.getChildren()) {

            let intersection: fc.Rectangle = ball.rect.getIntersection((<GameObject>wall).rect);

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

}