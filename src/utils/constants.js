const showcaseContainer = document.querySelector('.showcase'); // витрина
const cart = document.querySelector('.cart__container'); // корзина
const checkoutButton = document.getElementById('button'); // кнопка

// Получаем шаблоны
const shelfTemplate = document.getElementById('shelf-template').content; // полки
const productTemplate = document.getElementById('product-template').content; // продукты

const MAX_ITEMS_IN_CART = 3; // количество предметов в корзине

export {
  showcaseContainer,
  cart,
  checkoutButton,
  shelfTemplate,
  productTemplate,
  MAX_ITEMS_IN_CART
};
