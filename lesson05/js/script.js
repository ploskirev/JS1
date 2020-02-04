'use strict';


let PRODUCTS_NAMES = ['Processor', 'Display', 'Notebook', 'Mouse', 'Keyboard'];
let PRICES = [100, 120, 1000, 15, 18];
let IDS = [0, 1, 2, 3, 4];
let IMG = ['https://www.placehold.it/200x150', 'https://www.placehold.it/200x150', 'https://www.placehold.it/200x150',
  'https://www.placehold.it/200x150', 'https://www.placehold.it/200x150'
];
let BASKETIMG = ['https://www.placehold.it/100x80', 'https://www.placehold.it/100x80', 'https://www.placehold.it/100x80',
  'https://www.placehold.it/100x80', 'https://www.placehold.it/100x80'
];



function createProductsDTO(arr) {
  arr = [];

  for (let i = 0; i < IDS.length; i++) {
    arr.push(createProduct(i));
  }
  return arr;
}

function createProduct(index) {
  return {
    product_name: PRODUCTS_NAMES[index],
    price: PRICES[index],
    id_product: IDS[index],
    product_img: IMG[index],
    product_basket_img: BASKETIMG[index]
  };
}
// конец исходных данных

let basketDiv = document.getElementById('basket');
let basketBtn = document.getElementById('basketBtn');
let mainCatalog = document.querySelector('#catalog');
let buyBtns;
let removeBtns;

let catalog = {
  items: [],
  message: 'Ваша корзина пуста',
  loadProducts() {
    this.items = createProductsDTO();
  },
  createCatalog() {
    this.items.forEach(function(elem) {
      //create
      let product = document.createElement('div');
      let productImg = document.createElement('img');
      let productInfo = document.createElement('div');
      let productHeader = document.createElement('h3');
      let productPrice = document.createElement('p');
      let buyBtn = document.createElement('button');
      //customize
      product.classList.add('product');
      productImg.classList.add('productImg');
      productInfo.classList.add('productInfo');
      productHeader.classList.add('productHeader');
      productPrice.classList.add('productPrice');
      buyBtn.classList.add('buyBtn');
      productImg.src = elem.product_img;
      productImg.alt = 'Product Image';
      productImg.title = 'Product Image';
      productHeader.textContent = elem.product_name;
      productPrice.textContent = elem.price;
      buyBtn.textContent = 'Купить';
      //append
      mainCatalog.appendChild(product);
      product.appendChild(productImg);
      product.appendChild(productInfo);
      productInfo.appendChild(productHeader);
      productInfo.appendChild(productPrice);
      productInfo.appendChild(buyBtn);
    });
  }
};

let basket = {
  items: [],
  
  /**
   *@description  метод добавляет выбранный продукт в корзину (свойство basket.items) в виде объекта
   *
   * @param {number} n - индекс выбранного продукта в массиве catalog.items
   */
  addProduct(n) {
    let chosenProduct = {};
    Object.assign(chosenProduct, catalog.items[n]);
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
    this.items.forEach((elem) => {

      //create
      let basketProduct = document.createElement('div');
      let basketProductImg = document.createElement('img');
      let basketProductHeader = document.createElement('h3');
      let basketProductPrice = document.createElement('p');
      let basketProductQuantityWrap = document.createElement('div');
      let basketProductQuantity = document.createElement('p');
      let basketProductQuantityDetail = document.createElement('p');
      let basketRemoveBtn = document.createElement('button');

      //append
      basketProduct.classList.add('basketProduct');
      basketProductImg.classList.add('basketProductImg');
      basketProductImg.src = elem.product_basket_img;
      basketProductHeader.classList.add('basketProductHeader');
      basketProductHeader.textContent = elem.product_name;
      basketProductPrice.classList.add('basketProductPrice');
      basketProductPrice.textContent = elem.cost;
      basketProductQuantityWrap.classList.add('basketProductQuantityWrap');
      basketProductQuantity.textContent = `Quantity: ${elem.quantity}`;
      basketProductQuantityDetail.classList.add('details');
      basketProductQuantityDetail.textContent = `${elem.price} each`;
      basketRemoveBtn.classList.add('basketRemoveBtn');
      basketRemoveBtn.textContent = 'X';

      // customize
      basketDiv.appendChild(basketProduct);
      basketProduct.appendChild(basketProductImg);
      basketProduct.appendChild(basketProductHeader);
      basketProduct.appendChild(basketProductPrice);
      basketProduct.appendChild(basketProductQuantityWrap);
      basketProductQuantityWrap.appendChild(basketProductQuantity);
      basketProductQuantityWrap.appendChild(basketProductQuantityDetail);
      basketProduct.appendChild(basketRemoveBtn);
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
    (itemsNumber == 0) ? (this.message = `Ваша корзина пуста`) : (this.message = `В корзине ${this.totalAmount} товаров на сумму ${this.totalCost} рублей`);
    let messageElement = document.createElement('div');
    messageElement.textContent = this.message;
    basketDiv.appendChild(messageElement);
  }
};



window.addEventListener('DOMContentLoaded', function() {
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