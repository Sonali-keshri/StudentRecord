// import { initializeApp } from "firebase/app";
// import {getAuth} from 'firebase/auth'

// const firebaseConfig = {
//   apiKey: "AIzaSyDVIz2J_RFM9D5gbjc1QFmLC-94ERRvhyM",
//   authDomain: "resoluteaitask-71ed7.firebaseapp.com",
//   projectId: "resoluteaitask-71ed7",
//   storageBucket: "resoluteaitask-71ed7.appspot.com",
//   messagingSenderId: "37928691689",
//   appId: "1:37928691689:web:494784debba68e93c3cd78",
//   measurementId: "G-4KE3DGYKCY"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const auth = getAuth();

// export {app, auth};


 
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBej49YkF9Xr5L1Ned7iG3G1mwCf3SFoHQ",
  authDomain: "resolute-authprotected.firebaseapp.com",
  projectId: "resolute-authprotected",
  storageBucket: "resolute-authprotected.appspot.com",
  messagingSenderId: "626605601961",
  appId: "1:626605601961:web:f6ee501d9f802c370aa5b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

