const API_URL = "https://fakestoreapi.com/products";
const productsContainer = document.getElementById("productsContainer");
const loading = document.getElementById("loading");
const message = document.getElementById("message");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sortSelect");
const emptyProducts = document.getElementById("emptyProducts");
const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const cartItemsText = document.getElementById("cartItemsText");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const productModal = document.getElementById("productModal");
const closeModal = document.getElementById("closeModal");
const modalBody = document.getElementById("modalBody");

let products = [];
let filteredProducts = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
async function fetchProducts() {
    loading.classList.remove("hidden");
    message.classList.add("hidden");
    emptyProducts.classList.add("hidden");
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch products.");
        }
        products = await response.json();
        filteredProducts = [...products];
        populateCategories();
        renderProducts(filteredProducts);
    } catch (error) {
        message.classList.remove("hidden");
        message.querySelector("p").textContent = error.message;
    } finally {
        loading.classList.add("hidden");
    }
}
function populateCategories() {
    const categories = [...new Set(
        products.map(product => product.category)
    )];
    categoryFilter.innerHTML = `
        <option value="all">
            All Categories
        </option>
    `;
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}
function renderProducts(data) {
    productsContainer.innerHTML = "";
    if (data.length === 0) {
        emptyProducts.classList.remove("hidden");
        return;
    }
    emptyProducts.classList.add("hidden");
    data.forEach(product => {
        const card = document.createElement("article");
        card.className = "product-card";
        const rating = product.rating
            ? product.rating.rate
            : 0;
        card.innerHTML = `
            <div class="product-image">
                <img
                    src="${product.image}"
                    alt="${product.title}">
            </div>
            <div class="product-content">
                <span class="product-category">
                    ${product.category}
                </span>
                <h3 class="product-title">
                    ${product.title}
                </h3>
                <div class="product-rating">
                    <i class="fa-solid fa-star"></i>
                    ${rating}
                    <span>
                        (${product.rating ? product.rating.count : 0})
                    </span>
                </div>
                <div class="product-bottom">
                    <span class="product-price">
                        $${product.price.toFixed(2)}
                    </span>
                    <div class="product-actions">
                        <button
                            class="view-btn"
                            onclick="showProductDetails(${product.id})">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                        <button
                            class="add-cart-btn"
                            onclick="addToCart(${product.id})">
                            <i class="fa-solid fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        productsContainer.appendChild(card);
    });
}
function applyFilters() {
    const searchValue = searchInput.value
        .trim()
        .toLowerCase();
    const selectedCategory = categoryFilter.value;
    filteredProducts = products.filter(product => {
        const matchesSearch =
            product.title
                .toLowerCase()
                .includes(searchValue);
        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    applySorting();
    renderProducts(filteredProducts);
}

function applySorting() {
    const sortValue = sortSelect.value;
    if (sortValue === "price-low") {
        filteredProducts.sort((a, b) => {
            return a.price - b.price;
        });
    }
    if (sortValue === "price-high") {
        filteredProducts.sort((a, b) => {
            return b.price - a.price;
        });
    }
    if (sortValue === "name") {
        filteredProducts.sort((a, b) => {
            return a.title.localeCompare(b.title);
        });
    }
}
searchInput.addEventListener("input", () => {
    applyFilters();
});
categoryFilter.addEventListener("change", () => {
    applyFilters();
});

sortSelect.addEventListener("change", () => {
    applyFilters();
});
function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    if (!product) {
        return;
    }

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    saveCart();
    renderCart();
    openCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
}

function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (!item) {
        return;
    }
    item.quantity += 1;
    saveCart();
    renderCart();
}

function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (!item) {
        return;
    }
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        removeFromCart(productId);
        return;
    }
    saveCart();
    renderCart();
}
function saveCart() {
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}

function renderCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        emptyCart.style.display = "flex";
        cartItemsText.textContent = "0 items";
        cartTotal.textContent = "$0.00";
        updateCartCount();
        return;
    }

    emptyCart.style.display = "none";

    cart.forEach(item => {
        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img
                    src="${item.image}"
                    alt="${item.title}">
            </div>

            <div class="cart-item-content">

                <h3 class="cart-item-title">
                    ${item.title}
                </h3>

                <p class="cart-item-price">
                    $${item.price.toFixed(2)}
                </p>

                <div class="quantity-controls">

                    <button
                        class="quantity-btn"
                        onclick="decreaseQuantity(${item.id})">

                        <i class="fa-solid fa-minus"></i>

                    </button>

                    <span class="quantity">
                        ${item.quantity}
                    </span>

                    <button
                        class="quantity-btn"
                        onclick="increaseQuantity(${item.id})">

                        <i class="fa-solid fa-plus"></i>

                    </button>

                </div>

            </div>

            <button
                class="remove-cart-btn"
                onclick="removeFromCart(${item.id})">

                <i class="fa-solid fa-trash"></i>

            </button>
        `;

        cartItems.appendChild(cartItem);
    });

    updateCartCount();
    updateCartTotal();
}

function updateCartCount() {
    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;

    cartItemsText.textContent =
        `${totalItems} ${totalItems === 1 ? "item" : "items"}`;
}

function updateCartTotal() {
    const total = cart.reduce(
        (sum, item) => {
            return sum + item.price * item.quantity;
        },
        0
    );

    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function openCart() {
    cartSidebar.classList.add("active");
    cartOverlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function closeCartSidebar() {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.add("hidden");
    document.body.style.overflow = "";
}

cartBtn.addEventListener("click", () => {
    openCart();
});

closeCart.addEventListener("click", () => {
    closeCartSidebar();
});

cartOverlay.addEventListener("click", () => {
    closeCartSidebar();
});

function showProductDetails(productId) {
    const product = products.find(item => item.id === productId);

    if (!product) {
        return;
    }

    const rating = product.rating
        ? product.rating.rate
        : 0;

    const ratingCount = product.rating
        ? product.rating.count
        : 0;

    modalBody.innerHTML = `
        <div class="modal-image">

            <img
                src="${product.image}"
                alt="${product.title}">

        </div>

        <div class="modal-details">

            <span class="modal-category">
                ${product.category}
            </span>

            <h2>
                ${product.title}
            </h2>

            <div class="modal-price">
                $${product.price.toFixed(2)}
            </div>

            <div class="modal-rating">

                <i class="fa-solid fa-star"></i>

                ${rating}

                <span>
                    (${ratingCount} reviews)
                </span>

            </div>

            <p class="modal-description">
                ${product.description}
            </p>

            <button
                class="modal-add-btn"
                onclick="addToCart(${product.id}); closeProductModal();">

                <i class="fa-solid fa-cart-plus"></i>

                Add to Cart

            </button>

        </div>
    `;

    productModal.classList.remove("hidden");

    document.body.style.overflow = "hidden";
}

function closeProductModal() {
    productModal.classList.add("hidden");

    document.body.style.overflow = "";
}

closeModal.addEventListener("click", () => {
    closeProductModal();
});

productModal.addEventListener("click", event => {
    if (event.target === productModal) {
        closeProductModal();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeProductModal();
        closeCartSidebar();
    }
});

checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty.");

        return;
    }

    const total = cart.reduce(
        (sum, item) => {
            return sum + item.price * item.quantity;
        },
        0
    );

    const confirmed = confirm(
        `Your total is $${total.toFixed(2)}. Proceed to checkout?`
    );

    if (!confirmed) {
        return;
    }

    alert(
        "Order placed successfully!"
    );

    cart = [];

    saveCart();

    renderCart();

    closeCartSidebar();
});

window.addEventListener("load", () => {
    fetchProducts();

    renderCart();
});

function refreshCart() {
    saveCart();
    renderCart();
}

function getCartItemCount() {
    return cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);
}

function getCartTotal() {
    return cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
}

function updateCartDisplay() {
    const itemCount = getCartItemCount();
    const total = getCartTotal();

    cartCount.textContent = itemCount;

    cartItemsText.textContent =
        `${itemCount} ${itemCount === 1 ? "item" : "items"}`;

    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function clearCart() {
    cart = [];

    refreshCart();

    closeCartSidebar();
}

window.addEventListener("storage", event => {
    if (event.key === "cart") {
        cart = JSON.parse(event.newValue) || [];

        renderCart();
    }
});

window.addEventListener("beforeunload", () => {
    saveCart();
});

updateCartDisplay();