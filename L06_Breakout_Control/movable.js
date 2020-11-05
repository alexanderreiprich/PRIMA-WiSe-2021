"use strict";
var L06_BreakOut_Control;
(function (L06_BreakOut_Control) {
    var fc = FudgeCore;
    let Moveable = /** @class */ (() => {
        class Moveable extends L06_BreakOut_Control.GameObject {
            constructor(_name, _position, _size, _color) {
                super(_name, _position, _size, _color);
                this.speed = 15;
                this.velocity = fc.Vector3.ZERO();
                this.velocity = new fc.Vector3(fc.Random.default.getRange(-1, 1), fc.Random.default.getRange(-1, 1), 0);
                this.velocity.normalize(this.speed);
            }
            move() {
                let frameTime = fc.Loop.timeFrameGame / 1000;
                let distance = fc.Vector3.SCALE(this.velocity, frameTime);
                this.mtxLocal.translate(distance);
                this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
                this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
            }
            checkCollision(_target) {
                let intersection = this.rect.getIntersection(_target.rect);
                if (intersection == null)
                    return false;
                if (intersection.size.x > intersection.size.y)
                    this.velocity.reflect(Moveable.REFLECT_VECTOR_Y);
                else
                    this.velocity.reflect(Moveable.REFLECT_VECTOR_X);
                return true;
            }
        }
        Moveable.REFLECT_VECTOR_X = fc.Vector3.X();
        Moveable.REFLECT_VECTOR_Y = fc.Vector3.Y();
        return Moveable;
    })();
    L06_BreakOut_Control.Moveable = Moveable;
})(L06_BreakOut_Control || (L06_BreakOut_Control = {}));
//# sourceMappingURL=Movable.js.map