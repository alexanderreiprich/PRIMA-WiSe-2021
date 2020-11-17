namespace L08_Doom_Design {

    import fc = FudgeCore;

    export class GameObject extends fc.Node {

        private static readonly MESH_QUAD: fc.MeshQuad = new fc.MeshQuad();

        public constructor(_name: string, _position: fc.Vector3, _size: fc.Vector3, _material: fc.Material) {
            super(_name);

            this.addComponent(new fc.ComponentTransform(fc.Matrix4x4.TRANSLATION(_position)));
            this.mtxLocal.rotateX(-90);

            let cmpQuad: fc.ComponentMesh = new fc.ComponentMesh(GameObject.MESH_QUAD);
            this.addComponent(cmpQuad);
            cmpQuad.pivot.scale(_size);
    
            let cmpMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(_material);
            this.addComponent(cmpMaterial);
        }

    }

}