"use strict";
var L06_BreakOut_Control;
(function (L06_BreakOut_Control) {
    class Brick extends L06_BreakOut_Control.GameObject {
        constructor(_name, _position, _size, _color) {
            super(_name, _position, _size, _color);
        }
        hit() {
            this.getParent().removeChild(this);
        }
    }
    L06_BreakOut_Control.Brick = Brick;
})(L06_BreakOut_Control || (L06_BreakOut_Control = {}));
//# sourceMappingURL=Brick.js.map