import {Position} from './constants.js';

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

// рендер компонента
const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

// удаление компонента
const unrender = (element) => {
  if (element) {
    element._element.remove();
    element.removeElement();
  }
};

export {render, unrender, createElement};
