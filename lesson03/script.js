'use strict';

function task01() {
  let i = 1;
  while (i < 100) {
    let j = 1;
    let count = 0;
    while (j <= i) {
      let res = i % j;
      if (res == 0) {
        count++
      }
      j++;
    }
    if (count <= 2) {
      console.log(i);
    }
    i++;
  }
}

function task03() {
  let basket = createBasket();

  /**
   *@description Функция создает многомерный массив. В каждом подмассиве хранится информация о продукте.
   *Название товара, цена товара за штуку. Количество штук.
   *Массив заполняется пользователем с помощью prompt. 
   * @returns многомерный массив [[товар, цена, количество], [товар, цена, количество]]
   */
  function createBasket() {
    let basket = [];
    let item;
    let itemPrice;
    let itemQuantity;

    let count = 0;
    while (true) {
      item = prompt('Введите название товара. Или нажмите отмена, если Вы все ввели', '');
      if (item === null) {
        break;
      }
      itemPrice = +prompt('Введите его цену', '');
      itemQuantity = +prompt('Введите количество штук этого товара', '');


      basket[count] = [];
      basket[count][0] = item;
      basket[count][1] = itemPrice;
      basket[count][2] = itemQuantity;
      count++;
    }
    return basket;
  }

  /**
   *@description Функция считает стоимость корзины, созданной функцией createBasket, учитывая цену и количество товара
   * 
   * @param {Array} arr многомерный массив, созданный в createBasket [товар, цена, количество] 
   * @returns {number} стоимость представленной корзины
   */
  function countBasketPrice(arr) {
    let basketCost = 0;
    arr.forEach(function(elem) {
      console.log(elem[1]);
      console.log(elem[2]);
      let elemCost = elem[1] * elem[2];
      basketCost += elemCost;
    });
    console.log(`Стоимость корзины равна ${basketCost}`);
    return basketCost;
  }

  countBasketPrice(basket);


  // ВАРИАНТ попроще
  // let basket = [];
  // let item;
  // do {
  //     item = +prompt('Введите стоимость товара', '');
  //     console.log(item);
  //   if (item !== 0 && !isNaN(item)) {
  //     basket.push(item);
  //   }
  // }
  // while (item !== 0);

  // console.log(basket);

  // function countBasketPrice(arr) {
  //   let sum = 0;
  //   for (let i = 0; i < arr.length; i++) {
  //     sum += arr[i];
  //   }
  //   return sum;
  // }

  // console.log(`Сумма товаров в корзине: ${countBasketPrice(basket)}`);
}

function task04() {
  for (let i = 0; i < 10; console.log(i++)) {

  }
}

function task05() {
  let i = 0;
  let row = '*';
  while (i < 20) {
    console.log(row)
    row += '*';
    i++;
  }
}