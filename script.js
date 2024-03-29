const products = [
  {
    name: "Apples",
    price: 1.2,
    vegetarian: true,
    glutenFree: true,
    organic: true,
    imageUrl: "apple.png",
    category: "fruits",
  },
  {
    name: "Bread",
    price: 2.35,
    vegetarian: true,
    glutenFree: false,
    category: "dairy",

    organic: false,
    imageUrl: "bread.png",
  },
  {
    name: "Carrots",
    price: 0.99,
    vegetarian: true,
    glutenFree: true,
    organic: true,
    category: "fruits",

    imageUrl: "carrot.png",
  },
  {
    name: "Chicken",
    price: 5.99,
    vegetarian: false,
    glutenFree: true,
    organic: false,
    category: "meat",

    imageUrl: "chicken.png",
  },
  {
    name: "Milk",
    price: 3.49,
    vegetarian: true,
    glutenFree: true,
    organic: false,
    imageUrl: "milk.png",
    category: "dairy",
  },
  {
    name: "Cheese",
    price: 4.99,
    vegetarian: true,
    glutenFree: true,
    organic: true,
    category: "dairy",
    imageUrl: "cheese.png",
  },
  {
    name: "Eggs",
    price: 2.0,
    vegetarian: false,
    glutenFree: true,
    organic: false,
    category: "dairy",
    imageUrl: "egg.png",
  },
  {
    name: "Lettuce",
    price: 1.5,
    vegetarian: true,
    glutenFree: true,
    category: "vegetables",
    organic: true,
    imageUrl: "lettuce.png",
  },
  {
    name: "Oranges",
    price: 3.0,
    vegetarian: true,
    glutenFree: true,
    category: "fruits",
    organic: false,
    imageUrl: "orange.png",
  },
  {
    name: "Potatoes",
    price: 2.25,
    vegetarian: true,
    glutenFree: true,
    category: "vegetables",
    organic: true,
    imageUrl: "potato.png",
  },
  {
    name: "Tomatoes",
    price: 2.5,
    vegetarian: true,
    glutenFree: true,
    category: "vegetables",

    organic: false,
    imageUrl: "tomato.png",
  },
  {
    name: "Cucumber",
    price: 1.75,
    vegetarian: true,
    glutenFree: true,
    organic: true,
    imageUrl: "cucumber.png",
    category: "vegetables",
  },
];

const userPreferences = {
  vegetarian: false,
  glutenFree: false,
  organic: false,
};

let maxPrice = 10;

// Sort by price
function displayProducts(filteredProducts = products) {
  const productsList = filteredProducts
    .filter(
      (product) =>
        (userPreferences.vegetarian ? product.vegetarian : true) &&
        (userPreferences.glutenFree ? product.glutenFree : true) &&
        (userPreferences.organic ? product.organic : true) &&
        product.price <= maxPrice
    )
    .sort((a, b) => a.price - b.price)
    .map(
      (product) => `
        <div class="product">
          <img src="${product.imageUrl}" alt="${
        product.name
      }" class="product-image">
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

document.getElementById("price-range").addEventListener("input", function () {
  maxPrice = Number(this.value);
  updatePriceRange(this.value);
  displayProducts();
});
function updatePriceRange(value) {
  document.getElementById(
    "price-range-value"
  ).textContent = `Price Range: $0 - $${value}`;
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
function filterByCategory(category) {
  let filteredProducts = products.filter((product) => {
    if (category === "all") return true;
    return product.category === category;
  });
  displayProducts(filteredProducts);
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
  document
    .getElementById("dark-mode-toggle")
    .addEventListener("change", function () {
      document.body.classList.toggle("dark-mode");
    });
});
