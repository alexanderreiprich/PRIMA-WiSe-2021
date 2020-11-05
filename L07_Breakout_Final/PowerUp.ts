namespace L07_BreakOut_Final {
    import fc = FudgeCore;

    export class PowerUp extends Moveable {

        private static readonly meshSphere: fc.MeshSphere = new fc.MeshSphere("Sphere", 5, 10);

        public constructor(_name: string, _position: fc.Vector2, _size: fc.Vector2, _color: string) {
            super(_name, _position, _size, _color);
            this.velocity = fc.Vector3.Y(-10);

            this.getComponent(fc.ComponentMesh).mesh = PowerUp.meshSphere;
        }

        /* public move(): void {
            let frameTime: number = fc.Loop.timeFrameGame / 1000;

            let distance: fc.Vector3 = fc.Vector3.SCALE(this.velocity, frameTime);

            this.mtxLocal.translate(distance);
            this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
            this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
        }

        public checkCollision(_target: GameObject): boolean {
            let intersection: fc.Rectangle = this.rect.getIntersection(_target.rect);
            if (intersection == null)
                return false;

            if (intersection.size.x > intersection.size.y)
                this.velocity.reflect(Moveable.REFLECT_VECTOR_Y);
            else
                this.velocity.reflect(Moveable.REFLECT_VECTOR_X);

            return true;
        } */
    }
}