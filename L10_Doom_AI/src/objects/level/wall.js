"use strict";
var L10_Doom_States;
(function (L10_Doom_States) {
    var fc = FudgeCore;
    class Wall extends L10_Doom_States.GameObject {
        constructor(_size, _position, _rotation, _material) {
            super("Wall", _size, _position, _rotation);
            let cmpMaterial = new fc.ComponentMaterial(_material);
            cmpMaterial.pivot.scale(fc.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
    }
    L10_Doom_States.Wall = Wall;
})(L10_Doom_States || (L10_Doom_States = {}));
//# sourceMappingURL=wall.js.map