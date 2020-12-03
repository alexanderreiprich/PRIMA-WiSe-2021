namespace L11_Doom_HUD {

    import fc = FudgeCore;

    export class Hud {

        public static displayPosition(_position: fc.Vector3): void {
            let divPosition: HTMLDivElement = document.querySelector("div#position");
            divPosition.innerHTML = _position.toString();
        }

    }


}