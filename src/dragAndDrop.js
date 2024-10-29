import { cart, inCart } from './utils/constants.js';
import { toggleCheckoutButton } from './cart.js';

// Переменные для хранения текущего перетаскиваемого элемента
let draggedItem = null;
// Для touch
let touchStartX = 0;
let touchStartY = 0;


/* DRAG */
// Функция для начала перетаскивания мышью
export function onDragStart(event) {
  draggedItem = event.target;
  event.dataTransfer.effectAllowed = 'move';
  draggedItem.classList.add('dragging');
}

// Обработка успешного сброса
export function onDrop(event) { 
  event.preventDefault();
  draggedItem.classList.remove('dragging');
  if (event.target === cart || inCart) { 
    cart.appendChild(draggedItem);
    draggedItem.classList.add('inCart');
    toggleCheckoutButton();
  }
}

// Завершение перетаскивания мышью
export function onDragEnd(event) {
  event.preventDefault();
    draggedItem.classList.remove('dragging');
    draggedItem = null;
}


/* TOUCH */
// Начало перетаскивания touch
export function onTouchStart(event) {
  const touch = event.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
  draggedItem = event.target;
}

// Движение перетаскивания touch
export function onTouchMove(event) {
  if (!draggedItem) return;
  const touch = event.touches[0];
  const deltaX = touch.clientX - touchStartX;
  const deltaY = touch.clientY - touchStartY;
  draggedItem.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
}

// Завершение перетаскивания touch
export function onTouchEnd(event) {
  if (!draggedItem) return;
  draggedItem.style.transform = '';
  if (isOverCart(event.changedTouches[0])) {
    cart.appendChild(draggedItem);
    draggedItem.classList.add('inCart');
    toggleCheckoutButton();
  }
  draggedItem = null;
}

// Проверка, находится ли элемент над корзиной
function isOverCart(touch) {
  const cartRect = cart.getBoundingClientRect();
  return (
    touch.clientX > cartRect.left &&
    touch.clientX < cartRect.right &&
    touch.clientY > cartRect.top &&
    touch.clientY < cartRect.bottom
  );
}