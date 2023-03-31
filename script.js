// define variables
var images = [
  { file: "Ascent/IMG1.png", map: "Ascent" },
  { file: "Ascent/IMG2.png", map: "Ascent" },
  { file: "Ascent/IMG3.png", map: "Ascent" },
  { file: "Ascent/IMG4.png", map: "Ascent" },
  { file: "Ascent/IMG5.png", map: "Ascent" },  
  { file: "Bind/IMG1.png", map: "Bind" },
  { file: "Bind/IMG2.png", map: "Bind" },
  { file: "Bind/IMG3.png", map: "Bind" },
  { file: "Bind/IMG4.png", map: "Bind" },
  { file: "Bind/IMG5.png", map: "Bind" },
 // { file: "Bind/IMG6.png", map: "Bind" },
  { file: "Haven/IMG1.png", map: "Haven" },
  { file: "Haven/IMG2.png", map: "Haven" },
  { file: "Haven/IMG3.png", map: "Haven" },
  { file: "Haven/IMG4.png", map: "Haven" },
  { file: "Haven/IMG5.png", map: "Haven" },
  { file: "Haven/IMG6.png", map: "Haven" },
  { file: "Icebox/IMG1.png", map: "Icebox" },
  { file: "Icebox/IMG2.png", map: "Icebox" },
  { file: "Icebox/IMG3.png", map: "Icebox" },
  { file: "Icebox/IMG4.png", map: "Icebox" },
//  { file: "Icebox/IMG5.png", map: "Icebox" },
  { file: "Icebox/IMG6.png", map: "Icebox" },
  { file: "Icebox/IMG7.png", map: "Icebox" },
  { file: "Icebox/IMG8.png", map: "Icebox" },
 // { file: "Icebox/IMG9.png", map: "Icebox" },
  { file: "Split/IMG1.png", map: "Split" },
  { file: "Split/IMG2.png", map: "Split" },
  { file: "Split/IMG3.png", map: "Split" },
  { file: "Split/IMG4.png", map: "Split" },
  { file: "Split/IMG5.png", map: "Split" },
  { file: "Split/IMG6.png", map: "Split" },
  { file: "Split/IMG7.png", map: "Split" } 
];
var shuffledImages = shuffleArray(images);
var currentImageIndex = 0;
var score = 0;
var timer = null;

// get DOM elements
var startBtn = document.getElementById("start-btn");
var gameContainer = document.getElementById("game-container");
var imageContainer = document.getElementById("image-container");
var answerButtons = document.querySelectorAll(".answer-btn");
var scoreContainer = document.getElementById("score-container");
var timerContainer = document.getElementById("timer-container");
var resetBtn = document.getElementById("reset-btn");
var finalScreen = document.querySelector(".final-screen");
var closeBtn = document.querySelector(".close-btn");
var finalScoreElement = document.getElementById("final-score");

// add event listeners
startBtn.addEventListener("click", function () {
  startGame();
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

closeBtn.addEventListener("click", function () {
  finalScreen.style.display = "none";
});

function startGame() {
  startBtn.style.display = "none";
  gameContainer.style.display = "block";
  shuffledImages = shuffleArray(images);
  displayImage();
  timer = setTimeout(function () {
    checkAnswer("");
  }, 6000);
  updateTimerDisplay(6);
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

  if (currentImageIndex < shuffledImages.length) {
    displayImage();
    timer = setTimeout(function () {
      checkAnswer("");
    }, 6000);
    updateTimerDisplay(6);
    countdown();
  } else {
    endGame();
  }
}

function endGame() {
  finalScreen.style.display = "block";
  finalScoreElement.textContent = score;

  if ((score / shuffledImages.length) * 100 >= 60) {
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
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function updateTimerDisplay(secondsLeft) {
  timerContainer.textContent = "Time left: " + secondsLeft + "s";
}

function countdown() {
  var secondsLeft = 6;
  var countdownTimer = setInterval(function () {
    secondsLeft--;
    updateTimerDisplay(secondsLeft);
    if (secondsLeft <= 0) {
      clearInterval(countdownTimer);
      clearTimeout(timer);
    }
  }, 1000);
}