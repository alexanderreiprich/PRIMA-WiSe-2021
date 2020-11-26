"use strict";
var L09_Doom_Enemy;
(function (L09_Doom_Enemy) {
    var fc = FudgeCore;
    var fcaid = FudgeAid;
    window.addEventListener("load", hndLoad);
    const sizeWall = 3;
    const numWalls = 20;
    let root = new fc.Node("Root");
    let avatar = new fc.Node("Avatar");
    let walls;
    let enemies = new fc.Node("Enemies");
    let hellknight;
    let ctrSpeed = new fc.Control("AvatarSpeed", 0.3, 0 /* PROPORTIONAL */);
    ctrSpeed.setDelay(100);
    let ctrStrafe = new fc.Control("AvatarSpeed", 0.2, 0 /* PROPORTIONAL */);
    ctrStrafe.setDelay(100);
    let ctrRotation = new fc.Control("AvatarRotation", -0.3, 0 /* PROPORTIONAL */);
    ctrRotation.setDelay(100);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        let meshQuad = new fc.MeshQuad("Quad");
        let txtFloor = new fc.TextureImage("textures/DEM1_5.png");
        let mtrFloor = new fc.Material("Floor", fc.ShaderTexture, new fc.CoatTextured(null, txtFloor));
        let floor = new fcaid.Node("Floor", fc.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
        floor.mtxLocal.scale(fc.Vector3.ONE(sizeWall * numWalls));
        floor.getComponent(fc.ComponentMaterial).pivot.scale(fc.Vector2.ONE(numWalls));
        root.appendChild(floor);
        let cmpCamera = new fc.ComponentCamera();
        cmpCamera.projectCentral(1, 45, fc.FIELD_OF_VIEW.DIAGONAL, 0.2, 10000);
        cmpCamera.pivot.translate(fc.Vector3.Y(1.7));
        cmpCamera.backgroundColor = fc.Color.CSS("darkblue");
        avatar.addComponent(cmpCamera);
        avatar.addComponent(new fc.ComponentTransform());
        avatar.mtxLocal.translate(fc.Vector3.Z(10));
        avatar.mtxLocal.rotate(fc.Vector3.Y(180));
        root.appendChild(avatar);
        let txtEnemy = new fc.TextureImage("textures/Hellknight_sprite.png");
        let mtrEnemy = new fc.Material("Enemy", fc.ShaderTexture, new fc.CoatTextured(null, txtEnemy));
        hellknight = new L09_Doom_Enemy.Enemy("Hell Knight", fc.Vector2.ONE(3), new fc.Vector3(0, 0, 0), new fc.Vector3(0, 0, 0), mtrEnemy);
        enemies.addComponent(new fc.ComponentTransform());
        enemies.appendChild(hellknight);
        root.appendChild(enemies);
        walls = createWalls();
        root.appendChild(walls);
        L09_Doom_Enemy.viewport = new fc.Viewport();
        L09_Doom_Enemy.viewport.initialize("Viewport", root, cmpCamera, canvas);
        L09_Doom_Enemy.viewport.draw();
        canvas.addEventListener("mousemove", hndMouse);
        canvas.addEventListener("click", canvas.requestPointerLock);
        fc.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 120);
        console.log(root.getChildren());
    }
    function hndLoop(_event) {
        ctrSpeed.setInput(fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.S, fc.KEYBOARD_CODE.ARROW_DOWN])
            + fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.W, fc.KEYBOARD_CODE.ARROW_UP]));
        ctrStrafe.setInput(fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.D, fc.KEYBOARD_CODE.ARROW_RIGHT])
            + fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.A, fc.KEYBOARD_CODE.ARROW_LEFT]));
        // hellknight.rotateToAvatar(avatar);
        // hellknight.moveTowardsAvatar(0.1);
        moveAvatar(ctrSpeed.getOutput(), ctrRotation.getOutput(), ctrStrafe.getOutput());
        ctrRotation.setInput(0);
        hndEnemy();
        L09_Doom_Enemy.viewport.draw();
    }
    function hndMouse(_event) {
        ctrRotation.setInput(_event.movementX);
    }
    function moveAvatar(_speed, _rotation, _strafe) {
        avatar.mtxLocal.rotateY(_rotation);
        let posOld = avatar.mtxLocal.translation;
        avatar.mtxLocal.translateZ(_speed);
        avatar.mtxLocal.translateX(_strafe);
        let bouncedOff = bounceOffWalls(walls.getChildren());
        if (bouncedOff.length < 2)
            return;
        bouncedOff = bounceOffWalls(bouncedOff);
        if (bouncedOff.length == 0)
            return;
        console.log("Stuck!");
        avatar.mtxLocal.translation = posOld;
    }
    function bounceOffWalls(_walls) {
        let bouncedOff = [];
        let posAvatar = avatar.mtxLocal.translation;
        for (let wall of _walls) {
            let posBounce = wall.calculateBounce(posAvatar, 1);
            if (posBounce) {
                avatar.mtxLocal.translation = posBounce;
                bouncedOff.push(wall);
            }
        }
        return bouncedOff;
    }
    function hndEnemy() {
        let tempPos = hellknight.mtxLocal.translation;
        let neartarget = true;
        hellknight.rotateToAvatar(avatar);
        for (let walls of root.getChildrenByName("Walls"))
            for (let wall of walls.getChildren()) {
                if (hellknight.isTargetbetween(avatar, wall)) {
                    neartarget = false;
                    break;
                }
            }
        if (hellknight.detectHit(avatar.mtxLocal.translation, 1)) {
            neartarget = false;
        }
        if (neartarget) {
            hellknight.moveTowardsAvatar(0.1);
            hndCollision(hellknight, tempPos, 0.8);
        }
    }
    function hndCollision(_target, _oldPos, _targetradius) {
        for (let walls of root.getChildrenByName("Walls"))
            for (let wall of walls.getChildren()) {
                if (wall.detectHit(_target.mtxWorld.translation, _targetradius)) {
                    _oldPos.x += wall.mtxLocal.getZ().x * 0.01;
                    _oldPos.z += wall.mtxLocal.getZ().z * 0.01;
                    _target.mtxLocal.translation = _oldPos;
                }
            }
    }
    function createWalls() {
        let walls = new fc.Node("Walls");
        let txtWall = new fc.TextureImage("textures/CEMPOIS.png");
        let mtrWall = new fc.Material("Wall", fc.ShaderTexture, new fc.CoatTextured(null, txtWall));
        for (let i = -numWalls / 2 + 0.5; i < numWalls / 2; i++) {
            walls.appendChild(new L09_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-numWalls / 2, 0.5, i), sizeWall), fc.Vector3.Y(90), mtrWall));
            // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
            walls.appendChild(new L09_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(numWalls / 2, 0.5, i), sizeWall), fc.Vector3.Y(-90), mtrWall));
            // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
            walls.appendChild(new L09_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(i, 0.5, -numWalls / 2), sizeWall), fc.Vector3.Y(0), mtrWall));
            // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
            walls.appendChild(new L09_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(i, 0.5, numWalls / 2), sizeWall), fc.Vector3.Y(180), mtrWall));
        }
        walls.appendChild(new L09_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-5, 0.5, .5), sizeWall), fc.Vector3.Y(90), mtrWall));
        walls.appendChild(new L09_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-5, 0.5, 1.5), sizeWall), fc.Vector3.Y(90), mtrWall));
        walls.appendChild(new L09_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-5, 0.5, 2.5), sizeWall), fc.Vector3.Y(90), mtrWall));
        walls.appendChild(new L09_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-5, 0.5, 3.5), sizeWall), fc.Vector3.Y(90), mtrWall));
        walls.appendChild(new L09_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-5, 0.5, .5), sizeWall), fc.Vector3.Y(90), mtrWall));
        walls.appendChild(new L09_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-5.5, 0.5, 0), sizeWall), fc.Vector3.Y(180), mtrWall));
        walls.appendChild(new L09_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-6.5, 0.5, 0), sizeWall), fc.Vector3.Y(180), mtrWall));
        walls.appendChild(new L09_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-7.5, 0.5, 0), sizeWall), fc.Vector3.Y(180), mtrWall));
        walls.appendChild(new L09_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-8.5, 0.5, 0), sizeWall), fc.Vector3.Y(180), mtrWall));
        walls.appendChild(new L09_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-9.5, 0.5, 0), sizeWall), fc.Vector3.Y(180), mtrWall));
        walls.appendChild(new L09_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-5.5, 0.5, 4), sizeWall), fc.Vector3.Y(0), mtrWall));
        walls.appendChild(new L09_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-6.5, 0.5, 4), sizeWall), fc.Vector3.Y(0), mtrWall));
        walls.appendChild(new L09_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-6.5, 0.5, 3.5), sizeWall), fc.Vector3.Y(180), mtrWall));
        walls.appendChild(new L09_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-7.5, 0.5, 4), sizeWall), fc.Vector3.Y(0), mtrWall));
        walls.appendChild(new L09_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-8.5, 0.5, 4), sizeWall), fc.Vector3.Y(0), mtrWall));
        walls.appendChild(new L09_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-9.5, 0.5, 4), sizeWall), fc.Vector3.Y(0), mtrWall));
        return walls;
    }
})(L09_Doom_Enemy || (L09_Doom_Enemy = {}));
//# sourceMappingURL=game.js.map