import {GameType} from '../data/quest-data';

const renderGame = (level) =>{
  switch (level.gameType) {
    case GameType.PHOTO_OR_PICTURE_TWO:
      return `<div class="game">
    <p class="game__task">${level.description}</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${level.questions[0].image}" alt="Option 1" width="468" height="458">
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
        <img src="${level.questions[1].image}" alt="Option 2" width="468" height="458">
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
  </div>`;
    case GameType.PHOTO_OR_PICTURE_ONE:
      return `<div class="game">
    <p class="game__task">${level.description}</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${level.questions.image}" alt="Option 1" width="705" height="455">
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
  </div>`;
    case GameType.FIND_ONE:
      return `<div class="game">
    <p class="game__task">${level.description}</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="${level.questions[0].image}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${level.questions[1].image}" alt="Option 2" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="${level.questions[2].image}" alt="Option 3" width="304" height="455">
      </div>
    </form>
    <div class="stats">
    </div>
  </div>`;
    default:
      throw new RangeError(`No such type of game`);
  }
};

export default renderGame;
