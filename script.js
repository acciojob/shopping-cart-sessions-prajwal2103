// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Cart array
let cart = [];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Load cart from sessionStorage
function loadCart() {
  const storedCart = sessionStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
}

// Save cart to sessionStorage
function saveCart() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // Add event listeners to the add-to-cart buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-id");
      addToCart(productId);
    });
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = ""; // Clear the cart list
  cart.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="remove-from-cart-btn" data-id="${product.id}">Remove From Cart</button>`;
    cartList.appendChild(li);
  });

  // Add event listeners to the remove-from-cart buttons
  const removeFromCartButtons = document.querySelectorAll(".remove-from-cart-btn");
  removeFromCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-id");
      removeFromCart(productId);
    });
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((product) => product.id === Number(productId));
  if (product && !cart.includes(product)) {
    cart.push(product);
    saveCart(); // Save cart to sessionStorage
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((product) => product.id !== Number(productId));
  saveCart(); // Save cart to sessionStorage
  renderCart();
}

// Clear cart
function clearCart() {
  cart = [];
  saveCart(); // Save cart to sessionStorage
  renderCart();
}

// Initial render
loadCart(); // Load cart from sessionStorage
renderProducts();
renderCart();

// Event listener for clear cart button
clearCartBtn.addEventListener("click", clearCart);
