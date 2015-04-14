jQuery( document ).ready(function($) {

  // When the fold button is pressed
  $( '#fold' ).click(function(){
    if ($( '#correct-decision' ).val() == "fold") {
      var newScore = parseInt($( '#score' ).html()) + 1;
      var newTotal = parseInt($( '#total' ).html()) + 1;
      $( '#score' ).html(newScore);
      $( '#total' ).html(newTotal);
      showDialog("Correct", "Your answer was correct! Great job!");
      createHand();
    } else {
      var newTotal = parseInt($( '#total' ).html()) + 1;
      $( '#total' ).html(newTotal);
      showDialog("Not Quite...", "Sorry - your answer wasn't right. You should have picked " + $( '#correct-decision' ).val() + ".");
      createHand();
    }
  });

  // When the call button is pressed
  $( '#call' ).click(function(){
    if ($( '#correct-decision' ).val() == "call") {
      var newScore = parseInt($( '#score' ).html()) + 1;
      var newTotal = parseInt($( '#total' ).html()) + 1;
      $( '#score' ).html(newScore);
      $( '#total' ).html(newTotal);
      showDialog("Correct", "Your answer was correct! Great job!");
      createHand();
    } else {
      var newTotal = parseInt($( '#total' ).html()) + 1;
      $( '#total' ).html(newTotal);
      showDialog("Not Quite...", "Sorry - your answer wasn't right. You should have picked " + $( '#correct-decision' ).val() + ".");
      createHand();
    }
  });

  // When the raise button is pressed
  $( '#raise' ).click(function(){
    if ($( '#correct-decision' ).val() == "raise") {
      var newScore = parseInt($( '#score' ).html()) + 1;
      var newTotal = parseInt($( '#total' ).html()) + 1;
      $( '#score' ).html(newScore);
      $( '#total' ).html(newTotal);
      showDialog("Correct", "Your answer was correct! Great job!");
      createHand();
    } else {
      var newTotal = parseInt($( '#total' ).html()) + 1;
      $( '#total' ).html(newTotal);
      showDialog("Not Quite...", "Sorry - your answer wasn't right. You should have picked " + $( '#correct-decision' ).val() + ".");
      createHand();
    }
  });

  // Create the first hand...
  createHand();

  function createHand() {
    var suits = ["clubs", "hearts", "spades", "diamonds"];
    var faces = ["ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king"];
    var faceValues = [10, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8];

    var firstCardSuit = suits[Math.floor(Math.random() * suits.length)];
    var firstCardFaceIndex = Math.floor(Math.random() * faces.length);
    var firstCardFace = faces[firstCardFaceIndex];
    var firstCardFaceValue = faceValues[firstCardFaceIndex];
    var firstCard = {suit: firstCardSuit, face: firstCardFace, faceValue: firstCardFaceValue, order: firstCardFaceIndex};

    var secondCardSuit = suits[Math.floor(Math.random() * suits.length)];
    var secondCardFaceIndex = Math.floor(Math.random() * faces.length);
    var secondCardFace = faces[secondCardFaceIndex];
    var secondCardFaceValue = faceValues[secondCardFaceIndex];
    var secondCard = {suit: secondCardSuit, face: secondCardFace, faceValue: secondCardFaceValue, order: secondCardFaceIndex};

    while (secondCard == firstCard) {
      var secondCardSuit = suits[Math.floor(Math.random() * suits.length)];
      var secondCardFaceIndex = Math.floor(Math.random() * faces.length);
      var secondCardFace = faces[secondCardFaceIndex];
      var secondCardFaceValue = faceValues[secondCardFaceIndex];
      var secondCard = {suit: secondCardSuit, face: secondCardFace, faceValue: secondCardFaceValue, order: secondCardFaceIndex};
    }

    var hand_html_string = '<input type="hidden" name="hand-value" id="hand-value" value="' + getHandValue(firstCard, secondCard) + '" />';
    hand_html_string += '<img class="card" src="img/' + firstCard.face + '_' + firstCard.suit + '.png" />';
    hand_html_string += '<img class="card" src="img/' + secondCard.face + '_' + secondCard.suit + '.png" />';

    $( '#hand' ).html( hand_html_string );

    var positions = ["early", "middle", "late"];
    var position = positions[Math.floor(Math.random() * positions.length)];

    var position_html_string = '<input type="hidden" name="correct-decision" id="correct-decision" value="' + getCorrectDecision(getHandValue(firstCard, secondCard), position) + '" />';
    position_html_string += position;

    $( '#position' ).html( position_html_string );
  }

  function getHandValue(firstCard, secondCard) {
    var handValue = 0;
    if (firstCard.faceValue >= secondCard.faceValue) {
      handValue += firstCard.faceValue;
    } else {
      handValue += secondCard.faceValue;
    }

    if (firstCard.face == secondCard.face) {
      handValue *= 2;
    }

    if (firstCard.suit == secondCard.suit) {
      handValue += 2;
    }

    if (firstCard.face == "ace") {
      if (secondCard.face == "king" || secondCard.face == "two") {
        handValue += 1;
      } else if (secondCard.face == "queen" || secondCard.face == "three") {
        handValue -= 1;
      } else if (secondCard.face == "jack" || secondCard.face == "four") {
        handValue -= 2;
      } else if (secondCard.face !== firstCard.face) {
        handValue -= 4;
      }
    } else if (secondCard.face == "ace") {
      if (firstCard.face == "king" || firstCard.face == "two") {
        handValue += 1;
      } else if (firstCard.face == "queen" || firstCard.face == "three") {
        handValue -= 1;
      } else if (firstCard.face == "jack" || firstCard.face == "four") {
        handValue -= 2;
      } else if (firstCard.face !== secondCard.face) {
        handValue -= 4;
      }
    } else {
      if (Math.abs(firstCard.order - secondCard.order) == 1) {
        handValue += 1;
      } else if (Math.abs(firstCard.order - secondCard.order) == 2) {
        handValue -= 1;
      } else if (Math.abs(firstCard.order - secondCard.order) == 3) {
        handValue -= 2;
      } else if (Math.abs(firstCard.order - secondCard.order) == 4) {
        handValue -= 4;
      } else if (Math.abs(firstCard.order - secondCard.order) >= 5) {
        handValue -= 5;
      }
    }

    return handValue;
  }

  function getCorrectDecision(handValue, position) {
    if (position == "early") {
      if (handValue >= 9) {
        return "raise";
      } else if (handValue >= 8) {
        return "call";
      } else {
        return "fold";
      }
    } else if (position == "middle") {
      if (handValue >= 9) {
        return "raise";
      } else if (handValue >= 7) {
        return "call";
      } else {
        return "fold";
      }
    } else if (position == "late") {
      if (handValue >= 9) {
        return "raise";
      } else if (handValue >= 6) {
        return "call";
      } else {
        return "fold";
      }
    } else {
      return "fold";
    }
  }

  function showDialog(title, text) {
    $( "#dialog" ).html(text);
    $( "#dialog" ).dialog({
      width: 600,
      height: 400,
      title: title,
      buttons: [
      {
        text: "OK",
        click: function() {
          $( this ).dialog( "close" );
        }
      }
      ]
    });
  }

});