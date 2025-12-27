let cart = [];
let total = 0;

// 🔴 আপনার Web App URL এখানে বসাবেন
const SCRIPT_URL = "PASTE_YOUR_WEB_APP_URL_HERE";

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
  let list = document.getElementById("cartItems");
  list.innerHTML = "";
  cart.forEach(item => {
    let li = document.createElement("li");
    li.innerText = item.name + " - ₹" + item.price;
    list.appendChild(li);
  });
  document.getElementById("total").innerText = total;
}

function placeOrder() {
  let name = document.getElementById("name").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let address = document.getElementById("address").value.trim();

  if (!name || !phone || !address || cart.length === 0) {
    alert("Fill all details");
    return;
  }

  let data = {
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
    alert("Order placed!");
    cart = [];
    total = 0;
    document.getElementById("cartCount").innerText = 0;
    closeCart();
  })
  .catch(() => alert("Error sending order"));
}

// SEARCH
document.getElementById("search").addEventListener("input", function () {
  let val = this.value.toLowerCase();
  document.querySelectorAll(".food").forEach(f => {
    f.style.display = f.innerText.toLowerCase().includes(val) ? "block" : "none";
  });
});
