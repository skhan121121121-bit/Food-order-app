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

async function submitOrder() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !address) {
    alert("Please fill all details");
    return;
  }

  const items = cart.map(i => i.name).join(", ");

  const orderData = {
    name: name,
    phone: phone,
    address: address,
    items: items,
    total: total
  };

  try {
    // ✅ FIRST: Google Sheet এ পাঠানো
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    const text = await res.text();

    if (!res.ok) {
      alert("Order failed");
      return;
    }

    // ✅ SUCCESS MESSAGE
    alert("Order successfully placed ✅");

    // ✅ THEN: WhatsApp open
    const msg =
      `New Order\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\n\nItems: ${items}\nTotal: ₹${total}`;

    const whatsappUrl =
      "https://wa.me/918392010029?text=" + encodeURIComponent(msg);

    window.open(whatsappUrl, "_blank");

    // ✅ RESET
    cart = [];
    total = 0;
    updateCart();
    closeForm();

  } catch (err) {
    alert("Network error ❌");
    console.error(err);
  }
      }
