const highScoreEl = document.querySelector('#high-score');
const currentScoreEl = document.querySelector('#current-score');
const alertEl = document.querySelector('#alert');
let gameBoardEl;

// This element contains a list of Font Awesome icons class names
// These will be used as the caterogy to match cards
const cards = [
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

const resetCardList = [
  [
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
  ],
];

let currentScore = 0;
let highScore = 0;

let cardBody = document.createDocumentFragment();
let clickedCards = [];
let newGame = true;

function init() {
  newGame && shuffleCards();
  newGame = false;

  render();
}

function render() {
  // Check if game board has stuff in it and remove it
  gameBoardEl = document.querySelector('#game-board');

  gameBoardEl.addEventListener('click', onBoardClick);

  //   while gameBoardEl has children, remove them
  while (gameBoardEl.hasChildNodes()) {
    gameBoardEl.removeChild(gameBoardEl.firstChild);
  }

  buildGameBoard();

  currentScoreEl.textContent = currentScore;
  highScoreEl.textContent = highScore;

  console.log(cards);
}

init();

function buildGameBoard() {
  //   Create cards
  let cardDiv = null;
  let cardFront = null;
  let cardBack = null;
  let icon = null;

  cardBody = document.createDocumentFragment();

  cards.forEach(card => {
    // create individual card elements
    cardDiv = document.createElement('div');
    cardFront = document.createElement('div');
    cardBack = document.createElement('div');
    frontIcon = document.createElement('i');
    backIcon = document.createElement('i');

    // add question mark icon to front of all cards
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
  let randomIndex1 = null;
  let randomIndex2 = null;
  cards.forEach(card => {
    // generate two random positions
    randomIndex1 = Math.floor(Math.random() * cards.length);
    randomIndex2 = Math.floor(Math.random() * cards.length);

    // swap two card positions randomly
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
    e.target.parentElement.classList.add('flip-forward');
    // Add the main div with a 'card' class.
    // This will make the matching logic easier later on
    clickedCards.push(e.target.parentElement.parentElement);
    clickedCards.length === 2 && checkIfMatch();
  }

  if (e.target.classList.contains('card-front')) {
    e.target.classList.add('flip-forward');
    // Add the main div with a 'card' class.
    // This will make the matching logic easier later on
    clickedCards.push(e.target.parentElement);
    clickedCards.length === 2 && checkIfMatch();
  }
}

function checkIfMatch() {
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

  //   Make sure the card that is clicked is NOT the same card
  if (card1 !== card2) {
    if (card1.dataset.value === card2.dataset.value) {
      cards[cards.indexOf(`fa-solid ${card1.dataset.value}`)] =
        'fa-solid fa-check';

      cards[cards.indexOf(`fa-solid ${card2.dataset.value}`)] =
        'fa-solid fa-check';

      currentScore += 100;
      clickedCards = [];

      manageAlert(true, `Correct! That's a match.`);

      render();
    } else {
      clickedCards = [];
      manageAlert(false, `Woops. That's not right, try again.`);
      setTimeout(() => {
        render();
      }, 600);
    }
  }
}

function manageAlert(isMatch, message) {
  isMatch ? alertEl.classList.add('match') : alertEl.classList.add('no-match');

  alertEl.textContent = message;

  //   remove alert after 1 second
  setTimeout(() => {
    alertEl.classList.remove('match', 'no-match');
  }, 600);
}
