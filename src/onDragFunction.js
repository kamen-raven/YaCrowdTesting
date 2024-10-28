import {
  cart,
} from './src/utils/constants.js';

import checkoutButton from './checkoutButton.js';


// Переменные для хранения текущего перетаскиваемого элемента
let draggedItem = null;


// Функция для начала перетаскивания мышью
function onDragStart(event) {
  draggedItem = event.target;
  event.dataTransfer.effectAllowed = 'move';
  draggedItem.classList.add('dragging');
}


// Обработка успешного сброса
function onDrop(event) {
  event.preventDefault();
  draggedItem.classList.remove('dragging');
  if (event.target === cart) {
    cart.appendChild(draggedItem);
    draggedItem.classList.add('inCart');
    checkoutButton();
  }
}

// Завершение перетаскивания мышью
function onDragEnd(event) {
  event.preventDefault();
  draggedItem.classList.remove('dragging');
  draggedItem = null;
}

export {
  onDragStart,
  onDrop,
  onDragEnd,
};
