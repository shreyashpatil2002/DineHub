import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
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
var options = {
  series: [{
  name: 'Last week',
  data: [31, 40, 28, 51, 42, 109, 100]
}, {
  name: 'This week',
  data: [11, 32, 45, 32, 34, 52, 41]
}],
  chart: {
  toolbar: {
    show: true,
    tools: {
      download: true,
      selection: true,
      zoom: false,
      zoomin: false,
      zoomout: false,
      pan: false,
      reset: false
    },
  },
  height: 350,
  type: 'area'
},
dataLabels: {
  enabled: false
},
stroke: {
  curve: 'smooth'
},
xaxis: {
  type: 'category',
  categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
},
tooltip: {
  x: {
    format: 'dd'
  },
},
};

var chart = new ApexCharts(document.querySelector("#salesChart"), options);
chart.render();

var options = {
  series: [42, 47, 52, 58, 65],
  chart: {
  width: 380,
  type: 'polarArea'
},
labels: ['Veg', 'Non-veg', 'Fast Food', 'Hot Drinks', 'Cold Drinks'],
fill: {
  opacity: 1
},
stroke: {
  width: 1,
  colors: undefined
},
yaxis: {
  show: false
},
legend: {
  position: 'bottom',
},
plotOptions: {
  polarArea: {
    rings: {
      strokeWidth: 0
    },
    spokes: {
      strokeWidth: 0
    },
  }
},
theme: {
  monochrome: {
    enabled: false,
    shadeTo: 'light',
    shadeIntensity: 0.65
  }
}
};

var chart = new ApexCharts(document.querySelector("#categorySales"), options);
chart.render();

function enableOperations() {
  document.querySelectorAll(".deleteButton").forEach((button) => {
    button.addEventListener("click", (e) => {
      const docId = e.target.parentElement.id;
      deleteDoc(doc(db, `restaurant/${userObj.uid}/foodItem/${docId}`))
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    });
  });
  document.querySelectorAll(".editButton").forEach((button) => {
    button.addEventListener("click", (e) => {
      document.querySelector(".editForm").style.display = "block";
    });
  });
  document.querySelectorAll(".closeButton").forEach((button) => {
    button.addEventListener("click", (e) => {
      document.querySelector(".editForm").style.display = "none";
    });
  });
  document.querySelectorAll(".updateButton").forEach((button) => {
    button.addEventListener("click", (e) => {});
    document.querySelectorAll(".updateButton").forEach((button) => {
      button.addEventListener("click", (e) => {
        const docId = e.target.parentElement.parentElement.id;
        const category =
          e.target.parentElement.querySelector(".itemCategory").value;
        const itemName =
          e.target.parentElement.querySelector(".itemName").value;
        const itemPrice =
          e.target.parentElement.querySelector(".itemPrice").value;
        const itemDesc =
          e.target.parentElement.querySelector(".itemDesc").value;
        const itemAvailable =
          e.target.parentElement.querySelector(".itemAvailable").value;
        updateDoc(doc(db, `restaurant/${userObj.uid}/foodItem/${docId}`), {
          itemCategory: category,
          itemName: itemName,
          itemPrice: itemPrice,
          itemDesc: itemDesc,
          available: itemAvailable,
        })
          .then(() => {
            document.querySelector(".editForm").style.display = "none";
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
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