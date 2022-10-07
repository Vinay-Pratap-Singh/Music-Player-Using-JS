let title = document.querySelector(".music-title"),
  description = document.querySelector(".music-description"),
  image = document.querySelector(".music-img"),
  songSlider = document.querySelector(".song-slider"),
  volumeSlider = document.querySelector(".volume-slider"),
  currentTime = document.querySelector(".current-time");
(totalTime = document.querySelector(".total-time")),
  (playBtn = document.querySelector(".fa-play")),
  (pauseBtn = document.querySelector(".fa-pause"));

//  index to play and change song
let index = 0,
  isPlaying = false,
  currentSongTime = 0;

// creating the music and setting it's attribute
let music = document.createElement("audio");
music.setAttribute("src", `./music/music${index + 1}.mp3`);

// function to play the song
function playSong() {
  if (!isPlaying) {
    if (currentSongTime != 0) {
      music.currentTime = currentSongTime;
      music.play();
    } else {
      music.load();
      music.play();
    }
    isPlaying = true;
    playBtn.style.display = "none";
    pauseBtn.style.display = "block";
  } else {
    music.pause();
    isPlaying = false;
    playBtn.style.display = "block";
    pauseBtn.style.display = "none";
  }
  updateDetails();
}

// play next song
function nextSong() {
  if (index == 4) {
    index = 0;
  } else {
    index++;
  }

  currentSongTime = 0;
  music.src = `./music/music${index + 1}.mp3`;
  isPlaying = false;
  updateDetails();
  playSong();
}

// play previous song
function prevSong() {
  if (index == 0) {
    index = 4;
  } else {
    index--;
  }

  currentSongTime = 0;
  music.src = `./music/music${index + 1}.mp3`;
  isPlaying = false;
  updateDetails();
  playSong();
}

// updating the title, description and other details
function updateDetails() {
  title.innerText = details.title[index];
  description.innerHTML = `Writer: ${details.writer[index]}<br>Singer: ${details.singer[index]}`;
  image.src = `./image/img${index + 1}.jpg`;
  music.onloadeddata = () => {
    let musicLength = Math.floor(music.duration);
    let min = 0;
    let sec = 0;
    // converting the time in minute and second
    min = Math.floor(musicLength / 60);
    sec = Math.floor(musicLength % 60);

    // converting the time in two  digit number
    if (min < 10) {
      min = "0" + min;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }

    totalTime.innerHTML = `${min} : ${sec}`;
  };
}

// implementing the mute function
function mute() {
  music.volume = 0;
  volumeSlider.value = 1;
}

// implementing the unmute function
function unmute() {
  music.volume = 1;
  volumeSlider.value = 100;
}

// implementing the function for changing the volume of the music
function changeVolume(element) {
  music.volume = (element.value / 100).toFixed(1);
}

// function to increase the duration slider when song is playing
setInterval(() => {
  if (isPlaying) {
    currentSongTime = music.currentTime;
    songSlider.value = Math.floor((currentSongTime * 100) / music.duration);

    let min = 0;
    let sec = 0;
    // converting the time in minute and second
    min = Math.floor(currentSongTime / 60);
    sec = Math.floor(currentSongTime % 60);

    // converting the time in two digit number
    if (min < 10) {
      min = "0" + min;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }

    // updating the current time in html
    currentTime.innerText = `${min} : ${sec}`;

    if (music.currentTime == music.duration) {
      nextSong();
    }
  }
});


// changing the song current time according to user input using slider
function changeCurrentTime(element) {
    currentSongTime = ((element.value * music.duration) / 100);
    music.currentTime = currentSongTime;
    playSong();
}


// updating all the value at the time of start of program
updateDetails();
