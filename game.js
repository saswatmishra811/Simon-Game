// Stores game & user pattern
var gamePattern = [];
var userClickedPattern = [];
// Initialize game settings
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;
// Function to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to animate press
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
// Function to generate random number
function nextSequence() {
  level = level + 1;
  // Update h1 to inform user game has started
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  // Get starting random colour
  var randomChosenColour = buttonColours[randomNumber];
  // Select button with same id as random chosen color
  $("#" + randomChosenColour)
    .fadeIn()
    .fadeOut(25)
    .fadeIn();
  // Play sound for selected button
  playSound(randomChosenColour);
  // Add colour to gamePattern array
  gamePattern.push(randomChosenColour);
}

// Function to restart game by re-initializing variables
function startOver() {
  started = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}

// Function to check the user's answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press any Key to Restart");
    startOver();
  }
}

// Handle user click action and store choice
$(".btn").on("click", function () {
  var userChosenColour = this.id;
  // Add user choice to userClickedPattern
  userClickedPattern.push(userChosenColour);
  // Animate user press
  animatePress(userChosenColour);
  // Play sound for select button
  playSound(userChosenColour);
  // Check user answer
  checkAnswer(userClickedPattern.length - 1);
});

// Start the game when user presses any key
$(document).on("keypress", function () {
  if (started === false) {
    nextSequence();
  }
  started = true;
});
