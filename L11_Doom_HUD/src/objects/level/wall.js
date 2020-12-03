"use strict";
var L11_Doom_HUD;
(function (L11_Doom_HUD) {
    var fc = FudgeCore;
    class Wall extends L11_Doom_HUD.GameObject {
        constructor(_size, _position, _rotation, _material) {
            super("Wall", _size, _position, _rotation);
            let cmpMaterial = new fc.ComponentMaterial(_material);
            cmpMaterial.pivot.scale(fc.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
    }
    L11_Doom_HUD.Wall = Wall;
})(L11_Doom_HUD || (L11_Doom_HUD = {}));
//# sourceMappingURL=wall.js.map