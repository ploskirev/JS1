'use strict';

function task01() {
  let celciusTemperature = null,
    fahrenheitTemperature = null;
  while (celciusTemperature == null || isNaN(celciusTemperature)) {
    celciusTemperature = +prompt('Введите температура в градусах Цельсия', '');
  }
  fahrenheitTemperature = 9 / 5 * celciusTemperature + 32;
  console.log(fahrenheitTemperature);
}

function task02() {
  let admin,
    name;
  name = 'Василий';
  admin = name;
  console.log(admin);
}

function task03() {
  console.log('Задание: Чему будет равно JS-выражение 1000 + \'108\'?');
  console.log('В результате получится строка \'1000108\'');
}

function task04() {
  console.log(`по-умолчанию, когда браузер при парсинге html документа встречает скрипт, 
  парсинг html останавливается. 
  Начинает грузится скрипт, потом он выполняется и только после этого возобновляется парсинг html`);
  console.log(`при указании атрибута async, браузер при нахождении скрипта не оставнавливает парсинг html. 
  Скрипт и html грузятся параллельно. Но как-только скрипт загружен, 
  парсинг html останавливается до полного выполнения скрипта.`);
  console.log(`при указании атрибута defer, браузер параллельно грузит скрипт и html, 
  скрипт выполняется только после полной загрузки html`);
}