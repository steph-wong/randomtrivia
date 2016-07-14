var qnVault = [{
  question: 'Humans share 70% of their DNA with bananas',
  choices: ['True', 'False'],
  answer: 1,
}, {
  question: 'Astronauts grow 2 inches taller when they are in space.',
  choices: ['True', 'False'],
  answer: 0,
}, {
  question: 'Eritrea, which became the 182nd member of the UN in 1993, is in the continent of Asia',
  choices: ['True', 'False'],
  answer: 1,
}, {
  question: 'An octupus has three hearts.',
  choices: ['True', 'False'],
  answer: 0,
}, {
  question: 'Mark Twain invented and patented the bra-strap clasp.',
  choices: ['True', 'False'],
  answer: 0,
}, {
  question: 'The creator of SpongeBob SquarePants used to teach marine biology.',
  choices: ['True', 'False'],
  answer: 0,
}, {
  question: 'Before Google launched Gmail, G-Mail was the name of a free email service offered by Garfield\'s website.',
  choices: ['True', 'False'],
  answer: 0,
}, {
  question: 'France was still executing people by guillotine when Star Wars: A New Hope hit theatres',
  choices: ['True', 'False'],
  answer: 0,
}, {
  question: 'The Olympic Flame symbolises unity among various nations of the world',
  choices: ['True', 'False'],
  answer: 1,
}, {
  question: 'Topeka, KS once renamed itself ToPikachu.',
  choices: ['True', 'False'],
  answer: 0,
}, ];

var quiz = {
  currentQuestion: 0,
  currentAnswer: 0,
  playerOneScore: 0,
  playerTwoScore: 0
};

var questionNum = 0;


$(document).ready(function() {
  start(questionNum);

  // selection
  $('.submitAns').on('click', function() {
    var playerAns = parseInt($(this).attr('id'));
    checkAns(playerAns);

    setTimeout(function() {
      $('.submitAns').removeClass('rightAns wrongAns');
      start(questionNum);
    }, 1000);

    questionNum++;
  });
});

// next question + end game
var start = function(questionNum) {
  $('#qnNum').html(questionNum + 1);

  if (questionNum !== 10) {
    question(questionNum);
  } else {
    end();
  }

  if (questionNum === 0 || questionNum % 2 === 0) {
    $('#playTurn').text('Player One\'s Turn');
  } else {
    $('#playTurn').text('Player Two\'s Turn');
  }
};

// show random question
function question() {
  var rand = Math.floor(Math.random() * qnVault.length);

  var question = qnVault[rand].question;
  $('h2').text(qnVault[rand].question);
  quiz.currentQuestion = question;

  $.each(qnVault[rand].choices, function(i, answers) {
    $('#' + i).html(answers);

    var answer = qnVault[rand].answer;
    quiz.currentAnswer = answer;
  });

  var temp = qnVault.splice(rand, 1)[0];
}

// check answers

function checkAns(playerAns) {
  console.log(quiz.currentAnswer + ' ' + playerAns);

  if ((playerAns === quiz.currentAnswer) && (questionNum === 0 || questionNum % 2 === 0)) {
    $("#" + playerAns).addClass('rightAns');
    $('#playTurn').text('Player One\'s Turn');
    quiz.playerOneScore++;

  } else if ((playerAns !== quiz.currentAnswer) && (questionNum === 0 || questionNum % 2 === 0)) {
    $("#" + playerAns).addClass('wrongAns');
    $('#playTurn').text('Player One\'s Turn');

  } else if ((playerAns == quiz.currentAnswer) && (questionNum % 2 !== 0)) {
    $("#" + playerAns).addClass('rightAns');
    $('#playTurn').text('Player Two\'s Turn');
    quiz.playerTwoScore++

  } else if ((playerAns !== quiz.currentAnswer) && (questionNum % 2 !== 0)) {
    $("#" + playerAns).addClass('wrongAns');
    $('#playTurn').text('Player Two\'s Turn');
  }

  $('#playerOne').text(quiz.playerOneScore);
  $('#playerTwo').text(quiz.playerTwoScore);
}

// end game
function end() {
  questionNum == qnVault.length;
  $('h3').html('');
  $('.button').html('');
  winner();
}

function winner() {
  if (quiz.playerOneScore > quiz.playerTwoScore) {
    $('h2').text('Player One Wins!');
  } else if (quiz.playerOneScore < quiz.playerTwoScore) {
    $('h2').text('Player Two Wins!');
  } else {
    $('h2').text('It\'s a tie!');
  }
  createResetBtn();
}

function createResetBtn() {
  $('<button>Play Again</button>').appendTo($('h4')).click(function() {
    location.reload();
  });
}
