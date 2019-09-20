import {Position} from './constants.js';

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

/**
 * Вставка дом элемента в контейнер
 * @param {*} container дом элемент куда вставляем
 * @param {*} element элемент для вставки
 * @param {*} place место вставки
 */
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

/**
 * удаление дом элемента и ссылки на него
 * @param {*} element для удаления
 */
const unrender = (element) => {
  if (element) {
    element._element.remove();
    element.removeElement();
  }
};

export {render, unrender, createElement};
