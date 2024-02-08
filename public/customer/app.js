import { app } from '../config.js';
import { getFirestore,
    getDoc,
    doc
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

let data = document.URL.split("=");

// const DineCust = {
//     tableNo : data[2],
//     restId : data[1].split('@')[0]
// }

// localStorage.setItem('DineCust', JSON.stringify(DineCust))

document.getElementById('continue').addEventListener('click', () => {
    const restCode = document.querySelector('input').value;
    if(restCode === '') {
        document.querySelector('.overlay').style.display = 'flex';
        return;
    }
    const db = getFirestore(app);
    const restRef = doc(db, 'restaurants', restCode);
    getDoc(restRef).then((doc) => {
        if (doc.exists()) {
            const restData = doc.data();
            if (restData.id === DineCust.restId) {
                localStorage.setItem('DineCust', JSON.stringify(DineCust));
                window.location.href = 'menu.html';
            } else {
                alert('Invalid Restaurant Code');
            }
        } else {
            alert('Invalid Restaurant Code');
        }
    }).catch((error) => {
        console.log('Error getting document:', error);
    });
});

document.querySelector('.closeWarning').addEventListener('click', () => {
    document.querySelector('.overlay').style.display = 'none';
});