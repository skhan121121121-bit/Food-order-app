// ===============================
// CONFIG
// ===============================
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxmKHOmrfVXRjzJdI6VaIIzvxYqdu3Jx8cCXBcxsgM3nnxIUwAU0tq7IoZR1r5ba7wo/exec";

const OWNER_WHATSAPP = "918392010029"; // Owner WhatsApp
const UPI_ID = "Abu.sahed@ptyes";      // Your UPI ID

// ===============================
// CART DATA
// ===============================
let cart = [];
let total = 0;

// ===============================
// ADD ITEM
// ===============================
function addItem(name, price) {
  cart.push({ name, price });
  total += price;
  renderCart();
}

// ===============================
// SHOW CART
// ===============================
function renderCart() {
  const cartList = document.getElementById("cart");
  cartList.innerHTML = "";

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name + " - ₹" + item.price;
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
    items: cart.map(i => i.name).join(", "),
    total: total
  };

  fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderData)
  })
  .then(() => {
    alert("✅ Order Successful");

    // ===============================
    // WHATSAPP AUTO MESSAGE (OWNER)
    // ===============================
    const message =
      "New Order Received%0A" +
      "Name: " + name + "%0A" +
      "Phone: " + phone + "%0A" +
      "Address: " + address + "%0A" +
      "Items: " + cart.map(i => i.name).join(", ") + "%0A" +
      "Total: ₹" + total;

    window.open(
      "https://wa.me/" + OWNER_WHATSAPP + "?text=" + message,
      "_blank"
    );

    // RESET
    cart = [];
    total = 0;
    document.getElementById("cart").innerHTML = "";
    document.getElementById("total").innerText = "0";
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
  })
  .catch(() => {
    alert("❌ Network Error");
  });
}

// ===============================
// PAY WITH UPI
// ===============================
function payNow() {
  if (total === 0) {
    alert("আগে আইটেম যোগ করুন");
    return;
  }

  const upiUrl =
    "upi://pay?pa=" + UPI_ID +
    "&pn=FoodOrder" +
    "&am=" + total +
    "&cu=INR";

  window.location.href = upiUrl;
    }
