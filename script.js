// ===============================
// CONFIG
// ===============================
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzHmdNzSNs6q5Cwm17Wv7MqFGcMARk5UfAai3dYzZauUK8uqpO9XRU-z9nt2KR9rNhf/exec";

// ===============================
// CART DATA
// ===============================
let cart = [];
let total = 0;

// ===============================
// ADD ITEM TO CART
// ===============================
function addItem(itemName, price) {
  cart.push({ name: itemName, price: price });
  total += price;
  renderCart();
}

// ===============================
// SHOW CART
// ===============================
function renderCart() {
  const cartList = document.getElementById("cart");
  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = `${item.name} - ₹${item.price}`;
    cartList.appendChild(li);
  });

  document.getElementById("total").innerText = total;
}

// ===============================
// PLACE ORDER
// ===============================
function placeOrder() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !address || cart.length === 0) {
    alert("সব ফিল্ড পূরণ করুন এবং আইটেম যোগ করুন");
    return;
  }

  const orderData = {
    name: name,
    phone: phone,
    address: address,
    items: cart.map((i) => i.name).join(", "),
    total: total
  };

  fetch(SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderData)
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.status === "success") {
        alert("✅ Order Successful");

        // RESET
        cart = [];
        total = 0;
        document.getElementById("cart").innerHTML = "";
        document.getElementById("total").innerText = "0";
        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("address").value = "";
      } else {
        alert("❌ Order Failed");
        console.error(response);
      }
    })
    .catch((err) => {
      alert("❌ Network Error");
      console.error(err);
    });
}
