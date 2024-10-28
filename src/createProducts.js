import { products } from "./utils/dataProducts.js";

import {   
  showcaseContainer,
  shelfTemplate,
  productTemplate,
} from './utils/constants.js';

import {
  onDragStart,
  onDragEnd
} from './onDragFunction.js';


// Создание элементов продуктов
function createProductElements(items) {
  return items.map(item => {
    const productElement = productTemplate.cloneNode(true).querySelector('.item');
    productElement.querySelector('img').src = item.image;
    productElement.classList.add(item.title);

    productElement.draggable = true;

    // Обработчики событий
    productElement.addEventListener('dragstart', onDragStart);
    productElement.addEventListener('dragend', onDragEnd);
    return productElement;
  });
}


// Создание полок с продуктами
function createProducts() {
  const shelvesData = [products.slice(0, 4), products.slice(4, 7), products.slice(7, 11)];

  shelvesData.forEach(items => {
    const shelf = shelfTemplate.cloneNode(true).querySelector('.shelf');
    shelf.append(...createProductElements(items));
    showcaseContainer.appendChild(shelf);
  });
}
export default createProducts;