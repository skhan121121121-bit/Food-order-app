// 🔴 আপনার Web App URL
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwWzRK6gtA3vyqr-XeS_hiwGjQbSaPZ8rBR2bhYsfG_dUyUTPNxJDttx85eC4A5vwM/exec";

let cart = [];
let total = 0;
let userPhone = "";
let userPassword = "";

// LOGIN
function login() {
  userPhone = document.getElementById("phone").value;
  userPassword = document.getElementById("password").value;

  if (!userPhone || !userPassword) {
    document.getElementById("loginMsg").innerText = "Fill phone & password";
    return;
  }

  document.getElementById("loginBox").style.display = "none";
  document.getElementById("appBox").style.display = "block";
}

// ADD ITEM
function addItem(name, price) {
  cart.push(name + " ₹" + price);
  total += price;
  renderCart();
}

// SHOW CART
function renderCart() {
  const cartEl = document.getElementById("cart");
  cartEl.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    cartEl.appendChild(li);
  });
  document.getElementById("total").innerText = total;
}

// PLACE ORDER
function placeOrder() {
  const address = document.getElementById("address").value;

  if (cart.length === 0 || !address) {
    document.getElementById("orderMsg").innerText = "Add item & address";
    return;
  }

  const data = {
    phone: userPhone,
    password: userPassword,
    address: address,
    items: cart.join(", "),
    total: total
  };

  fetch(WEB_APP_URL, {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => {
    if (res.status === "success") {
      document.getElementById("orderMsg").innerText = "Order Successful ✅";
      cart = [];
      total = 0;
      renderCart();
      document.getElementById("address").value = "";
    } else {
      document.getElementById("orderMsg").innerText = res.message;
    }
  })
  .catch(() => {
    document.getElementById("orderMsg").innerText = "Network error";
  });
}
