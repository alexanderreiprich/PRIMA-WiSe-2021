namespace L04_BreakoutReflection {

    import fc = FudgeCore;

    export class GameObject extends fc.Node {

        private static mtrSolidWhite: fc.Material = new fc.Material("SolidWhite", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("WHITE")));
        private static meshQuad: fc.MeshQuad = new fc.MeshQuad();

        public velocity: fc.Vector3 = fc.Vector3.ZERO();
        public speed: number = 20;

        public rect: fc.Rectangle;

        public constructor(_name: string, _position: fc.Vector2, _size: fc.Vector2) {
            super(_name);

            this.rect = new fc.Rectangle(_position.x, _position.y, _size.x, _size.y, fc.ORIGIN2D.CENTER);

            this.addComponent(new fc.ComponentTransform(fc.Matrix4x4.TRANSLATION(_position.toVector3(0))));

            let cmpBall: fc.ComponentMesh = new fc.ComponentMesh(GameObject.meshQuad);
            this.addComponent(cmpBall);
            cmpBall.pivot.scale(_size.toVector3(0));

            let cMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(GameObject.mtrSolidWhite);
            this.addComponent(cMaterial);

        }

        /**
        * move moves the game object and the collision detection reactangle
        */
        public move(): void {
            let frameTime: number = fc.Time.game.getElapsedSincePreviousCall() / 1000;
            let distance: fc.Vector3 = fc.Vector3.SCALE(this.velocity, frameTime);

            this.mtxLocal.translate(distance);
            this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x;
            this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y;
        }
    }

}