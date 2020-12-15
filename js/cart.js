function toCart(id) {
    if(localStorage.getItem("cart") == null) {
        let products = [];
        products[0] = id;
        localStorage.setItem("cart", JSON.stringify(products));
    } else {
        let products = []; // пустой список
        for(let i = 0; i < JSON.parse(localStorage.getItem("cart")).length; i++) {
            products[i] = JSON.parse(localStorage.getItem("cart"))[i]
        }
        products[products.length] = id
        localStorage.setItem("cart", JSON.stringify(products));
    }
    document.querySelector('#cartCount').innerHTML = JSON.parse(localStorage.getItem("cart")).length;
}

function getCountInCart() {
    if(localStorage.getItem("cart") == null) {
        return 0;
    } else {
        return JSON.parse(localStorage.getItem("cart")).length;
    }
}