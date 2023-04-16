// define variables
var images = [
  { file: "Ascent/resized/IMG1.png", map: "Ascent" },
  { file: "Ascent/resized/IMG2.png", map: "Ascent" },
  { file: "Ascent/resized/IMG3.png", map: "Ascent" },
  { file: "Ascent/resized/IMG4.png", map: "Ascent" },
  { file: "Ascent/resized/IMG5.png", map: "Ascent" },
  { file: "Bind/resized/IMG1.png", map: "Bind" },
  { file: "Bind/resized/IMG2.png", map: "Bind" },
  { file: "Bind/resized/IMG3.png", map: "Bind" },
  { file: "Bind/resized/IMG4.png", map: "Bind" },
  { file: "Bind/resized/IMG5.png", map: "Bind" },
  { file: "Bind/resized/IMG6.png", map: "Bind" },
  { file: "Haven/resized/IMG1.png", map: "Haven" },
  { file: "Haven/resized/IMG2.png", map: "Haven" },
  { file: "Haven/resized/IMG3.png", map: "Haven" },
  { file: "Haven/resized/IMG4.png", map: "Haven" },
  { file: "Haven/resized/IMG5.png", map: "Haven" },
  { file: "Haven/resized/IMG6.png", map: "Haven" },
  { file: "Icebox/resized/IMG1.png", map: "Icebox" },
  { file: "Icebox/resized/IMG2.png", map: "Icebox" },
  { file: "Icebox/resized/IMG3.png", map: "Icebox" },
  { file: "Icebox/resized/IMG4.png", map: "Icebox" },
  { file: "Icebox/resized/IMG5.png", map: "Icebox" },
  { file: "Icebox/resized/IMG6.png", map: "Icebox" },
  { file: "Icebox/resized/IMG7.png", map: "Icebox" },
  { file: "Icebox/resized/IMG8.png", map: "Icebox" },
  { file: "Icebox/resized/IMG9.png", map: "Icebox" },
  { file: "Split/resized/IMG1.png", map: "Split" },
  { file: "Split/resized/IMG2.png", map: "Split" },
  { file: "Split/resized/IMG3.png", map: "Split" },
  { file: "Split/resized/IMG4.png", map: "Split" },
  { file: "Split/resized/IMG5.png", map: "Split" },
  { file: "Split/resized/IMG6.png", map: "Split" },
  { file: "Split/resized/IMG7.png", map: "Split" },

];
var shuffledImages = shuffleArray(images);
var currentImageIndex = 0;
var score = 0;
var timer = null;
var numberOfImagesToPlay = 10;
var countdownTimer = null; 
var numberOfImagesToPlay = 10;

// get DOM elements
var startBtn = document.getElementById("start-btn");
var gameContainer = document.getElementById("game-container");
var imageContainer = document.getElementById("image-container");
var answerButtons = document.querySelectorAll(".answer-btn");
var scoreContainer = document.getElementById("score-container");
var timerContainer = document.getElementById("timer-container");
var resetBtn = document.getElementById("reset-btn");
var finalScreen = document.querySelector(".final-screen");
var finalScoreElement = document.getElementById("final-score");
var settingsModal = document.getElementById("settings-modal");
var modalClose = document.getElementById("modal-close");
var gameModeButtons = document.querySelectorAll(".game-mode-btn");

// add event listeners
startBtn.addEventListener("click", function () {
  settingsModal.style.display = "block";
});

modalClose.addEventListener("click", function () {
  settingsModal.style.display = "none";
});

gameModeButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    selectGameMode(event.target);
    numberOfImagesToPlay = parseInt(event.target.getAttribute("data-images"));
    settingsModal.style.display = "none";
    setTimeout(function () {
      startGame();
    }, 0);
  });
});

resetBtn.addEventListener("click", function () {
  location.reload();
});

answerButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    var userAnswer = event.target.getAttribute("data-map");
    checkAnswer(userAnswer);
  });
});

function startGame() {
  startBtn.style.display = "none";
  gameContainer.style.display = "block";
  shuffledImages = shuffleArray(images).slice(0, numberOfImagesToPlay);
  displayImage();
  timer = setTimeout(function () {
    checkAnswer("");
  }, 5000);
  updateTimerDisplay(5);
  countdown();
}


function displayImage() {
  imageContainer.innerHTML = "";
  var image = document.createElement("img");
  image.src = shuffledImages[currentImageIndex].file;
  imageContainer.appendChild(image);
}

function checkAnswer(userAnswer) {
  clearTimeout(timer);
  clearInterval(countdownTimer);
  
  var correctAnswer = shuffledImages[currentImageIndex].map;

  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    score++;
    scoreContainer.textContent = "Correct! Your score is " + score;
    scoreContainer.classList.remove("wrong-answer");
    scoreContainer.classList.add("correct-answer");
  } else {
    score--;
    scoreContainer.textContent = "Wrong! Your score is " + score;
    scoreContainer.classList.remove("correct-answer");
    scoreContainer.classList.add("wrong-answer");
  }

  currentImageIndex++;

  if (currentImageIndex < numberOfImagesToPlay && currentImageIndex < shuffledImages.length) {
    displayImage();
    timer = setTimeout(function () {
      checkAnswer("");
    }, 5000);
    updateTimerDisplay(5);
    countdown();
  } else {
    endGame();
  }
}

function countdown() {
  clearInterval(countdownTimer);
  var secondsLeft = 5;
  countdownTimer = setInterval(function () {
    secondsLeft--;
    updateTimerDisplay(secondsLeft);
    if (secondsLeft <= 0) {
      clearInterval(countdownTimer);
      clearTimeout(timer);
      checkAnswer("");
    }
  }, 1000);
}

function endGame() {
  finalScreen.style.display = "block";
  finalScoreElement.textContent = score;

  if ((score / numberOfImagesToPlay) * 100 >= 60) {
    finalScoreElement.classList.add("final-score-green");
  } else {
    finalScoreElement.classList.add("final-score-red");
  }

  resetBtn.style.display = "block";
  currentImageIndex = 0;
  score = 0;
}


function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i+ 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function updateTimerDisplay(secondsLeft) {
  timerContainer.textContent = "Time left: " + secondsLeft + "s";
}


function selectGameMode(selectedButton) {
  gameModeButtons.forEach(function (button) {
    button.classList.remove("selected");
  });
  selectedButton.classList.add("selected");
}	
