import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
  sendEmailVerification,
  updateProfile,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { app } from "../config.js";

const auth = getAuth(app);

// creating a new user with their email and password
let formSubmitBtn = document.getElementById("signupBtn");
let inputFields = document.querySelectorAll(".form form input");
let errBox = document.getElementById("errMsg");
let errors = [];
formSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputFields[0].value != "" && inputFields[0].value != null) {
    if (inputFields[1].value != "" && inputFields[1].value != null) {
      if (inputFields[2].value != "" && inputFields[2].value != null) {
        if (inputFields[2].value.length >= 6) {
          if (inputFields[3].checked == true) {
            let email = inputFields[1].value;
            let password = inputFields[2].value;
            createUserWithEmailAndPassword(auth, email, password)
              .then((data) => {
                profileUpdate(inputFields[0].value);
              })
              .catch((error) => {
                errBox.innerText = error.message.split("/")[1].split(")")[0];
                setInterval(() => {
                  errBox.style.animation =
                    "error 3s cubic-bezier(0.18, 0.87, 0.63, 1.20)";
                }, 500);
                errBox.removeAttribute("style");
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
          errBox.innerText = `Password must be atleast 6 characters. 😬`;
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
  } else {
    errBox.innerText = "Name is required. 😒";
    setInterval(() => {
      errBox.style.animation = "error 3s cubic-bezier(0.18, 0.87, 0.63, 1.20)";
    }, 500);
    errBox.removeAttribute("style");
  }
});

// signin with google Oauth provider
let googleSigninBtn = document.getElementById("googleSigninBtn");
googleSigninBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      createDatabaseUser();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
    });
});

let appleSigninBtn = document.getElementById("appleSigninBtn");
appleSigninBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const provider = new OAuthProvider("apple.com");
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(credential, token, user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
    });
});

// send email verifiction
function verifyEmail() {
  sendEmailVerification(auth.currentUser)
    .then((data) => {
      continueToLogin();
    })
    .catch((err) => {
      console.log(err);
    });
}

//updating the users profile
function profileUpdate(userName) {
  updateProfile(auth.currentUser, {
    displayName: userName,
  })
    .then(() => {
      verifyEmail();
    })
    .catch((error) => {
      console.log(error);
    });
}

function continueToLogin() {
  let container = document.querySelector(".form");
  container.innerHTML = `<div id="emailVerifyBox">
  <h2>Email Verify !</h2>
  <p>Hey, ${inputFields[0].value}</p>
  <p>we sent a verification email to <b>${inputFields[1].value}</b></p> 
  <p>after verificaiton login here</p>
  <a href="../login/"><button id="loginAfterVerifyBtn">Login</button></a>
</div>`;
}

function createDatabaseUser() {
  const db = getFirestore(app);
  const docRef = doc(db, `restaurant/${auth.currentUser.uid}`);
  setDoc(docRef, {
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
    photoURL: auth.currentUser.photoURL,
  }, { merge: true })
    .then(() => {
      localStorage.setItem("user", JSON.stringify(auth.currentUser));
      redirectToDashboard();
    })
    .catch((error) => {
      console.log(error);
    });
}
document.querySelector(".preloader").style.display = "none";
const redirectToDashboard = () => {
  setInterval(() => {
    window.location.href = `${window.location.origin}/public/addRestaurant/`;
  }, Math.floor(Math.random() * (1000 - 500) + 1000));
}