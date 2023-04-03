import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import  router          from "../router";
import { defineStore }  from "pinia";
import { ref }          from "vue";
import { auth }         from "../firebaseConfig"

export const useUserStore = defineStore("userStore", () => {
  // variables
  const userData  = ref(null)
  const loading   = ref(true)
  const error     = ref(null)

  // funciones
  const registerUser = async (email, password) => {
    error.value = null
    loading.value = true
    try {
      error.value = true
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user)
      userData.value = { email: user.email, uid: user.uid }
      router.push("/")
    } catch (err) {
      error.value = null
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const loginUser = async (email, password) =>{
    loading.value = true
    error.value = null
    try {
      error.value = true
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      userData.value = { email: user.email, uid: user.uid }
      router.push("/")
    } catch (err) {
      console.error(err)
      error.value = false
      // Logica para manejo de errores
    } finally {
      loading.value = false
    }
  } 
  
  const logoutUser = async () => {
    error.value = null
    loading.value = true
    try {
      await signOut(auth)
      userData.value = null
      console.log("singed out! (Y)")
      router.push("/login")
    } catch (error) {
      console.error(err)
    }
  }

  const currentUser = () => {
    return new Promise(( resolve, reject ) =>{
      const unsuscribe = onAuthStateChanged(auth, user => {
        if (user) {
          userData.value = { email: user.email, uid: user.uid }
        } else {
          userData.value = null
        }
        resolve(user)
      }, e => reject(e))
      unsuscribe()
    })
  }

  // retorno
  return {
    userData,
    loading,
    error,
    registerUser,
    loginUser,
    logoutUser,
    currentUser,
  }

})

