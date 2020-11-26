namespace L08_Doom_Design {

    import fc = FudgeCore;

    export class Wall extends GameObject {

        //private static readonly TEXTURE_MATERIAL: fc.Material = new fc.Material("Texture", fc.ShaderTexture, new fc.CoatTextured(fc.Color.CSS("WHITE"), new fc.TextureImage("textures/CEMPOIS.png")));

        public constructor(_size: fc.Vector2, _position: fc.Vector3, _rotation: fc.Vector3, _material: fc.Material) { 
            super("Wall", _size, _position, _rotation);

            // let floor: ƒaid.Node = new ƒaid.Node("Floor", ƒ.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
            let cmpMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(_material);
            cmpMaterial.pivot.scale(fc.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }

    }

}