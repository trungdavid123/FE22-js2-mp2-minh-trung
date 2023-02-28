const container = document.querySelector('.pet-list');


class Tamagotchi1 {

    #time;
    #data = [];

    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.isTimeExits = false;
        this.fadeOut = false;
    }

    addTamagotchi(name, type) {
        let isPetsExits = this.#data.some(el => el.name === name);

        if (!isPetsExits) {
            this.#data.push({
                name,
                type,
                deceased: false,
                hunger: 10,
                happiness: 10
            });
        }
    }

    insertEventListner(element, eventListner) {
        element.addEventListener(eventListner, (e) => {
            let checkBtn = e.target.parentNode.parentNode.firstChild.nextSibling.textContent;

            const infoContainer = document.querySelector('.info');


            if (e.target.classList[0] === "feed-btn") {
                this.#data.map((pet) => {
                    if (pet.hunger < 10 && checkBtn === pet.name) {

                        let infoMess = document.createElement('h2');
                        infoMess.innerText = `You feed ${pet.name}, +1 hunger`;

                        infoContainer.append(infoMess);

                        ++pet.hunger;
                        this.update();

                        setTimeout(() => {
                            infoMess.remove();
                        }, 1000)
                    }
                })
            } else {
                this.#data.map((pet) => {
                    if (pet.happiness < 10 && checkBtn === pet.name) {
                        let infoMess = document.createElement('h2');
                        infoMess.innerText = `You play with ${pet.name}, +1 happiness`;

                        infoContainer.append(infoMess);
                        ++pet.happiness;
                        this.update();

                        setTimeout(() => {
                            infoMess.remove();
                        }, 1000)

                    }
                })
            }

        })
    }

    passingTime() {
        this.#time = setInterval(() => {
            for (let object of this.#data) {

                setTimeout(() => {
                    --object.hunger
                }, 5600);

                --object.happiness;

                if (object.happiness <= 0 || object.hunger <= 0) {

                    object.deceased = true

                    console.log(object.deceased)

                    if (object.deceased) {
                        const infoContainer = document.querySelector('.info');

                        let infoMess = document.createElement('h2');
                        infoMess.innerText = `Your pet: ${object.name} is DEATH`;

                        infoContainer.append(infoMess);

                        setTimeout(() => {
                            infoMess.remove();
                        }, 1000)
                        this.fadeOut = true;
                    }

                    setTimeout(() => {
                        this.#data = this.#data.filter(el => !el.deceased);
                        this.update();
                        this.fadeOut = false;
                    }, 2000)
                }
            }
            this.update();
        }, 3600);
    }

    update() {
        container.innerHTML = "";
        this.#data.map((pet) => {

            let el =
                `<div class="pet-box ${pet.deceased && "fade-out"}">
                <h1>${pet.name}</h1>
                <h3>${pet.type}</h3>
                <p>Hunger Level: ${pet.hunger}</p>
                <p>Hapiness Level: ${pet.happiness}</p>
                <div class="btn-list">
                    <button type="button" class="feed-btn">Feed</button>
                    <button type="button" class="play-btn">Play</button>
                </div>
            </div>`;

            container.innerHTML += el;
        })

        let btnList = document.querySelectorAll('.btn-list button');
        Array.from(btnList).forEach(element => {
            this.insertEventListner(element, "click");
        });
    }

    // feed(){

    // }
    // play(){

    // }
    // startTimer(){

    // }

    // dead(){

    // }
}




export { Tamagotchi }

