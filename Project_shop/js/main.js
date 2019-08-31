//On this page:
//1. class ProductList/Item
//2. class Cart/Item

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

      let getRequest = (url) =>  {
            return new Promise((resolve, reject) => {
              let xhr = new XMLHttpRequest();
              xhr.open('GET', url, true); //true - асинхронный запрос
              xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) { // запрос выполнен
                  if (xhr.status !== 200) {
                    reject(`Error ${xhr.status} ${xhr.statusText}`);
                  } else {
                    resolve(xhr.responseText);
                  }
                }
              };
              xhr.send();
            });
      };

class List {
  constructor(url, container, list = list2) {
    this.container = container;
    this.list = list; // словарь для классов
    this.url = url;
    this.goods = [];
    this.allProducts = [];
    this.filtered = []; //filtered products
    this._init();
  }

  getJson(url) {
    return fetch(url ? url : `${API + this.url}`)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        });
  }

  handleData(data) {
    this.goods = [...data];
    this.render();
  }

  calcSum() {
    return this.allProducts.reduce((accum, item) => accum += item.price, 0);
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObj = new this.list[this.constructor.name](product);
      this.allProducts.push(productObj);
      block.insertAdjacentHTML('beforeend', productObj.render());
    }
  }

  filter(value) {
    const regexp = new RegExp(value, 1);
    this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
    this.allProducts.forEach(el => {
      const block  = document.querySelector(`.product-item[data-id="${el.id_product}"]`)
      if (!this.filtered.includes(el)) {
        block.classList.add('invisible');
      } else {
        block.classList.remove('invisible');
      }
    })
  }

  _init() {
    return false;
  }
}

class Item {
  constructor(el, img = 'https://placehold.it/200x130') {
    this.product_name = el.product_name;
    this.price = el.price;
    this.id_product = el.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} Euro</p>
                    <button class="buy-btn"
                    data-id = "${this.id_product}"
                    data-name = "${this.product_name}"
                    data-price = "${this.price}">Buy</button>
                </div>
            </div>`;
  }
}

class ProductList extends List {
  constructor(cart, container = '.products', url = "/catalogData.json") {
    super(url, container);
    this.cart = cart;
    this.getJson()
        .then(data => this.handleData(data));
  }

  _init() {
    document.querySelector(this.container).addEventListener('click', e => {
      if (e.target.classList.contains('buy-btn')) {
        this.cart.addProduct(e.target);
      }
    });
    document.querySelector('.search-form').addEventListener('submit', e => {
      e.preventDefault();
      this.filter(document.querySelector('.search-field').value);
    });
  }
}

class ProductItem extends Item {}

// Cart with items


class Cart extends List {
  constructor(container = '.cart-block', url = '/getBasket.json') {
    super(url, container);
    this.getJson()
        .then(data => this.handleData(data.contents));
  }

  addProduct(element) {
    this.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if (data.result === 1) {
            let productId = +element.dataset['id'];
            let find = this.allProducts.find(product => product.id_product === productId);
            if (find) {
              find.quantity++;
              this._updateCart(find);
            } else {
              let product = {
                id_product: productId,
                price: +element.dataset['price'],
                product_name: element.dataset['name'],
                quantity: 1
              };
              this.goods = [product];
              this.render()
            }
          } else {
            alert('error')
          }
        })
  }

  removeProduct(element) {
    this.getJson(`${API}/deleteFromBasket.json`)
        .then(data => {
          if (data.result === 1) {
            let productId = +element.dataset['id'];
            let find = this.allProducts.find(product => product.id_product === productId);
            if (find.quantity > 1) {
              find.quantity--;
              this._updateCart(find);
            } else {
              this.allProducts.splice(this.allProducts.indexOf(find), 1);
              document.querySelector(`.cart-item[data-id = "${productId}"]`).remove();
            }
          } else {
            alert('error');
          }
        })
  }

  _updateCart(product) {
    let block = document.querySelector(`.cart-item[data-id = "${product.id_product}"]`)
    block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`;
    block.querySelector('.product-price').textContent = `${product.quantity * product.price}`;
  }

  _init() {
    document.querySelector('.btn-cart').addEventListener('click', () => {
      document.querySelector(this.container).classList.toggle('invisible');
    });
    document.querySelector(this.container).addEventListener('click', e => {
      if (e.target.classList.contains('del-btn')) {
        this.removeProduct(e.target);
      }
    });
  }
}

class CartItem extends Item {
  constructor(el, img = 'https://placehold.it/200x130') {
    super(el, img);
    this.quantity = el.quantity;
  }

  render() {
    return `<div class="cart-item" data-id="${this.id_product}">
                <div class = "product-bio"> 
                <img src="${this.img}" alt="Some img">
                <div class="product-desc">
                    <h3 class = "product-title">${this.product_name}</h3>
                    <p class = "product-quantity">Quantity: ${this.quantity}</p>
                    <p class="product-single-price">$${this.price} Euro each</p>
                </div>
                </div>
                <div class="right-block">
                <p class="product-price">$${this.quantity * this.price}</p>
                <button class="del-btn" data-id="${this.id_product}">x</button>
            </div>
            </div>`;
  }
}

const list2 = {
  ProductList: ProductItem,
  Cart: CartItem
};

let cart = new Cart();
let products = new ProductList(cart);



