var cards = [
  {x: 25, y: 100, w: 50, h: 80},
  {x: 100, y: 100, w: 50, h: 80},
  {x: 175, y: 100, w: 50, h: 80},
];

var activeCards = [];
var score = 0;
var guessNum = 0;
var hasInit = false;
var highScore = 0;

function init() {

    guessNum = 0;
    //Randomly pick a card from 1-3 to be the red card
    var redCardNum = Math.floor(Math.random() * (3 - 0)) + 0;

    for( var i = 0; i < cards.length; i++ ) {
      if ( i === redCardNum ) {
        cards[i].IsRed = true;
      } else{
        cards[i].IsRed = false;
      }
      activeCards[i] = cards[i];
    }


    //Fetch the canvas and clear it
    var c = document.getElementById("pickThree");
    var ctx = c.getContext("2d");
    ctx.font = "30px Arial";
    ctx.clearRect(138,56,40,30);

    ctx.strokeText(score, 142, 80);

    if( !hasInit ) {
      c.addEventListener("mousedown", doMouseDown, false);

      var highScoreSave = document.getElementById("HighScore");
      highScoreSave.innerHTML = 'High score: 0';

      ctx.font = "30px Arial";
      ctx.strokeText("Pick the red card!", 10, 50);
      ctx.strokeText("score: ", 50, 80);

      ctx.fillStyle = "green";
      cards.forEach( function( cardLocation) {
        ctx.fillRect(
          cardLocation.x,
          cardLocation.y,
          cardLocation.w,
          cardLocation.h
        );
      });
    }
hasInit = true;
}

function doMouseDown(event){

  var x = event.offsetX;
  var y = event.offsetY;
  var numCards = activeCards.length - 1;
  for( var i =0; i<= numCards; i++){
    var card = activeCards[i];
    if(
        x >= card.x &&
        x <= (card.x + card.w) &&
        y >= card.y &&
        y <= (card.y + card.h)
    ) {
      if( card.IsRed ) {
        console.log('You found it!');
        handleCardClick(true, i);
        break;
      } else {
          handleCardClick(false, i);
          break;

      }
    }
  }
}
function handleCardClick( isRedCard, i ) {
  if( isRedCard ){
    adjustScoreAndReset();
  } else{
    adjustFailClick(i);
  }
}

function adjustFailClick(i){
  guessNum = guessNum + 1;
  if( guessNum === 2 ) {
    alert('It was the 3rd card! Game Over');
    if(score > highScore){
      var highScoreSave = document.getElementById("HighScore");
      highScoreSave.innerHTML = 'High score: ' + score;
      highScore = score;
    }
    score = 0;
    init();
  }
  activeCards.splice(i,1);
}

function adjustScoreAndReset() {
  if( guessNum === 0 ) {
    score = score + 2;
  } else if( guessNum === 1 ) {
    score = score + 1;
  }
  init();
}
