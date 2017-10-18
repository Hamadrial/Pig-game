/*
  1. A player looses his entire score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: always save the previous dice roll in a seperate variable)
  2. Add input field for final score
  3. Add second dice
*/

var scores, roundScore, activePlayer, gamePlaying, lastDice;

// Start the game
init();

// add eventListener to btn-roll: execute the anonymous function when the button is clicked
document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    // 1. Random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    document.querySelector('.dice-1').style.display = 'block';
    document.querySelector('.dice-2').style.display = 'block';
    document.querySelector('.dice-1').src = 'img/dice-' + dice1 + '.png';
    document.querySelector('.dice-2').src = 'img/dice-' + dice2 + '.png';

    // 3. Update the round score IF the rolled number was NOT a 1
    if (dice1 !== 1 && dice2 !== 1) {
      // Add score
      roundScore += dice1 + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }

    /*
    if (dice === 6 && lastDice === 6) {
      // Player looses score
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      nextPlayer();
    } else if (dice !== 1) {
      // Add score
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }
    // Set dice number to lastDice
    lastDice = dice;
    */
  }
});

// Hole button
document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Assign user's input score to input variable
    var input = document.querySelector('.final-score').value;
    var winningScore;

    // Undefined, 0, null or '' are COERCED to false
    // Anything else is COERCED to true
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice-1').style.display = 'none';
      document.querySelector('.dice-2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

      // When there's a winner, the game end
      gamePlaying = false;
    } else {
      // Next player
      nextPlayer();
    }
  }
});

// Button new
// Call init() and reset the game
document.querySelector('.btn-new').addEventListener('click', init);

// Change active player
function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  // Reset scores
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // Change the active state
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  // Hide the dice
  document.querySelector('.dice-1').style.display = 'none';
  document.querySelector('.dice-2').style.display = 'none';
}

// Initialize the game
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  // Hide dice picture
  document.querySelector('.dice-1').style.display = 'none';
  document.querySelector('.dice-2').style.display = 'none';

  // Reset all scores and remove all states
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1!';
  document.getElementById('name-1').textContent = 'Player 2!';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  // Add active state to player-0
  document.querySelector('.player-0-panel').classList.add('active');
}
