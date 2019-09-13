class Information {
    constructor(el) {
        this.price = +el.dataset.price;
        this.calories = +el.dataset.calories;
        this.title = el.dataset.title;
    }
}

class Pizza {
    constructor(size, thick, add) {
        this.size = new Information(this._select(size));
        this.thick = new Information(this._select(thick));
        this.add = this._getAdditional(add);
    }
    _getAdditional(name) {
        let arr = [];

        this._selectAll(name).forEach(el => {
            arr.push(new Information(el));
        });
        return arr;
    }
    _selectAll(name) {
        return [... document.querySelectorAll(`input[name = "${name}"]:checked`)];
    }
    _select(name) {
        return document.querySelector(`input[name = "${name}"]:checked`);
    }
    show(selector) {
       return document.querySelector(selector)
            .textContent = this.sumOf(new Pizza('size', 'thick', 'add'));
    }
    sumOf(pizza) {
        let sum1 =  +pizza.size.price + +pizza.thick.price;
        console.log(sum1);
        let sum2 = 0;
        pizza.add.forEach(el => {
            sum2 = sum2 + el.price;
        });
        console.log(pizza.add);
        console.log(pizza.add[0].price);
        console.log(sum2);
        return sum1 + sum2;
    }

}

document.addEventListener('DOMContentLoaded', () => {
    let btn = document.querySelector('button');
    btn.addEventListener('click', () => {
        let pizza = new Pizza('size', 'thick', 'add');
        pizza.show('.result');

    })
})