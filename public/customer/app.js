import { app } from "../config.js";
import {
  getFirestore,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let data = document.URL.split("=");

const DineCust = {
  tableNo: data[2],
  restId: data[1].split("@")[0],
};
localStorage.setItem("DineCust", JSON.stringify(DineCust));

const restId = data[1].split("@")[0];

let RestData;
// getting restuarant data from firestore
const db = getFirestore(app);
const docRef = doc(db, "restaurant", restId);
getDoc(docRef)
  .then((doc) => {
    if (doc.exists()) {
      RestData = doc.data();
      // giving the restname to the header
      document.querySelector(".restName").textContent = RestData.RestaurantName;
    } else {
      console.log("No such document!");
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });

document.getElementById("continue").addEventListener("click", () => {
  const restCode = document.querySelector("input").value;
  if (restCode === "") {
    document.querySelector(".overlay").style.display = "flex";
    return;
  }
  validateCode(restCode);
});
document.querySelector(".closeWarning").addEventListener("click", () => {
  document.querySelector(".overlay").style.display = "none";
});

const validateCode = (restCode) => {
  if (RestData.RestCode === restCode) {
    window.location.href = `./menus`;
  } else {
    document.querySelector(".overlay").style.display = "flex";
  }
};
