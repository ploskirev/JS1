'use strict';

////////////////Задача 1: Вариант 1. Простой. Кода поменьше, алгоритм работает дольше////////////////

function task01a() {
  console.log('Вариант 1. В лоб');
  let i = 1;
  let arr = [];
  while (i < 100) {
    let j = 1;
    let count = 0;
    while (j <= i) {
      let res = i % j;
      if (res == 0) {
        count++;
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


/////////////Задача 1: Вариант 2. Оптимизированный. Кода побольше, но работать будет быстрее///////////////

function task01b() {
  console.log('Вариант 2. Оптимизированный. Кода побольше, но работать будет быстрее');
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
    while (j < (Math.sqrt(i) + 1)) { // так как достаточно найти только меньший делитель, то ищем до корня из искомого + 1
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


////////////////////////Задача 1: Вариант 3. Решето Эратосфена//////////////////////////

function task01c() {
  console.log('Вариант 3. Решето Эратосфена');
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


///////////////////////Задача 3 (на объектах с методом в прототипе)///////////////////////////

function task03() {
  console.log(`Было интересно все же сделать залание с корзиной. 
  Но забежал немного вперед и сделал на объектах и с методом в прототипе`);

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


function task04() {
  for (let i = 0; i < 10; console.log(i++)) {

  }
}


function task05() {
  let row = '';
  while (row.length < 20) {
    console.log(row += '*');
  }
}