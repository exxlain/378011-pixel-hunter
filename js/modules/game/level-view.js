import {GameType} from '../../data/data';
import AbstractView from '../abstract-view';
import gameFormTemplate from '../../blocks/game-form';
import statsTemplate from '../../blocks/stats';
import footerTemplate from '../../blocks/footer';

const showRightAnswerSingleGame = (debugMode, element, level) => {
  if (debugMode) {
    const correctInput = element.querySelector(`.game__answer--${level.questions[0].answer} input + span`);
    if (correctInput) {
      correctInput.classList.add(`debug`);
    }
  }
};

const showRightAnswersDoubleGame = (debugMode, element, level) => {
  if (debugMode) {
    const correctInputOne = element.querySelector(`.game__option:first-child .game__answer--${level.questions[0].answer} input + span`);
    const correctInputTwo = element.querySelector(`.game__option:nth-child(2) .game__answer--${level.questions[1].answer} input + span`);
    if (correctInputOne && correctInputTwo) {
      correctInputOne.classList.add(`debug`);
      correctInputTwo.classList.add(`debug`);
    }
  }
};

const showRightAnswerTripleGame = (imageSrc, debugMode, element) => {
  if (debugMode) {
    const images = element.querySelectorAll(`img`);
    const correctImage = Array.from(images).find((image) => image.src === imageSrc);
    const correctGameOption = correctImage.parentNode;
    if (correctGameOption) {
      correctGameOption.classList.add(`debug`);
    }
  }
};

const handleSingleGame = (element, level, debugMode, onAnswer) => {
  showRightAnswerSingleGame(debugMode, element, level);
  const contentForm = element.querySelector(`.game__content--wide`);
  const inputs = Array.from(contentForm.elements);
  inputs.forEach((el) => {
    el.addEventListener(`change`, () => {
      const checkedValue = element.querySelector(`input:checked`).value;
      onAnswer(checkedValue === level.questions[0].answer);
    });
  });
};

const handleDoubleGame = (element, level, debugMode, onAnswer) => {
  showRightAnswersDoubleGame(debugMode, element, level);
  const contentForm = element.querySelector(`.game__content`);
  const inputs = Array.from(contentForm.elements);
  inputs.forEach((el) => {
    el.addEventListener(`change`, () => {
      const checkedAnswers = Array.from(contentForm.elements).filter((answer) => answer.checked);
      if (checkedAnswers.length === 2) {
        onAnswer(checkedAnswers[0].value === level.questions[0].answer &&
        checkedAnswers[1].value === level.questions[1].answer);
      }
    });
  });
};

const handleTripleGame = (element, level, debugMode, onAnswer) => {
  const tripleForm = element.querySelector(`.game__content--triple`);
  const questionsArr = level.questions;
  let correctImageSrc;
  if (level.description === `Найдите фото среди изображений`) {
    correctImageSrc = questionsArr.find((question) => question.answer === `photo`).image;
    showRightAnswerTripleGame(correctImageSrc, debugMode, element);
  } else {
    correctImageSrc = questionsArr.find((question) => question.answer === `paint`).image;
    showRightAnswerTripleGame(correctImageSrc, debugMode, element);
  }
  tripleForm.addEventListener(`click`, (evt) => {
    const selectedImageSrc = evt.target.querySelector(`img`).getAttribute(`src`);
    if (level.description === `Найдите фото среди изображений`) {
      correctImageSrc = questionsArr.find((question) => question.answer === `photo`).image;
    } else {
      correctImageSrc = questionsArr.find((question) => question.answer === `paint`).image;
    }
    onAnswer(selectedImageSrc === correctImageSrc);
  });
};

export default class LevelView extends AbstractView {
  constructor(level, answers) {
    super();
    this.level = level;
    this.answers = answers;
    this.debugMode = new URLSearchParams(document.location.search).get(`debug`) === `true`;
  }

  get template() {
    return ` ${this.describeDebugMode()}${gameFormTemplate(this.level)}${statsTemplate(this.answers)}${footerTemplate}`;
  }

  bind() {
    switch (this.level.gameType) {
      case GameType.PHOTO_OR_PICTURE_ONE:
        handleSingleGame(this.element, this.level, this.debugMode, this.onAnswer);
        break;
      case GameType.PHOTO_OR_PICTURE_TWO:
        handleDoubleGame(this.element, this.level, this.debugMode, this.onAnswer);
        break;
      case GameType.FIND_ONE:
        handleTripleGame(this.element, this.level, this.debugMode, this.onAnswer);
        break;
      default:
        throw new RangeError(`No such type of game`);
    }
  }

  describeDebugMode() {
    return this.debugMode ? `<div class="debug">Debug mode. The correct answers are highlighted with a yellow border</div>` : ``;
  }

  onAnswer(answer) {
    return answer;
  }
}
