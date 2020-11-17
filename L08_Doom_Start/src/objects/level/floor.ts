namespace L08_Doom_Design {

    import fc = FudgeCore;

    export class Floor extends GameObject {

        private static readonly MATERIAL: fc.Material = new fc.Material("SolidWhite", fc.ShaderTexture, new fc.CoatTextured(fc.Color.CSS("WHITE"), new fc.TextureImage("textures/DEM1_5.png")));

        public constructor(_position: fc.Vector3, _size: fc.Vector3) {

            super("Floor", _position, _size, Floor.MATERIAL);

        }

    }   

}