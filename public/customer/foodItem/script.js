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