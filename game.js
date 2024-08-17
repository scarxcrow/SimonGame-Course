// Array with available button colours;
var buttonColours = ["red", "blue", "green", "yellow"];

// Empty array that contains the game pattern;
var gamePattern = [];

// Array containing the user clicked pattern;
var userClickedPattern = [];

// Started
var started = false;
// Level
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-started").text("Level " + level);
        getRandomNumber();
        started=true;
    }
})

$(".btn").click(function() {
    var userChosenButton = $(this).attr("id");

    // Adding the clicked button to the user clicked pattern;
    userClickedPattern.push(userChosenButton);

    // Playing sound for the chosen button;
    playSound(userChosenButton);

    // Animating the press of the chosen button;
    animatePress(userChosenButton);

    checkAnswer(userChosenButton.length - 1);
});

// Selects a random colour from the button colours and adds it to the game pattern;
function getRandomNumber() {

    userClickedPattern = [];

    // Updating level;
    level++;

    // Updating h1 to say which level you're on.
    $("#level-title").text("Level " + level);

    // Creating random number;
    var randomNumber = Math.floor(Math.random() * 4);

    // Selecting a random colour from the button colours;
    var randomChosenColour = buttonColours[randomNumber];

    // Adding chosen random colour to the game pattern;
    gamePattern.push(randomChosenColour);

    // Animating the chosen colour;
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // Playing audio for the chosen colour;
    playSound(randomChosenColour);

    
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function(){
                getRandomNumber();
            }, 1000);
        }
    }else {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Animating the button that got pressed;
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
