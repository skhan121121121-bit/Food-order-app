let cart = [];
let total = 0;

// ✅ YOUR APPS SCRIPT WEB APP URL (already added)
const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbyk8PPlFiKuY6afmiirEmq-CKZjtYF_6EFxV2JkAT19k8ASv-o8Y05Y6VKDNXB_EBjCZg/exec";

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
    li.innerText = item.name + " - ₹" + item.price;
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
    name: name,
    phone: phone,
    address: address,
    items: cart.map(i => i.name).join(", "),
    total: total
  };

  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(response => {
    alert("Order placed successfully");
    cart = [];
    total = 0;
    document.getElementById("cartCount").innerText = 0;
    closeCart();
  })
  .catch(() => {
    alert("Order failed");
  });
}
