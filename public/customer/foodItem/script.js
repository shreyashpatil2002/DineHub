const addItem = (button) => {
  const foodItemElement = button.parentElement;
  price = button.previousElementSibling.textContent.split("₹")[1];
  const foodItem = {
    id: foodItemElement.id,
    name: foodItemElement.querySelector("h3").textContent,
    price: price,
    quantity: 1,
    img: foodItemElement.querySelector("img").src,
    description: foodItemElement.querySelector("p").textContent.split(":")[1],
  };

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(foodItem);
  localStorage.setItem("cart", JSON.stringify(cart));
  button.innerText = "Added to Cart";
  button.style.backgroundColor = "green";
  button.disabled = true;
  document.getElementById("itemCount").innerText = cart.length;
  document.getElementById("itemCount").style.display = "flex";
};

document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("itemCount").innerText = cart.length;
  document.getElementById("itemCount").style.display = "flex";
});

const increment = (button) => {
  const quantity = button.previousElementSibling;
  quantity.value = parseInt(quantity.value) + 1;
  const itemId = button.parentElement.id;
  const cart = JSON.parse(localStorage.getItem("cart"));
  const item = cart.find((item) => item.id === itemId);
  item.quantity = quantity.value;
  localStorage.setItem("cart", JSON.stringify(cart));
};
const decrement = (button) => {
  const quantity = button.nextElementSibling;
  if (quantity.value > 1) {
    quantity.value = parseInt(quantity.value) - 1;
    const itemId = button.parentElement.id;
    const cart = JSON.parse(localStorage.getItem("cart"));
    const item = cart.find((item) => item.id === itemId);
    item.quantity = quantity.value;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    for(let item of cart) {
      if(item.id === window.location.search.split("=")[1]) {
        document.getElementById("quantity").value = item.quantity;
        break;
      }
    }
  }, 1000);
});