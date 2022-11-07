const { Console } = require('@woowacourse/mission-utils');
const { Computer } = require('./Computer');
const { ErrorCheck } = require('./functions/ErrorCheck');
const { Game } = require('./functions/Game');
const { SYSTEM_MESSAGE, COUNT_MESSAGE } = require('./constants/system message');
const { REPLAY_NUMBER } = require('./constants/game numbers');

class Baseball {
  constructor() {
    this.randomNumber = [];
    this.isPlayFirst = true;
  }

  playGame() {
    if (this.isPlayFirst) {
      this.isPlayFirst = false;
      Console.print(SYSTEM_MESSAGE.START);
    }

    this.randomNumber = Computer.getRandomNumber();
    this.getUserNumber();
  }

  getUserNumber() {
    Console.readLine(SYSTEM_MESSAGE.GET_NUMBER, (userInput) => {
      ErrorCheck.guessError(userInput);

      this.getGameCount(this.randomNumber, userInput);
    });
  }

  getGameCount(randomNumber, userInput) {
    const [STRIKE, BALL] = Game.getStrikeBallCount(randomNumber, userInput);

    this.printGameCount(STRIKE, BALL);
  }

  printGameCount(STRIKE, BALL) {
    const gameMessage = Game.getStrikeBallMessage(STRIKE, BALL);

    Console.print(gameMessage);

    if (!Game.isEqual(gameMessage, COUNT_MESSAGE.CORRECT)) {
      this.getUserNumber();
    } else {
      Console.print(SYSTEM_MESSAGE.END);
      this.getReplayNumber();
    }
  }

  getReplayNumber() {
    Console.readLine(SYSTEM_MESSAGE.RESTART, (playInput) => {
      this.isReplay(playInput);
    });
  }

  isReplay(replayNumber) {
    ErrorCheck.replayError(replayNumber);

    if (Game.isEqual(replayNumber, REPLAY_NUMBER.KEEP_PLAY)) {
      this.playGame();
    } else {
      Console.close();
    }
  }
}

module.exports = { Baseball };
