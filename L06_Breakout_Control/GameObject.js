"use strict";
var L06_BreakOut_Control;
(function (L06_BreakOut_Control) {
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
    L06_BreakOut_Control.GameObject = GameObject;
})(L06_BreakOut_Control || (L06_BreakOut_Control = {}));
//# sourceMappingURL=GameObject.js.map