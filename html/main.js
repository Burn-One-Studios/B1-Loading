var track_name = document.querySelector("songname");
var track_artist = document.querySelector("songartist");

const playbtn = document.getElementById("playbtn");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const forward = document.getElementById("forward");
const back = document.getElementById("back");
var slider = document.getElementById("myRange");


var track_index = 0;
var isPlaying = false;

var curr_track = document.getElementById('music');

var track_list = [
    {
        name: "energetic-indie-rock-jump",
        artist: "AlexGrohl",
        path: "assets/music/AlexGrohl~energetic-indie-rock-jump.mp3",
    },
    {
        name: "action-protection",
        artist: "qubesounds",
        path: "assets/music/qubesounds~action-protection.mp3",
    },
    {
        name: "powerful-gym-rock.mp3",
        artist: "qubesounds",
        path: "assets/music/qubesounds~powerful-gym-rock.mp3",
    },
    {
        name: "inspiring-motivational-rock-inspire-mesenses",
        artist: "AlexGrohl",
        path: "assets/music/AlexGrohl~inspiring-motivational-rock-inspire-mesenses.mp3",
    },
];


function loadTrack(track_index) {

  // Load a new track
  curr_track.src = track_list[track_index].path;
  curr_track.load();
 
  // Update details of the track
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent =
     "PLAYING " + (track_index + 1) + " OF " + track_list.length;
 
 
 
  // Move to the next track if the current finishes playing
  // using the 'ended' event
  curr_track.addEventListener("ended", nextTrack);
 
  // Apply a random background color
  random_bg_color();
}
 
// Load the first track in the tracklist
loadTrack(track_index);

function playPause() {
  // Switch between playing and pausing
  // depending on the current state
  if (!isPlaying) playTrack();
  else pauseTrack();
}
 
function playTrack() {
  // Play the loaded track
  curr_track.play();
  isPlaying = true;
 
  // Replace icon with the pause icon
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  // Pause the loaded track
  curr_track.pause();
  isPlaying = false;
 
  // Replace icon with the play icon
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function forwardTrack() {
  // Go back to the first track if the
  // current one is the last in the track list
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
 
  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}

function backTrack() {
  // Go back to the last track if the
  // current one is the first in the track list
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length - 1;
   
  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}



music.volume = 0.2;
slider.oninput = function() {
    music.volume = this.value / 100;
} 

back.addEventListener('click', function() {
});

forward.addEventListener('click', function() {
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

// document.getElementById("something").textContent = 'new text';

