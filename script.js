const products = [
  {
    name: "Apples",
    price: 1.2,
    vegetarian: true,
    glutenFree: true,
    organic: true,
  },
  {
    name: "Bread",
    price: 2.35,
    vegetarian: true,
    glutenFree: false,
    organic: false,
  },
  {
    name: "Carrots",
    price: 0.99,
    vegetarian: true,
    glutenFree: true,
    organic: true,
  },
  {
    name: "Chicken",
    price: 5.99,
    vegetarian: false,
    glutenFree: true,
    organic: false,
  },
  {
    name: "Milk",
    price: 3.49,
    vegetarian: true,
    glutenFree: true,
    organic: false,
  },
  {
    name: "Cheese",
    price: 4.99,
    vegetarian: true,
    glutenFree: true,
    organic: true,
  },
  {
    name: "Eggs",
    price: 2.0,
    vegetarian: false,
    glutenFree: true,
    organic: false,
  },
  {
    name: "Lettuce",
    price: 1.5,
    vegetarian: true,
    glutenFree: true,
    organic: true,
  },
  {
    name: "Oranges",
    price: 3.0,
    vegetarian: true,
    glutenFree: true,
    organic: false,
  },
  {
    name: "Potatoes",
    price: 2.25,
    vegetarian: true,
    glutenFree: true,
    organic: true,
  },
  {
    name: "Tomatoes",
    price: 2.5,
    vegetarian: true,
    glutenFree: true,
    organic: false,
  },
  {
    name: "Cucumber",
    price: 1.75,
    vegetarian: true,
    glutenFree: true,
    organic: true,
  },
];

const userPreferences = {
  vegetarian: false,
  glutenFree: false,
  organic: false,
};

// Sort by price
function displayProducts() {
  const filteredProducts = products
    .filter(
      (product) =>
        (userPreferences.vegetarian ? product.vegetarian : true) &&
        (userPreferences.glutenFree ? product.glutenFree : true) &&
        (userPreferences.organic ? product.organic : true)
    )
    .sort((a, b) => a.price - b.price);
  const productsList = filteredProducts
    .map(
      (product) => `
        <div class="product">
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart('${product.name}', ${
        product.price
      })">Add to Cart</button>
        </div>
    `
    )
    .join("");
  document.getElementById("products-list").innerHTML = productsList;
}

// Shopping cart array
const cart = [];

// Add items to the cart
function addToCart(name, price) {
  cart.push({ name, price });
  displayCart();
}

// Remove item from the cart
function removeFromCart(index) {
  cart.splice(index, 1);
  displayCart();
}

// Display items in the cart and calculate total
function displayCart() {
  const cartItemsHtml = cart
    .map(
      (item, index) => `
        <div class="cart-item">
            ${item.name} - $${item.price.toFixed(2)}
            <button onclick="removeFromCart(${index})">Remove</button>
        </div>
    `
    )
    .join("");
  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  const cartHtml = `
        <div>${cartItemsHtml}</div>
        <div class="total">Total: $${total}</div>
    `;
  document.getElementById("cart-items").innerHTML = cartHtml;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("vegetarian").addEventListener("change", (e) => {
    userPreferences.vegetarian = e.target.checked;
    displayProducts();
  });
  document.getElementById("glutenFree").addEventListener("change", (e) => {
    userPreferences.glutenFree = e.target.checked;
    displayProducts();
  });
  document.getElementById("organic").addEventListener("change", (e) => {
    userPreferences.organic = e.target.checked;
    displayProducts();
  });
  displayProducts();
});
