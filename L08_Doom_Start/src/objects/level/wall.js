"use strict";
var L08_Doom_Design;
(function (L08_Doom_Design) {
    var fc = FudgeCore;
    class Wall extends L08_Doom_Design.GameObject {
        //private static readonly TEXTURE_MATERIAL: fc.Material = new fc.Material("Texture", fc.ShaderTexture, new fc.CoatTextured(fc.Color.CSS("WHITE"), new fc.TextureImage("textures/CEMPOIS.png")));
        constructor(_size, _position, _rotation, _material) {
            super("Wall", _size, _position, _rotation);
            // let floor: ƒaid.Node = new ƒaid.Node("Floor", ƒ.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
            let cmpMaterial = new fc.ComponentMaterial(_material);
            cmpMaterial.pivot.scale(fc.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
    }
    L08_Doom_Design.Wall = Wall;
})(L08_Doom_Design || (L08_Doom_Design = {}));
//# sourceMappingURL=wall.js.map