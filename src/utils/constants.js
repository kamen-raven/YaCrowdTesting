const showcaseContainer = document.querySelector('.showcase'); // витрина
const cart = document.querySelector('.cart__container'); // корзина
const inCart = document.querySelectorAll('.inCart'); // в корзине
const checkoutButton = document.getElementById('button'); // кнопка

// Получаем шаблоны
const shelfTemplate = document.getElementById('shelf-template').content; // полки
const productTemplate = document.getElementById('product-template').content; // продукты


export {
  showcaseContainer,
  cart,
  inCart,
  checkoutButton,
  shelfTemplate,
  productTemplate,
};
