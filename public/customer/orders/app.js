import { app } from "../../config.js";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const DineCust = localStorage.getItem("DineCust");
const restId = JSON.parse(DineCust).restId;

// gettings all the foodItems from the database
const db = getFirestore(app);

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
  }
});

const showItem = (foodItem) => {
  const orders = document.getElementById("orders");
  const link = document.createElement("a");
  link.href = `../foodItem/?itemId=${foodItem.id}`;
  const item = document.createElement("div");
  item.classList.add("itemBox");
  item.id = foodItem.id;
  item.innerHTML = `
    <div class="item">
    <div class="item__img">
      <img src="${foodItem.img}" alt="${foodItem.name}" />
    </div>
    <div class="item__info">
      <h3>${foodItem.name}</h3>
      <p>${foodItem.description}</p>
      <p>₹${foodItem.price}</p>
    </div>
  </div>
  <div class="item_footer">
    <p>Quantity: ${foodItem.quantity}</p>
    <button class="removeBtn" onclick="removeItem(this)">Remove</button>
  </div>
  `;
  link.appendChild(item);
  orders.appendChild(link);
}