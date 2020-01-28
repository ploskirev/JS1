'use strict';


function task01() {

  class Converter {
    constructor(hundreds, dozens, units) {
      this['сотни'] = hundreds;
      this['десятки'] = dozens;
      this['единицы'] = units;
    }
  }

  /**
   *@description функция проверяет корректность ввода пользователя
   *
   * @param {string} num число в виде строки, полученное от пользователя. Должно быть от 0 до 999
   * @returns {boolean} true - если ввод корректный. False - если ввод некорректный
   */
  function isСorrectNum(num) {
    if (+num > 0 && +num < 999 && !isNaN(+num) && num != '' && num != null && num.length < 4) {
      return true;
    } else {
      console.log('Введенное число некорректно');
      return false;
    }
  }

  /**
   *@description функция конвертирует число в объект по разрядам сотни = , десятки = , единицы =
   *
   * @param {string} num число в виде строки, полученное от пользователя. Должн быть от 0 до 999
   * @returns {object} возвращает объект с полученными разрядами
   */
  function convertNum(num) {
    (num.length == 2) && (num = '0' + num);
    (num.length == 1) && (num = '00' + num);
    let obj = new Converter(...num);
    console.log(obj);
    return obj;
  }

  /**
   *@description запускает процесс проверки введенного числа и конвертации в объект
   *
   * @param {string} num - число в виде строки, полученное от пользователя. Должн быть от 0 до 999
   * @returns {object} - возвращает конвертированный объект или пустой объект, если введенное число некорректно
   */
  function startConvertation(num) {
    return isСorrectNum(num) ? convertNum(num) : {};
  }

  let inputNumber = prompt('Введите число от 0 до 999', '');
  startConvertation(inputNumber);
}



function task02() {
  // исходные данные
  let PRODUCTS_NAMES = ['Processor', 'Display', 'Notebook', 'Mouse', 'Keyboard'];
  let PRICES = [100, 120, 1000, 15, 18];
  let IDS = [0, 1, 2, 3, 4];

  let products = [];

  function createProductsDTO() {
    let length = IDS.length;

    for (let i = 0; i < length; i++) {
      products.push(createProduct(i));
    }
  }

  function createProduct(index) {
    return {
      product_name: PRODUCTS_NAMES[index],
      price: PRICES[index],
      id_product: IDS[index]
    };
  }
  // конец исходных данных

  /**
   *@description Функция создает пустую корзину в виде пустого массива
   *
   * @returns {array} возвращает пустой массив
   */
  function createBasket() {
    let basket = [];
    return basket;
  }

  /**
   *@description добавляет продукт созданный в createProductBasket в корзину
   *
   * @param {array} basket корзина, представленная в виде массива
   * @param {number} index индекс продукта в исходном массиве products
   * @param {number} quantity количество единиц добавляемого продукта
   * @returns {array} возвращает корзину, в виде массива с добавленным объектом продукта
   */
  function addProductToBasket(basket, index, quantity) {
    let chosenProduct = createProductBasket(index, quantity);
    basket.push(chosenProduct);
    return basket;
  }

  /**
   *@description создает объект выбранного продукта, который будет помещен в корзину
   *
   * @param {number} index индекс продукта в исходном массиве products
   * @param {number} quantity количество единиц добавляемого продукта
   * @returns {object} возвращает обект продукта, готовый для добавления в корзину
   */
  function createProductBasket(index, quantity) {
    return {
      product: products[index].product_name,
      price: products[index].price,
      id: products[index].id_product,
      quantity: quantity
    };
  }

  /**
   *@description удаляет выбранный продукт из корзины
   *
   * @param {array} basket корзина в виде массива продуктов (объектов)
   * @param {number} basketIndex - индекс удаляемого продукта в массиве (корзине)
   * @returns {array} корзину продуктов в виде массива без удаленного продукта
   */
  function removeProductFromBasket(basket, basketIndex) {
    basket.splice(basketIndex, 1);
    return basket;
  }

  /**
   *@description считает общую стоимость продуктов в корзине, учитывая их количество
   *
   * @param {array} basket - корзина в виде массива продуктов (объектов)
   * @returns {number} возвращает общую стоимость продуктов в корзине
   */
  function countBasketPrice(basket) {
    let basketCost = 0;
    basket.forEach(function(product) {
      let elemCost = product.price * product.quantity;
      basketCost += elemCost;
    });
    console.log(`Общая стоиомсть выбранных продуктов в корзине : ${basketCost}`);
    return basketCost;
  }

  createProductsDTO();

  console.log(`Список доступных продуктов:`);
  console.log(products);

  let basket = createBasket();

  console.log('Добавляем товары в корзину');
  basket = addProductToBasket(basket, 0, 2);
  basket = addProductToBasket(basket, 3, 2);
  basket = addProductToBasket(basket, 2, 5);


  console.log(`Ваша корзина: `);
  console.log(basket);

  console.log('Подсчитываем общую стоимость товаров в корзине');
  countBasketPrice(basket);
}


//////// Дальше Быки и коровы/////////

/**
 * @description Запускает игру, запускает остальные функции. Функции ввода предположения и сравнения его с загаданным числом зациклены бесконечно, до момента угадывания загаданного числа
 */
function startGame() {
  getRules();
  let secretNum = getNumber();
  console.log(secretNum);  // Показываю загаданное число для проверки игры
  let counter = 0;
  while (true) {
    counter++;
    if (startRound(secretNum)) {
      break;
    }
  }
  console.log(`Поздравляю! Загаданное число - ${secretNum}. Число попыток: ${counter}`);
}

/**
 * @description Описывает правила игры в консоли
 */
function getRules() {
  console.log('Я загадала 4 неповторяющиеся цифры. Тебе нужно их отгадать в порядке, в котором я их загадала');
  console.log('Я буду тебе давать подсказки после каждого предположения');
  console.log('Количество коров - когда ты угадываешь цифру, но не ее позицию');
  console.log('количество быков - когда ты угадываешь и цифру и ее позицию. Удачи!');
}

/**
 * @description Генерирует случайное четырехзначное число, из неповторяющихся цифр
 * @returns {string} Возвращает четырехзначное число в виде строки, которое в дальнейшем нужно угадать
 */
function getNumber() {
  let secretNum = '';
  for (let i = 0; i < 4; i++) {
    let digit = getRandomDigit();
    checkDigit(digit, secretNum) ? i-- : secretNum += digit;
  }
  return secretNum;
}

/**
 *@description Генерирует случайное число от 0 до 10, не включая 10
 *
 * @returns {number} возвращает число от 0 до 10, не включая 10
 */
function getRandomDigit() {
  return Math.floor(Math.random() * 10);
}

/**
 *@description проверяет содержится ли число в строке
 *
 * @param {number} num - проверяемое число
 * @param {string} str - проверяемая строка
 * @returns {boolean} возвращает true, если число в строке содаржится, иначе возвращает false
 */
function checkDigit(num, str) {
  return (str.includes(num) ? true : false);
}

/**
 * @description Позволяет пользователю ввести свое предположение о загаданном числе при помощи promt
 * @returns {string} Возвращает число в виде строки, введенное пользователем
 */
function makeGuess() {
  let guess = prompt('Сделайте свое предположение');
  return guess;
}

/**
 *@description функция заускает один раунд игры
 *
 * @param {string} secret - загаданное число
 * @returns возвращает true только если пользователь угадал загаданное число (пришло true из makeCompartion)
 */
function startRound(secret) {
  let guess = makeGuess();
  if (makeCompartion(guess, secret)) {
    return true;
  }
}

/**
 * @description Сравнивает цифры из загаданного числа и числа введенного пользователем, считает количество быков и коров
 * @param {string} guess - предположенное пользователем число
 * @param {string} secret - загаданное число
 * @returns возвращает true только если пользователь угадал загаданное число
 */
function makeCompartion(guess, secret) {
  if (guess == secret) {
    return true;
  } else {
    let bulls = searchBulls(guess, secret);
    let cows = searchCows(guess, secret, bulls);
  }
}

/**
 *@description функция считает число быков в предположенном варианте пользователя
 *
 * @param {string} guess - предположенное пользователем число
 * @param {string} secret - загаданное число
 * @returns {number} возвращает количество найденных быков
 */
function searchBulls(guess, secret) {
  let bulls = 0;
  for (let i = 0; i < secret.length; i++) {
    (guess[i] == secret[i]) && (bulls++);
  }
  console.log(`Быков: ${bulls}`);
  return bulls;
}

/**
 *@description функция считает число коров в предположенном варианте пользователя
 *
 * @param {string} guess - предположенное пользователем число
 * @param {string} secret - загаданное число
 * @param {number} bulls - найденное количество быков в предположении пользователя
 * @returns {number} возвращает количество найденных быков
 */
function searchCows(guess, secret, bulls) {
  let cows = 0;
  for (let i = 0; i < secret.length; i++) {
    (secret.includes(guess[i])) && (cows++);
  }
  console.log(`Коров: ${cows - bulls}`);
  return cows - bulls;
}