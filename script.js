import { products } from "./src/utils/dataProducts.js";




const showcaseContainer = document.querySelector('.showcase');
const cart = document.querySelector('.cart__container');
const checkoutButton = document.getElementById('button');


// Получаем шаблоны
const shelfTemplate = document.getElementById('shelf-template').content;
const productTemplate = document.getElementById('product-template').content;

const MAX_ITEMS_IN_CART = 3;


// Создание полок с продуктами
function createShelves() {
  const shelvesData = [products.slice(0, 4), products.slice(4, 7), products.slice(7, 11)];

  shelvesData.forEach(items => {
    const shelf = shelfTemplate.cloneNode(true).querySelector('.shelf');
    shelf.append(...createProductElements(items));
    showcaseContainer.appendChild(shelf);
  });
}

// Создание элементов продуктов
function createProductElements(items) {
  return items.map(item => {
    const productElement = productTemplate.cloneNode(true).querySelector('.item');
    productElement.querySelector('img').src = item.image;
    productElement.classList.add(item.title);

    productElement.draggable = true;

    // Добавление событий для мыши
    productElement.addEventListener('dragstart', onDragStart);
    productElement.addEventListener('dragend', onDragEnd);

    // Добавление событий для touch
    productElement.addEventListener('touchstart', onTouchStart);
    productElement.addEventListener('touchmove', onTouchMove);
    productElement.addEventListener('touchend', onTouchEnd);

    return productElement;
  });
}

// Переменные для хранения текущего перетаскиваемого элемента

function toggleCheckoutButton() {
  const itemsInCart = cart.querySelectorAll('.item__image').length;
  if (itemsInCart === MAX_ITEMS_IN_CART) {
    checkoutButton.classList.remove('hidden');
    toggleItemDraggable(false);
  }
}

function toggleItemDraggable(enable) {
  document.querySelectorAll(' .item').forEach(item => {
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
    toggleCheckoutButton();
  }
}

// Завершение перетаскивания мышью
function onDragEnd(event) {
  event.preventDefault();
    draggedItem.classList.remove('dragging');
    draggedItem = null;
}


// Добавление слушателей событий
cart.addEventListener('dragover', event => event.preventDefault());
cart.addEventListener('drop', onDrop);
cart.addEventListener('touchend', onDragEnd);
//cartImg.addEventListener('dragover', event => event.preventDefault());


// Инициализация полок и продуктов
createShelves();


let touchStartX = 0;
let touchStartY = 0;


// Начало перетаскивания touch
function onTouchStart(event) {
  const touch = event.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
  draggedItem = event.target;
  draggedItem.classList.add('dragging1');
}

// Движение перетаскивания touch
function onTouchMove(event) {
  if (!draggedItem) return;
  const touch = event.touches[0];
  const deltaX = touch.clientX - touchStartX;
  const deltaY = touch.clientY - touchStartY;
  draggedItem.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
}

// Завершение перетаскивания touch
function onTouchEnd(event) {
  if (!draggedItem) return;
  draggedItem.style.transform = '';
  draggedItem.classList.remove('dragging');
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