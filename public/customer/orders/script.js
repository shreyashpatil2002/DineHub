const removeItem = (button) => {
  const itemId = button.parentElement.parentElement.id;
  const cart = JSON.parse(localStorage.getItem("cart"));
  const newCart = cart.filter((item) => item.id !== itemId);
  localStorage.setItem("cart", JSON.stringify(newCart));
  button.parentElement.parentElement.remove();
};
