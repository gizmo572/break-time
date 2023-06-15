/*Add initial text content to popup display before countdown start. select message/background-image pair at index 'randomIndex' and set them to be displayed.*/
function displaySetUp() {
    timer.textContent = 'GOGOGO!!!'
    popUpText.textContent = randomDisplay[randomIndex][0];
    popUp.style.backgroundImage = randomDisplay[randomIndex.toString()][1];
}

/*Set initial display for when the extension is initially activated*/
//CURRENTLY NOT USED//
function initialDisplay() {
    timer.textContent = "45 MINS TO BREAK";
    popUpText.textContent = "TIMER ACTIVATED!";
    popUp.style.backgroundImage = randomDisplay[0][1];
}

/*return a new Promise object that fetches the 'randomDisplayIndex' variable from local storage and reassigns 'randomIndex' to the value of this retreived variable before resolving.*/
function fetchRandomIndex() {
    return new Promise((resolve) => {
        chrome.storage.local.get('randomDisplayIndex', (result) => {
            randomIndex = result.randomDisplayIndex;
        })
        resolve();
    })
}

/*invoke querySelectorAll method to select for all divs with the 'pop-up' class, and remove all of them. (There shouldn't be more than 1 pop-up div; selecting for multiple is a fail-safe.)*/
function removeAllPopUps() {
    console.log('hi?')
    document.querySelectorAll('.pop-up').forEach(div => {
        console.log('removed')
        div.remove();
    })
}


/*Listen for 'message' from the background.js. Upon receiving message, check for conditions extension activation or the beginning of a break time. If so, invoke removeAllPopUps, then check for condition indicating the beginning of break-time. If so, invoke fetchRandomIndex, THEN, after randomIndex has been retrieved, invoke 'displaySetup' to finish setting up display, and append 'popUp' div to body of DOM.
Reassign displayed timer to the element at index 0 of passed in message. Remove popUp div if the element at index 2 of message indicates that break-time is over.*/
chrome.runtime.onMessage.addListener(function (message) {
    console.log('message', message, timer.textContent)
    if (message[1]) {
        console.log(message,'popUp', popUp);
        removeAllPopUps();
        if (message[1] !== 'INJECT') {
            fetchRandomIndex()
                .then(() => {
                displaySetUp();
                document.body.appendChild(popUp);
                })
        }
    }
    timer.textContent = message[0];

    if (message[2]) removeAllPopUps();
});



/*object containing message/background-image pairs to be displayed. organized to allow for pairs to be randomly selected easily.*/
const randomDisplay = {
    0: ["TAKE A HIKE!!", "url('https://images.unsplash.com/photo-1491609154219-ffd3ffafd992?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"],
    1: ["DO PUSH-UPS!!", "url('https://images.unsplash.com/photo-1599744331048-d58b430fb098?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1076&q=80')"],
    2: ["MEDITATE.", "url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=799&q=80')"],
    3: ["PHONE-A-FRIEND!", "url('https://images.unsplash.com/photo-1525182008055-f88b95ff7980?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"]
}


let randomIndex = 0     //default value


/*declare vars assigned to various html tags, then structure them together so they are all contained within the 'popUp' div*/
let popUp = document.createElement('div');
let popUpBox = document.createElement('div');
let popUpText = document.createElement('p');
let timer = document.createElement('span');
popUp.appendChild(popUpBox);
popUpBox.appendChild(popUpText);
popUpBox.appendChild(timer);

/*add appropriate class to each tag*/
popUp.classList.add('pop-up');
popUpBox.classList.add('pop-up-box');
popUpText.classList.add('pop-up-content');
timer.classList.add('timer');


console.log('popUp', popUp)