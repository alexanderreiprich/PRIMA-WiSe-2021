namespace L09_Doom_Enemy {

    import fc = FudgeCore;

    export class Enemy extends GameObject {

        public constructor(_name: string, _size: fc.Vector2, _position: fc.Vector3, _rotation: fc.Vector3, _material: fc.Material) {

            super(_name, _size, _position, _rotation);

            let cmpMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(_material);
            this.addComponent(cmpMaterial);

            this.mtxLocal.translateY(_size.y / 2);

        }

        public rotateToAvatar(_target: fc.Node): void {

            this.mtxLocal.showTo(_target.mtxLocal.translation);

        }

        public moveTowardsAvatar(_speed: number): void {

            this.mtxLocal.translateZ(_speed);

        }

    }


}