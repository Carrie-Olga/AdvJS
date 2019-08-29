//On this page:
//1. Hamburger on classes
//2. Hamburger on functions (commented)

class Param {
    constructor(element) {
        this.name = element.dataset.title;
        this.price = +element.dataset.price;
        this.calories = +element.dataset.calories;
    }
}

class Burger {
    constructor(size, add, topping) {
        this.size = new Param(this._select(size));
        this.add = new Param(this._select(add));
        this.topping = this._getToppings(topping);
    }
    _select(name) {
        return document.querySelector(`input[name = "${name}"]:checked`);
    }
    _getToppings(name) {
        let arr = [];
        this._selectAll(name).forEach(el => {
            arr.push(new Param(el));
        });
        return arr;
    }
    _selectAll(name) {
        return [...document.querySelectorAll(`input[name = "${name}"]:checked`)];
    }
    _sumPrice() {
        let sum = this.size.price + this.add.price;
        console.log(sum);
        this.topping.forEach(el => sum += el.price);
        console.log(sum);
        return sum;
    }
    _sumCalories() {
        let sum = this.size.calories + this.add.calories;
        this.topping.forEach(el => sum += el.calories);
        return sum;
    }
    _showSum(price) {
        document.querySelector(price).textContent = this._sumPrice() + " " + this._sumCalories();

    }
}

document.addEventListener('DOMContentLoaded', () => {
    let choice = document.querySelectorAll('.choice');
    for (let i = 0; i < choice.length; i++) { //filling in titles to the radio buttons
        let price = choice[i].dataset.price;
        let calories = choice[i].dataset.calories;
        let title = choice[i].dataset.title;

        choice[i].insertAdjacentHTML('afterend', `<span>${title}: ${price} rub and ${calories} calories</span><br>`);
    }
    let btn = document.querySelector('button');
    btn.addEventListener('click', () => {
        let burger = new Burger('size', 'add', 'topping');
        burger._showSum('#log');
    })
});







//
// let choice = document.querySelectorAll('.choice');
// let sumCalories = 0;
// let sumPrice = 0;
//
// for (let i = 0; i < choice.length; i++) { //filling in titles to the radio buttons
//     let price = choice[i].dataset.price;
//     let calories = choice[i].dataset.calories;
//     let title = choice[i].dataset.title;
//
//     choice[i].insertAdjacentHTML('afterend', `<span>${title}: ${price} rub and ${calories} calories</span><br>`);
// }


//     let button = document.querySelector("button");
//     button.addEventListener("click", function(event) {
//         let choice = document.querySelectorAll('.choice');
//         for (let i = 0; i < choice.length; i++) {
//             if (choice[i].checked) {
//                 sumCalories += parseInt(choice[i].dataset.calories);
//                 sumPrice += parseInt(choice[i].dataset.price);
//             }
//         }
//         console.log(sumCalories, sumPrice);
//         document.querySelector('#log').innerHTML = `${sumPrice} rub and ${sumCalories} calories.`;
//         event.preventDefault();
//     }, false);
//

//
//


