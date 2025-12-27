let cart = [];
let total = 0;

// ✅ YOUR APPS SCRIPT WEB APP URL
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw3qAJIuqntpcHnrIt76tUIYYA8QQCFKXGt5BTqXJ_5i4NvKHMsqoIl16PNZaU7Cjus/exec";

function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  document.getElementById("cartCount").innerText = cart.length;
}

document.getElementById("cartBtn").onclick = () => {
  document.getElementById("cartModal").style.display = "block";
  renderCart();
};

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function renderCart() {
  const list = document.getElementById("cartItems");
  list.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.name} - ₹${item.price}`;
    list.appendChild(li);
  });
  document.getElementById("total").innerText = total;
}

function placeOrder() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !address || cart.length === 0) {
    alert("Fill all details");
    return;
  }

  const data = {
    name,
    phone,
    address,
    items: cart.map(i => i.name).join(", "),
    total
  };

  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(() => {
    alert("Order placed successfully");
    cart = [];
    total = 0;
    document.getElementById("cartCount").innerText = 0;
    closeCart();
  })
  .catch(() => alert("Order failed"));
}

// 🔍 SEARCH
document.getElementById("search").addEventListener("input", function () {
  const value = this.value.toLowerCase();
  document.querySelectorAll(".food").forEach(item => {
    item.style.display = item.innerText.toLowerCase().includes(value)
      ? "block"
      : "none";
  });
});
