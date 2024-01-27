import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { app } from "../config.js";

const auth = getAuth(app);

setTimeout(() => {
    if (auth.currentUser == null) {
        console.log(auth.currentUser);
    }
}, 1000);


//   function createDatabaseUser() {
//     const db = getFirestore(app);
//     const docRef = doc(db, `restaurant/${auth.currentUser.uid}`);
//     setDoc(docRef, {
//       name: auth.currentUser.displayName,
//       email: auth.currentUser.email,
//       photoURL: auth.currentUser.photoURL,
//     })
//       .then(() => {
//         const createSales = collection(db, `restaurant/${auth.currentUser.uid}/sales`);
//         setDoc(createSales, {})
//           .then(() => {
//             console.log("Sales created");
//             const createOrders = collection(db, `restaurant/${auth.currentUser.uid}/orders`);
//             setDoc(createOrders, {})
//               .then(() => {
//                 console.log("Orders created");
//                 const createfoodItems = collection(db, `restaurant/${auth.currentUser.uid}/foodItems`);
//                 setDoc(createfoodItems, {})
//                   .then(() => {
//                     console.log("foodItems created");
//                     createFoodCategory();
//                   })
//                   .catch((error) => {
//                     console.log(error);
//                   });
//               })
//               .catch((error) => {
//                 console.log(error);
//               });
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//         window.location.href = `${window.location.origin}/public/dashboard`;
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   function createFoodCategory() {
//     const db = getFirestore(app);
//     let createFoodCategory = collection(db, `restaurant/${auth.currentUser.uid}/foodItems/veg`);
//     setDoc(createFoodCategory, {})
//       .then(() => {
//         console.log("foodCategory created");
//         createFoodCategory = collection(db, `restaurant/${auth.currentUser.uid}/foodItems/nonVeg`);
//         setDoc(createFoodCategory, {})
//           .then(() => {
//             console.log("foodCategory created");
//             createFoodCategory = collection(db, `restaurant/${auth.currentUser.uid}/foodItems/fastFood`);
//             setDoc(createFoodCategory, {})
//               .then(() => {
//                 console.log("foodCategory created");
//                 createFoodCategory = collection(db, `restaurant/${auth.currentUser.uid}/foodItems/hotDrinks`);
//                 setDoc(createFoodCategory, {})
//                   .then(() => {
//                     console.log("foodCategory created");
//                     createFoodCategory = collection(db, `restaurant/${auth.currentUser.uid}/foodItems/coldDrinks`);
//                     setDoc(createFoodCategory, {})
//                       .then(() => {
//                         console.log("foodCategory created");
//                         createFoodCategory = collection(db, `restaurant/${auth.currentUser.uid}/foodItems/desserts`);
//                         setDoc(createFoodCategory, {})
//                           .then(() => {
//                             console.log("foodCategory created");
//                           })
//                           .catch((error) => {
//                             console.log(error);
//                           });
//                       })
//                       .catch((error) => {
//                         console.log(error);
//                       });
//                   })
//                   .catch((error) => {
//                     console.log(error);
//                   });
//               })
//               .catch((error) => {
//                 console.log(error);
//               });
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
