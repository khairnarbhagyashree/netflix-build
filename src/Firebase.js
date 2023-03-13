import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDUyuD1-INl9sZq0gHKxMxCK-wn1KiK1T4",
    authDomain: "netflix-clone-966ef.firebaseapp.com",
    projectId: "netflix-clone-966ef",
    storageBucket: "netflix-clone-966ef.appspot.com",
    messagingSenderId: "831495573134",
    appId: "1:831495573134:web:2a0fd772ca9234c11e03df"
};

// const firebase = firebase.initializeApp(firebbaseConfig);
// const db = firebaseApp.firestore();
// const auth = firebase.auth();


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export { auth };
export default db;

