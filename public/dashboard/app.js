import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { app } from "../config.js";

const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "../login";
  } else {
    document.querySelector(".preloader").style.display = "none";
  }
});
import {
  getFirestore,
  collection,
  onSnapshot,
  deleteDoc,
  getDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const user = localStorage.getItem("user");
const userObj = JSON.parse(user);

const db = getFirestore(app);
const itemsCollection = collection(db, `restaurant/${userObj.uid}/foodItem`);

document.getElementById("profile").innerHTML = `
              <img src="${
                userObj.photoURL === undefined
                  ? "../Assets/svg/user-solid.svg"
                  : userObj.photoURL
              }" alt="user image">
              <p>${
                userObj.displayName
              } <img src="../Assets/svg/chevron-down-solid.svg" alt="dropDown"></p>`;
const docRef = doc(db, `restaurant/${userObj.uid}`);
getDoc(docRef).then((docSnap) => {
  if (docSnap.data()) {
    document.getElementById("restcode").innerHTML = `<span class="material-symbols-outlined">
    lock
    </span> Restaurant Code: ${docSnap.data().RestCode}`;
  }
});
// Update the list of items when any change happens in the Firestore
onSnapshot(itemsCollection, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    const docData = change.doc.data();
    const docId = change.doc.id;
    if (docData.itemName !== undefined && change.type === "added") {
      document.getElementById("foodItems").innerHTML += `
        <div class="foodItem" id="${docId}">
        <div class="itemImg" style="background-image: url('${docData.itemImg}')"></div>
        <h2>${docData.itemName}</h2>
        <p>Price: ${docData.itemPrice} Rs</p>
        <p>Description: ${docData.itemDesc}</p>
        <button class="editButton"><span class="material-symbols-outlined">
          edit_square
        </span> Edit</button>
        <button class="deleteButton"><span class="material-symbols-outlined">
        delete
        </span> Delete</button>
        <div class="editForm" id="editForm${docId}">
          <button class="closeButton"><span class="material-symbols-outlined">close</span></button>
          <label>Category</label>
          <select class="itemCategory">
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
            <option value="Fast Food">Fast Food</option>
            <option value="Hot Drinks">Hot Drinks</option>
            <option value="Cold Drinks">Cold Drinks</option>
          </select>
          <label>Edit Name</label>
          <input type="text" class="itemName" value="${docData.itemName}" />
          <label>Edit Price</label>
          <input type="number" class="itemPrice" value="${docData.itemPrice}" />
          <label>Edit Description</label>
          <input type="text" class="itemDesc" value="${docData.itemDesc}" />
          <label>Available</label>
          <select class="itemAvailable">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <button class="updateButton">Update</button>
        </div>
      </div>`;
    }
    if (change.type === "removed") {
      document.getElementById(docId).remove();
    }
    if (change.type === "modified") {
      const item = document.getElementById(docId);
      item.querySelector("h2").innerText = docData.itemName;
      item.querySelector("p").innerText = `Price: ${docData.itemPrice} Rs`;
      item.querySelector(
        "p:nth-of-type(2)"
      ).innerText = `Description: ${docData.itemDesc}`;
    }
    enableOperations();
  });
});

function enableOperations() {
  document.querySelectorAll(".deleteButton").forEach((button) => {
    button.addEventListener("click", (e) => {
      if (!confirm("Are you sure you want to delete this item?")) return;
      const docId = e.target.parentElement.id;
      deleteItem(docId);
    });
  });
  document.querySelectorAll(".editButton").forEach((button) => {
    button.addEventListener("click", () => {
      console.log(button.parentElement.id);
      openEditForm(button.parentElement.id);
    });
  });
  document.querySelectorAll(".closeButton").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(".overlay").style.display = "none";
      closeEditForm(button.parentElement.id);
    });
  });
  document.querySelectorAll(".updateButton").forEach((button) => {
    button.addEventListener("click", (e) => {
      document.querySelector(".overlay").style.display = "none";
      const docId = e.target.parentElement.parentElement.id;
      const category =
        e.target.parentElement.querySelector(".itemCategory").value;
      const itemName = e.target.parentElement.querySelector(".itemName").value;
      const itemPrice =
        e.target.parentElement.querySelector(".itemPrice").value;
      const itemDesc = e.target.parentElement.querySelector(".itemDesc").value;
      const itemAvailable =
        e.target.parentElement.querySelector(".itemAvailable").value;
      updateDoc(doc(db, `restaurant/${userObj.uid}/foodItem/${docId}`), {
        itemCategory: category,
        itemName: itemName,
        itemPrice: itemPrice,
        itemDesc: itemDesc,
        available: itemAvailable,
      })
        .then(() => {
          document.querySelector(".overlay").style.display = "none";
          document.getElementById(button.parentElement.id).style.display =
            "none";
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    });
  });
}
document.getElementById("dropdown").innerHTML = `
  <span id="profileClose"class="material-symbols-outlined">close</span>
  <p><img src="${
    userObj.photoURL === undefined
      ? "../Assets/svg/user-solid.svg"
      : userObj.photoURL
  }" alt="profile pic"></p>
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
const deleteItem = (docId) => {
  deleteDoc(doc(db, `restaurant/${userObj.uid}/foodItem/${docId}`))
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};
const openEditForm = (id) => {
  document.querySelector(".overlay").style.display = "block";
  document.querySelector(`#editForm${id}`).style.display = "block";
};

const closeEditForm = (id) => {
  document.querySelector(".overlay").style.display = "none";
  document.getElementById(id).style.display = "none";
};
