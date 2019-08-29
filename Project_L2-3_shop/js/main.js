//On this page:
//1. class ProductList/Item
//2. class Cart/Item

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true); //true - асинхронный запрос
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4) { // запрос выполнен
//       if (xhr.status !== 200) {
//         console.log(`Error ${xhr.status} ${xhr.statusText}`);
//       } else {
//         cb(xhr.responseText);
//         console.log(xhr.responseText);
//       }
//     }
//   };
//   xhr.send();
// };


// Changed as per homework - on fetch()


// _getRequest() {
//   return fetch(`${API}/catalogData.json`)
//       .then(result => result.json())
//       .then(data => {
//         this.goods = [...data];
//         this._render();
//       })
// }


class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    // this._fetchProducts();
    this._getProducts()
        .then(data => {
          this.goods = [...data];
          this._render();
        });
  }
  // _fetchProducts() {
  //   getRequest(`${API}/catalogData.json`, (data) => {
  //     this.goods = JSON.parse(data);
  //     this._render();
  //   })
  // }
  _getProducts() {
    return fetch(`${API}/catalogData.json`)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        });
  }

  _render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render())
    }
  }
}

class ProductItem {
  constructor(product, img = 'https://placehold.it/200x130') {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} Euro</p>
                    <button class="buy-btn">Buy</button>
                </div>
            </div>`;
  }
}

const list = new ProductList();




// Cart with items
class Cart {
  constructor(container = '.cart') {
    this.container = container;
    this.cartGoods = {};
    this.cartProducts = [];
    //this._fetchProducts();
    this._getProducts()
        .then(data => {
          this.cartGoods = {...data};
          this._render();
          //console.log(this.cartGoods);
        });
    this._cartTotal();
    this.clearCart();
    this.sendOrder();
  }
  // _fetchProducts() { //put user selected goods in cartProduct (make them cart products, not regular)
  //     //pick a good selected by user
  //     //push it to the cartGoods array
  // }
  _getProducts() {
    return fetch(`${API}/getBasket.json`)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        });
  }
  _render() { //take each good and make a cart item of it
    const block = document.querySelector(this.container);
    let arr = this.cartGoods.contents;
    for (let i = 0; i < arr.length; i++) {
        const cartObject = new CartItem(arr[i]);
        this.cartProducts.push(cartObject);
        block.insertAdjacentHTML('beforeend', cartObject.render());
    }

    // for (let product of this.cartGoods) {
    //   const productObject = new CartItem(product);
    //   this.cartProducts.push(productObject);
    //   block.insertAdjacentHTML('beforeend', productObject.render())
    // }
  }
  _cartTotal(products = this.cartProducts) {
    console.log(this.cartProducts);
    let sumCount = 0;
    console.log(this.cartProducts[0]);
    console.log(products[1]);

    // let sumCount = 0;
    // products.forEach(el => {
    //     let itemPrice = el.price;
    //   console.log(itemPrice);
    //   sumCount += +itemPrice;
    // })
    // for (let product in products) {
    //   const itemPrice = product.price;
    //   sumCount += itemPrice;
    // }
    const block = document.querySelector(this.container);
    const total = `<div class = "cart-total"><p>You ordered for ${sumCount} euro</p></div>`;
    block.insertAdjacentHTML('afterend', total);
  }
  clearCart() {

  }
  sendOrder() {

  }
}

class CartItem {
  constructor(product, img = 'https://placehold.it/200x130') {
    this.amount = product.amount;
    this.countGoods = product.countGoods;
    this.product_name = product.product_name;
    this.price = product.price;
    //console.log(this.price = product.price);
    this.id_product = product.id_product;
    this.img = img;
    this.modifyQuantity();
    this.deleteProduct();
  }
  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} Euro</p>
                    <button class="buy-btn">Buy</button>
                </div>
            </div>`;
  }
  modifyQuantity() {

  }
  deleteProduct() {

  }
}

const cartList = new Cart();



//
// trying to commit to git in webstorm
//
// const products = [
//   {id: 1, title: 'Notebook', price: 1000},
//   {id: 2, title: 'Mouse', price: 100},
//   {id: 3, title: 'Keyboard', price: 250},
//   {id: 4, title: 'Gamepad', price: 150},
// ];
//
// const renderProduct = (item, img = 'https://placehold.it/200x150') => `<div class="product-item">
//             <img src="${img}" alt="Some img">
//             <h3>${item.title}</h3>
//             <p>${item.price}</p>
//             <button class="by-btn">Добавить</button>
//           </div>`;
//
// const renderProducts = list => document.querySelector('.products')
//   .insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
//
// renderProducts(products);

