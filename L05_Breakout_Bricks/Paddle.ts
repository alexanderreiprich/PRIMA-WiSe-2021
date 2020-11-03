namespace L05_BreakOut_Bricks {

    import fc = FudgeCore;

    export class Paddle extends Moveable {

        public constructor(_name: string, _position: fc.Vector2, _size: fc.Vector2) {

            super(_name, _position, _size);

        }

        public movePaddle(): void {

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
}