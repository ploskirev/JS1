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
    document.querySelector(this.container).addEventListener ('input', this.inputHandler);
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
    }
  },
  inputHandler(evt) {
    if (evt.target.name === 'input-obj') {
      editor[`current-${evt.target.dataset.name}`] = evt.target.value;
      evt.target.dataset.name === 'color' ? ctx.fillStyle = editor['current-color'] : ctx.fillStyle = ctx.fillStyle;
    }
  },
  startDraw() {
    if (editor.currentTool === 'pencil') {
      editor.drawPencil();
    } else if (editor.currentTool === 'brush') {
      editor.drawBrush();
    } else if (editor.currentTool === 'stroke') {
      editor.drawStroke();
    }
  },
  endDraw() {
    canvas.onmousemove = null;
  },
  drawPencil() {
    canvas.onmousemove = () => {
      ctx.fillRect (editor.x, editor.y, editor['current-size'], editor['current-size']);
    };
  },
  drawBrush() {
    canvas.onmousemove = () => {
      ctx.moveTo(editor.x, editor.y);
      ctx.beginPath();
      ctx.ellipse (editor.x, editor.y, editor['current-size'], editor['current-size'], Math.PI/4, 0, 2*Math.PI);
      // ctx.stroke();
      ctx.fill();
      ctx.closePath();
    };
  },
  drawStroke() {
    canvas.onmousemove = () => {
      ctx.moveTo(editor.x, editor.y);
      ctx.beginPath();
      ctx.ellipse (editor.x, editor.y, editor['current-size'], editor['current-size'], Math.PI/4, 0, 2*Math.PI);
      ctx.stroke();
      // ctx.fill();
      ctx.closePath();
    };
  }
};

editor.init();