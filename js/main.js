console.log("Echoes of Spirited Away");

// Variables
const tokens = document.querySelectorAll(".token");
const dropBoxes = document.querySelectorAll(".drop-box");
const bathSpots = document.querySelectorAll(".drop-spot");

const playbtn = document.querySelector("#play-btn");
const pausebtn = document.querySelector("#pause-btn");
const stopbtn = document.querySelector("#stop-btn");
const resetbtn = document.querySelector("#reset-btn");

let currentDraggedToken = null;
let currentAudio = null;

// Functions
function dragStart() {
  currentDraggedToken = this;
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();

  if (this.children.length > 0) {
    return;
  }

  const newToken = document.createElement("img");
  newToken.src = currentDraggedToken.src;
  this.appendChild(newToken);

  let tokenNumber = currentDraggedToken.dataset.number;

  const spiritImg = document.querySelector("#spirit-" + tokenNumber);

  let chosenSpot = null;
  bathSpots.forEach(spot => {
    if (chosenSpot == null) {
      if (spot.children.length > 0) {
      } else {
        chosenSpot = spot;
      }
    }
  });

  if (chosenSpot == null) {
    alert("All bath spots are full!");
    return;
  }

  if (spiritImg) {
    const newSpirit = document.createElement("img");
    newSpirit.src = spiritImg.src;
    chosenSpot.appendChild(newSpirit);
    chosenSpot.style.display = "block";
  }

  const audio = document.querySelector("#audio-" + tokenNumber);
  if (audio) {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    currentAudio = audio;
    currentAudio.play();
  }

  currentDraggedToken = null;
}

// Controls
function playAudio() {
  if (currentAudio) {
    currentAudio.play();
  }
}

function pauseAudio() {
  if (currentAudio) {
    currentAudio.pause();
  }
}

function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
}

function resetGame() {
  dropBoxes.forEach(box => {
    if (box.children.length > 0) {
      box.removeChild(box.firstChild);
    }
  });

  bathSpots.forEach(spot => {
    if (spot.children.length > 0) {
      spot.removeChild(spot.firstChild);
    }
    spot.style.display = "none";
  });

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

// Event Listeners
tokens.forEach(token => {
  token.addEventListener("dragstart", dragStart);
});

dropBoxes.forEach(box => {
  box.addEventListener("dragover", dragOver);
  box.addEventListener("drop", drop);
});

playbtn.addEventListener("click", playAudio);
pausebtn.addEventListener("click", pauseAudio);
stopbtn.addEventListener("click", stopAudio);
resetbtn.addEventListener("click", resetGame);
