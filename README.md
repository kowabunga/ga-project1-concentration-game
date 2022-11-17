# Concentration - The Game of Chance

Do you remember? What was under that card. Was it the hat... no wait the dragon. Aw man that wasn't right - and my score went down!

## Getting Started

There are two methods to start the game as described below.

Instructions on how to play the game will follow.

### Offline

If you choose to play the game offline, you will have to download a copy of the files available on this Github Repository.

If you already have a GitHub account, you can download the code via clicking the green <span style="color:rgb(80,135,70)">**Code**</span> button and selecting, under Clone, HTTPS, SSH, or GitHub CLI as per your preference.

If you do not have a GitHub account, you can seelct the Download Zip button also under the green <span style="color:rgb(80,135,70)">**Code**</span> button.

Once the game is downloaded, unzip the file and open up the file named <span style="color:#af4ef9">**index.html**</span> or <span style="color:#af4ef9">**index**</span> (these are the same files - your computer may hide the .html extension). You may have to select what application to open the file in. Select your browser of choice and the game should open in your browser.

### Online

The game is also available online at the link below. You can play the game just as you would above.

> [Concentration](https://kowabunga.github.io/ga-project1-concentration-game/)

## How to Play

When the game loads succesfully, it should look like below:
![The Initial Game State](/assets/images/initial_game_state.png)

Clicking on different cards will reveal an image underneath. Don't forget what card was where, you need to remember it to win!

### Incorrect Choice

If you don't find a match you'll see a message stating it's not correct and the cards will flip back over.

![An Incorrect Choice](/assets/images/incorrect_choice.png)

### Correct Choice

If you made a correct choice, the alert will say so and the cards that were correctly chosen will be replaced by a checkmark

![A Correct Choice](/assets/images//correct_choice.png)

### You Won

Congrats, you did it! Now that you've won you can bask in the glory of knowing your memory hasn't failed you, you still have it, or you can play again. To play again, simply hit the "Play Again" button to keep going. The board randomly reshuffles itself each time you play again so you don't have to worry about remembering _too hard_ where the shapes are on the board.

![You did it, you won!](/assets/images/won_game.png)

### Wait, I'm lost. Help.

If you find the current board too hard or you just can't remember where stuff is, you can hit the **Reset Board** button to have the game reset and the board reshuffled.

![Reset button](/assets/images/reset_button.png)

## Next Steps

- **Three Dimensional (3-D) cards**
  - Currently cards just act as if they are two cards "stacked" on top of each other. Future changes would result in the card "flipping over" and revealing the shape on the back of the card.
  - Other option include something akin to a 3-D cube that rotates around to show the other sides
- **What's the picture?**
  - Looking back at the 3-D cube idea, two sides would act as the front/back of the card but the third side would be part of an image.
  - This would allow a person to make "guesses" at what the whole picture is if the game was to be completed. Guessing correctly before the game is completed would result in bonus points.
- **Multi-player**
  - Could set up multi-player using websockets, opening up "two" games side by side and two players can complete on who finishes the game faster

## Technologies Used

- HTML

- JavaScript

  - Functions
  - Event Listeners
  - DOM Manipulation

- CSS

  - Styling
  - Animations
  - Media Queries
