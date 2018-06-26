import IntroScreen from './modules/intro/intro-screen.js';
import GreetingScreen from './modules/greeting/greeting-screen.js';
import RulesScreen from './modules/rules/rules-screen.js';
import GameScreen from './modules/game/game-screen.js';
import StatsScreen from './modules/stats/stats-screen.js';
import GameModel from './data/game-model.js';
import ModalErrorView from './modules/modal-error/modal-error.js';
import ScoreboardView from './modules/scoreboard/scoreboard-view.js';
import ModalConfirmElement from './modules/modal-confirm/modal-confirm-element.js';
import Loader from './loader.js';
const animationTimeOut = 4000;

const main = document.querySelector(`main.central`);

const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};

let questData;

const removeIntro = () => {
  const introPlace = document.querySelector(`.intro__place`);
  main.removeChild(introPlace);
  const greetingPlace = document.querySelector(`.greeting__place`);
  greetingPlace.classList.remove(`greeting__place-animate`, `greeting__place`);
};

export default class Application {

  static start() {
    const intro = new IntroScreen();
    changeView(intro.element);
    Loader.loadData().
    then((data) => {
      questData = data;
    }).
    then(() => Application.showGreetingAnimation()).
    catch(Application.showError);
  }

  static showError(error) {
    const modalError = new ModalErrorView(error);
    main.appendChild(modalError.element);
  }

  static showGreetingAnimation() {
    const greeting = new GreetingScreen();
    main.appendChild(greeting.element);
    const greetingPlace = document.querySelector(`.greeting__place`);
    greetingPlace.classList.add(`greeting__place-animate`);
    const introPlace = document.querySelector(`.intro__place`);
    introPlace.classList.add(`intro__place-animate`);
    setTimeout(removeIntro, animationTimeOut);
  }

  static showGreeting() {
    const greeting = new GreetingScreen();
    changeView(greeting.element);
     const greetingPlace = document.querySelector(`.greeting__place`);
     greetingPlace.classList.remove(`greeting__place`);
  }

  static showRules() {
    const rules = new RulesScreen();
    changeView(rules.element);
  }

  static showGame(playerName) {
    const gameScreen = new GameScreen(new GameModel(questData, playerName));
    changeView(gameScreen.element);
    gameScreen.startGame();
  }

  static showModalConfirm() {
    const modalConfirm = new ModalConfirmElement();
    main.appendChild(modalConfirm.element);
  }

  static showStats(state, answers, name) {
    const statistics = new StatsScreen(state, answers);
    changeView(statistics.element);
    const playerName = name;
    const scoreBoard = new ScoreboardView();
    const container = document.querySelector(`.result`);
    container.appendChild(scoreBoard.element);
    Loader.saveResults(answers, state.lives, playerName).
    then(() => Loader.loadResults(playerName)).
    then((data) => scoreBoard.showScores(data)).
    catch(Application.showError);
  }

}
