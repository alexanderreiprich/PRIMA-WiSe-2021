"use strict";
var L07_BreakOut_Final;
(function (L07_BreakOut_Final) {
    var fc = FudgeCore;
    let GameObject = /** @class */ (() => {
        class GameObject extends fc.Node {
            constructor(_name, _position, _size, _color) {
                super(_name);
                let objMaterial = new fc.Material(_color, fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS(_color)));
                this.rect = new fc.Rectangle(_position.x, _position.y, _size.x, _size.y, fc.ORIGIN2D.CENTER);
                this.addComponent(new fc.ComponentTransform(fc.Matrix4x4.TRANSLATION(_position.toVector3(0))));
                let cmpQuad = new fc.ComponentMesh(GameObject.meshQuad);
                this.addComponent(cmpQuad);
                cmpQuad.pivot.scale(_size.toVector3(0));
                let cMaterial = new fc.ComponentMaterial(objMaterial);
                this.addComponent(cMaterial);
            }
        }
        GameObject.meshQuad = new fc.MeshQuad();
        return GameObject;
    })();
    L07_BreakOut_Final.GameObject = GameObject;
})(L07_BreakOut_Final || (L07_BreakOut_Final = {}));
//# sourceMappingURL=GameObject.js.map