
var count = 0;
var thisCount = 0;

var play = false;
var myAudio = document.getElementById("music");

myAudio.volume = 0.1;

function onKeyDown(event) {
    switch (event.keyCode) {
        case 32: // Spacebar
            if (play) {
                myAudio.pause();
                play = false;
            } else {
                myAudio.play();
                play = true;
            }
            break;
    }
    return false;
}

window.addEventListener("keydown", onKeyDown, false);

const handlers = {
    startInitFunctionOrder(data) {
        count = data.count;
    },

    initFunctionInvoking(data) {
        document.querySelector('.progressbar').style.left = '0%';
        document.querySelector('.progressbar').style.width =
            (data.idx / count) * 100 + '%';
    },

    startDataFileEntries(data) {
        count = data.count;
    },

    performMapLoadFunction(data) {
        ++thisCount;
        document.querySelector('.progressbar').style.left = '0%';
        document.querySelector('.progressbar').style.width =
            (thisCount / count) * 100 + '%';
    },
};

window.addEventListener('message', function (e) {
    (handlers[e.data.eventName] || function () { })(e.data);
});