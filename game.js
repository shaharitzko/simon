function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    $("h1").text("level " + level);
    
    
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    clicksThisLevel = 0;
    userClickedPattern = [];
    started = true;
}

function playSound(name) {
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer() {
    if (gamePattern[clicksThisLevel] != userClickedPattern[clicksThisLevel])
        return false;
    return true;
}

function startOver() {
    // reset game variables
    level = 0;
    gamePattern = [];
    started = false;
}

var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var clicksThisLevel = 0;
var started = false;

$(".btn").click(function (event) {
    // get clicked button
    var btn = $( event.target );
    var userChosenColour  = btn.attr('id');

    // clicked button reaction
    playSound(userChosenColour);
    animatePress(userChosenColour);

    // add clicked button to this level
    userClickedPattern.push(userChosenColour);

    //check clicked button
    if (checkAnswer()) {
        clicksThisLevel ++;

        // check if finished level and level up
        if (clicksThisLevel == gamePattern.length) {
            level ++;
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        // add wrong sound
        var wrongSound = new Audio("./sounds/wrong.mp3");
        wrongSound.play();

        // add wrong background animation
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        // set the headline after wrong
        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }     
});

$(document).keydown(function() {
    if (!started)
        nextSequence();
});
