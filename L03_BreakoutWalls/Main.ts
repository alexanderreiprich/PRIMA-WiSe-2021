namespace L03_BreakoutWalls {

    import fc = FudgeCore;

    window.addEventListener("load", sceneLoad);
    window.addEventListener("click", sceneLoad);

    export let viewport: fc.Viewport;

    let root: fc.Node = new fc.Node("Root");
    let ball: fc.Node = new fc.Node("Ball");
    //let slider: fc.Node = new fc.Node("Slider");

    let cubeSize: fc.Vector3 = new fc.Vector3(0.1, 0.1, 0);
    //let sliderSize: fc.Vector3 = new fc.Vector3(1, 0.1, 0);

    let velocityVector: fc.Vector3 = new fc.Vector3(fc.Random.default.getRange(-1, 1), fc.Random.default.getRange(-1, 1), 0);
    let speed: number = 0.5;
    velocityVector.normalize(speed);

    function sceneLoad(_event: Event): void {
        
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fc.Debug.log(canvas);


        root.addComponent(new fc.ComponentTransform());

        createGameEnviroment();

       /*  Slider [WIP]
        let meshSlider: fc.MeshCube = new fc.MeshCube();
        let cmpSlider: fc.ComponentMesh = new fc.ComponentMesh(meshSlider);
        slider.addComponent(cmpSlider);
        slider.addComponent(cMaterial);

        root.appendChild(slider);
 */
        //Camera
        let cCamera: fc.ComponentCamera = new fc.ComponentCamera();
        cCamera.pivot.translateZ(5);
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
        
        let mtrSolidWhite: fc.Material = new fc.Material("SolidWhite", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("WHITE")));
        let meshQuad: fc.MeshQuad = new fc.MeshQuad();

        root.appendChild(createNode("WallLeft", meshQuad, mtrSolidWhite, new fc.Vector2(-22, 0), new fc.Vector2(1, 30)));
        root.appendChild(createNode("WallRight", meshQuad, mtrSolidWhite, new fc.Vector2(22, 0), new fc.Vector2(1, 30)));
        root.appendChild(createNode("WallTop", meshQuad, mtrSolidWhite, new fc.Vector2(0, 15), new fc.Vector2(45, 1)));
        root.appendChild(createNode("WallBottom", meshQuad, mtrSolidWhite, new fc.Vector2(0, -15), new fc.Vector2(45, 1)));

        //Ball
        let meshBall: fc.MeshCube = new fc.MeshCube();
        let cmpBall: fc.ComponentMesh = new fc.ComponentMesh(meshBall);
        ball.addComponent(cmpBall);

        let cMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(mtrSolidWhite);
        ball.addComponent(cMaterial);

        root.appendChild(ball);
        root.mtxLocal.scale(cubeSize);

        ball.addComponent(new fc.ComponentTransform());

    }

    function createNode(_name: string, _mesh: fc.Mesh, _material: fc.Material, _translation: fc.Vector2, _scaling: fc.Vector2): fc.Node {

        let node: fc.Node = new fc.Node(_name);
        node.addComponent(new fc.ComponentTransform);
        node.addComponent(new fc.ComponentMaterial(_material));
        node.addComponent(new fc.ComponentMesh(_mesh));
        node.cmpTransform.local.translate(_translation.toVector3());
        node.getComponent(fc.ComponentMesh).pivot.scale(fc.Vector3.SUM(_scaling.toVector3(), fc.Vector3.Z()));

        return node;

    }

}