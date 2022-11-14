const highScoreEl = document.querySelector('#high-score');
const currentScoreEl = document.querySelector('#current-score');
const alertEl = document.querySelector('#alert');
const gameBoardEl = document.querySelector('#game-board');

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

gameBoardEl.addEventListener('click', onBoardClick);

let cardBody = document.createDocumentFragment();

function init() {
  shuffleCards();

  render();
}

function render() {
  buildGameBoard();
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
    frontIcon.classList.add('fa-solid', 'fa-question');
    cardFront.appendChild(frontIcon);
    cardFront.classList.add(
      'z-index-1',
      'card-front',
      'flex',
      'flex-center',
      'flex-j-center'
    );

    // add font awesome icon classes for back
    backIcon.classList.add(...card.split(' '));
    cardBack.appendChild(backIcon);
    cardBack.classList.add(
      'z-index--1',
      'card-back',
      'flex',
      'flex-center',
      'flex-j-center'
    );

    // append front and back to card div
    cardDiv.appendChild(cardFront);
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
    setTimeout(() => {
      e.target.parentElement.classList.add('flip-backward');

      e.target.parentElement.classList.remove('flip-forward');
    }, 2500);
  }

  if (e.target.classList.contains('card-front')) {
    e.target.classList.add('flip-forward');
  }
}
