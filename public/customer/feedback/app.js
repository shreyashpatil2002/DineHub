import { app } from "../../config.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const restData = localStorage.getItem("DineCust");
const restId = JSON.parse(restData).restId;
const db = getFirestore(app);
const restRef = doc(db, "restaurant", restId);

document.getElementById("submitBtn").addEventListener("click", (e) => {
  e.preventDefault();
  getDoc(restRef)
    .then((doc) => {
      const docId = doc.id;
      if (doc.exists()) {
        if (docId == restId) {
          const name = document.getElementById("name").value;
          const email = document.getElementById("email").value;
          const feedback = document.getElementById("feedback").value;
          const rating = document.querySelector(
            'input[name="rating"]:checked'
          ).value;
          addDoc(collection(db, `restaurant/${doc.id}/feedbacks`), {
            name: name,
            email: email,
            feedback: feedback,
            rating: rating,
            date:
              new Date().getDate() +
              "/" +
              (new Date().getMonth() + 1) +
              "/" +
              new Date().getFullYear(),
          })
            .then((docRef) => {
              alert("Feedback submitted successfully");
              window.location.href = `../menus/`;
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        } else {
          alert("Invalid Restaurant Code");
          document.write(docId);
          document.write(restId);
        }
      } else {
        alert("Invalid Restaurant Code");
        document.write(docId);
        document.write(restId);
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
});
