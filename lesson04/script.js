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


///////////////////////Задача 2 (с отдельной функцией)///////////////////////////

function task02a() {

  let basket = createBasket();

  /**
   *@description Функция создает объект объектов. В каждом объекте хранится информация о продукте.
   *Название объекта = название товара. Свойства: цена товара за штуку. Количество штук.
   *Объект заполняется пользователем с помощью prompt. 
   * @returns {object} объект объектов {{товар, цена, количество}, {товар, цена, количество}}
   */
  function createBasket() {
    let basket = {};
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
      basket[count] = {};
      basket[count].product = item;
      basket[count].price = itemPrice;
      basket[count].quantity = itemQuantity;
      count++;
    }
    console.dir(basket);
    return basket;
  }

  /**
   *@description Функция считает стоимость корзины, созданной функцией createBasket, учитывая цену и количество товара
   * 
   * @param {object} obj объект, созданный в createBasket [товар, цена, количество] 
   * @returns {number} стоимость представленной корзины
   */
  function countBasketPrice(obj) {
    let basketCost = 0;
    for (let elem in obj) {
      let elemCost = obj[elem].price * obj[elem].quantity;
      basketCost += elemCost;
    };
    console.log(`Стоимость корзины равна ${basketCost}`);
    return basketCost;
  }

  countBasketPrice(basket);
}





///////////////////////Задача 2 (с методом в прототипе)///////////////////////////

function task02b() {

  let basket = createBasket();

  /**
   *@description Функция создает объект объектов. В каждом объекте хранится информация о продукте.
   *Название объекта = название товара. Свойства: цена товара за штуку. Количество штук.
   *Объект заполняется пользователем с помощью prompt. 
   *Также в __proto__ создается метод для подсчета стоимости корзины
   * @returns {object} объект объектов [{товар, цена, количество}, {товар, цена, количество}]
   */
  function createBasket() {
    let basket = {};

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

    basket.__proto__.countBasketPrice = function() {
      let basketCost = 0;
      for (let elem in basket) {
        if (this.hasOwnProperty(elem)) {
          let elemCost = this[elem].price * this[elem].quantity;
          basketCost += elemCost;
        }
      }
      console.log(basketCost);
    };

    console.dir(basket);
    basket.countBasketPrice();

    return basket;
  }
}