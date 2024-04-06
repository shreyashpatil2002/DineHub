const itemList = document.getElementById("itemList");
document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    itemList.innerHTML = "<h1>No Items yet</h1>";
    document.getElementById("checkoutLink").removeAttribute("href");
  } else {
    cart.forEach((item) => {
      const itemName = item.name;
      const itemQuantity = item.quantity;
      const itemPrice = item.price;
      insertRow(itemName, itemQuantity, itemPrice);
    });
    itemList.innerHTML += `<tr>
    <td colspan="3">Grand Total</td>
    <td>₹ ${grandTotal}.00</td>
</tr>`;
  }
});

let grandTotal = 0;
const insertRow = (itemName, itemQuantity, itemPrice) => {
  const row = document.createElement("tr");
  grandTotal += itemPrice * itemQuantity;
  localStorage.setItem("grandTotal", grandTotal);
  row.innerHTML = `
        <td>${itemName}</td>
        <td>₹ ${itemPrice}</td>
        <td>${itemQuantity}</td>
        <td colspan="2">₹ ${itemPrice * itemQuantity}.00</td>
    `;
  itemList.appendChild(row);
};



