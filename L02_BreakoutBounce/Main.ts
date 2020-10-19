namespace L02_BreakoutBounce {

    import fc = FudgeCore;

    window.addEventListener("load", sceneLoad);
    window.addEventListener("click", sceneLoad);

    export let viewport: fc.Viewport;
    let root: fc.Node = new fc.Node("Root");
    let ball: fc.Node = new fc.Node("Ball");
    let slider: fc.Node = new fc.Node("Slider");
    let cubeSize: fc.Vector3 = new fc.Vector3(0.1, 0.1, 0);
    //let sliderSize: fc.Vector3 = new fc.Vector3(1, 0.1, 0);
    let velocityVector: fc.Vector3 = new fc.Vector3( Math.random() / 4, Math.random() / 4, 0);
    
    function sceneLoad(_event: Event): void {
        
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fc.Debug.log(canvas);


        root.addComponent(new fc.ComponentTransform());

        //Ball
        let meshBall: fc.MeshCube = new fc.MeshCube();
        let cmpBall: fc.ComponentMesh = new fc.ComponentMesh(meshBall);
        ball.addComponent(cmpBall);

        let mtrSolidWhite: fc.Material = new fc.Material("SolidWhite", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("WHITE")));
        let cMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(mtrSolidWhite);
        ball.addComponent(cMaterial);

        root.appendChild(ball);
        root.mtxLocal.scale(cubeSize);

        //Slider [WIP]
        let meshSlider: fc.MeshCube = new fc.MeshCube();
        let cmpSlider: fc.ComponentMesh = new fc.ComponentMesh(meshSlider);
        slider.addComponent(cmpSlider);
        slider.addComponent(cMaterial);

        root.appendChild(slider);

        //Camera
        let cCamera: fc.ComponentCamera = new fc.ComponentCamera();
        cCamera.pivot.translateZ(4);
        cCamera.pivot.rotateY(180);

        viewport = new fc.Viewport();
        viewport.initialize("Viewport", root, cCamera, canvas);
        fc.Debug.log(viewport);

        fc.Loop.addEventListener(fc.EVENT.LOOP_FRAME, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_REAL);
       
    }

    function hndLoop(_event: Event): void {

        move();
        viewport.draw();

    }

    function move(): void {


        if (root.mtxLocal.translation.x >= 2 || root.mtxLocal.translation.x <= -2) {

            let tempVector: fc.Vector3 = new fc.Vector3(-velocityVector.x, velocityVector.y, 0);
            root.mtxLocal.translate(tempVector);
            velocityVector = tempVector;
            console.log("boink");
            

        }
        else if (root.mtxLocal.translation.y >= 1.3 || root.mtxLocal.translation.y <= -1.3) {

            let tempVector: fc.Vector3 = new fc.Vector3(velocityVector.x, -velocityVector.y, 0);
            root.mtxLocal.translate(tempVector);
            velocityVector = tempVector;
            console.log("boink");

        }
        else {

            root.mtxLocal.translate(velocityVector);

        }

    }

}