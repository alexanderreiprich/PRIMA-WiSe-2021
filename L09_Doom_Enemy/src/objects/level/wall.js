"use strict";
var L09_Doom_Enemy;
(function (L09_Doom_Enemy) {
    var fc = FudgeCore;
    class Wall extends L09_Doom_Enemy.GameObject {
        constructor(_size, _position, _rotation, _material) {
            super("Wall", _size, _position, _rotation);
            let cmpMaterial = new fc.ComponentMaterial(_material);
            cmpMaterial.pivot.scale(fc.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
    }
    L09_Doom_Enemy.Wall = Wall;
})(L09_Doom_Enemy || (L09_Doom_Enemy = {}));
//# sourceMappingURL=wall.js.map