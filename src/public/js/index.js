const socket = io()

const input = document.getElementById('addProduct')
socket.on('from-server-products', products =>{
    renderProducts(products)
})

function renderProducts (products) {
    const cuerpoProductosHTML = products.map((prod)=>{
        return `<div>
                    <p>${prod.title}</p
                </div>`
})

document.querySelector('#products').innerHTML = cuerpoProductosHTML
}

function addProduct() {
    

    const inputTitle = document.querySelector('#title')

    const product = {
        title: inputTitle.value,
    }

    socket.emit('from-client-product', product)
}