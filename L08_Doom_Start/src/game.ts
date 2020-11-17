namespace L08_Doom_Design {

    import fc = FudgeCore;
    //import fcaid = FudgeAid;

    window.addEventListener("load", hndLoad);

    const CENTER: fc.Vector3 = new fc.Vector3(0, 0, 0);

    export let viewport: fc.Viewport;
    let root: fc.Node;

    let floor: Floor;

    let playerCamera: fc.Node;
    let ctrlCamVert: fc.Control;
    let ctrlCamHori: fc.Control;
    let playerVelocity: fc.Vector3;

    function hndLoad(_event: Event): void {

        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        root = new fc.Node("Root");

        //Floor
        floor = new Floor(CENTER, new fc.Vector3(1, 1, 0));
        floor.mtxLocal.scale(fc.Vector3.ONE(20));
        floor.getComponent(fc.ComponentMaterial).pivot.scale(fc.Vector2.ONE(10));
        root.addChild(floor);

        //Walls
        let wall: Wall = new Wall(new fc.Vector3(-50, 5, 0), new fc.Vector3(10, 100, 0), 0);
        root.addChild(wall);
        let wall1: Wall = new Wall(new fc.Vector3(50, 5, 0), new fc.Vector3(10, 100, 0), 180);
        root.addChild(wall1);
        let wall2: Wall = new Wall(new fc.Vector3(-50, 5, 0), new fc.Vector3(10, 100, 0), 90);
        root.addChild(wall2); 

        playerCamera = new fc.Node("Camera");
        playerCamera.addComponent(new fc.ComponentTransform());
        ctrlCamVert = new fc.Control("VerticalCam");
        ctrlCamHori = new fc.Control("HorizontalCam");
        root.addChild(playerCamera);

        let cmpCamera: fc.ComponentCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translateY(1.5);

        cmpCamera.pivot.rotateY(180);
        cmpCamera.backgroundColor = fc.Color.CSS("darkblue");
        playerCamera.addComponent(cmpCamera);

        viewport = new fc.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);

        fc.Loop.addEventListener(fc.EVENT.LOOP_FRAME, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 60);

    }

    function hndLoop(): void {
        hndMovement();
        viewport.draw();

    }

    function hndMovement(): void {

        ctrlCamVert.setInput(
            fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.ARROW_UP]) + fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.ARROW_DOWN])
        );

        ctrlCamHori.setInput(
            fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.ARROW_LEFT]) + fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.ARROW_RIGHT])
        );

        playerVelocity = fc.Vector3.Z(-ctrlCamVert.getOutput() * 2);

        let frameTime: number = fc.Loop.timeFrameGame / 1000;
        let distance: fc.Vector3 = fc.Vector3.SCALE(playerVelocity, frameTime);

        playerCamera.mtxLocal.translate(distance);
        playerCamera.mtxLocal.rotateY(ctrlCamHori.getOutput());

    }

}