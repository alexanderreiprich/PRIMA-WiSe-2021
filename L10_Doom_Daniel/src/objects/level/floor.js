"use strict";
var L10_Doom_AI;
(function (L10_Doom_AI) {
    var fc = FudgeCore;
    class Floor extends L10_Doom_AI.GameObject {
        constructor(_size, _position, _rotation, _material) {
            super("Floor", _size, _position, _rotation);
            let cmpMaterial = new fc.ComponentMaterial(_material);
            this.mtxLocal.rotateX(-90);
            cmpMaterial.pivot.scale(fc.Vector2.ONE(_size.x / 3));
            this.addComponent(cmpMaterial);
        }
    }
    L10_Doom_AI.Floor = Floor;
})(L10_Doom_AI || (L10_Doom_AI = {}));
//# sourceMappingURL=floor.js.map