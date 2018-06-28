export const resize = (frame, given) => {
  let newObject;
  const ratio = given.width / given.height;
  if ((frame.width / ratio) > frame.height) {
    newObject = {
      width: frame.height * ratio,
      height: frame.height
    };
  } else if ((frame.width / ratio) < frame.height) {
    newObject = {
      width: frame.width,
      height: frame.width / ratio
    };
  } else {
    newObject = {
      width: frame.width,
      height: frame.height
    };
  }
  return newObject;
};

export const resizeImages = (element) => {
  const images = element.querySelectorAll(`.game__option`);
  images.forEach((el) => {
    const frame = {
      width: el.clientWidth,
      height: el.clientHeight,
    };
    const imageElement = el.querySelector(`img`);
    const image = new Image();
    image.src = imageElement.src;
    image.onload = () => {
      const given = {
        width: image.width,
        height: image.height,
      };
      const imageNewSize = resize(frame, given);
      imageElement.width = imageNewSize.width;
      imageElement.height = imageNewSize.height;
    };
  });
};
