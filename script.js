const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// pass joke to VoiceRSS
function tellMe(joke) {
  VoiceRSS.speech({
    key: "7025a71a7e33450b90e4e913597da59f",
    src: joke,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// disable/enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// get jokes
async function getJokes() {
  let joke = "";
  const apiUrl = "https://v2.jokeapi.dev/joke/Programming";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellMe(joke);
    // disable button
    toggleButton();
  } catch (error) {}
}

// event listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
