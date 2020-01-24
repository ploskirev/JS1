'use strict';


function task01() {
  let num = +prompt('Введите число от 0 до 999', '');

  function convertNum(num) {
    let objFromNum = {};

    if (num < 0 || num > 999 || isNaN(num)) {
      console.log('Введенное число некорректно');
      return objFromNum;
    } else {
      let numToArr = Array.from(String(num));
      objFromNum['единицы'] = numToArr[numToArr.length - 1];
      numToArr.length > 1 && (objFromNum['десятки'] = numToArr[numToArr.length - 2]);
      numToArr.length > 2 && (objFromNum['сотни'] = numToArr[numToArr.length - 3]);
      return objFromNum;
    }
  }
  console.log(convertNum(num));
}


///////////////////////Задача 2 (с методом в прототипе)///////////////////////////
function task02() {
  
  function Basket() {}; // создаю через конструктор, чтобы объявить метод не в самом объекте, 
  // а в прототипе, чтобы в дальнейшем он не перебирался в for in

  Basket.prototype.countBasketPrice = function() {
    let basketCost = 0;
    for (let elem in basket) {
      if (this.hasOwnProperty(elem)) {
        let elemCost = this[elem].price * this[elem].quantity;
        basketCost += elemCost;
      }
    }
    console.log(`Полная стоимость Вашей корзины = ${basketCost}`);
  };

  let basket = new Basket();

  while (true) {
    let item = prompt('Введите название товара. Или нажмите отмена, если Вы все ввели', '');
    if (item === null) {
      break;
    }
    let itemPrice = +prompt('Введите его цену', '');
    let itemQuantity = +prompt('Введите количество штук этого товара', '');
    basket[item] = {};
    basket[item].price = itemPrice;
    basket[item].quantity = itemQuantity;
  }
  console.log(`Ваша корзина:`);
  console.dir(basket);

  basket.countBasketPrice();

  return basket;
}