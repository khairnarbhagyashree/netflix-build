import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyB7J_wP_YRpvfD8jdEJGH8Ix_NgPg1hqmQ",
    authDomain: "netflix-clone-ce816.firebasepp.com",
    projectId: "netflix-clone-ce816",
    storageBucket: "netflix-clone-ce816.appspot.com",
    messagingSenderId: "136951257068",
    appId: "1:136951257068:web:33b59d745ac911827192c9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth };
export default db;