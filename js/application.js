import IntroScreen from './modules/intro/intro-screen.js';
import GreetingScreen from './modules/greeting/greeting-screen.js';
import RulesScreen from './modules/rules/rules-screen.js';
import GameModel from './data/game-model.js';
import GameScreen from './modules/game/game-screen.js';
import ModalConfirmElement from './modules/modal-confirm/modal-confirm-element.js';
import StatsScreen from './modules/stats/stats-screen.js';
import ModalErrorView from './modules/modal-error/modal-error.js';
import {adaptServerData} from './data/data-adapter.js';

const main = document.querySelector(`main.central`);

const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};
let questData;

export default class Application {

  static start() {
    const intro = new IntroScreen();
    changeView(intro.element);
    window.fetch(`https://es.dump.academy/pixel-hunter/questions`).
      then(checkStatus).
      then((response) => response.json()).
      then((data) => {
        questData = adaptServerData(data);
      }).
      then(() => Application.showGreeting()).
      catch(Application.showError);
  }

  static showError(error) {
    const modalError = new ModalErrorView(error);
    main.appendChild(modalError.element);
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
    const gameScreen = new GameScreen(new GameModel(questData, playerName));
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
