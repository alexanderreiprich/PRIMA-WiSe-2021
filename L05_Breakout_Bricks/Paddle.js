"use strict";
var L05_BreakOut_Bricks;
(function (L05_BreakOut_Bricks) {
    var fc = FudgeCore;
    class Paddle extends L05_BreakOut_Bricks.Moveable {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
        }
        movePaddle() {
            if (fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.ARROW_LEFT])) {
                if (this.mtxLocal.translation.x >= -15.5)
                    this.cmpTransform.local.translate(fc.Vector3.X(-0.5));
            }
            else if (fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.ARROW_RIGHT])) {
                if (this.mtxLocal.translation.x <= 15.5)
                    this.cmpTransform.local.translate(fc.Vector3.X(0.5));
            }
            this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
            this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
        }
    }
    L05_BreakOut_Bricks.Paddle = Paddle;
})(L05_BreakOut_Bricks || (L05_BreakOut_Bricks = {}));
//# sourceMappingURL=Paddle.js.map