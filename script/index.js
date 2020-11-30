let page = document.querySelector('#page')
let get
const jsonUrl = 'https://my-json-server.typicode.com/Wood1ouse/PizzaTime/db'

function getDb(url){
    return fetch(url).then(db =>{
        return db.json()
    })
}

getDb(jsonUrl).then(data =>{
    get = data
    page.innerHTML = makeMenu(get.categories, get.pizza)

})
window.location.hash = 'catalog'

