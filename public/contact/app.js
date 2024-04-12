import { app } from "../config.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const db = getFirestore(app);
// store the contact form data in the firestore database
let formSubmitBtn = document.getElementById("sendMsg");

formSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let inputFields = document.querySelectorAll(".form form input");
    let msg = document.querySelector(".form form textarea");
    if (inputFields[0].value != "" && inputFields[0].value != null) {
        if (inputFields[1].value != "" && inputFields[1].value != null) {
        if (msg.value != "" && msg.value != null) {
            addDoc(collection(db, "contact"), {
            name: inputFields[0].value,
            email: inputFields[1].value,
            message: msg.value,
            })
            .then(() => {
                alert("Message sent successfully.");
                inputFields[0].value = "";
                inputFields[1].value = "";
                msg.value = "";
            })
            .catch((error) => {
                alert("Error sending message.");
            });
        } else {
            alert("Message is required.");
        }
        } else {
        alert("Email is required.");
        }
    } else {
        alert("Name is required.");
    }
    });
    
