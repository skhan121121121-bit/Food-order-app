// ===============================
// GOOGLE APP SCRIPT WEB APP URL
// ===============================
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby2Q6TkoX1ZOcYmqWutwskxmXUF-7me57rMqGHbLB_RdF55VAhz0Nvpxhu6SBvVL5kZ/exec";

// ===============================
// CART DATA
// ===============================
let cart = [];
let total = 0;

// ===============================
// ADD ITEM TO CART
// ===============================
function addItem(name, price) {
  cart.push({ name, price });
  total += price;
  renderCart();
}

// ===============================
// SHOW CART ITEMS
// ===============================
function renderCart() {
  const cartList = document.getElementById("cart");
  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.name + " - ₹" + item.price;
    cartList.appendChild(li);
  });

  document.getElementById("total").innerText = total;
}

// ===============================
// PLACE ORDER (SEND TO GOOGLE SHEET)
// ===============================
function placeOrder() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !address || cart.length === 0) {
    alert("সব ফিল্ড পূরণ করুন এবং অন্তত ১টা আইটেম যোগ করুন");
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
    .then((data) => {
      if (data.status === "success") {
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
        console.log(data);
      }
    })
    .catch((error) => {
      alert("❌ Network Error");
      console.error(error);
    });
}
