// Define game values
let min = 1,
    max = 15,
    guessesLeft = 7,
    winNum = randomNum(min, max);

// Ui elements 
const game = document.querySelector('#game-section'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign ui min & max 
minNum.textContent = min;
maxNum.textContent = max;

// Play again (reload)
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

// Add event listener for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  // Validate 
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} & ${max}`, 'red');

    return;
  }

  // Check if won
  if(guess === winNum){
    // Game over func
    gameOver(true, `${winNum} is correct, YOU WIN!`);

  } else {
    // wrong number
    guessesLeft -= 1;
    
    if(guessesLeft === 0){
      // Game over, lost func
      gameOver(false, `Game over, you lost. ${winNum} is the correct number`);
    } else {
      // Game continues - answer wrong
      
      guessInput.style.borderColor = '#f12d2d';

      guessInput.value = '';

      // Tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, '#f12d2d');
    }
  }
});

// Game over
function gameOver(won, msg){
  // Define color var
  let color;

  // Conditional
  won === true ? color = 'green' : color = '#f12d2d';

  // Disable input
  guessInput.disabled = true;

  // Set text color
  message.style.color = color;

  // Style border
  guessInput.style.borderColor = color;

  // Set message
  setMessage(msg);

  // Set btn to play again
  guessBtn.value = 'Play again';
  guessBtn.className += 'play-again';
}

// get random winNum
function randomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

// Message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
  
}