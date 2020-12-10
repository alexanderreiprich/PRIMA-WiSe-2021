namespace L11_Doom_HUD {

    import fc = FudgeCore;

    let maxHealth: number = 100;
    let maxAmmo: number = 30;

    let currentAmmo: number = maxAmmo;
    let currentHealth: number = maxHealth;

    

    export class Hud {

        public static displayPosition(_position: fc.Vector3): void {
            let divPosition: HTMLDivElement = document.querySelector("div#position");
            divPosition.innerHTML = _position.toString();
        }
    
        public static displayHealthAndAmmo(): void {

            let divHealth: HTMLDivElement = document.querySelector("div#health");
            let divAmmo: HTMLDivElement = document.querySelector("div#ammo");

            divHealth.innerHTML = maxHealth.toString();
            divAmmo.innerHTML = maxAmmo.toString() + "/" + maxAmmo.toString();

        }

        public static updateDisplay(): void {
            let divHealth: HTMLDivElement = document.querySelector("div#health");
            let divAmmo: HTMLDivElement = document.querySelector("div#ammo");

            divHealth.innerHTML = "HEALTH " + currentHealth.toString();
            divAmmo.innerHTML = "AMMO " + currentAmmo.toString() + "/" + maxAmmo.toString();

        }

        public static shootGun(): void {

            if (currentAmmo > 0) 
                currentAmmo--;
            
        }

        public static reloadGun(): void {

            if (currentAmmo != maxAmmo)
                currentAmmo = maxAmmo;
            
        }

    }


}