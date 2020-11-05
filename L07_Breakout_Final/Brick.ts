namespace L07_BreakOut_Final {

    import fc = FudgeCore;

    export class Brick extends GameObject {

        public constructor(_name: string, _position: fc.Vector2, _size: fc.Vector2, _color: string) {

            super(_name, _position, _size, _color);

        }

        public hit(): void {

            this.getParent().removeChild(this);

        }
    }
}