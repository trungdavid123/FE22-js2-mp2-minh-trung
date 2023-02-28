import { Tamagotchi } from "./modules/tamagotchi.js";
export let data = [];

const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.pet-list');
const nameInput = document.querySelector('input');
let selection = document.querySelector('select');
let name = "";
let typeOfPet = "";

function removeSpaces(string) {
    return string.split(' ').join('');
}

function insertEventListner(element, event, type) {
    element.addEventListener(event, (e) => {
        e.preventDefault();
        let tamagotchi = new Tamagotchi(name, typeOfPet, 10, 10, false);
        let checkBtn = e.target.parentNode.parentNode.firstChild.nextSibling.textContent;

        switch (type) {
            case 'addTamagotchi':
                let isPetsExits = data.some(el => el.name === name);
                if (!isPetsExits) {
                    data.push(tamagotchi);
                    tamagotchi.startTimer();
                    update();
                }
                break;
            case 'updateName':
                name = removeSpaces(e.target.value);
                break;
            case 'handlePet':
                if (e.target.classList[0] === "play-btn") {
                    tamagotchi.play(checkBtn);
                    update();
                } else {
                    tamagotchi.feed(checkBtn);
                    update();
                }
                break;
            case 'select':
                typeOfPet = selection.options[selection.selectedIndex].value;
            default:
                return;
        }
    })
};


export default function update() {
    container.innerHTML = "";

    data.map((pet) => {
        let el =
            `<div class="pet-box">
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

        if (document.querySelector('.pet-box') && pet.deceased) {
            data = data.filter((obj) => !obj.deceased);
            setTimeout(() => {
                document.querySelector('.pet-box').classList.add('fade-out');
            }, 0);
        }
    })

    let btnList = document.querySelectorAll('.btn-list button');
    Array.from(btnList).forEach(element => {
        insertEventListner(element, "click", "handlePet");
    });

}

insertEventListner(submitBtn, 'click', 'addTamagotchi');
insertEventListner(nameInput, 'change', 'updateName');
insertEventListner(selection, 'change', 'select');







// When a user change the value of name 