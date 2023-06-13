//TO DO: TRY TO CONTAIN TIMER WITHIN BACKGROUND.JS FILE AND KEEP CONSTANT COMMUNICATION BETWEEN BACKGROUND.JS (EVERY SECOND) AND THE SCRIPT.JS FILES OF EACH TAB TO UPDATE DISPLAYED TIMERS.  THIS WILL KEEP DISPLAYED TIMERS IN-SYNC ACROSS TABS.


/*variable to be assigned to invocation of setInterval that starts the timer. Eventually will be used to allow user to manually stop timer by invoking clearInterval on 'timer'*/
let timer;
let tester = 0;                 //used to track time during testing
let secondsRemaining = 30 * 1;   //break time in seconds

//array of tabs that have already been injected with script.js and styles.css
const injectedTabs = [];

console.log('hihihi')

/*use setInterval to start break every X seconds. Set var 'breakTime' in local storage so it is accessible to all tabs, and assign it to 'true'. Invoke 'injectTabs'. Invoke setTimeout func that runs after 'secondsRemaining' seconds and resets the var 'secondsRemaining', and sets breakTime to 'false' in local storage.*/
function startTimer() {
    console.log('started!')
    timer = setInterval(function () {
        chrome.storage.local.set({ breakTime: true });
        injectTabs();
        setTimeout(function() {
            secondsRemaining = 30 * 1;
            chrome.storage.local.set({ breakTime: false });
        }, 1 * 30 * 1000);
    }, 1 * 60 * 1000);
}

/*not currently used. in progress function to contain countdown-to-be-displayed within background.js rather than script.js*/
function countdown() {
    let countDown = setInterval(() => {
        secondsRemaining--;
    }, 1000)
}

/*send message to script.js file of tab with the id 'tabId'. Message is 'secondsRemaining' converted to string*/
function sendMessageToScriptJS(tabId) {
    console.log('tabId', tabId, secondsRemaining.toString())
    chrome.tabs.sendMessage(tabId, secondsRemaining.toString());
}

/*iterate through each open tab and inject script.js file and styles.css file if not already injected, then invoke 'sendMessageToScriptJS', passing in id of current tab if 'breakTime' is set to true*/
function injectTabs() {
    chrome.tabs.query({ }, function(tabs) {
        console.log('active', tabs)
        tabs.forEach(function (tab) {
            console.log(tab.id);
            if (!injectedTabs.includes(tab.id)) {
                injectedTabs.push(tab.id);
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ["script.js"],
                }, function () {
                    console.log('content script injected and initialized')
                });
                chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    files: ['styles.css']
                }, () => {
                    // Content script and CSS injected and initialized
                    console.log('Content script and CSS injected and initialized');
                });
            }
            chrome.storage.local.get('breakTime', function(result) {
                console.log('result', result)
                if (result.breakTime) sendMessageToScriptJS(tab.id);
            })
        })
    })
}

/*Listen for newly-focused tabs and inject with script.js and styles.css if not already injected, then invoke 'sendMessageToScriptJS' if 'breakTime' is true. */
chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    console.log('activeInfo', activeInfo)
    if (!injectedTabs.includes(tab.id)) {
        console.log('not yet injected', tab.id, 'injected array:', injectedTabs)
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["script.js"] 
        }, function () {
            console.log('content script injected and initialized')
        });
        chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: ['styles.css']
        }, () => {
            // Content script and CSS injected and initialized
            console.log('Content script and CSS injected and initialized');
        });
        chrome.storage.local.get('breakTime', function(result) {
            if (result.breakTime) sendMessageToScriptJS(tabId);
        })
        injectedTabs.push(tab.id);
    }
});

//for testing
setInterval(() => {
    console.log(++tester)
}, 1000)

//invoke startTimer upon activation of extension
startTimer();