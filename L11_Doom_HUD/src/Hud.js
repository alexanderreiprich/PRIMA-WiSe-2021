"use strict";
var L11_Doom_HUD;
(function (L11_Doom_HUD) {
    class Hud {
        static displayPosition(_position) {
            let divPosition = document.querySelector("div#position");
            divPosition.innerHTML = _position.toString();
        }
    }
    L11_Doom_HUD.Hud = Hud;
})(L11_Doom_HUD || (L11_Doom_HUD = {}));
//# sourceMappingURL=Hud.js.map