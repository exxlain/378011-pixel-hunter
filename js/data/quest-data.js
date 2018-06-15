import {images} from './images';
import {GameType} from './data';

export const quests = Object.freeze({
  'game-1': {
    description: `Угадайте для каждого изображения фото или рисунок?`,
    gameType: GameType.PHOTO_OR_PICTURE_TWO,
    questions: [{
      image: images.photos[1],
      answer: `photo`
    }, {
      image: images.photos[2],
      answer: `paint`
    }]
  },
  'game-2': {
    description: `Угадай, фото или рисунок?`,
    gameType: GameType.PHOTO_OR_PICTURE_ONE,
    questions: {
      image: images.photos[0],
      answer: `photo`
    }
  },
  'game-3': {
    description: `Найдите рисунок среди изображений`,
    gameType: GameType.FIND_ONE,
    questions: [{
      image: images.paintings[0],
      answer: `paint`
    }, {
      image: images.animals[0],
      answer: `photo`
    }, {
      image: images.others[5],
      answer: `photo`
    }]
  },
  'game-4': {
    description: `Угадайте для каждого изображения фото или рисунок?`,
    gameType: GameType.PHOTO_OR_PICTURE_TWO,
    questions: [{
      image: images.animals[1],
      answer: `photo`
    }, {
      image: images.animals[2],
      answer: `paint`
    }]
  },
  'game-5': {
    description: `Угадай, фото или рисунок?`,
    gameType: GameType.PHOTO_OR_PICTURE_ONE,
    questions: {
      image: images.animals[3],
      answer: `photo`
    }
  },
  'game-6': {
    description: `Найдите рисунок среди изображений`,
    gameType: GameType.FIND_ONE,
    questions: [{
      image: images.paintings[1],
      answer: `paint`
    }, {
      image: images.animals[4],
      answer: `photo`
    }, {
      image: images.others[6],
      answer: `photo`
    }]
  },
  'game-7': {
    description: `Угадайте для каждого изображения фото или рисунок?`,
    gameType: GameType.PHOTO_OR_PICTURE_TWO,
    questions: [{
      image: images.animals[5],
      answer: `photo`
    }, {
      image: images.animals[6],
      answer: `paint`
    }]
  },
  'game-8': {
    description: `Угадай, фото или рисунок?`,
    gameType: GameType.PHOTO_OR_PICTURE_ONE,
    questions: {
      image: images.others[4],
      answer: `photo`
    }
  },
  'game-9': {
    description: `Найдите рисунок среди изображений`,
    gameType: GameType.FIND_ONE,
    questions: [{
      image: images.paintings[2],
      answer: `paint`
    }, {
      image: images.others[0],
      answer: `photo`
    }, {
      image: images.others[3],
      answer: `photo`
    }]
  },
  'game-10': {
    description: `Угадайте для каждого изображения фото или рисунок?`,
    gameType: GameType.PHOTO_OR_PICTURE_TWO,
    questions: [{
      image: images.others[1],
      answer: `photo`
    }, {
      image: images.others[2],
      answer: `paint`
    }]
  }
});
