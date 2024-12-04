// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXiQoWP8lgJGZvTI3POU_hQDColZFSCzw",
  authDomain: "e-comm-b4ccf.firebaseapp.com",
  projectId: "e-comm-b4ccf",
  storageBucket: "e-comm-b4ccf.firebasestorage.app",
  messagingSenderId: "37567675958",
  appId: "1:37567675958:web:a7590d938eeece273e2297",
  measurementId: "G-WDC36HJTV3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
