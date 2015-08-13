// Tic Tac Toe - jQuery Refactor
// Vanilla JS is commented ABOVE its jQuery counterpart
// jQuery alternatives commented BELOW.  Look for 'or: ... '

//window.addEventListener('load', function () {
$(document).ready(function() {

  // Grab all the necessary elements
  // var squares = document.querySelectorAll('.square p');
  var $squares = $('.square p');
  // var squareBorders = document.querySelectorAll('.square');
  var $squareBorders = $('.square');
  // var reset = document.querySelector('.reset');
  var $reset = $('.reset');
  // var playerX = document.querySelector('#player_x');
  var $playerX = $('#player_x');
  // var playerO = document.querySelector('#player_o');
  var $playerO = $('#player_o');
  var turn = 'X';
  var playCount = 0;
  var xConsecWins = 0;
  var oConsecWins = 0;

  // reset the turn indicator
  displayTurn();

  // Listen for clicks on squares
  // Track variable 'turn' for next move and end of game
  // Disallow repeated moves on the same square
  // Disallow moves after the game has been won
  // for (var i = 0; i < squares.length; i++) {
  $squares.each(function(index) {
  // NOTE: index is optional.  If passed as an argument, you will have access to the
  // index of each element you are iterating over (0, 1, 2, 3, etc.)
    // squares[i].addEventListener('click', function(event) {
    $(this).on('click', function() {
      console.log(index);
    // or: $(this).on('click', function(event))
      // if (event.target.innerHTML === '' && turn !== 'game_over') {  // square hasn't been played
      if ($(this).html() === '' && turn !== 'game_over') {
      // or: if (event.target.html() === '' && turn !== 'game_over') {
        // setSquare(event.target);
        setSquare($(this));
        // or: setSquare(event.target);
        checkGameStatus();
      }
      else if (turn === 'game_over') {
        alert("The game is over!  Click 'reset' to play again.");
      }
      else {
        alert('That square has already been played!');
      }
    });
  });

  // // Reset the board
  // reset.addEventListener('click', function () {
  //   for (var i = 0; i < squares.length; i++) {
  //     squares[i].innerHTML = '';
  //     squares[i].setAttribute('class', 'blank');
  //     // reset any highlighted winning squares
  //     squareBorders[i].setAttribute('class', 'square');
  //   }
  $reset.on('click', function() {
  // or: $reset.on('click', function(event) {
    $squares.each(function() {
    // or: $squares.each(function($el) {
      $(this).html('');
      // or:
      $(this).removeClass().addClass('blank');
    });
    $squareBorders.each(function() {
      $(this).removeClass().addClass('square');
    });
    // X always goes first
    turn = 'X';
    // set the turn indicator
    displayTurn();
    // keep track of how many moves have been made
    // max 9 before a win or tie
    playCount = 0;
  });

  function setSquare($square) {
    // square.innerHTML = turn;  // turn = X or O
    $square.html(turn);
    // square.setAttribute('class', turn);
    $square.removeClass().addClass(turn);
    turn === 'X' ? turn = 'O' : turn = 'X';
  }

  function checkGameStatus() {
    var winner;  // a string to indicate the winner and winning squares, e.g. 'X012'
    if (winner = getWinner())
      gameOver(winner);
    else if (++playCount === 9)
      gameOver('tie');
    // game still going, switch turn
    else displayTurn();
  }

  // display a turn indicator
  function displayTurn() {
    if (turn === 'X' ) {
      // playerO.innerHTML = 'Player O ';
      // playerX.innerHTML = 'Player X &diams; ';
      $playerO.html('Player O ');
      $playerX.html('Player X &diams; ');
    }
    else {
      // playerO.innerHTML = 'Player O &diams; ';
      // playerX.innerHTML = 'Player X ';
      $playerO.html('Player O &diams; ');
      $playerX.html('Player X ');
    }
  }

  function gameOver(winner) {
    if (winner === 'tie') {
      alert("Tie!");
    }
    else {
      highlightBorders(winner);
      // winner[0] is 'X' or 'O'
      alert(winner[0] + ' wins!');
      // check for consecutive wins
      checkConsecWins(winner[0]);
    }
    turn = 'game_over';
  }

  // if any player scores three wins in a row, display a message
  function checkConsecWins(winner) {
    if (winner === 'X') {
      oConsecWins = 0;
      if (++xConsecWins === 3)
        // playerX.innerHTML = 'Player X - <strong>HAT TRICK !!!</strong>';
        $playerX.html('Player X - <strong>HAT TRICK !!!</strong>');
    }
    else {
      xConsecWins = 0;
      if (++oConsecWins === 3);
        // playerO.innerHTML = 'Player O - <strong>HAT TRICK !!!</strong>';
        $playerO.html('Player O - <strong>HAT TRICK !!!</strong>');
    }
  }

  // getWinner will return a win in the form of a string denoting
  // the winning player and winning squares, e.g. 'X048'
  // if no win, return null
  function getWinner() {
    if (winnerIs('X')) {
      return 'X' + winnerIs('X');
    }
    else if (winnerIs('O')) {
      return 'O' + winnerIs('O');
    }
    else
      return null;
  }

  // If a winning combination of squares exists, return the win
  // in the form of a string denoting the winning squares, e.g. '048'
  function winnerIs(player) {
    return allThree(player, squareValue('0'), squareValue('1'), squareValue('2')) ||
           allThree(player, squareValue('3'), squareValue('4'), squareValue('5')) ||
           allThree(player, squareValue('6'), squareValue('7'), squareValue('8')) ||
           allThree(player, squareValue('0'), squareValue('3'), squareValue('6')) ||
           allThree(player, squareValue('1'), squareValue('4'), squareValue('7')) ||
           allThree(player, squareValue('2'), squareValue('5'), squareValue('8')) ||
           allThree(player, squareValue('0'), squareValue('4'), squareValue('8')) ||
           allThree(player, squareValue('2'), squareValue('4'), squareValue('6'));
  }

  // returns the combo of winning rows, e.g. '345'
  function allThree(player, squareOne, squareTwo, squareThree) {
    if ((squareOne[0] === player) && (squareTwo[0] === player) && (squareThree[0] === player))
      return squareOne[1] + squareTwo[1] + squareThree[1];
  }

  function squareValue(key) {
    switch(key) {
      // we want to persist the data denoting the location of the square on the board,
      // as this will allow us to highlight winning squares in the event of a win
      // example return values are 'X5', '02', '7' (space hasn't been played)
      // case '0': return squares[0].innerHTML + '0';
      // case '1': return squares[1].innerHTML + '1';
      // case '2': return squares[2].innerHTML + '2';
      // case '3': return squares[3].innerHTML + '3';
      // case '4': return squares[4].innerHTML + '4';
      // case '5': return squares[5].innerHTML + '5';
      // case '6': return squares[6].innerHTML + '6';
      // case '7': return squares[7].innerHTML + '7';
      // case '8': return squares[8].innerHTML + '8';
      case '0': return $squares.eq(0).html() + '0';
      case '1': return $squares.eq(1).html() + '1';
      case '2': return $squares.eq(2).html() + '2';
      case '3': return $squares.eq(3).html() + '3';
      case '4': return $squares.eq(4).html() + '4';
      case '5': return $squares.eq(5).html() + '5';
      case '6': return $squares.eq(6).html() + '6';
      case '7': return $squares.eq(7).html() + '7';
      case '8': return $squares.eq(8).html() + '8';
      default : console.log('Something went wrong');
    }
  }

  // winningSquares is a string in the form of 'X048'
  function highlightBorders(winningSquares) {
    // squareBorders[parseInt(winningSquares[1])].setAttribute('class', 'win');
    // squareBorders[parseInt(winningSquares[2])].setAttribute('class', 'win');
    // squareBorders[parseInt(winningSquares[3])].setAttribute('class', 'win');
    $squareBorders.eq(parseInt(winningSquares[1])).removeClass().addClass('win');
    $squareBorders.eq(parseInt(winningSquares[2])).removeClass().addClass('win');
    $squareBorders.eq(parseInt(winningSquares[3])).removeClass().addClass('win');
  }

});