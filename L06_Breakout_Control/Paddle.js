"use strict";
var L06_BreakOut_Control;
(function (L06_BreakOut_Control) {
    var fc = FudgeCore;
    class Paddle extends L06_BreakOut_Control.Moveable {
        constructor(_name, _position, _size, _color) {
            super(_name, _position, _size, _color);
        }
        movePaddle() {
            if (fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.ARROW_LEFT]) || fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.A])) {
                if (this.mtxLocal.translation.x >= -15.5)
                    this.cmpTransform.local.translate(fc.Vector3.X(-0.5));
            }
            else if (fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.ARROW_RIGHT]) || fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.D])) {
                if (this.mtxLocal.translation.x <= 15.5)
                    this.cmpTransform.local.translate(fc.Vector3.X(0.5));
            }
            this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
            this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
        }
    }
    L06_BreakOut_Control.Paddle = Paddle;
})(L06_BreakOut_Control || (L06_BreakOut_Control = {}));
//# sourceMappingURL=Paddle.js.map