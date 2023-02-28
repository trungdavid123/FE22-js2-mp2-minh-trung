import update, { data } from "../main.js";


class Tamagotchi {
    #id1;
    #id2;

    constructor(name, type, hunger, happiness, deceased) {
        this.name = name;
        this.type = type;
        this.hunger = hunger;
        this.happiness = happiness
        this.deceased = deceased;
    }

    startTimer() {
        this.#id1 = setInterval(() => {
            --this.happiness;
            update();
            if (this.happiness <= 0) {
                this.stopTimer(this.#id1);
                this.stopTimer(this.#id2);
                this.death();
            }
        }, 1500);
        this.#id2 = setInterval(() => {
            --this.hunger;
            update();
            if (this.hunger <= 0) {
                this.stopTimer(this.#id2);
                this.stopTimer(this.#id1);
            }
        }, 3600);
    }

    stopTimer(id) {
        clearInterval(id);
    }

    death() {
        this.deceased = true;
        update();
        this.displayMessage(`Your pet: ${this.name} is DEATH`);
    }

    play(name) {
        data.map((pet) => {
            if (pet.name === name && pet.happiness < 10) {
                ++pet.happiness
                this.displayMessage(`Your pet: ${name} is happy. +1 happiness`);
            }
        })
    }

    feed(name) {
        data.map((pet) => {
            if (pet.name === name && pet.hunger < 10) {
                ++pet.hunger
                this.displayMessage(`Your pet: ${name} is satisfied. +1 hunger`);
            }
        })
    }

    displayMessage(message) {
        const infoContainer = document.querySelector('.info');
        let infoMess = document.createElement('h2');
        infoMess.innerText = `${message}`;
        infoContainer.append(infoMess);
        setTimeout(() => {
            infoMess.remove();
        }, 2000);
    }

}

export { Tamagotchi };



// Focus on GUI
// Construction is important OOP
// Clear Interval after starting Timer
// Build with a picture, spell... 