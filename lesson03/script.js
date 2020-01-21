'use strict';

/*
////////////////Задача 1: Вариант 1. Простой. Кода поменьше, алгоритм работает дольше////////////////

function task01() {
  let i = 1;
  let arr = [];
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
      arr.push(i);
    }
    i++;
  }
  console.log(`Простые числа: ${arr}`);
}
*/

/*
/////////////Задача 1: Вариант 2. Оптимизированный. Кода побольше, но работать будет быстрее///////////////

function task01() {
  let i = 1;
  let arr = [];
  let isComplicatedNum = false;

  while (i < 101) {
    // записываем 1 и 2, так как очевидно, что они простые
    if (i == 1 || i == 2) {
      arr.push(i);
      i++;
      continue;
    }

    // проверяем оставшиеся числа (от 3)
    let j = 2;
    while (j < (Math.sqrt(i) + 1)) {  // так как достаточно найти только меньший делитель, то ищем до корня из искомого + 1
      if (i % j == 0) { //если число простое, то сюда не зайдем
        isComplicatedNum = true; // если число сложное, здесь меняем значение флага и прерываем внутренний цикл
        break;
      }
      j++; 
    }
    if (!isComplicatedNum) { // если значение флага false, записываем в массив найденное простое число
      arr.push(i);
    }
    isComplicatedNum = false; // возвращаем первоначальное значение флага для дальнейшей работы
    i += 2; // увеличиваем искомое на 2, так как имеет смысл проверять только нечетные
  }
  console.log(`Простые числа: ${arr}`);
}
*/


////////////////////////Задача 1: Вариант3. Решето Эратосфена//////////////////////////

function task01() {
  // генраируем массив от 1 до 100
  let arr = [];
  for (let i = 1; i < 101; i++) {
    arr.push(i);
  }

  // Начинаем фильтровать массив, отсекая составные числа
  let n = 1;
  let previousArr = []; // массив для сравнения текущего и предыдущего вариантов
  while (n < Math.sqrt(arr.length) + 1) { // в цикле убираем делители до корня из максимального искомого
    arr = arr.filter(function(elem) { // используем метод filter чтобы отсекать числа кратные текущему arr[n]
      return (elem == arr[n]) || (elem % arr[n] != 0); // сохраняем первый элемент и все, что не делится без остатка
    });
    if (previousArr.length == arr.length) { // сравниваем длину получившегося массива с длинной предыдущего состояния
      console.log(`Простые числа: ${arr}`); // если они равны, значит мы нашли все простые числа, останавливаем цикл
      break;
    }
    previousArr = arr; // записываем текущий массив в переменную для сравнения на следующем шаге
    n++; // увеличиваем n
  }
}


///////////////////////Задача 2 в задании отсутствовала ///////////////////////////

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
      let elemCost = elem[1] * elem[2];
      basketCost += elemCost;
    });
    console.log(`Стоимость корзины равна ${basketCost}`);
    return basketCost;
  }

  countBasketPrice(basket);
}

/*
///////////////////////////////Задача 3. Вариант попроще////////////////////////////////
let basket = [];
let item;
do {
  item = +prompt('Введите стоимость товара', '');
  console.log(item);
  if (item !== 0 && !isNaN(item)) {
    basket.push(item);
  }
}
while (item !== 0);

console.log(basket);

function countBasketPrice(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

console.log(`Сумма товаров в корзине: ${countBasketPrice(basket)}`);
}
*/


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