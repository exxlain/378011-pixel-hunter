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
    // одиночная игра
    if (this.level.gameType === GameType.PHOTO_OR_PICTURE_ONE) {
      showRightAnswerSingleGame(this.debugMode, this.element, this.level);
      const contentForm = this.element.querySelector(`.game__content--wide`);
      const inputs = Array.from(contentForm.elements);
      inputs.forEach((el) => {
        el.addEventListener(`change`, () => {
          const checkedValue = this.element.querySelector(`input:checked`).value;
          this.onAnswer(checkedValue === this.level.questions[0].answer);
        });
      });
    }
    // двойная игра
    if (this.level.gameType === GameType.PHOTO_OR_PICTURE_TWO) {
      showRightAnswersDoubleGame(this.debugMode, this.element, this.level);
      const contentForm = this.element.querySelector(`.game__content`);
      const inputs = Array.from(contentForm.elements);
      inputs.forEach((el) => {
        el.addEventListener(`change`, () => {
          const checkedAnswers = Array.from(contentForm.elements).filter((element) => element.checked);
          if (checkedAnswers.length === 2) {
            this.onAnswer(checkedAnswers[0].value === this.level.questions[0].answer &&
              checkedAnswers[1].value === this.level.questions[1].answer);
          }
        });
      });
    }
    // тройная игра
    if (this.level.gameType === GameType.FIND_ONE) {
      const tripleForm = this.element.querySelector(`.game__content--triple`);
      const questionsArr = this.level.questions;
      let correctImageSrc;
      if (this.level.description === `Найдите фото среди изображений`) {
        correctImageSrc = questionsArr.find((question) => question.answer === `photo`).image;
        showRightAnswerTripleGame(correctImageSrc, this.debugMode, this.element);
      } else {
        correctImageSrc = questionsArr.find((question) => question.answer === `paint`).image;
        showRightAnswerTripleGame(correctImageSrc, this.debugMode, this.element);
      }
      tripleForm.addEventListener(`click`, (evt) => {
        const selectedImageSrc = evt.target.querySelector(`img`).getAttribute(`src`);
        if (this.level.description === `Найдите фото среди изображений`) {
          correctImageSrc = questionsArr.find((question) => question.answer === `photo`).image;
        } else {
          correctImageSrc = questionsArr.find((question) => question.answer === `paint`).image;
        }
        this.onAnswer(selectedImageSrc === correctImageSrc);
      });
    }
  }

  describeDebugMode() {
    return this.debugMode ? `<div class="debug">Debug mode. The correct answers are highlighted with a yellow border</div>` : ``;
  }

  onAnswer(answer) {
    return answer;
  }
}
