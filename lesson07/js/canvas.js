'use strict';

let canvas = document.querySelector('#canv');
let ctx = canvas.getContext('2d');

let xCoord = document.querySelector('#x-coord');
let yCoord = document.querySelector('#y-coord');

let wrapper = document.querySelector('#app');
let wrapWidth = wrapper.clientWidth;
let wrapHeight = wrapper.clientHeight;
canvas.setAttribute('width', wrapWidth);
canvas.setAttribute('height', wrapHeight);


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
    this.clearCanvas();
    document.querySelector(this.container).addEventListener('input', this.inputHandler);
    document.querySelector(this.container).addEventListener('click', this.clickHandler);
    document.querySelector('.clear').addEventListener('click', this.clearCanvas);

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
    let saveBtn = document.querySelector('#save-button');
    if (evt.target.name === 'tool-button') {
      editor.currentTool = evt.target.dataset.name;
      if (evt.target.dataset.name === 'fill') {
        editor.fillBackground();
      }
      let toolsBtns = document.querySelectorAll('button[name="tool-button"]');
      for (let i = 0; i < toolsBtns.length; i++) {
        toolsBtns[i].classList.remove('activeTool');
        if (evt.target == toolsBtns[i]) {
          toolsBtns[i].classList.add('activeTool');
        }
      }
    } else if (evt.target.name === 'save-button') {
      editor.url = canvas.toDataURL('image/png');
      saveBtn.href = editor.url;
    }
  },
  inputHandler(evt) {
    if (evt.target.name === 'input-obj') {
      editor[`current-${evt.target.dataset.name}`] = evt.target.value;
      editor['current-size'] = evt.target.value;
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
      ctx.closePath();
    };
  },
  drawSpray() {
    canvas.onmousemove = () => {
      let i = 0;
      while (i < 10) {
        let delta = Math.floor(Math.random() * this['current-size'] * 2);
        let delta2 = -Math.floor(Math.random() * this['current-size'] * 2);
        ctx.fillRect(editor.x + delta, editor.y + delta2, 1, 1);
        ctx.fillRect(editor.x + delta, editor.y + delta2, 1, 1);
        i++;
      }
    };
  },
  fillBackground() {
    ctx.fillStyle = editor['current-color'];
    ctx.fillRect(1, 0, editor.width, editor.height);
  },
  clearCanvas() {
    ctx.clearRect(0, 0, editor.width, editor.height);
  }
};


/**
 *@description функция для получения значений цвета из колорпикера
 */
function update(picker) {
  editor['current-color'] = picker.toHEXString();
  ctx.fillStyle = editor['current-color'];
  ctx.strokeStyle = editor['current-color'];
}

editor.init();