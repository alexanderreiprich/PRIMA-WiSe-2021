namespace L09_Doom_Enemy {

    import fc = FudgeCore;

    export class Wall extends GameObject {

        public constructor(_size: fc.Vector2, _position: fc.Vector3, _rotation: fc.Vector3, _material: fc.Material) { 
            super("Wall", _size, _position, _rotation);

            let cmpMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(_material);
            cmpMaterial.pivot.scale(fc.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }

    }

}