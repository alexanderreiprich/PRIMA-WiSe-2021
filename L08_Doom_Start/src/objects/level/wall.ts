namespace L08_Doom_Design {

    import fc = FudgeCore;
    import utils = Utils;

    export class Wall extends GameObject {

        private static readonly TEXTURE_MATERIAL: fc.Material = new fc.Material("Texture", fc.ShaderTexture, new fc.CoatTextured(fc.Color.CSS("WHITE"), new fc.TextureImage("../textures/CEMPOIS.png")));

        public constructor(_position: fc.Vector3, _size: fc.Vector3, _zRotation: number) {
            const id: String = utils.randID(16); 
            super(`Wall-${id}`, _position, _size, Wall.TEXTURE_MATERIAL);

            this.mtxLocal.rotateY(90);
            this.mtxLocal.rotateX(_zRotation);
        }

    }

}