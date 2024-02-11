import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { app } from "../config.js";

const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (!user && !user.emailVerified) {
    window.location.href = `${window.location.origin}/public/login/`;
  }
  else if(user && user.emailVerified){
    let db = getFirestore(app);
    let docRef = doc(db, `restaurant/${user.uid}`);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.data().RestaurantName === undefined) {
          document.querySelector(".preloader").style.display = "none";
        }
        else {
          window.location.href = "../dashboard/";
        }
      })
  }
});


// creating a new user with their email and password
let formSubmitBtn = document.getElementById("addRestBtn");
let inputFields = document.querySelectorAll(".form form input");
let errBox = document.getElementById("errMsg");
formSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputFields[0].value != "" && inputFields[0].value != null) {
    if (inputFields[1].value != "" && inputFields[1].value != null) {
      if (inputFields[2].value != "" && inputFields[2].value != null) {
        document.querySelector(".loader").style.display = "block";
        addRestaurant();
      } else {
        errBox.innerText = `No. of tables is required. 😬`;
        setInterval(() => {
          errBox.style.animation =
            "error 3s cubic-bezier(0.18, 0.87, 0.63, 1.20)";
        }, 500);
        errBox.removeAttribute("style");
      }
    } else {
      errBox.innerText = "Location of restaurant required. 🙄";
      setInterval(() => {
        errBox.style.animation =
          "error 3s cubic-bezier(0.18, 0.87, 0.63, 1.20)";
      }, 500);
      errBox.removeAttribute("style");
    }
  } else {
    errBox.innerText = "Restaurant name is required. 😒";
    setInterval(() => {
      errBox.style.animation = "error 3s cubic-bezier(0.18, 0.87, 0.63, 1.20)";
    }, 500);
    errBox.removeAttribute("style");
  }
});

function addRestaurant() {
  const db = getFirestore(app);
  let docRef = doc(db, `restaurant/${auth.currentUser.uid}`);
  setDoc(docRef, {
    RestaurantName: inputFields[0].value,
    RestaurantLocation: inputFields[1].value,
    TableNo: inputFields[2].value,
    RestCode: Math.floor(Math.random() * 1000000),
  }, { merge: true });
  docRef = doc(db, `restaurant/${auth.currentUser.uid}/foodItems/demo`);
  setDoc(docRef, {})
  docRef = doc(db, `restaurant/${auth.currentUser.uid}/orders/demo`);
  setDoc(docRef, {})
  docRef = doc(db, `restaurant/${auth.currentUser.uid}/sales/demo`);
  setDoc(docRef, {})
  docRef = doc(db, `restaurant/${auth.currentUser.uid}/feedbacks/demo`);
  setDoc(docRef, {})
  setTimeout(() => {
    window.location.href = "../QRCode/";
  }, Math.floor(Math.random() * 1000) + 1000);
}