"use strict";
var L09_Doom_Enemy;
(function (L09_Doom_Enemy) {
    var fc = FudgeCore;
    let GameObject = /** @class */ (() => {
        class GameObject extends fc.Node {
            constructor(_name, _size, _position, _rotation) {
                super(_name);
                this.addComponent(new fc.ComponentTransform(fc.Matrix4x4.TRANSLATION(_position)));
                this.mtxLocal.rotation = _rotation;
                let cmpQuad = new fc.ComponentMesh(GameObject.meshQuad);
                this.addComponent(cmpQuad);
                cmpQuad.pivot.scale(_size.toVector3(1));
            }
            calculateBounce(_posWith, _radius = 1) {
                let normal = this.mtxWorld.getZ();
                let posThis = this.mtxWorld.translation;
                let difference = fc.Vector3.DIFFERENCE(_posWith, posThis);
                let distance = fc.Vector3.DOT(difference, normal);
                if (distance < 0 || distance > _radius)
                    return null;
                let size = this.getComponent(fc.ComponentMesh).pivot.scaling;
                let ray = new fc.Ray(normal, _posWith);
                let intersect = ray.intersectPlane(posThis, normal);
                let localIntersect = fc.Vector3.TRANSFORMATION(intersect, this.mtxWorldInverse, true);
                if (Math.abs(localIntersect.x) - _radius > 0.5 * size.x)
                    return null;
                normal.scale(1.001);
                return fc.Vector3.SUM(intersect, normal);
            }
            detectHit(_posWith, _radius) {
                let normal = this.mtxWorld.getZ();
                let posThis = this.mtxWorld.translation;
                let difference = fc.Vector3.DIFFERENCE(_posWith, posThis);
                let distance = fc.Vector3.DOT(difference, normal);
                if (distance < 0 || distance > _radius)
                    return false;
                let size = this.getComponent(fc.ComponentMesh).pivot.scaling;
                let ray = new fc.Ray(normal, _posWith);
                let intersect = ray.intersectPlane(posThis, normal);
                let localIntersect = fc.Vector3.TRANSFORMATION(intersect, this.mtxWorldInverse, true);
                if (Math.abs(localIntersect.x) - _radius > 0.5 * size.x)
                    return false;
                return true;
            }
            isTargetbetween(_target, _betweenTarget) {
                let posThis = this.mtxWorld.translation;
                let posTarget = _target.mtxWorld.translation;
                let posWith = _betweenTarget.mtxWorld.translation;
                if (this.vectorBetween(fc.Vector3.DIFFERENCE(posWith, posThis)) > this.vectorBetween(fc.Vector3.DIFFERENCE(posTarget, posThis)))
                    return false;
                let localWich = fc.Vector3.TRANSFORMATION(posWith, this.mtxWorldInverse, true);
                if (localWich.z < 0)
                    return false;
                let normalBe = _betweenTarget.mtxWorld.getZ();
                let sizeBe = _betweenTarget.getComponent(fc.ComponentMesh).pivot.scaling;
                let ray = new fc.Ray(this.mtxWorld.getZ(), posTarget);
                let intersect = ray.intersectPlane(posWith, normalBe);
                let localIntersect = fc.Vector3.TRANSFORMATION(intersect, _betweenTarget.mtxWorldInverse, true);
                if (Math.abs(localIntersect.x) > 0.5 * sizeBe.x) {
                    return false;
                }
                return true;
            }
            vectorBetween(_vector) {
                return Math.sqrt(Math.pow(_vector.x, 2) + Math.pow(_vector.z, 2));
            }
        }
        GameObject.meshQuad = new fc.MeshQuad();
        return GameObject;
    })();
    L09_Doom_Enemy.GameObject = GameObject;
})(L09_Doom_Enemy || (L09_Doom_Enemy = {}));
//# sourceMappingURL=gameobject.js.map