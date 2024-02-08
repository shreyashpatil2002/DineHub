import { app } from '../../public/config.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const restId = document.URL.split("=")[1].split("@")[0];
console.log(restId);
const db = getFirestore(app);
const form = document.getElementById('form');

document.getElementById("submitBtn").addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('feedback').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const collectionRef = collection(db, `restaurant/${restId}/feedbacks`);
    addDoc(collectionRef, {
        name: name,
        email: email,
        message: message,
        rating: rating,
        date: new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()
    })
    .then((docRef) => {
        document.querySelector('form').reset();
        alert("Feedback submitted successfully!");
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
});

