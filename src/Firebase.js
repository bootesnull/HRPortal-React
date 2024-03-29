import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyAA-U91PhnsdUPV0Dc-WQ2ER9t4nXeHek8",
    authDomain: "hrportal-react-6e595.firebaseapp.com",
    projectId: "hrportal-react-6e595",
    storageBucket: "hrportal-react-6e595.appspot.com",
    messagingSenderId: "389017926289",
    appId: "1:389017926289:web:2b7967b374abc13122dd30",
    measurementId: "G-GLQYG6V5FC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export default app;

  

export const provider = new GoogleAuthProvider()




