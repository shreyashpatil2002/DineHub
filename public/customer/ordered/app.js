// creating a timer that will count down the time left for the customer to cancel the order
let showTime = document.getElementById("showTime");
// the timer will be of 5 minutes
let time = 0.1 * 60;
let minutes;
let seconds;
let timer = setInterval(function () {
  minutes = parseInt(time / 60, 10);
  seconds = parseInt(time % 60, 10);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  showTime.innerHTML = `<h2>${minutes} : ${seconds}</h2>`;
  if (--time < 0) {
    clearInterval(timer);
    showTime.innerHTML = "00:00";
    showTime.innerHTML = `<h3>Time's up! You can't cancel the order now.</h3>
    <img src="https://static.vecteezy.com/system/resources/previews/019/465/852/non_2x/tick-mark-icon-symbol-on-transparent-background-free-png.png" alt="Time's up! You can't cancel the order now." width="250" height="250">`;
    document.querySelector(".cancelBtn button").style.display = "none";
    localStorage.setItem("timeUp", "true");
    placeOrder();
  }
}, 1000);

// if (localStorage.getItem("timeUp") === "true") {
//   clearInterval(timer);
//   showTime.innerHTML = "00:00";
//   showTime.innerHTML = `<h3>Time's up! You can't cancel the order now.</h3>
//   <img src="https://static.vecteezy.com/system/resources/previews/019/465/852/non_2x/tick-mark-icon-symbol-on-transparent-background-free-png.png" alt="Time's up! You can't cancel the order now." width="250" height="250">`;
//   document.querySelector(".cancelBtn button").style.display = "none";
// }

document
  .querySelector(".cancelBtn button")
  .addEventListener("click", function () {
    if (confirm("You wan't to cancel the order?")) {
      clearInterval(timer);
      window.location.href = "../menus/";
    }
  });

// now we are going to deal with database ordering in firebase
import { app } from "../../config.js";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const DineCust = localStorage.getItem("DineCust");
const restId = JSON.parse(DineCust).restId;
const tableNo = JSON.parse(DineCust).tableNo;

let cartItems = [];
let cart = localStorage.getItem("cart");
if (cart) {
  cartItems = JSON.parse(cart);
}

const db = getFirestore(app);
const orderCollection = collection(db, "restaurant", restId, "orders");

const placeOrder = () => {
  addDoc(orderCollection, {
    tableNo: tableNo,
    items: cartItems,
    status: "Pending",
    time: new Date(),
  })
    .then((docRef) => {
      console.log("Document successfully with id " + docRef.id);
      localStorage.setItem("orderPlaced", "true");
      localStorage.setItem("orderId", docRef.id);
      localStorage.removeItem("cart");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};
