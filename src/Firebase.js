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


// 27-7-2022
// const firebaseConfig = {
//     apiKey: "AIzaSyDpFzTq4M7B7PvxhRvbwuW7CSj1d27JhtI",
//     authDomain: "hrportal-react-52e9f.firebaseapp.com",
//     projectId: "hrportal-react-52e9f",
//     storageBucket: "hrportal-react-52e9f.appspot.com",
//     messagingSenderId: "341443062366",
//     appId: "1:341443062366:web:394e0a1e400d825c0da2cf",
//     measurementId: "G-8HMJJL260Q"
//   };
  
//   // Initialize Firebase
//   export const app = initializeApp(firebaseConfig);
//   export const auth = getAuth(app)
  

export const provider = new GoogleAuthProvider()




// export const signInWithPopup = new signInWithPopup();
// export const signWithGoogle = () => {
//     signInWithPopup(auth, provider)
//         .then((result) => {
//             const resultData = result.user
//             localStorage.setItem("token", resultData.accessToken)
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }



