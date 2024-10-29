import { cart } from './src/utils/constants.js';
import {createProducts} from './src/createProducts.js';
import {
  onDrop,
  onDragEnd,
} from './src/dragAndDrop.js';


// Добавление слушателей событий
cart.addEventListener('dragover', event => event.preventDefault());
cart.addEventListener('drop', onDrop);
cart.addEventListener('touchend', onDragEnd);

// Инициализация полок и продуктов
createProducts();
