namespace L08_Doom_Design {

    import fc = FudgeCore;

    export class Prop extends GameObject {

    

        public constructor(_name: String, _position: fc.Vector3, _size: fc.Vector3, _zRotation: number, _material: fc.Material) {
            super(`Prop-${_name}`, _position, _size, _material);
            this.mtxLocal.rotateX(_zRotation);
        }

    }
}