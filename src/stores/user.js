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
  const loading   = ref(false)

  // funciones
  const registerUser = async (email, password) => {
    loading.value = true
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      userData.value = { email: user.email, uid: user.uid }
      router.push("/")
    } catch (err) {
      loading.value = false
      return err.code
    } finally {
      loading.value = false
    }
  }

  const loginUser = async (email, password) =>{
    
    loading.value = true
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      userData.value = { email: user.email, uid: user.uid }
      router.push("/")
    } catch (err) {
      loading.value = false
      return err.code
      // Logica para manejo de errores
    } finally {
      loading.value = false
    }
  } 
  
  const logoutUser = async () => {
    loading.value = true
    try {
      await signOut(auth)
      userData.value = null
      router.push("/login")
    } catch (err) {
      loading.value = false
      return err.code
    } finally {
      loading.value = false
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
    registerUser,
    loginUser,
    logoutUser,
    currentUser,
  }

})

