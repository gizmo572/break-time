let style1 = document.createElement('style');
style1.appendChild(document.createTextNode('.pop-up { background: blue; position: absolute; top: 0; width: 100vw; height: 100%; z-index: 9999; }'));
style1.appendChild(document.createTextNode('.pop-up-content { font-size: 100px; color: red; padding: 1em; }'))

document.head.appendChild(style1);



let popUp = document.createElement('div');
let popUpText = document.createElement('p');
popUpText.textContent = "TAKE A HIKE!!"
popUp.appendChild(popUpText);
popUp.classList.add('pop-up');
popUpText.classList.add('pop-up-content');
document.body.appendChild(popUp);