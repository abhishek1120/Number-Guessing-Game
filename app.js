/*
GAME FUNCTION
-player must guess a number between a min and max
-player gets a certain amount of guess
-notify player of guess remaining
-notify the player of the correct answer if loose
-Let player choose to play again
*/

// Game values

let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI ELements

const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// assign min and max in ui

minNum.textContent = min;
maxNum.textContent = max;

// play again event
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
})


// Listen for guess

guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);
    // console.log(guess);

    // Validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // check if won
    if (guess === winningNum) {
        // // disable the input
        // guessInput.disabled = true;
        // // change border color
        // guessInput.style.borderColor = 'green';
        // // set message
        // setMessage(`Hurrayy you won..!!! ${winningNum} is correct guess.`, '#347474')
        gameOver(true, `Hurrayy you won..!!! ${winningNum} is correct guess.`);
    }
    else {
        // wrong number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            // // game over - Lost
            // // disable the input
            // guessInput.disabled = true;
            // // change border color
            // // clear input
            // guessInput.value = '';
            // guessInput.style.borderColor = 'red';
            // // set message
            // setMessage(`Game over, No guesses left, The correct number was ${winningNum} Better Luck next time..!!!`, 'red')
            gameOver(false, `Game over, No guesses left, The correct number was ${winningNum} Better Luck next time..!!!`);
        }
        else {
            // Game Continues - answer wrong
            // change border color
            guessInput.style.borderColor = 'red';
            // clear input
            guessInput.value = '';
            // set message
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }
});

function gameOver(won, msg) {
    let color;
    won === true ? color = '#347474' : color = 'red';
    // disable the input
    guessInput.disabled = true;
    // change border color
    guessInput.style.borderColor = 'green';
    // set text-color
    message.style.color = color;
    // set message
    setMessage(msg);

    // guessBtn play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

// get winning number
function getRandomNum(min, max) {
    return (Math.floor(Math.random() * (max - min + 1) + min));
}