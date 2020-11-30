function makeMenu(categoryArr, productArr){
    let page = ""
    for (let category of categoryArr){
        let productsOfCategory = []
        for (let product of productArr){
            if (product.categoryId === category.id){
                productsOfCategory.push(product)

            }
        }
        page += makeCategory(category, productsOfCategory)
    }
    return page
}

function makeProduct(product){
    return `<div class = "product" id = '${product.id}'>
                <img src = 'style/preview/${product.url}.png'>
                <p>${product.name}</p>
                <span>${product.description}</span>
                <p class = "price">${product.price} $</p>
            </div>`

}

function makeCategory(category, productArr){
    let allProducts = ""
    for (let product of productArr){
        allProducts += makeProduct(product)
    }
    return `<p class ="title">${category.title}</p>
            <div class = "category">
            ${allProducts}
        </div>`
}