document.addEventListener("DOMContentLoaded", () => {
  const orders = document.getElementById("orders");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    orders.innerHTML = "<h1>No orders yet</h1>";
  } else {
    cart.forEach((item) => {
      const itemId = item.id;
      showItem(item);
    });
  showQuantity();
  }
});

const showItem = (foodItem) => {
  const orders = document.getElementById("orders");
  const item = document.createElement("div");
  item.classList.add("itemBox");
  item.id = foodItem.id;
  item.innerHTML = `
    <div class="item">
    <a href="../foodItem/?itemId=${foodItem.id}">
    <div class="item__img">
      <img src="${foodItem.img}" alt="${foodItem.name}" />
    </div>
    <div class="item__info">
      <h3>${foodItem.name}</h3>
      <p>${foodItem.description}</p>
      <p>₹${foodItem.price}</p>
    </div>
    </a>
  </div>
  <div class="item_footer">
  <div class="quantity" id="${foodItem.id}">
  <button id="decrement" onclick="decrement(this)">-</button>
  <input type="text" id="quantity" value="1" disabled />
  <button id="increment" onclick="increment(this)">+</button>
  </div>
    <button class="removeBtn" onclick="removeItem(this)">Remove</button>
  </div>
  `;
  orders.appendChild(item);
};

const showQuantity = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    cart.forEach((item) => {
      let orderItem = document.getElementById(item.id);
      orderItem.querySelector("#quantity").value = item.quantity;
    });
};
