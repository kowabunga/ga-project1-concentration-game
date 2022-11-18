/*----- constants -----*/
// This element contains a list of Font Awesome icons class names
// These will be used as the caterogy to match cards
let cards = [];

const resetCardList = [
  'fa-solid fa-wand-magic-sparkles',
  'fa-solid fa-wand-magic-sparkles',
  'fa-solid fa-palette',
  'fa-solid fa-palette',
  'fa-solid fa-splotch',
  'fa-solid fa-splotch',
  'fa-solid fa-skull',
  'fa-solid fa-skull',
  'fa-solid fa-ghost',
  'fa-solid fa-ghost',
  'fa-solid fa-dragon',
  'fa-solid fa-dragon',
  'fa-solid fa-hat-wizard',
  'fa-solid fa-hat-wizard',
  'fa-solid fa-book-skull',
  'fa-solid fa-book-skull',
];

/*----- cached elements  -----*/
const movesLeftEl = document.querySelector('#moves-left');
const currentScoreEl = document.querySelector('#current-score');
const alertEl = document.querySelector('#alert');
const playAgainEl = document.querySelector('#new-game');
const resetBoardEl = document.querySelector('#reset-board');
const gameBoardEl = document.querySelector('#game-board');

playAgainEl.addEventListener('click', restartGame);
resetBoardEl.addEventListener('click', restartGame);
gameBoardEl.addEventListener('click', onBoardClick);

/*----- state variables -----*/

let currentScore;
let movesLeft;

let clickedCards;
let newGame;

let alertTimeOut;

/*----- functions -----*/
function init() {
  cards = [...resetCardList];
  currentScore = 0;
  movesLeft = 20;
  clickedCards = [];
  newGame = true;

  cardBody = document.createDocumentFragment();

  newGame && shuffleCards();

  playAgainEl.classList.remove('db');
  resetBoardEl.classList.add('db');

  render();
  newGame = false;
}

function render() {
  // Certain logic can disable the event listener on the game board
  // to ensure smooth gameplay
  // Check if game board has listener attribute. If not, add it.
  if (!gameBoardEl.hasAttribute('listener')) {
    gameBoardEl.addEventListener('click', onBoardClick);
  }

  //   while gameBoardEl has children, remove them
  while (gameBoardEl.hasChildNodes()) {
    gameBoardEl.removeChild(gameBoardEl.firstChild);
  }

  renderGameBoard();
  renderScores(true);
}

function renderGameBoard() {
  //   Create cards
  let cardDiv;
  let cardFront;
  let cardBack;
  let cardBody;

  cardBody = document.createDocumentFragment();

  cards.forEach((card, idx) => {
    // create individual card elements
    cardDiv = document.createElement('div');
    cardFront = document.createElement('div');
    cardBack = document.createElement('div');
    frontIcon = document.createElement('i');
    backIcon = document.createElement('i');

    // Add index to card element
    // Used to ensure same card is not clicked twice
    cardDiv.dataset.idx = idx;

    // add font awesome question mark icon to front of all cards
    if (card !== 'fa-solid fa-check') {
      frontIcon.classList.add('fa-solid', 'fa-question');
      cardFront.appendChild(frontIcon);
      cardFront.classList.add(
        'z-index-1',
        'card-front',
        'flex',
        'flex-center',
        'flex-j-center'
      );
    }

    // add font awesome icon classes for back
    backIcon.classList.add(...card.split(' '));
    backIcon.dataset.value = [...card.split(' ')][1];
    cardBack.appendChild(backIcon);
    cardBack.classList.add(
      'z-index--1',
      'card-back',
      'flex',
      'flex-center',
      'flex-j-center'
    );
    cardBack.dataset.value = [...card.split(' ')][1];

    // append front and back to card div
    if (cardFront) cardDiv.appendChild(cardFront);
    cardDiv.appendChild(cardBack);
    cardDiv.classList.add('card');

    // append card to card body document fragment
    cardBody.appendChild(cardDiv);
  });

  //   append card document fragment to main board element
  gameBoardEl.appendChild(cardBody);
}

function shuffleCards() {
  let randomIndex1;
  let randomIndex2;
  cards.forEach(card => {
    // generate two random positions
    randomIndex1 = Math.floor(Math.random() * cards.length);
    randomIndex2 = Math.floor(Math.random() * cards.length);

    // swap two card positions based on random indexes
    [cards[randomIndex1], cards[randomIndex2]] = [
      cards[randomIndex2],
      cards[randomIndex1],
    ];
  });
}

function onBoardClick(e) {
  // check if target clicked is the icon element OR the div containing the icon element
  // (i.e. has class name of 'card-front')
  // Do a card flip
  if (e.target.localName === 'i') {
    // If element is the icon on the card front
    e.target.parentElement.classList.add('change-opacity');
    // Add the main div with a 'card' class.
    // This will make the matching logic easier later on
    clickedCards.push(e.target.parentElement.parentElement);
    clickedCards.length === 2 && checkIfMatch();
  }

  // If clicked element is the 'card front'
  if (e.target.classList.contains('card-front')) {
    e.target.classList.add('change-opacity');
    // Add the main div with a 'card' class.
    // This will make the matching logic easier later on
    clickedCards.push(e.target.parentElement);
    clickedCards.length === 2 && checkIfMatch();
  }
}

function checkIfMatch() {
  movesLeft--;

  if (movesLeft <= 0) return endGame();

  // Perform a check if the two cards are the SAME card before we do anything.
  if (clickedCards[0].dataset.idx !== clickedCards[1].dataset.idx) {
    //   Disable event listener.
    //   Makes sure only two cards can be clicked at once
    gameBoardEl.removeEventListener('click', onBoardClick);

    //   Check if alert has active classes (i.e. match/nomatch)
    if (
      alertEl.classList.contains('match') ||
      alertEl.classList.contains('no-match')
    ) {
      alertEl.classList.remove('match', 'no-match');
    }

    //   Get both clicked elements out of array
    const card1 = [...clickedCards[0].children][1];
    const card2 = [...clickedCards[1].children][1];

    // Check if data-value is the same, i.e. both cards have the same icon
    if (card1.dataset.value === card2.dataset.value) {
      cards[cards.indexOf(`fa-solid ${card1.dataset.value}`)] =
        'fa-solid fa-check';

      cards[cards.indexOf(`fa-solid ${card2.dataset.value}`)] =
        'fa-solid fa-check';

      clickedCards = [];

      renderAlert(true, `Correct! That's a match.`, 600);

      checkIfGameWon();

      render();
    } else {
      renderAlert(false, `Woops. That's not right, try again.`, 600);

      renderScores(false);

      setTimeout(() => {
        unFlipCards();
        clickedCards = [];
      }, 600);
    }
  } else {
    // Remove 2nd clicked card, i.e. same card clicked twice
    clickedCards.pop();
  }
}

function unFlipCards() {
  clickedCards.forEach(card => {
    card.childNodes[0].classList.remove('change-opacity');
  });
  gameBoardEl.addEventListener('click', onBoardClick);
}

function renderAlert(isMatch, message, alertTime, gameWon) {
  if (isMatch) {
    if (gameWon) {
      alertEl.classList.add('game-won');
    } else {
      alertEl.classList.add('match');
    }
  } else {
    alertEl.classList.add('no-match');
  }

  alertEl.textContent = message;

  //   remove alert after 1 second
  alertTimeout = setTimeout(() => {
    alertEl.classList.remove('match', 'no-match');
  }, alertTime);
}

function checkIfGameWon() {
  let allChecks = cards.every(function (card) {
    return card === 'fa-solid fa-check';
  });

  if (allChecks) {
    // Set new color for ALL elements on game board
    gameBoardEl.classList.add('won');

    // Add won alert msg
    //Add max safe int just want to keep that alert up for a while since alerts auto remove themselves
    renderAlert(
      true,
      'Congratulations, you won!',
      Number.MAX_SAFE_INTEGER,
      true
    );

    if (currentScore > movesLeft) {
      movesLeftEl.textContent = currentScore;
    }

    playAgainEl.classList.add('db');
    resetBoardEl.classList.remove('db');
  }
}

// This gets used for two functionalities.
// Resetting the game board when player gives up
// Starting a new game once current game is won
function restartGame() {
  // remove any "won game" classes
  gameBoardEl.classList.remove('won');
  alertEl.classList.remove('game-won');

  clearTimeout(alertTimeOut);

  init();
}

function renderScores(match) {
  // If this is a new game, set scores to 0
  if (newGame) {
    currentScore = 0;
    weightedScore = 0;
  } else {
    // If not a new game and there's a match, increase score. otherwise decrease score
    if (match) {
      currentScore += 100;
    } else {
      currentScore -= 10;
    }
  }

  currentScoreEl.textContent = currentScore;
  movesLeftEl.textContent = movesLeft;
}

function endGame() {
  // Need to call in order to update moves left counter
  renderScores();

  gameBoardEl.removeEventListener('click', onBoardClick);

  // Disable click on EACH card now that you've lost
  [...gameBoardEl.children].forEach(card => {
    card.classList.add('dn');
  });

  const div = document.createElement('div');
  div.textContent = 'Oh no. You lost. Try again!';
  div.classList.add('alert');
  div.classList.add('no-match');
  div.classList.add('w-full');
  div.id = 'lost-alert';

  const i = document.createElement('i');
  i.classList.add('fa-solid', 'fa-x', 'game-end');
  gameBoardEl.appendChild(div);
  gameBoardEl.appendChild(i);
}

init();
