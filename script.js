// 🔥 আপনার Apps Script Web App URL
const WEB_APP_URL =
 "https://script.google.com/macros/s/AKfycbyodGU8w96fA-x75fVPkcP-jUnacVbZHl9yiSsK3pZLF2S43h0oq5YsFHtX6pa6JSwCKQ/exec";

let cart = [];
let total = 0;

function addItem(name, price) {
  cart.push(name + " ₹" + price);
  total += price;
  document.getElementById("cart").innerHTML =
    cart.map(i => "<li>" + i + "</li>").join("");
  document.getElementById("total").innerText = total;
}

function placeOrder() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !address || cart.length === 0) {
    alert("Fill all fields");
    return;
  }

  const data = {
    name: name,
    phone: phone,
    address: address,
    items: cart.join(", "),
    total: total
  };

  // sheet POST
  fetch(WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data)
  });

  alert("Order Sent!");

  // WhatsApp message
  let msg =
    "New Order%0AName: " + name +
    "%0APhone: " + phone +
    "%0AAddress: " + address +
    "%0AItems: " + cart.join(", ") +
    "%0ATotal: ₹" + total;

  window.open("https://wa.me/91" + phone + "?text=" + msg, "_blank");

  cart = [];
  total = 0;
  document.getElementById("cart").innerHTML = "";
  document.getElementById("total").innerText = 0;
}
