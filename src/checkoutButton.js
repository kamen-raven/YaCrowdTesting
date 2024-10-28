import {
  cart,
  checkoutButton,
  MAX_ITEMS_IN_CART
} from './src/utils/constants.js';

import {
  onDragStart,
  onDragEnd
} from './onDragFunction.js';


function toggleItemDraggable(enable) {
  document.querySelectorAll('.item').forEach(item => {
    item.draggable = enable;
    if (enable) {
      item.addEventListener('dragstart', onDragStart);
      item.addEventListener('dragend', onDragEnd);
    } else {
      item.removeEventListener('dragstart', onDragStart);
      item.removeEventListener('dragend', onDragEnd);
    }
  });
}

export default function checkoutButton() {
  const itemsInCart = cart.querySelectorAll('.item__image').length;
  if (itemsInCart === MAX_ITEMS_IN_CART) {
    checkoutButton.classList.remove('hidden');
    toggleItemDraggable(false);
  }
}