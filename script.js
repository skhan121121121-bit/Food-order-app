// ====== GLOBAL VARIABLES ======
let cart = [];
let total = 0;

// 🔴 এখানে আপনার Google Apps Script Web App URL বসান
const API_URL = "https://script.google.com/macros/s/AKfycby2Q6TkoX1ZOcYmqWutwskxmXUF-7me57rMqGHbLB_RdF55VAhz0Nvpxhu6SBvVL5kZ/exec";

// ====== ADD ITEM TO CART ======
function addItem(name, price) {
  cart.push({
    name: name,
    price: price
  });

  total += price;

  renderCart();
}

// ====== SHOW CART ======
function renderCart() {
  const cartList = document.getElementById("cart");
  cartList.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ₹${item.price}
      <span style="color:red;cursor:pointer;float:right"
        onclick="removeItem(${index})">✖</span>
    `;
    cartList.appendChild(li);
  });

  document.getElementById("total").innerText = total;
}

// ====== REMOVE ITEM ======
function removeItem(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  renderCart();
}

// ====== PLACE ORDER ======
function placeOrder() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const status = document.getElementById("status");

  if (!name || !phone || !address || cart.length === 0) {
    status.innerText = "❌ সব তথ্য পূরণ করুন";
    status.style.color = "red";
    return;
  }

  const orderData = {
    name: name,
    phone: phone,
    address: address,
    items: cart.map(i => i.name).join(", "),
    total: total
  };

  status.innerText = "⏳ Order sending...";
  status.style.color = "black";

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderData)
  })
    .then(response => response.json())
    .then(result => {
      if (result.status === "success") {
        status.innerText = "✅ Order Placed Successfully";
        status.style.color = "green";

        // Reset
        cart = [];
        total = 0;
        renderCart();
        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("address").value = "";
      } else {
        status.innerText = "❌ Order Failed";
        status.style.color = "red";
      }
    })
    .catch(error => {
      status.innerText = "⚠️ Network Error";
      status.style.color = "red";
      console.error(error);
    });
}
