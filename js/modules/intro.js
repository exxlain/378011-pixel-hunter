import {getElementFromTemplate, changeScreen} from '../utils';
import greeting from './greeting';
import footer from './footer';

const introTemplate =
  ` <div id="main" class="central__content">
      <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>${footer}`;

const intro = getElementFromTemplate(introTemplate);

const introAsterisk = intro.querySelector(`.intro__asterisk`);

introAsterisk.addEventListener(`click`, () => {
  changeScreen(greeting);
});

export default intro;
