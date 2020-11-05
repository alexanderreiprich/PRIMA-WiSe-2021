"use strict";
var L07_BreakOut_Final;
(function (L07_BreakOut_Final) {
    var fc = FudgeCore;
    let PowerUp = /** @class */ (() => {
        class PowerUp extends L07_BreakOut_Final.Moveable {
            constructor(_name, _position, _size, _color) {
                super(_name, _position, _size, _color);
                this.velocity = fc.Vector3.Y(-10);
                this.getComponent(fc.ComponentMesh).mesh = PowerUp.meshSphere;
            }
        }
        PowerUp.meshSphere = new fc.MeshSphere("Sphere", 5, 10);
        return PowerUp;
    })();
    L07_BreakOut_Final.PowerUp = PowerUp;
})(L07_BreakOut_Final || (L07_BreakOut_Final = {}));
//# sourceMappingURL=PowerUp.js.map