import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey:             "AIzaSyCFFTeQwl3Z35Rc_a4AMa6D1BkJa8iwbeY",
  authDomain:         "vue-login-test-d8e1c.firebaseapp.com",
  projectId:          "vue-login-test-d8e1c",
  storageBucket:      "vue-login-test-d8e1c.appspot.com",
  messagingSenderId:  "189693689567",
  appId:              "1:189693689567:web:ee8a25a26c9493596ab36a"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// variable de autenticación & exportación
const auth = getAuth()
export { auth }