const orderHistoryDiv = document.getElementById("order-history");
const newOrderForm = document.getElementById("new-order-form");

// Dummy Data
let userOrders = [];
let allProducts = ["Product A", "Product B", "Product C"];

function newOrder() {
  newOrderForm.style.display = "block";
  newOrderForm.innerHTML = `
    <h2>Create Order</h2>
    <input type="text" id="product-name" placeholder="Search Product">
    <input type="number" id="product-qty" placeholder="Quantity">
    <button onclick="addToOrder()">Add Item</button>
    <div id="order-items">${renderOrderItems()}</div>
    <button onclick="finalizeOrder()">Finalize Order</button>
  `;
}

function renderOrderItems() {
  return userOrders.map((o, i) => `
    <div>
      ${o.name} (${o.qty})
      <button onclick="removeFromOrder(${i})">Remove</button>
    </div>
  `).join("");
}

function addToOrder() {
  const name = document.getElementById("product-name").value;
  const qty = document.getElementById("product-qty").value;
  if (name && qty) {
    userOrders.push({ name, qty });
    newOrder();
  }
}

function removeFromOrder(index) {
  userOrders.splice(index, 1);
  newOrder();
}

function finalizeOrder() {
  alert("Order finalized!");
  newOrderForm.style.display = "none";
}

