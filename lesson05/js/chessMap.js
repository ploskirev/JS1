'use strict';


/**
 *@description функция создает строку шахматного поля (элемент tr, в который добавляет 8 элементов td)
 *
 * @returns возвращает строку tr с 8 вложенными элементами td
 */
function createRow() {
  let row = document.createElement('tr');
  let cells = [];
  for (let i = 0; i < 8; i++) {
    cells[i] = document.createElement('td');
    row.appendChild(cells[i]);
  }
  return row;
}

/**
 *@description функция создает шахматное поле путем создания 8 строк, созданных функцией createRow, обернутое в элемент table
 *
 * @returns возвращает созданное шахматное поле (элемент table)
 */
function createMap() {
  let map = document.createElement('table');
  for (let i = 0; i < 8; i++) {
    map.appendChild(createRow(i));
  }
  return map;
}

/**
 *@description функция модифицирует созданное шахматное поле, добавляя к нему подписи строк
 *
 * @param {*} map - шахматное поле, созданное в функции createMap
 */
function addRowsCaptions(map) {
  let rows = map.querySelectorAll('tr');
  console.log(rows);
  let rowCaptionText = 8;
  rows.forEach(function(row) {
    let rowCaptionLeft = document.createElement('th');
    let rowCaptionRight = document.createElement('th');
    rowCaptionLeft.innerText = rowCaptionText;
    rowCaptionRight.innerText = rowCaptionText;
    rowCaptionText--;
    row.insertBefore(rowCaptionLeft, row.children[0]);
    row.appendChild(rowCaptionRight);
  });
}

/**
 *@description функция добавляет верхние и нижние подписи для столбцов шахматного поля. Подписи создаются в функции createColCaption
 *
 * @param {*} map - шахматное поле с уже добавленными подписями строк (после использования функции addRowsCaptions)
 */
function addColCaptions(map) {
  let colCaptionTop = createColCaption();
  let colCaptionBottom = createColCaption();
  map.insertBefore(colCaptionTop, map.children[0]);
  map.appendChild(colCaptionBottom);
}

/**
 *@description функция создает строку tr, которая содержит в себе 8 элементов th (подписи для столбцов шахматного поля)
 *
 * @returns возвращает созданную строку tr (с подписями для столбцов шахматного поля)
 */
function createColCaption() {
  let colCaption = document.createElement('tr');
  let cells = [];
  let colCaptionsText = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', ''];
  for (let i = 0; i < 10; i++) {
    cells[i] = document.createElement('th');
    cells[i].innerText = colCaptionsText[i];
    colCaption.appendChild(cells[i]);
  }
  return colCaption;
}


/**
 *@description Функция отрисовывает шахматное поле. Создает разметку, стили для которой объявлены в CSS
 * использует для отрисовки функции createMap, addRowsCaptions, addColCaptions
 *
 */
function drawChessField() {
  let map = document.body.appendChild(createMap());
  addRowsCaptions(map);
  addColCaptions(map);
}