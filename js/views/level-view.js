import {quests} from '../data/quest-data';
import {GameType} from '../data/data';
import AbstractView from './abstract-view';
import headerGameTemplate from '../blocks/header-game';
import gameFormTemplate from '../blocks/game-form';
import statsTemplate from '../blocks/stats';
import footerTemplate from '../blocks/footer';

const getLevel = (level) => quests[`game-${level}`];

export default class LevelView extends AbstractView {
  constructor(state, answers) {
    super();
    this.state = state;
    this.answers = answers;
    this._level = getLevel(state.level);
  }

  get template() {
    return `${headerGameTemplate(this.state)}${gameFormTemplate(this._level)}${statsTemplate(this.answers)}${footerTemplate}`;
  }

  onAnswer(answer) {
    return answer;
  }

  onBack() {
  }

  bind() {
    // одиночная игра
    if (this._level.gameType === GameType.PHOTO_OR_PICTURE_ONE) {
      this.element.addEventListener(`input`, () => {
        const checkedValue = this.element.querySelector(`input:checked`).value;
        if (checkedValue === this._level.questions.answer) {
          this.onAnswer(true);
        } else {
          this.onAnswer(false);
        }
      });
    }
    // двойная игра
    if (this._level.gameType === GameType.PHOTO_OR_PICTURE_TWO) {
      const contentForm = this.element.querySelector(`.game__content`);
      this.element.addEventListener(`input`, () => {
        const answers = Array.from(contentForm.elements).filter((element) => element.checked);
        if (answers.length === 2) {
          if (answers[0].value === this._level.questions[0].answer &&
            answers[1].value === this._level.questions[1].answer) {
            this.onAnswer(true);
          } else {
            this.onAnswer(false);
          }
        }
      });
    }
    // тройная игра
    if (this._level.gameType === GameType.FIND_ONE) {
      const tripleForm = this.element.querySelector(`.game__content--triple`);
      tripleForm.addEventListener(`click`, (evt) => {
        const selectedImageSrc = evt.target.querySelector(`img`).getAttribute(`src`);
        const questionsArr = this._level.questions;
        let correctImageSrc = questionsArr.find((question) => question.answer === `paint`).image;
        if (selectedImageSrc === correctImageSrc) {
          this.onAnswer(true);
        } else {
          this.onAnswer(false);
        }
      });
    }

    this.element.querySelector(`button.back`).addEventListener(`click`, () => {
      this.onBack();
    });
  }
}
