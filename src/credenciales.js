// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//Desarrollo
// const firebaseConfig = {
//   apiKey: "AIzaSyBMhX7p4M_s_CS4uFiZcOe1GlFfZV2LZHI",
//   authDomain: "app-adming-pg-2.firebaseapp.com",
//   projectId: "app-adming-pg-2",
//   storageBucket: "app-adming-pg-2.appspot.com",
//   messagingSenderId: "189378451006",
//   appId: "1:189378451006:web:e98a300f71cda0d5bb636f"
// };
//Produccion
const firebaseConfig = {
  apiKey: "AIzaSyB3TGB6COJhMrQBf5NuySR0XAPyHwqt4fg",
  authDomain: "inawebestadisticas.firebaseapp.com",
  projectId: "inawebestadisticas",
  storageBucket: "inawebestadisticas.appspot.com",
  messagingSenderId: "60523684324",
  appId: "1:60523684324:web:e2243182edce300cfca7f1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;