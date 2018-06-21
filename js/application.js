import IntroScreen from './modules/intro/intro-screen.js';
import GreetingScreen from './modules/greeting/greeting-screen.js';
import RulesScreen from './modules/rules/rules-screen.js';
import GameModel from './data/game-model.js';
import GameScreen from './modules/game/game-screen.js';
import ModalConfirmElement from './modules/modal-confirm/modal-confirm-element.js';
import StatsScreen from './modules/stats/stats-screen.js';

const main = document.querySelector(`main.central`);
const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};

export default class Application {

  static showIntro() {
    const intro = new IntroScreen();
    changeView(intro.element);
  }

  static showGreeting() {
    const greeting = new GreetingScreen();
    changeView(greeting.element);
  }

  static showRules() {
    const rules = new RulesScreen();
    changeView(rules.element);
  }

  static showGame(playerName) {
    const gameScreen = new GameScreen(new GameModel(playerName));
    changeView(gameScreen.element);
    gameScreen.startGame();
  }

  static showModalConfirm() {
    const modalConfirm = new ModalConfirmElement();
    main.appendChild(modalConfirm.element);
  }

  static showStats(state, answers) {
    const statistics = new StatsScreen(state, answers);
    changeView(statistics.element);
  }

}
