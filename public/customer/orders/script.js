const removeItem = (button) => {
  const itemId = button.parentElement.parentElement.id;
  const cart = JSON.parse(localStorage.getItem("cart"));
  const newCart = cart.filter((item) => item.id !== itemId);
  localStorage.setItem("cart", JSON.stringify(newCart));
  button.parentElement.parentElement.remove();
};

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
    cart.forEach((item) => {
      let orderItem = document.getElementById(item.id);
      orderItem.querySelector("#quantity").value = item.quantity;
    });
  }, 100);
});
