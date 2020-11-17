"use strict";
var L08_Doom_Design;
(function (L08_Doom_Design) {
    var fc = FudgeCore;
    let GameObject = /** @class */ (() => {
        class GameObject extends fc.Node {
            constructor(_name, _position, _size, _material) {
                super(_name);
                this.addComponent(new fc.ComponentTransform(fc.Matrix4x4.TRANSLATION(_position)));
                this.mtxLocal.rotateX(-90);
                let cmpQuad = new fc.ComponentMesh(GameObject.MESH_QUAD);
                this.addComponent(cmpQuad);
                cmpQuad.pivot.scale(_size);
                let cmpMaterial = new fc.ComponentMaterial(_material);
                this.addComponent(cmpMaterial);
            }
        }
        GameObject.MESH_QUAD = new fc.MeshQuad();
        return GameObject;
    })();
    L08_Doom_Design.GameObject = GameObject;
})(L08_Doom_Design || (L08_Doom_Design = {}));
//# sourceMappingURL=gameobject.js.map