import { cart, checkoutButton } from './utils/constants.js'
import {
  onDragStart,
  onDragEnd,
  onTouchStart,
  onTouchMove,
  onTouchEnd
} from './dragAndDrop.js';

// Переменная максимального числа продуктов в корзине
const MAX_ITEMS_IN_CART = 3;


// Проверяем, выполнено ли условие для активации кнопки корзины
export function toggleCheckoutButton() {
  const itemsInCart = cart.querySelectorAll('.item__image').length;
  if (itemsInCart === MAX_ITEMS_IN_CART) {
    checkoutButton.classList.remove('hidden');
    toggleItemDraggable(false);
  }
}

// Добавляем или удаляем слушатели на продуктах
export function toggleItemDraggable(enable) {
  document.querySelectorAll('.item').forEach(item => {
    item.draggable = enable;
    if (enable) {
      item.addEventListener('dragstart', onDragStart);
      item.addEventListener('dragend', onDragEnd);
      item.addEventListener('touchstart', onTouchStart);
      item.addEventListener('touchmove', onTouchMove);
      item.addEventListener('touchend', onTouchEnd);
    } else {
      item.removeEventListener('dragstart', onDragStart);
      item.removeEventListener('dragend', onDragEnd);
      item.removeEventListener('touchstart', onTouchStart);
      item.removeEventListener('touchmove', onTouchMove);
      item.removeEventListener('touchend', onTouchEnd);
    }
  });
}
