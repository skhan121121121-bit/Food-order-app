let cart = [];
let total = 0;

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

  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item.name;
    list.appendChild(li);
  });
}

function checkout() {
  if (cart.length === 0) {
    alert("Cart empty");
    return;
  }

  let items = cart.map(i => i.name).join(", ");
  let msg = `New Order\nItems: ${items}\nTotal: ₹${total}`;

  window.location.href =
    "https://wa.me/918392010029?text=" +
    encodeURIComponent(msg);
}
