import { app } from "../config.js";

import {
  getAuth,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

document.getElementById("sendMail").addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const ValidEmail = email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
  if (!ValidEmail) {
    alert("Please enter a valid email address");
    return;
  }
  sendPasswordResetEmail(auth, email)
    .then(() => {
        document.querySelector('form').reset();
        document.querySelector('.hide').style.display = 'block';
        document.getElementById("sendMail").innerHTML = "<a href='https://mail.google.com/mail/' target='_blank'>Check your email</a>";
    })
    .catch((error) => {
      alert(error.message);
    });
});
