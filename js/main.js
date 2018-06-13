import {changeScreen, render, getElementFromTemplate} from './utils';
import {INITIAL_GAME} from './data/data';
import {changeLevel, canContinue, die, generateStats} from './game-functions/game-logic';
import {quests} from './data/quest-data';
import renderGame from './modules/game';
import renderHeaderGame from './modules/header-game';
import renderStats from './modules/stats';
import renderStatsInGame from './modules/stats-in-game';
import footer from './modules/footer';
import intro from './modules/intro';
import greeting from './modules/greeting';

changeScreen(intro);

let game;
let answersArr = [];
const startGame = () => {
  game = Object.assign({}, INITIAL_GAME);

  const gameContainerElement = render();
  const headerElement = render();
  const levelElement = render();
  const statsElement = render();
  const statsInGameElement = render();

  gameContainerElement.appendChild(headerElement);
  gameContainerElement.appendChild(levelElement);
  gameContainerElement.appendChild(statsInGameElement);
  gameContainerElement.appendChild(getElementFromTemplate(footer));

  const getLevel = (level) => quests[`game-${level}`];

  const updateGame = (state) => {
    headerElement.innerHTML = renderHeaderGame(state);
    levelElement.innerHTML = renderGame(getLevel(state.level));
    statsInGameElement.innerHTML = renderStatsInGame(answersArr);
  };
  updateGame(game);
  changeScreen(gameContainerElement);
  document.querySelector(`button.back`).addEventListener(`click`, () => {
    changeScreen(greeting);
  });
  // одиночная игра
  levelElement.addEventListener(`input`, () => {
    const gameOption = document.querySelector(`.game__option:only-child`);
    if (gameOption) {
      const checkedValue = gameOption.querySelector(`input:checked`).value;
      const nextLevel = game.level + 1;
      if (checkedValue === quests[`game-${game.level}`].questions.answer) {
        game = changeLevel(game, nextLevel);
        answersArr = generateStats(true, 15, answersArr);
      } else {
        game = die(game);
        game = changeLevel(game, nextLevel);
        answersArr = generateStats(false, 15, answersArr);
      }
      if (!canContinue(game)) {
        gameContainerElement.innerHTML = ``;
        gameContainerElement.appendChild(statsElement);
        statsElement.innerHTML = renderStats(game, answersArr);
      } else {
        updateGame(game);
      }
      document.querySelector(`button.back`).addEventListener(`click`, () => {
        changeScreen(greeting);
      });
    }
  });
  // двойная игра
  levelElement.addEventListener(`input`, () => {
    const contentForm = document.querySelector(`.game__content`);
    if (contentForm) {
      const answers = Array.from(contentForm.elements).filter((element) => element.checked);
      if (answers.length === 2) {
        const nextLevel = game.level + 1;
        if (answers[0].value === quests[`game-${game.level}`].questions[0].answer &&
          answers[1].value === quests[`game-${game.level}`].questions[1].answer) {
          game = changeLevel(game, nextLevel);
          answersArr = generateStats(true, 15, answersArr);
        } else {
          game = die(game);
          game = changeLevel(game, nextLevel);
          answersArr = generateStats(false, 15, answersArr);
        }
        if (!canContinue(game)) {
          gameContainerElement.innerHTML = ``;
          gameContainerElement.appendChild(statsElement);
          statsElement.innerHTML = renderStats(game, answersArr);
        } else {
          updateGame(game);
        }
        document.querySelector(`button.back`).addEventListener(`click`, () => {
          changeScreen(greeting);
        });
      }
    }
  });
  // тройная игра
  levelElement.addEventListener(`click`, (evt) => {
    const tripleForm = levelElement.querySelector(`.game__content--triple`);
    if (tripleForm) {
      const selectedImageSrc = evt.target.querySelector(`img`).getAttribute(`src`);
      const questionsArr = quests[`game-${game.level}`].questions;
      let correctImageSrc = questionsArr.find((question) => question.answer === `paint`).image;
      const nextLevel = game.level + 1;
      if (selectedImageSrc === correctImageSrc) {
        game = changeLevel(game, nextLevel);
        answersArr = generateStats(true, 15, answersArr);
      } else {
        game = die(game);
        game = changeLevel(game, nextLevel);
        answersArr = generateStats(false, 15, answersArr);
      }
      if (!canContinue(game)) {
        gameContainerElement.innerHTML = ``;
        gameContainerElement.appendChild(statsElement);
        statsElement.innerHTML = renderStats(game, answersArr);
      } else {
        updateGame(game);
      }
      document.querySelector(`button.back`).addEventListener(`click`, () => {
        changeScreen(greeting);
      });
    }
  });
};

export default startGame;
