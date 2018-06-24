import {GameType} from './data';


const ServerGameTypeMapper = {
  'two-of-two': GameType.PHOTO_OR_PICTURE_TWO,
  'tinder-like': GameType.PHOTO_OR_PICTURE_ONE,
  'one-of-three': GameType.FIND_ONE
};

const ServerPictureTypeMapper = {
  painting: `paint`,
  photo: `photo`
};

const preprocessLevel = (level) => {
  level.description = level.question;
  delete level.question;
  level.gameType = ServerGameTypeMapper[level.type];
  delete level.type;
  level.questions = level.answers;
  delete level.answers;

  level.questions.map((el) => {
    el.width = el.image.width;
    el.height = el.image.height;
    el.image = el.image.url;
    el.answer = ServerPictureTypeMapper[el.type];
    delete el.type;
  });
};

export const adaptServerData = (data) => {
  let newObject = {};
  data.map((el, index) => {
    newObject[`game-${index + 1}`] = el;
  });
  for (let level of Object.values(newObject)) {
    level = preprocessLevel(level);
  }
  return newObject;
};
