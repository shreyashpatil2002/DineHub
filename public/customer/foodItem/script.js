const addItem = (button) => {
  const foodItemElement = button.previousElementSibling;
  const foodItem = {
    id: foodItemElement.firstElementChild.id,
    name: foodItemElement.querySelector(".item_info_left h2").textContent,
    price: foodItemElement.querySelector(".item_info_left span b").textContent,
    quantity: foodItemElement.querySelector(".item_info_right input").value,
    img: foodItemElement.querySelector("img").src,
    description: foodItemElement.querySelector(".item_description p").innerText,
  };
  const MAX_DESCRIPTION_LENGTH = 7;
  const truncatedDescription = foodItem.description
        .split(" ")
        .slice(0, MAX_DESCRIPTION_LENGTH)
        .join(" ");

      // Add dots if the description was truncated
      foodItem.description =
        foodItem.description.length > MAX_DESCRIPTION_LENGTH
          ? truncatedDescription + "..."
          : truncatedDescription;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(foodItem);
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("itemCount").innerText = cart.length;
  button.firstElementChild.innerText = "Added to cart";
  button.firstElementChild.style.backgroundColor = "green";
  button.firstElementChild.disabled = true;
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
  if(cart === null) {
    return;
  }
  const item = cart.find((item) => item.id === itemId);
  if(item === undefined) {
    return;
  }
  item.quantity = quantity.value;
  localStorage.setItem("cart", JSON.stringify(cart));
};
const decrement = (button) => {
  const quantity = button.nextElementSibling;
  if (quantity.value > 1) {
    quantity.value = parseInt(quantity.value) - 1;
    const itemId = button.parentElement.id;
    const cart = JSON.parse(localStorage.getItem("cart"));
    if(cart === null) {
      return;
    }
    const item = cart.find((item) => item.id === itemId);
    if(item === undefined) {
      return;
    }
    item.quantity = quantity.value;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

