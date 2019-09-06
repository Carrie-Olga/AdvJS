const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://placehold.it/200x150',
        filtered: [],
        isVisibleCart: false,
        searchLine: '',
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product){
            console.log(product.id_product);
        },
        filterGoods(value){
            const regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
            this.products.forEach(el => {
                const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
                if(!this.filtered.includes(el)){
                    block.classList.add('invisible');
                } else {
                    block.classList.remove('invisible');
                }
            })
            console.log(value);
        }
    },
    mounted(){
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            });
        document.querySelector('.search-form').addEventListener('submit', e => {
            e.preventDefault();
            this.searchLine = document.querySelector('.search-field').value;
            this.filterGoods(this.searchLine);
        });
        document.querySelector('.btn-cart').addEventListener('click', e => {
            if (this.isVisibleCart == false) {
                let cartVision = document.querySelector('.cart-block');
                cartVision.classList.remove('invisible');
            } else {
                document.querySelector('.cart-block').classList.add('invisible');
            }
            this.isVisibleCart = !this.isVisibleCart;
        });
    }
});