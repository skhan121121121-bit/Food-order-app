let cart = [];
let total = 0;

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxmKHOmrfVXRjzJdI6VaIIzvxYqdu3Jx8cCXBcxsgM3nnxIUwAU0tq7IoZR1r5ba7wo/exec";

function addItem(name, price) {
  cart.push({ name, price });
  total += price;
  updateCart();
}

function updateCart() {
  document.getElementById("count").innerText = cart.length;
  document.getElementById("total").innerText = total;

  const list = document.getElementById("cartItems");
  list.innerHTML = "";
  cart.forEach(i => {
    const li = document.createElement("li");
    li.innerText = i.name;
    list.appendChild(li);
  });
}

function openForm() {
  if (cart.length === 0) {
    alert("Cart empty");
    return;
  }
  document.getElementById("overlay").style.display = "block";
}

function closeForm() {
  document.getElementById("overlay").style.display = "none";
}

function submitOrder() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  if (!name || !phone || !address) {
    alert("Fill all details");
    return;
  }

  const items = cart.map(i => i.name).join(", ");

  // ✅ Google Sheet
  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({
      name,
      phone,
      address,
      items,
      total
    })
  });

  // ✅ WhatsApp
  const msg =
    `New Order\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nItems: ${items}\nTotal: ₹${total}`;

  window.location.href =
    "https://wa.me/918392010029?text=" + encodeURIComponent(msg);
}
