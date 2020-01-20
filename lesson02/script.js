'use strict';

function task01() {
  console.log('Почему код дает такие результаты?');
  let a = 1,
    b = 1,
    c, d;
  console.log('let a = 1, b = 1, c, d;');
  c = ++a;
  console.log('1 ОПЕРАЦИЯ: c = ++a;');
  console.log(`c = ${c} - так как используется операктор инкремента в префиксной форме. 
  Сначала увеличивает значение операнда на 1 и возвращает новое значение в переменную c`);
  d = b++;
  console.log('2 ОПЕРАЦИЯ: d = b++;');
  console.log(`d = ${d} - так как используется операктор инкремента в постфиксной форме. 
  Сначала возвращает значение операнада b в переменную d, а потом увеличивает значение операнда b на 1`);
  c = (2 + ++a);
  console.log('3 ОПЕРАЦИЯ: c = (2+ ++a);');
  console.log(`c = ${c} - сначала ++a увеличивает значение a на 1 и возвращает его (3).
  после этого 2 суммируется с 3`);
  d = (2 + b++);
  console.log('4 ОПЕРАЦИЯ: d = (2+ b++);');
  console.log(`d = ${d} - сначала b++ возвращает значение b (2) в выражение для дальнейших операций. 
  После этого увеличивает значение b на 1. После этого 2 суммируется с 2`);
  console.log(`a = ${a} - так как первоначальное значение 1 было увеличено на 1 в первой и третьей операциях`);
  console.log(`b = ${b} - так как первоначальное значение 1 было увеличено на 1 во второй и четвертой операциях`);
}

function task02() {
  let a = 2;
  let x = 1 + (a *= 2);
  console.log(`let a = 2;`);
  console.log(`let x = 1 + (a *= 2);`);
  console.log(`x = ${x}, так как сначала a умножается на 2, после этого прибавляется 1. 
  Это значение присваивается x`);
}

function task03() {
  let a = +prompt('Введите первое целое число', '');
  let b = +prompt('Введите второе целое число', '');
  let res;
  console.log(`a = ${a}`);
  console.log(`b = ${b}`);
  if (a >= 0 && b >= 0) {
    console.log(`Выполняю вычитание, так как a и b положительные или 0:`)
    res = a - b;
    console.log(`Результат = ${res}`);
  } else if (a < 0 && b < 0) {
    console.log(`Выполняю умножение, так как a и b отрицательные:`)
    console.log(a * b);
    res = a * b;
    console.log(`Результат = ${res}`);
  } else {
    console.log(`Выполняю сложение, так как a и b разных знаков:`)
    console.log(a + b);
    res = a + b;
    console.log(`Результат = ${res}`);
  }
}

function task04() {
  // Если задача в том, чтобы проваливаться в свитче по вариантам кейс без оператора break, то тогда готово.
  let a = +prompt('Введите число от 0 до 15', '');

  switch (a) {
    case 0:
      console.log(0);
    case 1:
      console.log(1);
    case 2:
      console.log(2);
    case 3:
      console.log(3);
    case 4:
      console.log(4);
    case 5:
      console.log(5);
    case 6:
      console.log(6);
    case 7:
      console.log(7);
    case 8:
      console.log(8);
    case 9:
      console.log(9);
    case 10:
      console.log(10);
    case 11:
      console.log(11);
    case 12:
      console.log(12);
    case 13:
      console.log(13);
    case 14:
      console.log(14);
    case 15:
      console.log(15);
      break;
    default:
      console.log('Что-то Вы не то ввели');
  }
}

function task06() {
  let a = +prompt('Введите первое число', '');
  let b = +prompt('Введите второе число', '');
  let action = prompt('Введите действие (суммировать, вычесть, умножить, поделить)', '');
  console.log(`a = ${a}`);
  console.log(`b = ${b}`);
  console.log(`Выбранное действие - ${action}`);

  function sum(a, b) {
    let res = a + b;
    console.log(`Сумма равна: ${res}`);
    return res;
  }

  function substract(a, b) {
    let res = a - b;
    console.log(`Разность равна: ${res}`);
    return res;
  }

  function multiply(a, b) {
    let res = a * b;
    console.log(`Произведение равно: ${res}`);
    return res;
  }

  function divide(a, b) {
    let res = a / b;
    console.log(`Частное равно: ${res}`);
    return res;
  }

  function mathOperation(arg1, arg2, operation) {
    switch (operation) {
      case 'суммировать':
        return sum(arg1, arg2);
        break;
      case 'вычесть':
        return substract(arg1, arg2);
        break;
      case 'умножить':
        return multiply(arg1, arg2);
        break;
      case 'поделить':
        return divide(arg1, arg2);
        break;
      default:
        console.log('Произошла ошибка. Вероятно некорректно введена математическая операция');
    }
  }

  mathOperation(a, b, action);
}

function task07() {
  let a = 0;
  let n = null;
  console.log('null < 0: ' + (a > n) + ' - так как null приводится к +0 по стандарту');
  console.log('0 < null: ' + (a < n) + ' - так как null приводится к +0 по стандарту');
  console.log('0 == null: ' + (a == n) + ' - так как по стандарту такое сравнение приводит к результату по-умолчанию - false');
  console.log('САМОЕ ИНТЕРЕСНОЕ:')
  console.log('0 >= null: ' + (0 >= null) + ' - так как по стандарту результат получается обратным выражению 0 < null, которое дает false. Соответственно здесь получается true');
  console.log('null >= 0: ' + (null >= 0) + ' - так как по стандарту результат получается обратным выражению null < 0, которое дает false. Соответственно здесь получается true');
  console.log('Все упирается в алгоритмы сравнения, прописанные в стандарте ECMAScript');
  console.log('Статья на эту тему: https://habr.com/ru/company/ruvds/blog/337732/');
}

function task08() {
  console.log('Ничего не гуглил. Прочел методичку. Было интересно. Работает.');
  let arg1 = +prompt('Какое число будем возводить в степень?', '');
  let arg2 = +prompt('В какую степень возводить?', '');

  power(arg1, arg2);

  /**
   *@description Функция возводит число в степень. Использует для этого вложенную функцию posPower,
   * которая рекурсивно возводит число в положительную степень. 
   * Для возведения в отрицательную степень используется деление 1 на результат posPower.
   * @param {number} val число, которое необходимо возвести в степень
   * @param {number} pow степень, в которую необходимо возвести число
   * @returns {number} результат возведения числа в степень
   */
  function power(val, pow) {
    let result;
    if (pow == 0) {
      result = 1;
    } else if (pow > 0) {
      result = posPower(val, pow);
    } else {
      pow = pow * -1;
      result = 1 / posPower(val, pow);
    }
    console.log(`Результат возведения ${val} в сетепень ${pow} = ${result}`);
    return result;

    /**
     *@description функция рекурсивно возводит число в положительную степень
     *
     * @param {number} val число, которое необходимо возвести в степень 
     * @param {number} pow степень, в которую необходимо возвести число
     * @returns {number} результат возведения числа в степень
     */
    function posPower(val, pow) {
      let res = val;
      if (pow == 1) {
        return res;
      } else {
        res *= posPower(val, --pow);
        return res;
      }
    }
  }
}