import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
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


const storage = getStorage();
let imgSrc;

document.getElementById("uploadBtn").addEventListener("click", (e) => {
  e.preventDefault();
  let file = document.getElementById("image").files[0];
  let itemName = document.getElementById("itemName").value;
  let itemPrice = document.getElementById("itemPrice").value;
  let itemDesc = document.getElementById("itemDesc").value;
  let itemCategory = document.getElementById("itemCategory").value;
  // let itemStock = document.getElementById("itemStock").value;
  // let itemDiscount = document.getElementById("itemDiscount").value;

  if(file === undefined || itemName === "" || itemPrice === "" || itemDesc === "" || itemCategory === ""){
    document.getElementById("msg").innerHTML = `<p><span class="material-symbols-outlined">
    error
    </span>Please fill all the fields</p>`;
    document.getElementById("msg").style.color = "red";
    document.getElementById("msg").style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    document.getElementById("msg").style.right = "-5%";
    setTimeout(() => {
    document.getElementById("msg").style.right = "-36%";
    }, 2000);
    return;
  }
  document.getElementById("loader").style.display = "flex";
  AddItemToDatabase(file, itemName, itemPrice, itemDesc, itemCategory);
});

document.getElementById("image").addEventListener("change", (e) => {
  let reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.onload = (e) => {
    document.getElementById(
      "imgPreview"
    ).innerHTML = `<img src="${e.target.result}" alt="item img"></img>`;
  };
});

function AddItemToDatabase(file, itemName, itemPrice, itemDesc, itemCategory) {
  let storageRef = ref(
    storage,
    `${auth.currentUser.uid}/${itemCategory}/${itemName}`
  );
  uploadBytes(storageRef, file).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((downloadURL) => {
      imgSrc = downloadURL;
      let db = getFirestore(app);
      addDoc(collection(db, `restaurant/${auth.currentUser.uid}/foodItem`), {
        itemName: itemName,
        itemPrice: itemPrice,
        itemDesc: itemDesc,
        itemCategory: itemCategory,
        itemImg: imgSrc,
        available: true,
      })
        .then(() => {
          console.log("Document successfully written!");
          document.getElementById("msg").innerHTML = `<p><span class="material-symbols-outlined">
          check_circle
          </span>Item added successfully</p>`;
          document.getElementById("msg").style.color = "green";
          document.getElementById("msg").style.backgroundColor = "rgba(0, 255, 0, 0.2)";
          document.getElementById("msg").style.right = "-5%";
          setTimeout(() => {
          document.getElementById("msg").style.right = "-36%";
          }, 2000);
          document.getElementById("loader").style.display = "none";
          document.getElementById("imgPreview").innerHTML = "<p>image priview</p>";
          document.querySelector("form").reset();
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    });
  });
}
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