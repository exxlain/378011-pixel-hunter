import {quests} from '../data/quest-data';
import {GameType} from '../data/data';
import AbstractView from './abstract-view';
import statsTemplate from '../blocks/stats';
import footerTemplate from '../blocks/footer';
import headerGameTemplate from '../blocks/header-game';

const getLevel = (level) => quests[`game-${level}`];

export default class LevelView extends AbstractView {
  constructor(state, answers) {
    super();
    this.state = state;
    this.answers = answers;
    this._level = getLevel(state.level);
  }

  get template() {
    switch (this._level.gameType) {
      case GameType.PHOTO_OR_PICTURE_TWO:
        return `${headerGameTemplate(this.state)}<div class="game">
    <p class="game__task">${this._level.description}</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${this._level.questions[0].image}" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="${this._level.questions[1].image}" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <div class="stats">
    </div>
  </div>${statsTemplate(this.answers)}${footerTemplate}`;
      case GameType.PHOTO_OR_PICTURE_ONE:
        return `${headerGameTemplate(this.state)}<div class="game">
    <p class="game__task">${this._level.description}</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${this._level.questions.image}" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <div class="stats">
    </div>
  </div>${statsTemplate(this.answers)}${footerTemplate}`;
      case GameType.FIND_ONE:
        return `${headerGameTemplate(this.state)}<div class="game">
    <p class="game__task">${this._level.description}</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="${this._level.questions[0].image}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${this._level.questions[1].image}" alt="Option 2" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="${this._level.questions[2].image}" alt="Option 3" width="304" height="455">
      </div>
    </form>
    <div class="stats">
    </div>
  </div>${statsTemplate(this.answers)}${footerTemplate}`;
      default:
        throw new RangeError(`No such type of game`);
    }
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
