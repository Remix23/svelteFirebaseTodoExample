import {initializeApp} from "firebase/app"
import { getFirestore } from "firebase/firestore/lite"
import { getAuth } from "firebase/auth"
 
const firebaseConfig = {
    apiKey: "AIzaSyB5FwLYQhTfNoouEJn34ed4tcQBv4DXRk0",
    authDomain: "test-iv-klasa.firebaseapp.com",
    projectId: "test-iv-klasa",
    storageBucket: "test-iv-klasa.appspot.com",
    messagingSenderId: "404508549525",
    appId: "1:404508549525:web:88aba943d95bae30fa969c",
    measurementId: "G-F9P84QKFX9"
};

export const app = initializeApp(firebaseConfig) 

export const db = getFirestore(app);
export const auth = getAuth(app);