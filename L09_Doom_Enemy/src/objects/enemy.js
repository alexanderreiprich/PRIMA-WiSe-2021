"use strict";
var L09_Doom_Enemy;
(function (L09_Doom_Enemy) {
    class Enemy extends L09_Doom_Enemy.GameObject {
        constructor(_name, _size, _position, _rotation, _material) {
            super(_name, _size, _position, _rotation);
        }
        rotateToAvatar(_target) {
            this.mtxLocal.showTo(_target.mtxLocal.translation);
        }
    }
    L09_Doom_Enemy.Enemy = Enemy;
})(L09_Doom_Enemy || (L09_Doom_Enemy = {}));
//# sourceMappingURL=enemy.js.map