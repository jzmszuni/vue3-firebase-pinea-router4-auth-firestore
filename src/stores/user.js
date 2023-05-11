import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile
} from "firebase/auth";
import  router          from "../router";
import { defineStore }  from "pinia";
import { ref as vueRef }          from "vue";
import { auth, db, storage }     from "../firebaseConfig"
import { doc, setDoc }  from "firebase/firestore/lite";
import { useDatabaseStore } from "./database";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const useUserStore = defineStore("userStore", () => {
  // variables
  const userData  = vueRef(null)
  const loading   = vueRef(false)

  // funciones
  const setUser = async (user) => {
    loading.value = true
    try {
      const docRef    = doc(db, "users", user.uid)
      userData.value = { 
        email: user.email, 
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }
      await setDoc(docRef, userData.value)
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

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

  const updateUser = async (displayName, image=null) => {
    loading.value = true
    try {
      if (image) {
        const storageRef = ref(storage, `profile/${userData.value.uid}`)
        await uploadBytes(storageRef, image.originFileObj)
        const photoURL = await getDownloadURL(storageRef)
        await updateProfile(auth.currentUser, {photoURL,})
      }else {}
      // si actualizamos algo con el mismo nombre puedes omitir ponerlo
      await updateProfile(auth.currentUser, {displayName,})
      setUser(auth.currentUser)
    } catch (error) {
      return error.code
    } finally {
      loading.value = false
    }
  }

  const loginUser = async (email, password) =>{
    loading.value = true
    
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      // userData.value = { email: user.email, uid: user.uid }
      await setUser(user)
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
      router.push("/login")
      await signOut(auth)
      // userData.value = null
      userData.value = null
    } catch (err) {
      loading.value = false
      return err.code
    } finally {
      loading.value = false
      
      
    }
  }
 
  const currentUser = () => {
    return new Promise(( resolve, reject ) =>{
      const unsuscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          //  await setUser(user)
          userData.value  = { 
            email: user.email, 
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          }
        } else {
          userData.value = null
          const databaseStore = useDatabaseStore()
          databaseStore.$reset()
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
    updateUser,
    loginUser,
    logoutUser,
    currentUser,
  }

})

