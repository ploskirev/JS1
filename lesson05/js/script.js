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
  removeProduct(n) {
    this.items.splice(n, 1);
  },
  getTotalCost() {
    this.totalCost = 0;
    this.items.forEach((elem) => this.totalCost += elem.cost);
  },
  getTotalAmount() {
    this.totalAmount = 0;
    this.items.forEach((elem) => this.totalAmount += elem.quantity);
  },
  showBasket() {

    if (this.items.length == 0) {
      this.clearBasket();
      this.message = `Ваша корзина пуста`;
      this.showMessage(this.message);
      return;
    } else {
      this.clearBasket();
      this.message = `В корзине ${this.totalAmount} товаров на сумму ${this.totalCost} рублей`;
      this.showMessage(this.message);
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
  clearBasket() {
    while (basketDiv.firstChild) {
      basketDiv.removeChild(basketDiv.firstChild);
    }
  },
  showMessage(text) {
    let messageElement = document.createElement('div');
    messageElement.textContent = text;
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