function nav(strGo) {
    if(strGo.includes('action')) {
        let request = strGo.split("/");
        allHide(); // всё прячем
        showLoader(true);
        let getted = getAction(request[1]);
        if(getted != '') {
            document.querySelector('#actionPage').innerHTML = getted;
            document.querySelector('#actionPage').style.display = 'flex';
            window.location.hash = strGo.split("#")[1]; // меняем юрл
        } else {
            document.querySelector('#mainPage').style.display = 'flex';
            document.querySelector('.slider').style.display = 'block';
        }
        showLoader(false);
    } else if(strGo.includes('product')) {
        let request = strGo.split("/");
        allHide();
        showLoader(true);
        let getted = getProduct(request[1]);
        if(getted != '') {
            document.querySelector('#productPage').innerHTML = getted;
            document.querySelector('#productPage').style.display = 'flex';
            window.location.hash = strGo.split("#")[1];
        } else {
            document.querySelector('#mainPage').style.display = 'flex';
            document.querySelector('.slider').style.display = 'block';
        }
        showLoader(false);
    } else if(strGo == '#catalog') {
        allHide();
        showLoader(true);
        getAllPizza(categories, pizzaList);
        window.location.hash = '#catalog';
        document.querySelector('#catalogPage').style.display = 'flex';
        showLoader(false);
    } else if(strGo == '#cart') {
        allHide();
        showLoader(true);
        let initCartTemplate = initCart();
        document.querySelector('#сartPage').innerHTML = initCartTemplate;
        document.querySelector('#сartPage').style.display = 'flex';
        window.location.hash = strGo;
        showLoader(false);
    } else if(strGo == '#order') {
        if(getCountInCart() != 0) {
            allHide();
            window.location.hash = '#order';
            document.querySelector('#orderPage').style.display = 'flex';
        } else {
            allHide();
            window.location.hash = '#';
            document.querySelector('#mainPage').style.display = 'flex';   
            document.querySelector('.slider').style.display = 'block';
        }
    } else if(strGo == '/' || strGo == '#') {
        allHide();
        window.location.hash = '#';
        document.querySelector('#mainPage').style.display = 'flex';
        document.querySelector('.slider').style.display = 'block';
    } else {
        allHide();
        window.location.hash = '#';
        document.querySelector('#mainPage').style.display = 'flex';
        document.querySelector('.slider').style.display = 'block';
    }
}