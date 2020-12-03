"use strict";
var L11_Doom_HUD;
(function (L11_Doom_HUD) {
    var fc = FudgeCore;
    var fcaid = FudgeAid;
    window.addEventListener("load", hndLoad);
    const clrWhite = fc.Color.CSS("white");
    const sizeWall = 3;
    const numWalls = 20;
    L11_Doom_HUD.avatar = new fc.Node("Avatar");
    let root = new fc.Node("Root");
    let walls;
    let enemies;
    let ctrSpeed = new fc.Control("AvatarSpeed", 0.3, 0 /* PROPORTIONAL */);
    ctrSpeed.setDelay(100);
    let ctrStrafe = new fc.Control("AvatarSpeed", 0.2, 0 /* PROPORTIONAL */);
    ctrStrafe.setDelay(100);
    let ctrRotation = new fc.Control("AvatarRotation", -0.3, 0 /* PROPORTIONAL */);
    ctrRotation.setDelay(100);
    async function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        let meshQuad = new fc.MeshQuad("Quad");
        let txtFloor = new fc.TextureImage("textures/DEM1_5.png");
        let mtrFloor = new fc.Material("Floor", fc.ShaderTexture, new fc.CoatTextured(clrWhite, txtFloor));
        let floor = new fcaid.Node("Floor", fc.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
        floor.mtxLocal.scale(fc.Vector3.ONE(sizeWall * numWalls));
        floor.getComponent(fc.ComponentMaterial).pivot.scale(fc.Vector2.ONE(numWalls));
        root.appendChild(floor);
        let cmpCamera = new fc.ComponentCamera();
        cmpCamera.projectCentral(1, 45, fc.FIELD_OF_VIEW.DIAGONAL, 0.2, 10000);
        cmpCamera.pivot.translate(fc.Vector3.Y(1.7));
        cmpCamera.backgroundColor = fc.Color.CSS("darkblue");
        L11_Doom_HUD.avatar.addComponent(cmpCamera);
        L11_Doom_HUD.avatar.addComponent(new fc.ComponentTransform());
        L11_Doom_HUD.avatar.mtxLocal.translate(fc.Vector3.Z(10));
        L11_Doom_HUD.avatar.mtxLocal.rotate(fc.Vector3.Y(180));
        root.appendChild(L11_Doom_HUD.avatar);
        enemies = await createEnemies();
        root.appendChild(enemies);
        walls = createWalls();
        root.appendChild(walls);
        L11_Doom_HUD.viewport = new fc.Viewport();
        L11_Doom_HUD.viewport.initialize("Viewport", root, cmpCamera, canvas);
        L11_Doom_HUD.viewport.draw();
        canvas.addEventListener("mousemove", hndMouse);
        canvas.addEventListener("click", canvas.requestPointerLock);
        fc.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 120);
        // console.log(root.getChildren());
    }
    function hndLoop(_event) {
        ctrSpeed.setInput(fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.S, fc.KEYBOARD_CODE.ARROW_DOWN])
            + fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.W, fc.KEYBOARD_CODE.ARROW_UP]));
        ctrStrafe.setInput(fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.D, fc.KEYBOARD_CODE.ARROW_RIGHT])
            + fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.A, fc.KEYBOARD_CODE.ARROW_LEFT]));
        moveAvatar(ctrSpeed.getOutput(), ctrRotation.getOutput(), ctrStrafe.getOutput());
        ctrRotation.setInput(0);
        for (let enemy of enemies.getChildren())
            enemy.update();
        //hndEnemy();
        L11_Doom_HUD.viewport.draw();
    }
    function hndMouse(_event) {
        ctrRotation.setInput(_event.movementX);
    }
    function moveAvatar(_speed, _rotation, _strafe) {
        L11_Doom_HUD.avatar.mtxLocal.rotateY(_rotation);
        let posOld = L11_Doom_HUD.avatar.mtxLocal.translation;
        L11_Doom_HUD.avatar.mtxLocal.translateZ(_speed);
        L11_Doom_HUD.avatar.mtxLocal.translateX(_strafe);
        L11_Doom_HUD.Hud.displayPosition(posOld);
        let bouncedOff = bounceOffWalls(walls.getChildren());
        if (bouncedOff.length < 2) {
            return;
        }
        bouncedOff = bounceOffWalls(bouncedOff);
        if (bouncedOff.length == 0) {
            return;
        }
        L11_Doom_HUD.avatar.mtxLocal.translation = posOld;
    }
    function bounceOffWalls(_walls) {
        let bouncedOff = [];
        let posAvatar = L11_Doom_HUD.avatar.mtxLocal.translation;
        for (let wall of _walls) {
            let posBounce = wall.calculateBounce(posAvatar, 1);
            if (posBounce) {
                L11_Doom_HUD.avatar.mtxLocal.translation = posBounce;
                bouncedOff.push(wall);
            }
        }
        return bouncedOff;
    }
    async function createEnemies() {
        let enemies = new fc.Node("Enemies");
        let txtHellknight = new fc.TextureImage();
        await txtHellknight.load("textures/hellknight_spritesheet.png");
        let coatSprite = new fc.CoatTextured(clrWhite, txtHellknight);
        L11_Doom_HUD.Enemy.generateSprites(coatSprite);
        enemies.appendChild(new L11_Doom_HUD.Enemy("Hellknight0", new fc.Vector3(0, 0, 0)));
        /*     enemies.appendChild(new Enemy("Hellknight1", new fc.Vector3(3, 0, 0)));
            enemies.appendChild(new Enemy("Hellknight2", new fc.Vector3(0, 0, 3))); */
        // console.log("Enemies", enemies);
        return enemies;
    }
    function createWalls() {
        let walls = new fc.Node("Walls");
        let txtWall = new fc.TextureImage("textures/CEMPOIS.png");
        let mtrWall = new fc.Material("Wall", fc.ShaderTexture, new fc.CoatTextured(clrWhite, txtWall));
        for (let i = -numWalls / 2 + 0.5; i < numWalls / 2; i++) {
            walls.appendChild(new L11_Doom_HUD.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-numWalls / 2, 0.5, i), sizeWall), fc.Vector3.Y(90), mtrWall));
            // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
            walls.appendChild(new L11_Doom_HUD.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(numWalls / 2, 0.5, i), sizeWall), fc.Vector3.Y(-90), mtrWall));
            // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
            walls.appendChild(new L11_Doom_HUD.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(i, 0.5, -numWalls / 2), sizeWall), fc.Vector3.Y(0), mtrWall));
            // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
            walls.appendChild(new L11_Doom_HUD.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(i, 0.5, numWalls / 2), sizeWall), fc.Vector3.Y(180), mtrWall));
        }
        walls.appendChild(new L11_Doom_HUD.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-5, 0.5, .5), sizeWall), fc.Vector3.Y(90), mtrWall));
        walls.appendChild(new L11_Doom_HUD.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-5, 0.5, 1.5), sizeWall), fc.Vector3.Y(90), mtrWall));
        walls.appendChild(new L11_Doom_HUD.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-5, 0.5, 2.5), sizeWall), fc.Vector3.Y(90), mtrWall));
        walls.appendChild(new L11_Doom_HUD.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-5, 0.5, 3.5), sizeWall), fc.Vector3.Y(90), mtrWall));
        walls.appendChild(new L11_Doom_HUD.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-5, 0.5, .5), sizeWall), fc.Vector3.Y(90), mtrWall));
        walls.appendChild(new L11_Doom_HUD.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-5.5, 0.5, 0), sizeWall), fc.Vector3.Y(180), mtrWall));
        walls.appendChild(new L11_Doom_HUD.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-6.5, 0.5, 0), sizeWall), fc.Vector3.Y(180), mtrWall));
        walls.appendChild(new L11_Doom_HUD.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-7.5, 0.5, 0), sizeWall), fc.Vector3.Y(180), mtrWall));
        walls.appendChild(new L11_Doom_HUD.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-8.5, 0.5, 0), sizeWall), fc.Vector3.Y(180), mtrWall));
        walls.appendChild(new L11_Doom_HUD.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-9.5, 0.5, 0), sizeWall), fc.Vector3.Y(180), mtrWall));
        walls.appendChild(new L11_Doom_HUD.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-5.5, 0.5, 4), sizeWall), fc.Vector3.Y(0), mtrWall));
        walls.appendChild(new L11_Doom_HUD.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-6.5, 0.5, 4), sizeWall), fc.Vector3.Y(0), mtrWall));
        walls.appendChild(new L11_Doom_HUD.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-6.5, 0.5, 3.5), sizeWall), fc.Vector3.Y(180), mtrWall));
        walls.appendChild(new L11_Doom_HUD.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-7.5, 0.5, 4), sizeWall), fc.Vector3.Y(0), mtrWall));
        walls.appendChild(new L11_Doom_HUD.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-8.5, 0.5, 4), sizeWall), fc.Vector3.Y(0), mtrWall));
        walls.appendChild(new L11_Doom_HUD.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-9.5, 0.5, 4), sizeWall), fc.Vector3.Y(0), mtrWall));
        return walls;
    }
})(L11_Doom_HUD || (L11_Doom_HUD = {}));
//# sourceMappingURL=game.js.map