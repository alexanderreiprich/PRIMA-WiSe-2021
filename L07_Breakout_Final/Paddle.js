"use strict";
var L07_BreakOut_Final;
(function (L07_BreakOut_Final) {
    var fc = FudgeCore;
    class Paddle extends L07_BreakOut_Final.Moveable {
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
    L07_BreakOut_Final.Paddle = Paddle;
})(L07_BreakOut_Final || (L07_BreakOut_Final = {}));
//# sourceMappingURL=Paddle.js.map