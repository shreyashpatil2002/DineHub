import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { app } from "../../config.js";

const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "../../login";
  } else {
    document.querySelector(".preloader").style.display = "none";
  }
});

const user = localStorage.getItem("user");
const userObj = JSON.parse(user);

document.getElementById("profile").innerHTML = `
              <img src="${userObj.photoURL}" alt="user image">
              <p>${userObj.displayName} <img src="../../Assets/svg/chevron-down-solid.svg" alt="dropDown"></p>`;

document.getElementById("dropdown").innerHTML = `
  <span id="profileClose"class="material-symbols-outlined">close</span>
  <p><img src="${userObj.photoURL}" alt="profile pic"></p>
  <p>${userObj.displayName}</p>
  <p>${userObj.email}</p>
  <button id="logout"><span class="material-symbols-outlined">
  logout
  </span>Logout</button>`;

document.getElementById("profile").addEventListener("click", () => {
  document.getElementById("dropdown").style.display = "block";
  document.getElementById("profileClose").addEventListener("click", () => {
    document.getElementById("dropdown").style.display = "none";
  });
  document.getElementById("logout").addEventListener("click", () => {
    signOut(auth);
    localStorage.removeItem("user");
    window.location.href = "../login";
  });
});

const db = getFirestore(app);
const orderCollection = collection(db, "restaurant", userObj.uid, "orders");

const orderList = document.getElementById("orderList");

onSnapshot(orderCollection, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "removed") {
      document.getElementById(change.doc.id).parentElement.parentElement.remove();
      return;
    }
    if (change.type === "modified") {
      document.getElementById(change.doc.id + "status").innerHTML = `<p>${
        change.doc.data().status
      }</p>`;
      document.getElementById(change.doc.id + "status").classList = `status ${
        change.doc.data().status
      }`;
      return;
    }
    const order = change.doc.data();
    if (change.doc.id === "demo") return;

    let tableNo = order.tableNo;
    let date = order.time.toDate();
    let status = order.status;
    let Items = order.items;
    let total = 0;
    date =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    Items.forEach((item) => {
      total += item.price * item.quantity;
    });
    orderList.innerHTML += `
                  <tr>
                  <td><button class="rowKey" id="${change.doc.id}">&plus;</button></td>
                  <td>${tableNo}</td>
                  <td>${Items.length}</td>
                  <td>${date}</td>
                  <td class="status ${status}" id="${change.doc.id}status"><p>${status}</p></td>
                  <td>Rs. ${total}</td>
                  </tr>`;
  });
});

document.getElementById("orderList").addEventListener("click", (e) => {
  if (!e.target.classList.contains("rowKey")) return;
  const id = e.target.id;
  getDoc(doc(db, "restaurant", userObj.uid, "orders", id)).then((doc) => {
    let date = doc.data().time.toDate();
    date =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    document.getElementById("singleOrder").innerHTML = `
  <div class="orderDetails">
  <div class="orderDetailsHeader">
    <h2>Order Details</h2>
    <button id="closeOrderDetails">
      <span class="material-symbols-outlined"> close </span>
    </button>
  </div>
  <div class="orderDetailsBody">
    <h3>Table NO . ${doc.data().tableNo}</h3>
    <p>Order Date : ${date}</p>
    <label for="status">Order Status :</label>
    <select name="status" dataValue="${id}" class="status">
      <option value="${doc.data().status}" selected>${
      doc.data().status
    }</option>
      <option value="Pending">Pending</option>
      <option value="Delivered">Delivered</option>
      <option value="Cancelled">Cancelled</option>
    </select>
    <div class="orderDetailsTable">
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody id="orderDetails">
        ${doc.data().items.map((item) => {
          return `
          <tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>${item.price}</td>
          <td>${item.price * item.quantity}</td>
          </tr>
          `;
        })}
        </tbody>
      </table>
      <button class="deleteBtn" dataValue="${id}">
        Delete Order
      </button>
    </div>
  </div>
</div>
  `;
    document.getElementById("singleOrder").style.display = "flex";
    document
      .getElementById("closeOrderDetails")
      .addEventListener("click", () => {
        document.getElementById("singleOrder").style.display = "none";
      });
  });
});

// when the order status of the order is changed it will change in main table and in firebase
document.getElementById("singleOrder").addEventListener("change", (e) => {
  if (e.target.tagName !== "SELECT") return;
  const status = e.target.value;
  const id = e.target.getAttribute("dataValue");
  const statusTd = document.getElementById(id + "status");
  statusTd.innerHTML = `<p>${status}</p>`;
  statusTd.classList = `status ${status}`;
  const orderRef = doc(db, "restaurant", userObj.uid, "orders", id);
  const updateStatus = { status: status };
  updateDoc(orderRef, updateStatus);
});

document.getElementById("singleOrder").addEventListener("click", (e) => {
  if (!e.target.classList.contains("deleteBtn")) return;
  const id = e.target.getAttribute("dataValue");
  console.log(id)
  deleteDoc(doc(db, "restaurant", userObj.uid, "orders", id));
  document.getElementById("singleOrder").style.display = "none";
});