// DOM Elements
const contentArea = document.getElementById("content-area");

// Dummy Data
let products = [];
let users = [
  { username: "admin1", password: "password123" },
  { username: "admin2", password: "123456" },
  { username: "user1", password: "userpass" }
];
let orders = [];

function showUserAccounts() {
  contentArea.innerHTML = `
    <h2>Manage User Accounts</h2>
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Password</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${renderUserAccounts()}
      </tbody>
    </table>
  `;
}

function renderUserAccounts() {
  return users.map((user, index) => `
    <tr>
      <td>${user.username}</td>
      <td>${user.password}</td>
      <td>
        <button onclick="editUserPassword(${index})">Edit</button>
        <button onclick="deleteUser(${index})">Delete</button>
      </td>
    </tr>
  `).join("");
}

function editUserPassword(index) {
  const newPassword = prompt(`Enter new password for ${users[index].username}:`);
  if (newPassword) {
    users[index].password = newPassword;
    alert(`Password for ${users[index].username} has been updated.`);
    showUserAccounts();
  }
}

function deleteUser(index) {
  const confirmDelete = confirm(`Are you sure you want to delete ${users[index].username}?`);
  if (confirmDelete) {
    users.splice(index, 1);
    alert(`User ${users[index].username} has been deleted.`);
    showUserAccounts();
  }
}

function importCSV(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const csvData = e.target.result;
    const rows = csvData.split("\n").map((row) => row.trim());
    const newProducts = rows
      .slice(1) // ข้าม header "products name"
      .filter((name) => name) // กรองบรรทัดว่าง
      .map((name) => ({ name, category: "Uncategorized" })); // สร้างสินค้าใหม่พร้อม category เริ่มต้น

    products.push(...newProducts); // เพิ่มสินค้าใหม่ในรายการ
    alert(`${newProducts.length} products imported successfully!`);
    showManageProducts(); // อัปเดตรายการสินค้าในหน้า
  };

  reader.readAsText(file); // อ่านไฟล์ CSV เป็นข้อความ
}
// Functions to Render Pages
function showManageProducts() {
  contentArea.innerHTML = `
    <h2>Manage Products</h2>
    <button onclick="addProduct()">+ Add Product</button>
    <div id="product-list">${renderProductList()}</div>
  `;
}

function showManageUsers() {
  contentArea.innerHTML = `
    <h2>Manage Users</h2>
    <button onclick="addUser()">+ Add User</button>
    <div id="user-list">${renderUserList()}</div>
  `;
}

function showOrderHistory() {
  contentArea.innerHTML = `
    <h2>Order History</h2>
    <div>${renderOrderHistory()}</div>
  `;
}

function renderProductList() {
  return products.map((p, i) => `
    <div>
      <strong>${p.name}</strong> (${p.category})
      <button onclick="editProduct(${i})">Edit</button>
      <button onclick="deleteProduct(${i})">Delete</button>
    </div>
  `).join("");
}
function renderProductList() {
  return products.map((p, i) => `
    <div>
      <strong>${p.name}</strong> (${p.category})
      <button onclick="editProduct(${i})">Edit</button>
      <button onclick="deleteProduct(${i})">Delete</button>
    </div>
  `).join("");
}
// Renderers
function renderProductList() {
  return products.map((p, i) => `
    <div>
      <strong>${p.name}</strong> (${p.category})
      <button onclick="editProduct(${i})">Edit</button>
      <button onclick="deleteProduct(${i})">Delete</button>
    </div>
  `).join("");
}

function renderUserList() {
  return users.map((u, i) => `
    <div>
      <strong>${u.username}</strong>
      <button onclick="deleteUser(${i})">Delete</button>
    </div>
  `).join("");
}

function renderOrderHistory() {
  return orders.map((o) => `
    <div>
      <strong>${o.date}</strong>: ${o.items.map(item => `${item.name} (${item.qty})`).join(", ")}
    </div>
  `).join("");
}

// Actions
function addProduct() {
  const name = prompt("Enter product name:");
  const category = prompt("Enter category:");
  if (name && category) products.push({ name, category });
  showManageProducts();
}

function deleteProduct(index) {
  products.splice(index, 1);
  showManageProducts();
}

function addUser() {
  const username = prompt("Enter username:");
  const password = prompt("Enter password:");
  if (username && password) users.push({ username, password });
  showManageUsers();
}

function deleteUser(index) {
  users.splice(index, 1);
  showManageUsers();
}

