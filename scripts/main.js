$(function() {

  // Count
  let gameCount= (function() {
    let count = 0;
    return function(addToCount) {
      return count += addToCount;
    };
  })();

  // Tiles by number
  const tiles = Object.freeze({
    0: 'green',
    1: 'red',
    2: 'blue',
    3: 'yellow'
  });

  // Random tile
  function activeTiles() {
    return Math.floor(Math.random() * 4);
  }

  // Sets the array of random tiles selected
  function colorsArray(times) {
    let colors = [];
    for (let i = 0; i < times; i++) {
      colors[i] = tiles[activeTiles()];
    }
    return colors;
  }

  // Makes the tiles flash
  function display(array = colorsArray(gameCount(0.5))) {
    for (let i = 0; i <= array.length; i++) {
      setTimeout(function() {
        $('#' + array[i - 1] + '-tile').addClass('darken');
      }, i * 1000);
      setTimeout(function() {
        $('#' + array[i - 1] + '-tile').removeClass('darken');
      }, i * 1150);
    }
    return array;
  }

  // Logic to make game work
  function playGame() {
    let cpuColors = display();
    let userInput = [];

    // User Input
    $('#green-input').click(function() {return userInput.push('green');});
    $('#red-input').click(function() {return userInput.push('red');});
    $('#blue-input').click(function() {return userInput.push('blue');});
    $('#yellow-input').click(function() {return userInput.push('yellow');});

    // Submit button clicked reasons and outputs game results
    $('#submit-answer').click(function() {
      if (cpuColors.join('') !== userInput.join('')) {
        $('#user-input-answers').html(`Your Guess: ${userInput.join(', ')}`);
        $('#game-result').html(`Sorry, It Was: ${cpuColors.join(', ')}`).addClass('red');
        $('#play-game').html('Try Again!');
        // Make the game reset here...

      } else {
        $('#user-input-answers').html('');
        $('#game-result').html('You Got It! Press: Go Again!').removeClass('red').addClass('green');
        $('#play-game').html('Go Again!');
      }
    });
  };

  // Game Start
  $('#play-game').click(function() {
    playGame();
    // Clears results
    $('#game-result, #user-input-answers').html('');
  });

});
