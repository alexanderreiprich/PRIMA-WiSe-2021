namespace L09_Doom_Enemy {

    import fc = FudgeCore;

    export class Enemy extends GameObject {

        public constructor(_name: string, _size: fc.Vector2, _position: fc.Vector3, _rotation: fc.Vector3, _material: fc.Material) {

            super(_name, _size, _position, _rotation);

        }

        public rotateToAvatar(_target: fc.Node): void {

            this.mtxLocal.showTo(_target.mtxLocal.translation);

        }

    }


}