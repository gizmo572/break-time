
/*Accept 1 number parameter 'breakRemaining' that comes from 'background.js' and is the total length of the break in seconds. Set up break timer to be displayed and use setInterval method to adjust display every 1 second. Once breakRemaining is 0, popup display is removed and clearInterval method is used to clear setInterval.*/

function runTimer(breakRemaining) {
    let content = document.querySelector('span.timer');
    const intervalID = setInterval(() => {
        let minutes = Math.floor(breakRemaining / 60);
        let remainingSec = breakRemaining % 60;
        content.textContent = `${minutes}:${remainingSec.toString().padStart(2,'0')}`;

        if (breakRemaining <= 0) {
            content.textContent = 'TIMES UP!!!'
            setTimeout(() => {
                console.log('removed!');
                popUp.remove()
            }, 2000);
            clearInterval(intervalID);
        } else {
            breakRemaining--;
            console.log(breakRemaining, content.textContent)
        }
    }, 1000);
}

/*Add initial text content to popup display before countdown start. select random message/background-image pair and set them to be displayed.*/
function displaySetUp() {
    timer.textContent = 'GOGOGO!!!'
    let displayIndex = Math.floor(Math.random() * 4);
    popUpText.textContent = randomDisplay[displayIndex][0];
    popUp.style.backgroundImage = randomDisplay[displayIndex.toString()][1];
}

/*Set initial display for when the extension is initially activated*/
//CURRENTLY NOT USED//
function initialDisplay() {
    timer.textContent = "45 MINS TO BREAK";
    popUpText.textContent = "TIMER ACTIVATED!";
    popUp.style.backgroundImage = randomDisplay[0][1];
}


/*Listen for 'message' from the background.js. Upon receiving message, invoke function to finish setting up display, append popUp div to body of DOM, and invoke 'runTimer' func, passing in the 'message' converted to an integer, to start the countdown.*/
chrome.runtime.onMessage.addListener(function (message) {
    console.log('message', message, typeof message)
    if (message) {
        console.log('popUp', popUp);
        displaySetUp();
        document.body.appendChild(popUp);
        runTimer(Number(message))
        // setTimeout(() => {
        //     runTimer(Number(message));
        // }, 1000)
    }
});


/*object containing message/background-image pairs to be displayed. organized to allow for pairs to be randomly selected easily.*/
const randomDisplay = {
    0: ["TAKE A HIKE!!", "url('https://images.unsplash.com/photo-1491609154219-ffd3ffafd992?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"],
    1: ["DO PUSH-UPS!!", "url('https://images.unsplash.com/photo-1599744331048-d58b430fb098?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1076&q=80')"],
    2: ["MEDITATE.", "url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=799&q=80')"],
    3: ["PHONE-A-FRIEND!", "url('https://images.unsplash.com/photo-1525182008055-f88b95ff7980?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"]
}


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