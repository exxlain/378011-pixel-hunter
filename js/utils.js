const mainElement = document.querySelector(`main.central`);

export const getElementFromTemplate = (template) => {
  const container = document.createElement(`div`);
  container.innerHTML = template;
  return container;
};

export const render = () => {
  const container = document.createElement(`div`);
  return container;
};

export const changeScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};

