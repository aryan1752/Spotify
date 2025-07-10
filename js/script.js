let currentSong = new Audio(); // global audio object
let currentIndex = 0;
let songs = [];

const playMusic = (track) => {
    currentSong.src = "/songs/" + track;
    currentSong.play();
    document.getElementById("play").src = "img/pause.svg";
    document.querySelector(".songinfo").innerHTML=track
    document.querySelector(".songtime").innerHTML="00:00/00:00"
    
};

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(decodeURIComponent(element.href.split("/songs/")[1]));
        }
    }

    return songs;
};

async function main() {
    songs = await getSongs();
    console.log(songs);

    let songUL = document.querySelector(".songList ul");
    songUL.innerHTML = "";

    songs.forEach((song, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <img class="invert small-icon" src="img/music.svg" alt="">
            <div class="info">
                <div>${song.replaceAll("%20", " ").replaceAll("%40", "@")}</div>
                <div>Unknown Artist</div>
            </div>
            <img src="img/play.svg" alt="play" class="play-group">
        `;

        // Play this song on click
        li.addEventListener("click", () => {
            currentIndex = index;
            playMusic(song);
        });

        songUL.appendChild(li);
    });

    // Play/pause toggle
    let playBtn = document.getElementById("play");
    playBtn.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            playBtn.src = "img/pause.svg";
        } else {
            currentSong.pause();
            playBtn.src = "img/play.svg";
        }
    });

    // Next button
    document.getElementById("next").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % songs.length;
        playMusic(songs[currentIndex]);
    });

    // Previous button
    document.getElementById("previous").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + songs.length) % songs.length;
        playMusic(songs[currentIndex]);
    });

    // Optional: auto-load first song
    currentSong.src = "/songs/" + songs[0];
    currentIndex = 0;
}

main();
