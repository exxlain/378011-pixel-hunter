'use strict';
(function () {
  const body = document.querySelector(`body`);
  const mainElement = body.querySelector(`#main`);
  const templates = [`#greeting`, `#rules`, `#game-1`, `#game-2`, `#game-3`, `#stats`];
  let currentScreen = 0;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;

  const screens = templates.map((key) => document.querySelector(key));

  const showScreen = (screenNumber) => {
    mainElement.innerHTML = ``;
    mainElement.appendChild(screens[screenNumber].cloneNode(true).content);
  };

  // проверка индекса
  const checkIndex = (index) => {
    index = index < 0 ? screens.length - 1 : index;
    index = index >= screens.length ? 0 : index;
    currentScreen = index;
    return currentScreen;
  };

  document.addEventListener(`keydown`, (evt) => {
    switch (evt.keyCode) {
      case RIGHT_ARROW:
        showScreen(checkIndex(++currentScreen));
        break;
      case LEFT_ARROW:
        showScreen(checkIndex(--currentScreen));
        break;
    }
  });

  showScreen(currentScreen);

  // работа с визуальными стрелками
  const arrowTemplate = () => {
    return `
    <div class="arrows__wrap">
  <style>
    .arrows__wrap {
      position: absolute;
      top: 95px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>
  <button class="arrows__btn"><-</button>
  <button class="arrows__btn">-></button>
</div>`;
  };

  const getElementFromTemplate = (template) => {
    const container = document.createElement(`template`);
    container.innerHTML = template;
    return container.content;
  };

  body.appendChild(getElementFromTemplate(arrowTemplate()));

  const arrowsWrap = body.querySelector(`.arrows__wrap`);
  const leftArrow = arrowsWrap.querySelector(`button:first-of-type`);
  const rightArrow = arrowsWrap.querySelector(`button:last-of-type`);

  leftArrow.addEventListener(`click`, () => {
    showScreen(checkIndex(--currentScreen));
  });

  rightArrow.addEventListener(`click`, () => {
    showScreen(checkIndex(++currentScreen));
  });
}());
