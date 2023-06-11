function runTimer() {
    let content = document.querySelector('div.timer');
    let seconds = 1 * 60;
    const intervalID2 = setInterval(() => {
        let minutes = Math.floor(seconds / 60);
        let remainingSec = seconds % 60;
        // console.log(remainingSec.toString().padStart(2, '0'))
        content.textContent = `${minutes}:${remainingSec.toString().padStart(2,'0')}`;

        if (seconds === 0) {
            content.textContent = 'TIMES UP!!!'
            clearInterval(intervalID2);
        } else seconds--;

    }, 1000);
}




let popUp = document.createElement('div');
let popUpText = document.createElement('p');
let timer = document.createElement('div');
popUpText.textContent = "TAKE A HIKE!!"
popUp.appendChild(popUpText);
popUp.appendChild(timer);


popUp.classList.add('pop-up');
popUpText.classList.add('pop-up-content');
timer.classList.add('timer');
console.log(popUp)
setInterval(() => {

    document.body.appendChild(popUp);
    
    runTimer();

    setTimeout(() => {
        popUp.remove();
    },64000)

}, 10000);