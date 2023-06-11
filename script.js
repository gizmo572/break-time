let style1 = document.createElement('style');

style1.appendChild(document.createTextNode('.pop-up { background: blue; position: fixed; top: 0; width: 100vw; height: 100%; z-index: 9999; }'));
style1.appendChild(document.createTextNode('.pop-up-content { font-size: 100px; color: red; padding: 1em 1em 0 1em; }'))
style1.appendChild(document.createTextNode('.timer { font-size: 150px; color: white; padding: 0 0 1em 2em; } '))
document.head.appendChild(style1);



let popUp = document.createElement('div');
let popUpText = document.createElement('p');
let timer = document.createElement('div');

popUpText.textContent = "TAKE A HIKE!!"
popUp.appendChild(popUpText);
popUp.appendChild(timer);
popUp.classList.add('pop-up');
popUpText.classList.add('pop-up-content');
timer.classList.add('timer');
document.body.appendChild(popUp);


function runTimer() {
    let content = document.querySelector('div.timer');
    let seconds = 5 * 60;
    const intervalID = setInterval(() => {
    const minutes = Math.floor(seconds / 60);
    const remainingSec = seconds % 60;
    console.log(remainingSec.toString().padStart(2, '0'))
    content.textContent =  `${minutes}:${remainingSec.toString().padStart(2,'0')}`;

    if (seconds === 0) {
        content.textContent = 'TIMES UP!!!'
        clearInterval(intervalID);
    } else seconds--;

    }, 1000);
}

runTimer();