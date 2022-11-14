const highScoreEl = document.querySelector('#high-score');
const currentScoreEl = document.querySelector('#current-score');
const alertEl = document.querySelector('#alert');
const gameBoardEl = document.querySelector('#game-board');

// This element contains a list of Font Awesome icons class names
// These will be used as the caterogy to match cards
const cards = [
  'fa-solid fa-wand-magic-sparkles',
  'fa-solid fa-wand-magic-sparkles',
  'fa-solid fa-pallete',
  'fa-solid fa-pallete',
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

// ? see how this works out
let cardBody = document.createDocumentFragment();

function init() {
  shuffleCards();
  console.log(cards);

  render();
}

function render() {
  buildGameBoard();
  console.log(cardBody);
}

init();

function buildGameBoard() {
  // Shuffle deck of card values
  shuffleCards();

  //   Create cards
  let cardDiv = null;
  let innerCard = null;
  let icon = null;

  cardBody = document.createDocumentFragment();

  cards.forEach(card => {
    // create individual card elements
    cardDiv = document.createElement('div');
    innerCard = document.createElement('div');
    icon = document.createElement('i');

    // add font awesome icon classes
    icon.classList.add(card.split(' '));

    // add other classes
    // append icon to inner div
    innerCard.appendChild(icon);
    innerCard.classList.add('flex', 'flex-center', 'flex-j-center');

    // append inner card to outer card div
    cardDiv.appendChild(innerCard);
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
