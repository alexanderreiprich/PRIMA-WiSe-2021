"use strict";
var L08_Doom_Design;
(function (L08_Doom_Design) {
    var fc = FudgeCore;
    let Floor = /** @class */ (() => {
        class Floor extends L08_Doom_Design.GameObject {
            constructor(_position, _size) {
                super("Floor", _position, _size, Floor.MATERIAL);
            }
        }
        Floor.MATERIAL = new fc.Material("SolidWhite", fc.ShaderTexture, new fc.CoatTextured(fc.Color.CSS("WHITE"), new fc.TextureImage("textures/DEM1_5.png")));
        return Floor;
    })();
    L08_Doom_Design.Floor = Floor;
})(L08_Doom_Design || (L08_Doom_Design = {}));
//# sourceMappingURL=floor.js.map