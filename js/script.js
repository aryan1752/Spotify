const playMusic = (track) => {
    let audio = new Audio("/songs/" + track);
    audio.play();
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
    let songs = await getSongs();
    console.log(songs);

    let songUL = document.querySelector(".songList ul");
    songUL.innerHTML = ""; // Clear the existing list

    songs.forEach(song => {
        let li = document.createElement("li");

        li.innerHTML = `
            <img class="invert small-icon" src="img/music.svg" alt="">
            <div class="info">
                <div>${song.replaceAll("%20", " ").replaceAll("%40", "@")}</div>
                <div>Unknown Artist</div>
            </div>
            <img src="img/play.svg" alt="play" class="play-group">
        `;

        // Click event for playing the song
        li.addEventListener("click", () => {
            console.log("Playing:", song);
            playMusic(song);
        });

        songUL.appendChild(li);
    });

    // Optional: auto-play first song
    // playMusic(songs[0]);
}

main();
