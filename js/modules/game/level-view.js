import {GameType} from '../../data/data';
import AbstractView from '../abstract-view';
import gameFormTemplate from '../../blocks/game-form';
import statsTemplate from '../../blocks/stats';
import footerTemplate from '../../blocks/footer';

export default class LevelView extends AbstractView {
  constructor(level, answers) {
    super();
    this.level = level;
    this.answers = answers;
  }

  get template() {
    return `${gameFormTemplate(this.level)}${statsTemplate(this.answers)}${footerTemplate}`;
  }

  bind() {
    // одиночная игра
    if (this.level.gameType === GameType.PHOTO_OR_PICTURE_ONE) {
      this.element.addEventListener(`input`, () => {
        const checkedValue = this.element.querySelector(`input:checked`).value;
        if (checkedValue === this.level.questions[0].answer) {
          this.onAnswer(true);
        } else {
          this.onAnswer(false);
        }
      });
    }
    // двойная игра
    if (this.level.gameType === GameType.PHOTO_OR_PICTURE_TWO) {
      const contentForm = this.element.querySelector(`.game__content`);
      this.element.addEventListener(`input`, () => {
        const checkedAnswers = Array.from(contentForm.elements).filter((element) => element.checked);
        if (checkedAnswers.length === 2) {
          if (checkedAnswers[0].value === this.level.questions[0].answer &&
            checkedAnswers[1].value === this.level.questions[1].answer) {
            this.onAnswer(true);
          } else {
            this.onAnswer(false);
          }
        }
      });
    }
    // тройная игра
    if (this.level.gameType === GameType.FIND_ONE) {
      const tripleForm = this.element.querySelector(`.game__content--triple`);
      tripleForm.addEventListener(`click`, (evt) => {
        const selectedImageSrc = evt.target.querySelector(`img`).getAttribute(`src`);
        const questionsArr = this.level.questions;
        let correctImageSrc;
        if (this.level.description === `Найдите фото среди изображений`) {
          correctImageSrc = questionsArr.find((question) => question.answer === `photo`).image;
        } else {
          correctImageSrc = questionsArr.find((question) => question.answer === `paint`).image;
        }
        if (selectedImageSrc === correctImageSrc) {
          this.onAnswer(true);
        } else {
          this.onAnswer(false);
        }
      });
    }

  }

  onAnswer(answer) {
    return answer;
  }

}
