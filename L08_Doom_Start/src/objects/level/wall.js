"use strict";
var L08_Doom_Design;
(function (L08_Doom_Design) {
    var fc = FudgeCore;
    var utils = Utils;
    let Wall = /** @class */ (() => {
        class Wall extends L08_Doom_Design.GameObject {
            constructor(_position, _size, _zRotation) {
                const id = utils.randID(16);
                super(`Wall-${id}`, _position, _size, Wall.TEXTURE_MATERIAL);
                this.mtxLocal.rotateY(90);
                this.mtxLocal.rotateX(_zRotation);
            }
        }
        Wall.TEXTURE_MATERIAL = new fc.Material("Texture", fc.ShaderTexture, new fc.CoatTextured(fc.Color.CSS("WHITE"), new fc.TextureImage("../textures/CEMPOIS.png")));
        return Wall;
    })();
    L08_Doom_Design.Wall = Wall;
})(L08_Doom_Design || (L08_Doom_Design = {}));
//# sourceMappingURL=wall.js.map