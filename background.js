//TO DO: TRY TO CONTAIN TIMER WITHIN BACKGROUND.JS FILE AND KEEP CONSTANT COMMUNICATION BETWEEN BACKGROUND.JS (EVERY SECOND) AND THE SCRIPT.JS FILES OF EACH TAB TO UPDATE DISPLAYED TIMERS.  THIS WILL KEEP DISPLAYED TIMERS IN-SYNC ACROSS TABS.


/*variable to be assigned to invocation of setInterval that starts the timer. Eventually will be used to allow user to manually stop timer by invoking clearInterval on 'timer'*/
let timer;
let tester = 0;                 //used to track time during testing
let secondsRemaining = 30 * 1;   //break time in seconds
const magic = 'ABRA CADABRA!'
//string representing formatted break time remaining to be sent to each tab
let countdownFormat; 

//array of tabs that have already been injected with script.js and styles.css
const injectedTabs = [];

console.log('hihihi')

/*Invoke 'callInjectAndRemovePopUps' to inject each open tab with script.js and styles.css, and remove any lingering popUp divs. Use setInterval to start break every X seconds. Set var 'breakTime' in local storage so it is accessible to all tabs, and assign it to 'true'. Use query method to select for all open chrome tabs and invoke function that iterates through each tab and invokes 'countdown', passing in id of tab. Outside foreach loop,  invoke 'runtimer' to set 'countdownFormat' and decrement it each second.*/
function startTimer() {
    chrome.storage.local.set({ breakTime: false });
    callInjectAndRemovePopUps();
    console.log('started!')
    // console.log(chrome, chrome.tabs)
    timer = setInterval(function () {
        chrome.storage.local.set({ breakTime: true });
        chrome.tabs.query({ }, function(tabs) {
            console.log('active', tabs)
            tabs.forEach(function (tab) {
                console.log(tab.id);
                countdown(tab.id);
            })
            runTimer();
        })
    }, 1 * 60 * 1000);
}


/*invoke setInterval method that iterates every second. On each iteration, convert 'seconds remaining' to formatted string, and decrement 'secondsRemaining' by 1. When 'secondsRemaining' is less than 0, reset 'secondsRemaining', set 'breakTime' to false, and invoke 'clearInterval' to stop the timer.*/
function runTimer() {
    const start = setInterval(() => {
        let minutes = Math.floor(secondsRemaining / 60);
        let remainingSec = secondsRemaining % 60;
        countdownFormat = `${minutes}:${remainingSec.toString().padStart(2,'0')}`;
        secondsRemaining--;
        if (secondsRemaining < 0) {
            secondsRemaining = 30 * 1;
            chrome.storage.local.set({ breakTime: false });
            clearInterval(start);
        }
    }, 1000)
}

/*accepts a tab id as parameter and invokes setInterval method that will send a message to the script.js file of the tab with the passed in id every second. This message will be the 'countdownFormat' string. When 'secondsRemaining' has a value of 0, reassign 'countdownFormat' and send message to tab one last time before invoking 'clearInterval'*/
function countdown(tabId) {
    const countdown = setInterval(() => {
        console.log('CDF', countdownFormat)
        chrome.tabs.sendMessage(tabId, countdownFormat);

        if (secondsRemaining <= 0) {
            setTimeout(() => {
                countdownFormat = 'TIMES UP!!!'
                chrome.tabs.sendMessage(tabId, countdownFormat);
                clearInterval(countdown);
            }, 500)
        }
    }, 1000);
}

/*Use query method to select for all open tabs and invoke foreach method to iterate through each tab. Invoke injectTabs on each tab to inject it with script.js and styles.css. Use 'then' method to send message to script.js of tab only after confirmation of injection.*/
function callInjectAndRemovePopUps() {
    chrome.tabs.query({ }, (tabs) => {
        tabs.forEach(tab => {
            console.log("TABBBBB", tab)
            injectTabs(tab)
                .then(() => chrome.tabs.sendMessage(tab.id, magic))
                .catch((error) => {
                    console.error('Error injecting content script:', error);
                });
        })
    })
}


/*take in 1 parameter which is a tab object. Return Promise that will inject script.js file and styles.css file into passed in 'tab' if that tab has not already been injected.*/
function injectTabs(tab) {
    return new Promise((resolve) => {
        if (!injectedTabs.includes(tab.id)) {
            injectedTabs.push(tab.id);
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["script.js"]
            },
            () => {
                console.log('content script injected and initialized')
                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    files: ['styles.css']
                },
                () => {
                    // Content script and CSS injected and initialized
                    console.log('CSS injected and initialized');
                    resolve();
                });
            });
        } else {
            resolve();
        }
    })
}

/*Listen for newly-focused tabs and, IF NOT ALREADY INJECTED: invoke 'injectTabs' to inject with script.js and styles.css, THEN, after confirmation of injection, IF 'breakTime' is true,  invoke 'countdown', passing in tab id. Outside of if condition, push tab id into 'injectedTabs' array*/
chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    console.log('activeInfo', activeInfo, 'tab', tab, tab.id)
    // if (!injectedTabs.includes(tab.id)) {
    injectTabs(tab)
        .then(() => {
            console.log('omg we made it!!!')
            chrome.storage.local.get('breakTime', function(result) {
                console.log('WAT. THERES MORE!?!!?')
                if (result.breakTime) {
                    console.log('RAAAAAAHHHHHHHHHHH')
                    countdown(tab.id)
                } else {
                    console.log('K?')
                    chrome.tabs.sendMessage(tab.id, magic);
                }
            })
            injectedTabs.push(tab.id);
        })     
})

//for testing
setInterval(() => {
    console.log(++tester, secondsRemaining)
}, 1000)

//invoke startTimer upon activation of extension 
startTimer();