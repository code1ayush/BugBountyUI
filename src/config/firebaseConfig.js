// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArET7qz9SoNd99Q_oXP4_E9WlsdEQN6js",
  authDomain: "imagestore-61d7d.firebaseapp.com",
  projectId: "imagestore-61d7d",
  storageBucket: "imagestore-61d7d.appspot.com",
  messagingSenderId: "1555043301",
  appId: "1:1555043301:web:8739a77c451d54f4fbd50c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);