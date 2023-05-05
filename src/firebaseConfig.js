import { initializeApp }  from "firebase/app";
import { getAuth }        from "firebase/auth"
import { getFirestore }   from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey:             "AIzaSyCFFTeQwl3Z35Rc_a4AMa6D1BkJa8iwbeY",
  authDomain:         "vue-login-test-d8e1c.firebaseapp.com",
  projectId:          "vue-login-test-d8e1c",
  storageBucket:      "vue-login-test-d8e1c.appspot.com",
  messagingSenderId:  "189693689567",
  appId:              "1:189693689567:web:ee8a25a26c9493596ab36a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(firebaseApp);
// variable de autenticación & exportación
const auth  = getAuth()
const db    = getFirestore()

export { auth, db, storage }