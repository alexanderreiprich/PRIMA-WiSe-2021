"use strict";
var L11_Doom_HUD;
(function (L11_Doom_HUD) {
    let maxHealth = 100;
    let maxAmmo = 30;
    let currentAmmo = maxAmmo;
    let currentHealth = currentAmmo;
    class Hud {
        static displayPosition(_position) {
            let divPosition = document.querySelector("div#position");
            divPosition.innerHTML = _position.toString();
        }
        static displayHealthAndAmmo() {
            let divHealth = document.querySelector("div#health");
            let divAmmo = document.querySelector("div#ammo");
            divHealth.innerHTML = maxHealth.toString();
            divAmmo.innerHTML = maxAmmo.toString() + "/" + maxAmmo.toString();
        }
        static updateDisplay() {
            let divHealth = document.querySelector("div#health");
            let divAmmo = document.querySelector("div#ammo");
            divHealth.innerHTML = currentHealth.toString();
            divAmmo.innerHTML = currentAmmo.toString() + "/" + maxAmmo.toString();
        }
        static shootGun() {
            console.log(currentAmmo);
            if (currentAmmo > 0) {
                currentAmmo--;
            }
        }
        static reloadGun() {
            if (currentAmmo != maxAmmo)
                currentAmmo = maxAmmo;
        }
    }
    L11_Doom_HUD.Hud = Hud;
})(L11_Doom_HUD || (L11_Doom_HUD = {}));
//# sourceMappingURL=Hud.js.map