"use strict";
var L07_BreakOut_Final;
(function (L07_BreakOut_Final) {
    class Brick extends L07_BreakOut_Final.GameObject {
        constructor(_name, _position, _size, _color) {
            super(_name, _position, _size, _color);
        }
        hit() {
            this.getParent().removeChild(this);
        }
    }
    L07_BreakOut_Final.Brick = Brick;
})(L07_BreakOut_Final || (L07_BreakOut_Final = {}));
//# sourceMappingURL=Brick.js.map