const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxmKHOmrfVXRjzJdI6VaIIzvxYqdu3Jx8cCXBcxsgM3nnxIUwAU0tq7IoZR1r5ba7wo/exec";

let cart = {};
let total = 0;

// ➕ Add item
function addItem(name, price) {
  if (!cart[name]) {
    cart[name] = { price: price, qty: 1 };
  } else {
    cart[name].qty++;
  }
  updateCart();
}

// ➖ Remove item
function removeItem(name) {
  if (cart[name]) {
    cart[name].qty--;
    if (cart[name].qty <= 0) {
      delete cart[name];
    }
  }
  updateCart();
}

// 🔄 Update cart UI
function updateCart() {
  const list = document.getElementById("cartItems");
  list.innerHTML = "";
  total = 0;
  let count = 0;

  for (let item in cart) {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item} (${cart[item].qty})
      <button onclick="addItem('${item}', ${cart[item].price})">+</button>
      <button onclick="removeItem('${item}')">−</button>
    `;
    list.appendChild(li);

    total += cart[item].price * cart[item].qty;
    count += cart[item].qty;
  }

  document.getElementById("count").innerText = count;
  document.getElementById("total").innerText = total;
}

// 🛒 Checkout open
function openForm() {
  if (Object.keys(cart).length === 0) {
    alert("Cart empty");
    return;
  }
  document.getElementById("overlay").style.display = "block";
}

// ❌ Close form
function closeForm() {
  document.getElementById("overlay").style.display = "none";
}

// ✅ Submit order
function submitOrder() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !address) {
    alert("Fill all details");
    return;
  }

  let items = "";
  for (let i in cart) {
    items += `${i} x${cart[i].qty}, `;
  }

  // Google Sheet (no error)
  fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      phone,
      address,
      items,
      total
    })
  });

  // WhatsApp
  const msg =
    `New Order\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nItems: ${items}\nTotal: ₹${total}`;

  window.location.href =
    "https://wa.me/918392010029?text=" + encodeURIComponent(msg);
}
