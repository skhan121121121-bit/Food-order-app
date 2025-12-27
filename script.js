// 🔗 আপনার Apps Script Web App URL
const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbyodGU8w96fA-x75fVPkcP-jUnacVbZHl9yiSsK3pZLF2S43h0oq5YsFHtX6pa6JSwCKQ/exec";

let cart = [];
let total = 0;

function addToCart(item, price) {
  cart.push(item + " ₹" + price);
  total += price;

  const cartList = document.getElementById("cartList");
  cartList.innerHTML = "";

  cart.forEach(i => {
    const li = document.createElement("li");
    li.innerText = i;
    cartList.appendChild(li);
  });

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

  fetch(WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data)
  });

  alert("Order placed successfully!");

  // reset
  cart = [];
  total = 0;
  document.getElementById("cartList").innerHTML = "";
  document.getElementById("total").innerText = "0";
}
