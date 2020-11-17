"use strict";
var L08_Doom_Design;
(function (L08_Doom_Design) {
    class Prop extends L08_Doom_Design.GameObject {
        constructor(_name, _position, _size, _zRotation, _material) {
            super(`Prop-${_name}`, _position, _size, _material);
            this.mtxLocal.rotateX(_zRotation);
        }
    }
    L08_Doom_Design.Prop = Prop;
})(L08_Doom_Design || (L08_Doom_Design = {}));
//# sourceMappingURL=prop.js.map