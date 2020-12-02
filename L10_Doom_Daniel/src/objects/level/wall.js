"use strict";
var L10_Doom_AI;
(function (L10_Doom_AI) {
    var fc = FudgeCore;
    class Wall extends L10_Doom_AI.GameObject {
        constructor(_size, _position, _rotation, _material) {
            super("Wall", _size, _position, _rotation);
            let cmpMaterial = new fc.ComponentMaterial(_material);
            cmpMaterial.pivot.scale(fc.Vector2.ONE(1));
            this.mtxLocal.translateY(_size.y / 2);
            this.addComponent(cmpMaterial);
        }
    }
    L10_Doom_AI.Wall = Wall;
})(L10_Doom_AI || (L10_Doom_AI = {}));
//# sourceMappingURL=wall.js.map