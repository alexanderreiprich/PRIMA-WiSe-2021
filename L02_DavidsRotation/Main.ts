namespace L02_DavidsRotation {

    import fc = FudgeCore;

    window.addEventListener("load", sceneLoad);
    window.addEventListener("click", sceneLoad);

    export let viewport: fc.Viewport;
    let root: fc.Node = new fc.Node("Root");
    let pos: number = 0;
    
    function sceneLoad(_event: Event): void {
        
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fc.Debug.log(canvas);


        root.addComponent(new fc.ComponentTransform());

        let quad: fc.Node = new fc.Node("Quad");
        let meshQuad: fc.MeshQuad = new fc.MeshQuad();
        let cmpQuad: fc.ComponentMesh = new fc.ComponentMesh(meshQuad);
        quad.addComponent(cmpQuad);

        let mtrSolidWhite: fc.Material = new fc.Material("SolidWhite", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("WHITE")));
        let cMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(mtrSolidWhite);
        quad.addComponent(cMaterial);

        root.appendChild(quad);

        let torus: fc.Node = new fc.Node("Torus");

        let meshTorus: fc.MeshTorus = new fc.MeshTorus("Torus", 1, 10 , 1) ;
        let cmpTorus: fc.ComponentMesh = new fc.ComponentMesh(meshTorus);
        cmpTorus.pivot.translateX(0);
        cmpTorus.pivot.rotateZ(90);
        cmpTorus.pivot.rotateX(90);
        torus.addComponent(cmpTorus);

        let orange: fc.Material = new fc.Material("Orange", fc.ShaderUniColor , new fc.CoatColored(fc.Color.CSS("ORANGE")));
        let corange: fc.ComponentMaterial = new fc.ComponentMaterial(orange);
        torus.addComponent(corange);
        
        root.appendChild(torus);


        let cube: fc.Node = new fc.Node("Cube");
        let meshCube: fc.MeshCube = new fc.MeshCube() ;
        let cmpCube: fc.ComponentMesh = new fc.ComponentMesh(meshCube);
        let red: fc.Material = new fc.Material("Red", fc.ShaderUniColor , new fc.CoatColored(fc.Color.CSS("RED")));
        let cred: fc.ComponentMaterial = new fc.ComponentMaterial(red);

        cmpCube.pivot.scaleX(0.5);
        cmpCube.pivot.scaleY(0.5);
        cmpCube.pivot.rotateZ(pos * -45);

        torus.addComponent(corange);
        cube.addComponent(cmpCube);
        cube.addComponent(cred);
        root.appendChild(cube);

        let cCamera: fc.ComponentCamera = new fc.ComponentCamera();
        cCamera.pivot.translateZ(4);
        cCamera.pivot.rotateY(180);
        cCamera.pivot.rotateZ(pos * 30);

        viewport = new fc.Viewport();
        viewport.initialize("Viewport", root, cCamera, canvas);
        fc.Debug.log(viewport);

        fc.Loop.addEventListener(fc.EVENT.LOOP_FRAME, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_REAL);

        pos += 1;
       
    }

    function hndLoop(_event: Event): void {

        console.log("Tick");
        root.mtxLocal.rotateZ(3);
        viewport.draw();
    }

}