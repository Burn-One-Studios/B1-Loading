var track_name = document.getElementById("changesong");
var track_artist = document.getElementById("changeartist");

const playbtn = document.getElementById("playbtn");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const forward = document.getElementById("forward");
const back = document.getElementById("back");
var slider = document.getElementById("myRange");


var player = document.getElementById("music"); // Get Audio Element

var lastSong = null;
var selection = null;

var playlist = [
    {
        name: "rock-jump",
        artist: "AlexGrohl",
        path: "assets/music/AlexGrohl~energetic-indie-rock-jump.mp3",
    },
    {
        name: "action-protection",
        artist: "qubesounds",
        path: "assets/music/qubesounds~action-protection.mp3",
    },
    {
        name: "powerful-gym-rock",
        artist: "qubesounds",
        path: "assets/music/qubesounds~powerful-gym-rock.mp3",
    },
    {
        name: "motivational-rock",
        artist: "AlexGrohl",
        path: "assets/music/AlexGrohl~inspiring-motivational-rock-inspire-mesenses.mp3",
    },
];


player.autoplay=true;
player.addEventListener("ended", selectRandom); // Run function when song ends

function selectRandom(){
    while(selection == lastSong){ // Repeat until different song is selected
        selection = Math.floor(Math.random() * playlist.length);
    }
    lastSong = selection; // Remember last song
    player.src = playlist[selection].path;
    track_name.innerHTML = playlist[selection].name;
    track_artist.innerHTML = playlist[selection].artist;

}

selectRandom(); // Select initial song
player.play(); // Start Song


music.volume = 0.2;
slider.oninput = function() {
    music.volume = this.value / 100;
} 

function playPause() {
  return player.paused ? player.play() : player.pause();
};

playbtn.addEventListener('click', function() {
    playPause();
    console.log("play clicked")
});

back.addEventListener('click', function() {
    player.currentTime = 0;
    player.play();
    console.log("started over");
});

forward.addEventListener('click', function() {
    selectRandom();
    player.play();
});

var count = 0;
var thisCount = 0;

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


