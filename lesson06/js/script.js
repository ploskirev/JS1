'use strict';

// Объект с пришедшими данными
let incomingData = {
  PRODUCTS_NAMES: ['Processor', 'Display', 'Notebook', 'Mouse', 'Keyboard'],
  PRICES: [100, 120, 1000, 15, 18],
  IDS: [0, 1, 2, 3, 4],
  IMG: ['https://www.placehold.it/200x150', 'https://www.placehold.it/200x150', 'https://www.placehold.it/200x150',
  'https://www.placehold.it/200x150', 'https://www.placehold.it/200x150'],
  BASKETIMG: ['https://www.placehold.it/100x80', 'https://www.placehold.it/100x80', 'https://www.placehold.it/100x80',
  'https://www.placehold.it/100x80', 'https://www.placehold.it/100x80']
};

// Объект, который обрабатывает пришедшие данные и хранит их в виде массива продуктов
let allProducts = {
  items: [],
  createProductsDTO() {
    this.items = [];
    for (let i = 0; i < incomingData.IDS.length; i++) {
      this.items.push(this.createProduct(i));
    }
  },
  createProduct(index) {
    return {
      product_name: incomingData.PRODUCTS_NAMES[index],
      price: incomingData.PRICES[index],
      id_product: incomingData.IDS[index],
      product_img: incomingData.IMG[index],
      product_basket_img: incomingData.BASKETIMG[index],
    };
  }
};



let basketDiv = document.getElementById('basket');
let basketBtn = document.getElementById('basketBtn');
let mainCatalog = document.querySelector('#catalog');
let buyBtns;
let removeBtns;

let catalog = {
  items: [],
  message: 'Ваша корзина пуста',
  /**
   *@description метод загружает в объект каталога продукты и добавляет к каждому метод создающий его разметку для каталога
   */
  loadProducts() {
    this.items = allProducts.items;
    this.items.forEach((product) => {
      product.createCatalogTemplate = function() {
          return `
            <div class="product">
              <img class="productImg" src="${this.product_img}" alt="Product Image" title="${this.product_name}">
              <div class="productInfo">
                <h3 class="productHeader">${this.product_name}</h3>
                <p class="productPrice">${this.price}</p>
                <button class="buyBtn">Купить</button>
              </div>
            </div>`;
      };
    });
  },
  /**
   *@description метод отрисовывает каталог в интерфейсе
   */
  createCatalog() {
    let catalogHTML = '';
    this.items.forEach((product) => {
      catalogHTML += product.createCatalogTemplate();
    });
    mainCatalog.innerHTML = catalogHTML;
  }
};

let basket = {
  items: [],

  /**
   *@description  метод добавляет выбранный продукт в корзину (свойство basket.items) в виде объекта и добавляет ему метод,
   * создающий разметку для отображения этого продукта в корзине
   * @param {number} n - индекс выбранного продукта в массиве catalog.items
   */
  addProduct(n) {
    let chosenProduct = {};
    Object.assign(chosenProduct, catalog.items[n]);
    chosenProduct.createBasketTemplate = function() {
      return `
        <div class="basketProduct">
          <img class="basketProductImg" src="${this.product_basket_img}" alt="Product Image" title="${this.product_name}">
          <h3 class="basketProductHeader">${this.product_name}</h3>
          <p class="basketProductPrice">${this.cost}$</p>
          <div class="basketProductQuantityWrap">
            <p>Quantity ${this.quantity}</p>
            <p class="details">${this.price}$ each</p>
          </div>
          <button class="basketRemoveBtn">x</button>
        </div>`;
    };
    let choosedId = chosenProduct.id_product;
    let isNewProduct = true;
    this.items.forEach((elem) => {
      if (elem.id_product == choosedId) {
        elem.quantity++;
        elem.cost = elem.price * elem.quantity;
        isNewProduct = false;
      }
    });

    if (isNewProduct) {
      chosenProduct.quantity = 1;
      this.items.push(chosenProduct);
      this.items[this.items.length - 1].cost = this.items[this.items.length - 1].price * this.items[this.items.length - 1].quantity;
    }
  },

  /**
   *@description метод удаляет продукт из корзины (из свойства items)
   *
   * @param {number} i - индекс объекта удаляемого продукта в массиве basket.items
   */
  removeProduct(i) {
    this.items.splice(i, 1);
  },

  /**
   *@description метод считает общую стоимость продуктов в корзине
   */
  getTotalCost() {
    this.totalCost = 0;
    this.items.forEach((elem) => this.totalCost += elem.cost);
  },

  /**
   *@description метод считает общее количество продуктов в корзине
   */
  getTotalAmount() {
    this.totalAmount = 0;
    this.items.forEach((elem) => this.totalAmount += elem.quantity);
  },

  /**
   *@description метод отрисовывает корзину в интерфейсе
   */
  showBasket() {
    this.clearBasket();
    if (this.items.length == 0) {
      this.showMessage(this.items.length);
      return;
    } else {
      this.showMessage(this.items.length);
    }
    this.items.forEach((basketProduct) => {
      basketDiv.insertAdjacentHTML('beforeend', basketProduct.createBasketTemplate());
    });
  },

  /**
   *@description метод очищает содержимое корзины в интерфейсе (используется при отрисовке корзины)
   */
  clearBasket() {
    while (basketDiv.firstChild) {
      basketDiv.removeChild(basketDiv.firstChild);
    }
  },

  /**
   *@description метод выводит в корзину сообщение о ее содержимом (используется в отрисовке корзины)
   * @param {number} itemsNumber - длина массива basket.items (количество продуктов в корзине)
   */
  showMessage(itemsNumber) {
    (itemsNumber == 0) ? (this.message = `Ваша корзина пуста`) : (this.message = `В корзине ${this.totalAmount} товаров на сумму ${this.totalCost}$`);
    let messageElement = document.createElement('div');
    messageElement.textContent = this.message;
    basketDiv.appendChild(messageElement);
  }
};



window.addEventListener('DOMContentLoaded', function() {
  allProducts.createProductsDTO();
  catalog.loadProducts();
  mainCatalog = catalog.createCatalog();
  basket.showBasket();
  basketBtn.addEventListener('click', function() {
    basketDiv.classList.toggle('hidden');
  });
  buyBtns = document.querySelectorAll('.buyBtn');
});

mainCatalog.addEventListener('click', function(e) {
  let target = e.target;
  if (target && target.classList.contains('buyBtn')) {
    buyBtns.forEach((elem, i) => {
      if (target == elem) {
        basket.addProduct(i);
        basket.getTotalCost();
        basket.getTotalAmount();
        basket.showBasket();
        removeBtns = document.querySelectorAll('.basketRemoveBtn');
      }
    });
  }
});

basketDiv.addEventListener('click', function(e) {
  let target = e.target;
  if (target && target.classList.contains('basketRemoveBtn')) {
    removeBtns.forEach((elem, i) => {
      if (target == elem) {
        basket.removeProduct(i);
        basket.getTotalCost();
        basket.getTotalAmount();
        basket.showBasket();
        removeBtns = document.querySelectorAll('.basketRemoveBtn');
      }
    });
  }
});