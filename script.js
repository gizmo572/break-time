function runTimer() {
    let content = document.querySelector('span.timer');
    let seconds = 1 * 10;
    const intervalID2 = setInterval(() => {
        let minutes = Math.floor(seconds / 60);
        let remainingSec = seconds % 60;
        content.textContent = `${minutes}:${remainingSec.toString().padStart(2,'0')}`;

        if (seconds === 0) {
            content.textContent = 'TIMES UP!!!'
            clearInterval(intervalID2);
        } else seconds--;

    }, 1000);
}

function displaySetUp() {
    timer.textContent = 'GOGOGO!!!'
    let displayIndex = Math.floor(Math.random() * 4);
    popUpText.textContent = randomDisplay[displayIndex][0];
    popUp.style.backgroundImage = randomDisplay[displayIndex.toString()][1];
}

function initialDisplay() {
    timer.textContent = "45 MINS TO BREAK";
    popUpText.textContent = "TIMER ACTIVATED!";
    popUp.style.backgroundImage = randomDisplay[0][1];
}


const randomDisplay = {
    0: ["TAKE A HIKE!!", "url('https://images.unsplash.com/photo-1491609154219-ffd3ffafd992?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"],
    1: ["DO PUSH-UPS!!", "url('https://images.unsplash.com/photo-1599744331048-d58b430fb098?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1076&q=80')"],
    2: ["MEDITATE.", "url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=799&q=80')"],
    3: ["PHONE-A-FRIEND!", "url('https://images.unsplash.com/photo-1525182008055-f88b95ff7980?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"]
}

let popUp = document.createElement('div');
let popUpBox = document.createElement('div');
let popUpText = document.createElement('p');
let timer = document.createElement('span');
popUp.appendChild(popUpBox);
popUpBox.appendChild(popUpText);
popUpBox.appendChild(timer);


popUp.classList.add('pop-up');
popUpBox.classList.add('pop-up-box');
popUpText.classList.add('pop-up-content');
timer.classList.add('timer');
// displaySetUp();
initialDisplay();
console.log(popUp)
document.body.appendChild(popUp);
// runTimer();
setTimeout(() => popUp.remove(), 14000)
setInterval(() => {

    document.body.appendChild(popUp);
    
    runTimer();

    setTimeout(() => {
        popUp.remove();
        displaySetUp();
    },14000)

}, 60000);