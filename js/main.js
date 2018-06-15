import {changeScreen} from './utils';
import {INITIAL_GAME} from './data/data';
import {changeLevel, canContinue, die, generateStats} from './game-functions/game-logic';
import LevelView from './views/level-view';
import StatsView from './views/stats-view';
import IntroView from './views/intro-view';
import GreetingView from './views/greeting-view';
import RulesView from './views/rules-view';

let introScreen = new IntroView();
let greetingScreen = new GreetingView();
let rulesScreen = new RulesView();

changeScreen(introScreen.element);

introScreen.onClick = () => {
  changeScreen(greetingScreen.element);
};
greetingScreen.onClick = () => {
  changeScreen(rulesScreen.element);
};
rulesScreen.onClick = () => {
  startGame();
};
rulesScreen.onBack = () => {
  changeScreen(greetingScreen.element);
};

let game;
let answersArr = [];

const updateGame = (state, answers) => {
  const levelScreen = new LevelView(state, answers);
  changeScreen(levelScreen.element);
  levelScreen.onAnswer = (answer) => {
    changeState(answer);
  };
  levelScreen.onBack = () => {
    changeScreen(greetingScreen.element);
  };
};

const changeState = (status) => {
  const nextLevel = game.level + 1;
  if (status) {
    game = changeLevel(game, nextLevel);
    answersArr = generateStats(true, 15, answersArr);
  } else {
    game = die(game);
    game = changeLevel(game, nextLevel);
    answersArr = generateStats(false, 15, answersArr);
  }
  if (!canContinue(game)) {
    const statsScreen = new StatsView(game, answersArr);
    changeScreen(statsScreen.element);
    statsScreen.onBack = () => {
      changeScreen(greetingScreen.element);
    };
  } else {
    updateGame(game, answersArr);
  }
};

const startGame = () => {
  game = Object.assign({}, INITIAL_GAME);
  answersArr = [];
  updateGame(game, answersArr);
};

export default startGame;

