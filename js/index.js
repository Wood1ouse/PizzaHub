const baseURL = 'https://my-json-server.typicode.com/Wood1ouse/PizzaTime/db'
let pizzaList;
let categories;
let actions;
function getDb(url){
    return fetch(url).then(db =>{
        return db.json()
    })
}

function getPizza(pizza, id) {
    let template = '';
    
    for(let product of pizza) {
        if(product.categoryId == id) {
            template += `<div class="product">
            <div class="pizza_img">
                <img src="img/${product.url}.png" alt="pizza">
            </div>
            <div class="pizza_name">
                <span>${product.name}</span>
            </div>
            <div class="pizza_desc">
                <span>${product.description}</span>
            </div>
            <div class="pizza_control">
                <button onclick="toCart(${product.id})">В корзину (${product.price} $)</button>
                <button onclick="nav('#product/${product.id}')">Подробнее</button>
            </div>
        </div>
            `;
        }
    }
    return template;
}

function injectProducts(categories, pizza, fail) {
    let block = document.querySelector('.products');
    block.innerHTML = '';
    let ik = 0;
    for(let category of categories) {
        if(ik == 2 && fail) {
            break;
        }
        let templateCategory = '<div class="title"><span>' + category.title + '</span></div>'; // делаем html код
        let getPizzaList = getPizza(pizza, category.id);
        block.innerHTML  += templateCategory + getPizzaList;
        ik++;
    }
}
function getAllPizza(categories, pizza) {
    let block = document.querySelector('#catalogPage > .products');
    for(let category of categories) {
        let templateCategory = '<div class="title"><span>' + category.title + '</span></div>';
        let getPizzaList = getPizza(pizza, category.id);
        block.innerHTML  += templateCategory + getPizzaList;
    }
}
function injectStocks(stocks) {
    let block = document.querySelector('.stocks');
    for(let stock of stocks) {
        let templateStock = `<div class="stock" onclick="nav('#action/${stock.id}')">
                <div class="stock_name">
                    <span>${stock.name}</span>
                </div>
                <div class="stock_desc">
                    <span>${stock.description}</span>
                </div>
            </div>
        `;
        block.innerHTML  += templateStock;
    }
}

function getAction(id) {
    let template = '';
    for(let action of actions) {
        if(action.id == id) {
            template = `<div class="content_action">
            <div class="title">
                <span>${action.name}</span>
            </div>
            <div class="action_desc">
                <span>${action.description}</span>
            </div>
            <div class="action_full_desc">
                <span>${action.full_description}</span>
            </div>
        </div>`;
        }
    }
    return template;
}

function getNeededPizza(needed) {
    let template = '';
    for(let pizza of pizzaList) {
        if(pizza.id == needed[0] || pizza.id == needed[1] || pizza.id == needed[2]) {
            template += `<div class="product">
            <div class="pizza_img">
                <img src="img/${pizza.url}.png" alt="pizza">
            </div>
            <div class="pizza_name">
                <span>${pizza.name}</span>
            </div>
            <div class="pizza_desc">
                <span>${pizza.description}</span>
            </div>
            <div class="pizza_control">
                <button onclick="toCart(${pizza.id})">В корзину (${pizza.price} $)</button>
                <button onclick="nav('#product/${pizza.id}')">Подробнее</button>
            </div>
        </div>
            `;
        }
    }
    return template;
}

function getProduct(id) {
    let template = '';
    for(let product of pizzaList) {
        if(product.id == id) {
            template = `<div class="content_product">
            <div class="title_product">
                <span>${product.name}</span>
            </div>
            <div class="product_desc">
                <span>${product.description}</span>
            </div>
            <div class="products">
                <div class="title">
                    <span>Посмотрите так же</span>
                </div>
                ${getNeededPizza(product.relatedProductsId)}
            </div>
        </div>`;
        }
    }
    return template;
}
function getChoosedPizza(id) {
    for(let pizza of pizzaList) {
        if(pizza.id == id) {
            return pizza;
        }
    }
}

function initCart() {
    let template = '';
    if(getCountInCart() != 0) {
        template = `<div class="cart_title">
                        <span>Корзина</span>
                        <div class="cart_content">`;
        for(let i = 0; i < JSON.parse(localStorage.getItem("cart")).length; i++) {
            let thisPizza = getChoosedPizza(JSON.parse(localStorage.getItem("cart"))[i]);
            template += `    <div class="cart_item">
            <div class="cart_item_name">
                <span>${thisPizza.name}</span>
            </div>
            <div class="cart_item_price">
                <span>${thisPizza.price} $</span>
            </div>
        </div>`; // делаем тему
        }
        template += `</div></div>`;
        template += `<button class="simple_btn" onclick="nav('#order')">Оформить заказ</button>`;
    } else {
        template = `<div class="cart_title">
        <span>Корзина пустая</span>
    </div>`;
    }
    return template;
}

function showLoader(type) {
    let loader = document.querySelector('.loader');
    if(type) {
        loader.style.display = 'flex';
    } else { // если false
        loader.style.display = 'none';
    }
}


window.onload = () => {
    getDb(baseURL).then(data =>{
        injectProducts(data.categories, data.pizza, true);
        injectStocks(data.stocks);
        pizzaList = data.pizza;
        categories = data.categories;
        actions = data.stocks;
        showLoader(false);
        iniPage();
        document.querySelector("#cartCount").innerHTML = getCountInCart();
    })
}

function iniPage() {
    if(window.location.hash != null && window.location.hash != '') {
        window.location.hash = window.location.hash;
        nav(window.location.hash);
    }
}

function allHide() { // прячем всё
    document.querySelector('#mainPage').style.display = 'none';   
    document.querySelector('#actionPage').style.display = 'none';
    document.querySelector('#productPage').style.display = 'none';  
    document.querySelector('#catalogPage').style.display = 'none'; 
    document.querySelector('#сartPage').style.display = 'none';
    document.querySelector('#orderPage').style.display = 'none';
    document.querySelector('.slider').style.display = 'none';
}
function validateEmail(email) {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(email);
}
function createSuccessOrder() {
    let num = Math.floor(Math.random() * Math.floor(1000342));
    template = `<div class="cart_title">
    <span>Заказ ${num} успешно оформлен!</span>
</div>`;
    document.querySelector('#orderPage').innerHTML = template;
    localStorage.removeItem("cart");
    window.location.hash = "#order/" + num;
    document.querySelector("#cartCount").innerHTML = getCountInCart();
}
function order() {
    let name = document.querySelector('#name');
    let lastname = document.querySelector('#lastname');
    let address = document.querySelector('#address');
    let email = document.querySelector('#email');
    let phone = document.querySelector('#phone');
    let typeOrder = document.querySelector('#typeOrder');
    
    phone.classList.remove('bad_input');
    name.classList.remove('bad_input');
    lastname.classList.remove('bad_input');
    address.classList.remove('bad_input');
    email.classList.remove('bad_input');
    typeOrder.classList.remove('badSelect')

    let re = /^\+?3?8?(0[\s\.-]\d{2}[\s\.-]\d{3}[\s\.-]\d{2}[\s\.-]\d{2})$/;
    if(!re.test(phone.value)) {
        phone.classList.add('bad_input')
        return;
    } else if(name.value.length < 2) {
        name.classList.add('bad_input');
        return;
    } else if(lastname.value.length < 2) {
        lastname.classList.add('bad_input');
        return;
    } else if(address.value.length < 8) {
        address.classList.add('bad_input');
        return;
    } else if(typeOrder.selectedIndex == 0) {
        typeOrder.classList.add('bad_select')
        return;
    }
    if(!validateEmail(email.value)) {
        alert(!validateEmail(email.value));
        email.classList.add('bad_input');
        return;
    }

    createSuccessOrder();
}