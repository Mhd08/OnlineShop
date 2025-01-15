let scrollDistance = 300;
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice = 0

let itemContainers = document.querySelectorAll(".items");
console.log(itemContainers)

function scrollContainerLeft(id) {
    let container = document.getElementById(id)
    container.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
}

function scrollContainerRight(id) {
    let container = document.getElementById(id)
    container.scrollBy({ left: scrollDistance, behavior: 'smooth' });
}


function smoothScrollTo(id) {
    let section = document.querySelector(`.${id}`);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }

    console.log("testtstts")
}




document.addEventListener('DOMContentLoaded', () => {

    const buttons = document.querySelectorAll('.add-to-cart-btn');

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const name = event.target.dataset.name;
            const price = event.target.dataset.price;
            const img = event.target.dataset.img;

            const item = {
                name: name,
                price: parseFloat(price),
                img: img
            };

            cart.push(item)

            localStorage.setItem('cart', JSON.stringify(cart));

            console.log(cart)
        })
    })

})

function updateCartUI() {
    const itemsContainer = document.querySelector('.items-container');
    const priceContainer = document.querySelector('.top-part');
    const totalPriceContainer = document.querySelector('.total-price')

    // Clear existing items
    itemsContainer.innerHTML = '';

    // Iterate over cart items
    cart.forEach((item, index) => {
        // Create item container for each cart item
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('item-container');

        totalPrice += item.price

        // Set item container's inner HTML
        itemContainer.innerHTML = `
            <div class="img-container">
                <img src="${item.img}" alt="${item.name}">
            </div>
            <div class="item-data">
                <p class="name">${item.name}</p>
                <p class="price">${item.price.toFixed(2)}$</p> 
            </div>
        `;

        // Append item to the items-container
        itemsContainer.appendChild(itemContainer);

        // Create a price-container item for the price summary
        const priceItem = document.createElement('div');
        priceItem.classList.add('item-price');

        // Add name and price to the price-container item
        const nameElement = document.createElement('p');
        nameElement.id = 'item-name';
        nameElement.textContent = item.name;

        const priceElement = document.createElement('p');
        priceElement.id = 'item-price';
        priceElement.textContent = `${item.price.toFixed(2)}$`;

        priceItem.appendChild(nameElement);
        priceItem.appendChild(priceElement);

        // Append price item to the price-container
        priceContainer.appendChild(priceItem);
    });

    totalPriceContainer.innerHTML = totalPrice + "$"


}

document.addEventListener("DOMContentLoaded", () => {
    updateCartUI()
});