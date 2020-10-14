namespace L01_FirstFudge {

    import f = FudgeCore;
    window.addEventListener("load", load);
    export let viewport: f.Viewport;

    function load(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        //f.Debug.log(canvas);
        let node: f.Node = new f.Node("Quad");

        let mesh: f.MeshQuad = new f.MeshQuad;
        let componentMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
        node.addComponent(componentMesh);

        let materialSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));
        let componentMaterial: f.ComponentMaterial = new f.ComponentMaterial(materialSolidWhite);
        node.addComponent(componentMaterial);

        let componentCamera: f.ComponentCamera = new f.ComponentCamera();
        componentCamera.pivot.translateZ(3);
        componentCamera.pivot.rotateY(180);
        componentCamera.pivot.rotateZ(45);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", node, componentCamera, canvas);
        
        //f.Debug.log(canvas);

        viewport.draw();
    }
    
}