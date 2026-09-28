
// =================================
// TECHKART E-COMMERCE JAVASCRIPT
// =================================


// PRODUCTS DATA

const products = [

    {
        id: 1,
        name: "ProBook Laptop",
        category: "Laptops",
        price: 54999,
        emoji: "💻"
    },

    {
        id: 2,
        name: "SmartPhone X",
        category: "Mobiles",
        price: 24999,
        emoji: "📱"
    },

    {
        id: 3,
        name: "Wireless Headphones",
        category: "Audio",
        price: 2999,
        emoji: "🎧"
    },

    {
        id: 4,
        name: "Mechanical Keyboard",
        category: "Accessories",
        price: 3499,
        emoji: "⌨️"
    },

    {
        id: 5,
        name: "Gaming Laptop",
        category: "Laptops",
        price: 74999,
        emoji: "💻"
    },

    {
        id: 6,
        name: "SmartPhone Pro",
        category: "Mobiles",
        price: 39999,
        emoji: "📱"
    },

    {
        id: 7,
        name: "Bluetooth Speaker",
        category: "Audio",
        price: 1999,
        emoji: "🔊"
    },

    {
        id: 8,
        name: "Wireless Mouse",
        category: "Accessories",
        price: 899,
        emoji: "🖱️"
    }

];


// CART DATA

let cart = [];


// DOM ELEMENTS

const productGrid = document.getElementById("product-grid");

const cartItems = document.getElementById("cart-items");

const cartCount = document.getElementById("cart-count");

const cartTotal = document.getElementById("cart-total");

const cartPanel = document.getElementById("cart-panel");

const checkoutModal = document.getElementById("checkout-modal");

const searchInput = document.getElementById("search-input");


// FORMAT PRICE

function formatPrice(price) {

    return price.toLocaleString("en-IN");

}


// DISPLAY PRODUCTS

function displayProducts(productList) {

    productGrid.innerHTML = "";

    if (productList.length === 0) {

        productGrid.innerHTML = `
            <p class="no-products">
                No products found.
            </p>
        `;

        return;

    }


    productList.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image">
                ${product.emoji}
            </div>

            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>

                <h3>${product.name}</h3>

                <p class="product-price">
                    ₹${formatPrice(product.price)}
                </p>

                <button
                    class="add-button"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>

        `;

        productGrid.appendChild(card);

    });

}


// ADD TO CART

function addToCart(productId) {

    const product = products.find(
        item => item.id === productId
    );

    if (!product) return;


    const existingItem = cart.find(
        item => item.id === productId
    );


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    updateCart();

    alert(`${product.name} added to cart!`);

}


// UPDATE CART

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    } else {

        cart.forEach(item => {

            const cartItem = document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `

                <div class="cart-item-emoji">
                    ${item.emoji}
                </div>

                <div class="cart-item-details">

                    <h4>${item.name}</h4>

                    <p>
                        ₹${formatPrice(item.price)}
                    </p>

                    <div class="quantity-controls">

                        <button
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                    </div>

                    <button
                        class="remove-button"
                        onclick="removeFromCart(${item.id})"
                    >
                        Remove
                    </button>

                </div>

            `;

            cartItems.appendChild(cartItem);

        });

    }


    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );


    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );


    cartCount.textContent = totalQuantity;

    cartTotal.textContent = formatPrice(totalPrice);

}


// CHANGE QUANTITY

function changeQuantity(productId, change) {

    const item = cart.find(
        product => product.id === productId
    );

    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart = cart.filter(
            product => product.id !== productId
        );

    }


    updateCart();

}


// REMOVE FROM CART

function removeFromCart(productId) {

    cart = cart.filter(
        product => product.id !== productId
    );

    updateCart();

}


// OPEN / CLOSE CART

function toggleCart() {

    cartPanel.classList.toggle("active");

}


// SEARCH PRODUCTS

function searchProducts() {

    const searchTerm = searchInput.value
        .toLowerCase()
        .trim();


    const filteredProducts = products.filter(product => {

        return (

            product.name.toLowerCase()
                .includes(searchTerm)

            ||

            product.category.toLowerCase()
                .includes(searchTerm)

        );

    });


    displayProducts(filteredProducts);

}


// FILTER PRODUCTS

function filterProducts(category) {

    searchInput.value = "";


    if (category === "All") {

        displayProducts(products);

        return;

    }


    const filteredProducts = products.filter(
        product => product.category === category
    );


    displayProducts(filteredProducts);

}


// OPEN CHECKOUT

function openCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    checkoutModal.classList.add("active");

}


// CLOSE CHECKOUT

function closeCheckout() {

    checkoutModal.classList.remove("active");

}


// CHECKOUT FORM

document.getElementById("checkout-form")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const name = document.getElementById(
            "customer-name"
        ).value.trim();


        const email = document.getElementById(
            "customer-email"
        ).value.trim();


        const address = document.getElementById(
            "customer-address"
        ).value.trim();


        if (!name || !email || !address) {

            alert("Please fill all fields.");

            return;

        }


        alert(
            `Thank you ${name}!\n\n` +
            "Your demo order has been placed.\n" +
            "No real payment was processed."
        );


        cart = [];

        updateCart();

        closeCheckout();

        toggleCart();

        this.reset();

    });


// INITIALIZE WEBSITE

displayProducts(products);

updateCart();