import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { app } from "../../config.js";

const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "../../login";
  }
  else {
    document.querySelector(".preloader").style.display = "none";
  }
});

const user = localStorage.getItem("user");
const userObj = JSON.parse(user);

document.getElementById("profile").innerHTML = `
              <img src="${userObj.photoURL}" alt="user image">
              <p>${userObj.displayName} <img src="../../Assets/svg/chevron-down-solid.svg" alt="dropDown"></p>`;

document.getElementById('dropdown').innerHTML = `
  <span id="profileClose"class="material-symbols-outlined">close</span>
  <p><img src="${userObj.photoURL}" alt="profile pic"></p>
  <p>${userObj.displayName}</p>
  <p>${userObj.email}</p>
  <button id="logout"><span class="material-symbols-outlined">
  logout
  </span>Logout</button>`;

document.getElementById("profile").addEventListener("click", () => { 
  document.getElementById("dropdown").style.display = "block";
  document.getElementById('profileClose').addEventListener('click', () => {
    document.getElementById('dropdown').style.display = 'none';
  });
  document.getElementById("logout").addEventListener("click", () => {
    signOut(auth);
    localStorage.removeItem("user");
    window.location.href = "../login";
  });
});

const db = getFirestore(app);
const feedbackCollection = collection(db, `restaurant/${userObj.uid}/feedbacks`);

onSnapshot(feedbackCollection, (querySnapshot) => {
  document.getElementById("feedbacks").innerHTML = "";
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if(doc.id === "demo") return;
    document.getElementById("feedbacks").innerHTML += `
    <div class="feedback" id="${doc.id}">
      <div class="feedbackDetails">
        <p class="name">${data.name}</p>
        <p class="email">${data.email}</p>
        <p class="message">${data.feedback}</p>
        <p class="rating">${
          data.rating === "1"
            ? "😡"
            : data.rating === "2"
            ? "😠"
            : data.rating === "3"
            ? "😐"
            : data.rating === "4"
            ? "😊"
            : "😍"
        }</p>
        <p class="date">${data.date}</p>
      </div>
      <button class="deleteButton">Delete</button>
    </div>`;
  });
  enableDelete();
});  

function enableDelete() {
  console.log('delete')
  const deleteButtons = document.querySelectorAll(".deleteButton");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.parentElement.id;
      deleteDoc(doc(db, `restaurant/${userObj.uid}/feedbacks/${id}`))
      .then(() => {
        document.getElementById(id).remove();
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    });
  });
}
