// Dummy data for authentication
const adminCredentials = { username: "admin", password: "admin123" };
const userCredentials = [
  { username: "user1", password: "123" },
  { username: "user2", password: "123" },
];

// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  // Admin Login
  if (username === adminCredentials.username && password === adminCredentials.password) {
    window.location.href = "admin.html";
    return;
  }

  // User Login
  const user = userCredentials.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    window.location.href = "user.html";
  } else {
    errorMessage.textContent = "Invalid username or password.";
    errorMessage.style.color = "red";
  }
});

