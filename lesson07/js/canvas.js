'use strict';

let canvas = document.querySelector('#canv');
let ctx = canvas.getContext('2d');

let xCoord = document.querySelector('#x-coord');
let yCoord = document.querySelector('#y-coord');

let editor = {
  container: '#app',
  width: canvas.getAttribute('width'),
  height: canvas.getAttribute('height'),
  currentTool: null,
  'current-color': '#000',
  'current-size': 5,
  x: 0,
  y: 0,

  init() {
    document.querySelector(this.container).addEventListener('input', this.inputHandler);
    document.querySelector(this.container).addEventListener('click', this.clickHandler);

    canvas.addEventListener('mousemove', this.getCoordinates);
    canvas.addEventListener('mousedown', this.startDraw);
    canvas.addEventListener('mouseup', this.endDraw);
  },
  getCoordinates(evt) {
    editor.x = evt.offsetX;
    editor.y = evt.offsetY;

    xCoord.innerText = editor.x;
    yCoord.innerText = editor.y;
  },
  clickHandler(evt) {
    if (evt.target.name === 'tool-button') {
      editor.currentTool = evt.target.dataset.name;
    } else if (evt.target.name === 'save-button') {
      editor.url = canvas.toDataURL();
      console.log(editor.url);
    }
  },
  inputHandler(evt) {
    if (evt.target.name === 'input-obj') {
      editor[`current-${evt.target.dataset.name}`] = evt.target.value;
      if (evt.target.dataset.name === 'color') {
        ctx.fillStyle = editor['current-color'];
        ctx.strokeStyle = editor['current-color'];
      } else {
        ctx.fillStyle = ctx.fillStyle;
      }
    }
  },
  startDraw() {
    if (editor.currentTool === 'pencil') {
      editor.drawPencil();
    } else if (editor.currentTool === 'brush') {
      editor.drawBrush();
    } else if (editor.currentTool === 'stroke') {
      editor.drawStroke();
    } else if (editor.currentTool === 'spray') {
      editor.drawSpray();
    }
  },
  endDraw() {
    canvas.onmousemove = null;
  },
  drawPencil() {
    canvas.onmousemove = () => {
      ctx.fillRect(editor.x, editor.y, editor['current-size'], editor['current-size']);
    };
  },
  drawBrush() {
    canvas.onmousemove = () => {
      ctx.moveTo(editor.x, editor.y);
      ctx.beginPath();
      ctx.ellipse(editor.x, editor.y, editor['current-size'], editor['current-size'], Math.PI / 4, 0, 2 * Math.PI);
      // ctx.stroke();
      ctx.fill();
      ctx.closePath();
    };
  },
  drawStroke() {
    canvas.onmousemove = () => {
      ctx.moveTo(editor.x, editor.y);
      ctx.beginPath();
      ctx.ellipse(editor.x, editor.y, editor['current-size'], editor['current-size'], Math.PI / 4, 0, 2 * Math.PI);
      ctx.stroke();
      // ctx.fill();
      ctx.closePath();
    };
  },
  drawSpray() {
    canvas.onmousemove = () => {
      ctx.fillRect(editor.x + 10, editor.y + 7, 1, 1);
      ctx.fillRect(editor.x + 3, editor.y + 9, 1, 1);
      ctx.fillRect(editor.x, editor.y, 1, 1);
      ctx.fillRect(editor.x + 7, editor.y + 2, 1, 1);
      ctx.fillRect(editor.x - 9, editor.y - 5, 1, 1);
      ctx.fillRect(editor.x - 5, editor.y - 3, 1, 1);
      ctx.fillRect(editor.x - 2, editor.y - 1, 1, 1);
    };
  },
};

editor.init();