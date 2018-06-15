const resize = (frame, given) => {
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

export default resize;
