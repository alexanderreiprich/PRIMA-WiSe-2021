"use strict";
var main;
(function (main) {
    var fc = FudgeCore;
    window.addEventListener("load", hndLoad);
    let root = new fc.Node("Root");
    let floor = new fc.Node("Floor");
    let wall = new fc.Node("Wall");
    hndLoad();
    function hndLoad() {
        const canvas = document.querySelector("canvas");
        let cmpCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.translateY(1);
        cmpCamera.pivot.rotateY(180);
        main.viewport = new fc.Viewport();
        main.viewport.initialize("Viewport", root, cmpCamera, canvas);
        floor = new fc.Node("Quad");
        wall = new fc.Node("Quad");
        root.addChild(floor);
        root.addChild(wall);
        //Floor
        let floorMesh = new fc.MeshQuad();
        let cmpFloorMesh = new fc.ComponentMesh(floorMesh);
        cmpFloorMesh.pivot.rotateX(-90);
        cmpFloorMesh.pivot.scale(new fc.Vector3(5, 5, 5));
        floor.addComponent(cmpFloorMesh);
        let mtrFloorColor = new fc.Material("FloorColor", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("ORANGE")));
        let cmpFloorMaterial = new fc.ComponentMaterial(mtrFloorColor);
        floor.addComponent(cmpFloorMaterial);
        //Wall
        let wallMesh = new fc.MeshQuad();
        let cmpWallMesh = new fc.ComponentMesh(wallMesh);
        cmpWallMesh.pivot.scale(new fc.Vector3(17, 15, 5));
        cmpWallMesh.pivot.translateZ(-4);
        wall.addComponent(cmpWallMesh);
        let mtrWallColor = new fc.Material("FloorColor", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("BLUE")));
        let cmpWallMaterial = new fc.ComponentMaterial(mtrWallColor);
        wall.addComponent(cmpWallMaterial);
        main.viewport.draw();
    }
})(main || (main = {}));
//# sourceMappingURL=Main.js.map