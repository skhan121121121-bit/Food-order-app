const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxmKHOmrfVXRjzJdI6VaIIzvxYqdu3Jx8cCXBcxsgM3nnxIUwAU0tq7IoZR1r5ba7wo/exec";

let cart = [];
let total = 0;

function addItem(name, price) {
  cart.push({ name, price });
  total += price;
  renderCart();
}

function renderCart() {
  const cartEl = document.getElementById("cart");
  cartEl.innerHTML = "";

  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.name} - ₹${item.price}`;
    cartEl.appendChild(li);
  });

  document.getElementById("total").innerText = total;
}

function placeOrder() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !address || cart.length === 0) {
    alert("সব ফিল্ড পূরণ করুন এবং আইটেম যোগ করুন");
    return;
  }

  const itemsText = cart.map(i => i.name).join(", ");

  const data = {
    name: name,
    phone: phone,
    address: address,
    items: itemsText,
    total: total
  };

  // ✅ Send to Google Sheet
  fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  // ✅ WhatsApp (OWNER)
  const message =
    `New Order Received\n\n` +
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `Address: ${address}\n` +
    `Items: ${itemsText}\n` +
    `Total: ₹${total}\n\n` +
    `UPI: Abu.sahed@ptyes`;

  const whatsappURL =
    "https://wa.me/918392010029?text=" +
    encodeURIComponent(message);

  window.location.href = whatsappURL;

  // Reset
  cart = [];
  total = 0;
  document.getElementById("cart").innerHTML = "";
  document.getElementById("total").innerText = "0";
}
