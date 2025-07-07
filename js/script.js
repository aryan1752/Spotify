async function getSongs() {
    // Test if the connection is working by fetching from the root
    fetch("http://127.0.0.1:5500/")
        .then(response => response.text())  // Get the response text
        .then(data => console.log("Server response:", data))  // Log the response to check if the connection works
        .catch(err => console.error("Error fetching:", err));  // Log any errors

    // Continue with the original fetch for songs
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;

    let as = div.getElementsByTagName("a");
    let songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href);
        }
    }
    return songs;
}

async function main() {
    // Call the getSongs function to retrieve the song links
    let songs = await getSongs();

    // Log the songs to the console
    console.log(songs);
    var audio = new Audio(songs[0]);
    audio.play();
}

// Execute the main function
main();   