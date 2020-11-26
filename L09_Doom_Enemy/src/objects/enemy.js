"use strict";
var L09_Doom_Enemy;
(function (L09_Doom_Enemy) {
    var fc = FudgeCore;
    class Enemy extends L09_Doom_Enemy.GameObject {
        constructor(_name, _size, _position, _rotation, _material) {
            super(_name, _size, _position, _rotation);
            let cmpMaterial = new fc.ComponentMaterial(_material);
            this.addComponent(cmpMaterial);
            this.mtxLocal.translateY(_size.y / 2);
        }
        rotateToAvatar(_target) {
            this.mtxLocal.showTo(_target.mtxLocal.translation);
        }
        moveTowardsAvatar(_speed) {
            this.mtxLocal.translateZ(_speed);
        }
    }
    L09_Doom_Enemy.Enemy = Enemy;
})(L09_Doom_Enemy || (L09_Doom_Enemy = {}));
//# sourceMappingURL=enemy.js.map