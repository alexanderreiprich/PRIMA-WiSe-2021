"use strict";
var L01_FirstFudge;
(function (L01_FirstFudge) {
    var f = FudgeCore;
    window.addEventListener("load", load);
    function load(_event) {
        const canvas = document.querySelector("canvas");
        //f.Debug.log(canvas);
        let node = new f.Node("Quad");
        let mesh = new f.MeshQuad;
        let componentMesh = new f.ComponentMesh(mesh);
        componentMesh.pivot.translateX(1);
        node.addComponent(componentMesh);
        let materialSolidBlue = new f.Material("SolidBlue", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("BLUE")));
        let componentMaterial = new f.ComponentMaterial(materialSolidBlue);
        node.addComponent(componentMaterial);
        let componentCamera = new f.ComponentCamera();
        componentCamera.pivot.translateZ(6);
        componentCamera.pivot.rotateY(180);
        componentCamera.pivot.rotateZ(45);
        L01_FirstFudge.viewport = new f.Viewport();
        L01_FirstFudge.viewport.initialize("Viewport", node, componentCamera, canvas);
        //f.Debug.log(canvas);
        L01_FirstFudge.viewport.draw();
    }
})(L01_FirstFudge || (L01_FirstFudge = {}));
//# sourceMappingURL=Main.js.map