const products = [
  { id: 1, title: 'wine', image: './images/items/Wine.svg' },
  { id: 2, title: 'milk', image: './images/items/Milk.svg' },
  { id: 3, title: 'jam', image: './images/items/Jam.svg' },
  { id: 4, title: 'cheese', image: './images/items/Cheese.svg' },
  { id: 5, title: 'meat', image: './images/items/Meat.svg' },
  { id: 6, title: 'chicken', image: './images/items/Chicken.svg' },
  { id: 7, title: 'chips', image: './images/items/Chips.svg' },
  { id: 8, title: 'pineapple', image: './images/items/Pineapple.svg' },
  { id: 9, title: 'banana', image: './images/items/Banana.svg' },
  { id: 10, title: 'apple', image: './images/items/Apple.svg' },
  { id: 11, title: 'salad', image: './images/items/Salad.svg' }
];

// Получаем шаблоны
const shelfTemplate = document.getElementById('shelf-template').content;
const productTemplate = document.getElementById('product-template').content;

function createShelves() {
  const store = document.querySelector('.showcase');
  const shelvesData = [products.slice(0, 4), products.slice(4, 7), products.slice(7, 11)];

  shelvesData.forEach(items => {
    const shelf = shelfTemplate.cloneNode(true).querySelector('.shelf');
    shelf.append(...createProductElements(items));
    store.appendChild(shelf);
  });
}

function createProductElements(items) {
  return items.map(item => {
    const productElement = productTemplate.cloneNode(true).querySelector('.item');
    productElement.querySelector('img').src = item.image;
    productElement.classList.add(item.title);
    productElement.dataset.item = item.title;
    productElement.draggable = true;

    
    productElement.addEventListener('dragstart', onDragStart);
    productElement.addEventListener('touchstart', onTouchStart);
    return productElement;
  });
}

const cart = document.querySelector('.cart__container');
const checkoutButton = document.getElementById('checkout');
let draggedItem = null;

function onDragStart(event) {
  draggedItem = event.target;
  setTimeout(() => draggedItem.classList.add('dragging'), 0);
}

function onTouchStart(event) {
  draggedItem = event.target;
  draggedItem.classList.add('dragging');
  const touch = event.touches[0];
  draggedItem.style.left = `${touch.clientX}px`;
  draggedItem.style.top = `${touch.clientY}px`;
}

cart.addEventListener('dragover', event => event.preventDefault());
cart.addEventListener('drop', onDrop);
cart.addEventListener('touchend', onDrop);

function onDrop(event) {
  event.preventDefault();
  if (draggedItem) {
    cart.appendChild(draggedItem);
    draggedItem.classList.remove('dragging');
    draggedItem = null;
    toggleCheckoutButton();
  }
}

document.querySelectorAll('.showcase').forEach(store => {
  store.addEventListener('dragover', event => event.preventDefault());
  store.addEventListener('drop', event => {
    event.preventDefault();
    if (draggedItem && event.currentTarget) {
      event.currentTarget.appendChild(draggedItem);
      draggedItem.classList.remove('dragging');
      draggedItem = null;
      toggleCheckoutButton();
    }
  });
});

function toggleCheckoutButton() {
  const itemsInCart = cart.querySelectorAll('.item').length;
  checkoutButton.classList.toggle('hidden', itemsInCart < 3);
}

// Инициализация полок и продуктов
createShelves();
