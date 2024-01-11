import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { app } from "../config.js";

const auth = getAuth(app);

// creating a new user with their email and password
let formSubmitBtn = document.getElementById("signupBtn");
let inputFields = document.querySelectorAll(".form form input");
let errBox = document.getElementById("errMsg");

formSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputFields[0].value != "" && inputFields[0].value != null) {
    if (inputFields[1].value != "" && inputFields[1].value != null) {
      if (inputFields[2].checked == true) {
        let email = inputFields[1].value;
        let password = inputFields[2].value;
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log(userCredential.user);
            window.location.href = 'https://effective-halibut-rqr6g9p9wxjh5466-5000.app.github.dev/login/'
          })
          .catch((error) => {
            console.log(error.code);
            console.log(error.message);
          });
      } else {
        errBox.innerText = `Accept the terms and policy 🚨`;
        setInterval(() => {
          errBox.style.animation =
            "error 3s cubic-bezier(0.18, 0.87, 0.63, 1.20)";
        }, 500);
        errBox.removeAttribute("style");
      }
    } else {
      errBox.innerText = `Password is required. 😬`;
      setInterval(() => {
        errBox.style.animation =
          "error 3s cubic-bezier(0.18, 0.87, 0.63, 1.20)";
      }, 500);
      errBox.removeAttribute("style");
    }
  } else {
    errBox.innerText = "Email is required. 🙄";
    setInterval(() => {
      errBox.style.animation =
        "error 3s cubic-bezier(0.18, 0.87, 0.63, 1.20)";
    }, 500);
    errBox.removeAttribute("style");
  }
});


// signin with google Oauth provider
let googleSigninBtn = document.getElementById('googleSigninBtn');
googleSigninBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(credential, token, user)
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(errorCode, errorMessage, email, credential)
  });
})

let appleSigninBtn = document.getElementById('appleSigninBtn');
appleSigninBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const provider = new OAuthProvider('apple.com');
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(credential, token, user)
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(errorCode, errorMessage, email, credential)
  });
})

