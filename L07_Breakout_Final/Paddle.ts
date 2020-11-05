namespace L07_BreakOut_Final {

    import fc = FudgeCore;

    export class Paddle extends Moveable {

        public constructor(_name: string, _position: fc.Vector2, _size: fc.Vector2, _color: string) {

            super(_name, _position, _size, _color);

        }

        public movePaddle(): void {

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
}