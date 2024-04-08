import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDoc,
  updateDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { app } from "../../config.js";

const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "../../login";
  } else {
    document.querySelector(".preloader").style.display = "none";
  }
});

const user = localStorage.getItem("user");
const userObj = JSON.parse(user);

const db = getFirestore(app);
const userRef = doc(db, "restaurant", userObj.uid);
getDoc(userRef)
  .then((doc) => {
    if (doc.exists()) {
      const data = doc.data();
      document.querySelector(".restaurantProfile").innerHTML = `
      <div class="left-side">
      <h2>${data.RestaurantName}</h2>
      <p>Location : ${data.RestaurantLocation}</p>
      <p>No. of Tables : ${data.TableNo}</p>
      <p>Restaurant Code : ${data.RestCode}</p>
      </div>
      <div class="right-side">
      <h2>QR Download</h2>
      <img src="../../Assets/images/QRImage.jpg" alt="QR Code">
      <a href="../../QRCode"><button>GET QR's</button></a>
      </div>`;
      document.querySelector('.dialogBox').innerHTML = `
      <p>Edit Restaurant Details</p>
          <form method="dialog">
            <input type="text" placeholder="Enter Restaurant Name" value="${data.RestaurantName}" />
            <input type="text" placeholder="Enter Restaurant Address" value="${data.RestaurantLocation}" />
            <input type="text" placeholder="Enter Restaurant Code" value="${data.RestCode}"/>
            <input type="number" placeholder="Enter No. of Tables" value="${data.TableNo}"/>
            <button type="submit" id="ChangeDetailBtn">Submit</button>
          </form>`;

          document.getElementById("ChangeDetailBtn").addEventListener("click", (e) => {
            let form = e.target.form;
            let RestaurantName = form[0].value;
            let RestaurantLocation = form[1].value;
            let RestCode = form[2].value;
            let TableNo = form[3].value;
            updateDoc(userRef, {
              RestaurantName: RestaurantName,
              RestaurantLocation: RestaurantLocation,
              RestCode: RestCode,
              TableNo: TableNo,
            })
            .then(() => {
              console.log("Document successfully updated!");
              window.location.reload();
            })
            .catch((error) => {
              console.error("Error updating document: ", error);
            });
          });


      let button = document.createElement("button");
      button.innerHTML = "Edit Details <span class='material-symbols-outlined'>edit</span>";
      button.classList.add("editProfile");
      button.addEventListener("click", () => {
        document.querySelector(".dialogBox").showModal();
        // document.querySelector(".hero").style. = `
      });
      document.querySelector(".restaurantProfile .left-side").appendChild(button);
    } else {
      console.log("No such document!");
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });

document.getElementById("profile").innerHTML = `
              <img src="${userObj.photoURL}" alt="user image">
              <p>${userObj.displayName} <img src="../../Assets/svg/chevron-down-solid.svg" alt="dropDown"></p>`;

document.getElementById("dropdown").innerHTML = `
  <span id="profileClose"class="material-symbols-outlined">close</span>
  <p><img src="${userObj.photoURL}" alt="profile pic"></p>
  <p>${userObj.displayName}</p>
  <p>${userObj.email}</p>
  <button id="logout"><span class="material-symbols-outlined">
  logout
  </span>Logout</button>`;

document.getElementById("profile").addEventListener("click", () => {
  document.getElementById("dropdown").style.display = "block";
  document.getElementById("profileClose").addEventListener("click", () => {
    document.getElementById("dropdown").style.display = "none";
  });
  document.getElementById("logout").addEventListener("click", () => {
    signOut(auth);
    localStorage.removeItem("user");
    window.location.href = "../login";
  });
});

document.querySelector("main").innerHTML = `
<h2>
    User Profile
</h2>
<div class="userProfile">
<div class="profileImg">
    <img src="${userObj.photoURL}" alt="user image">
</div>
<div class="profileInfo">
    <h2>${userObj.displayName}</h2>
    <p>${userObj.email}</p>
</div>
</div>
<h2>
    Restaurant Profile
</h2>
<div class="restaurantProfile">
</div>`;

