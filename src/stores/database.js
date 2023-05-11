import { 
  addDoc, collection, deleteDoc, 
  doc,    getDoc,     getDocs, 
  query,  updateDoc,  where 
} from "firebase/firestore/lite";
import { auth, db }     from "../firebaseConfig";
import { defineStore }  from "pinia";
import { ref }          from "vue";
import { nanoid }       from "nanoid";
import router           from "../router";

export const useDatabaseStore = defineStore( "database", () => {

  const documents = ref([])
  const loading   = ref(false)

  const getSomglelUrl = async (id) => {
    loading.value = true
    try {
      const docRef = doc(db, "urls", id)
      const document = await getDoc(docRef)
      if(!document.exists()){
        new Error("No existe el documento")
        return false
      }
      return document.data().name
    } catch (error) {
      console.error(error.message)
      return false
    } finally {
      loading.value = false
    }
  }

  const getUrls = async () => {
    loading.value = true
    try {
      if (documents.value.length == 0) {
        const q = query(collection(db, 'urls'), where("user", "==", auth.currentUser.uid))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach( doc => {
          documents.value.push({
            id: doc.id, 
            ...doc.data()
            })
        } )
      }
    } catch (err) {
      console.error("MY ERRIR:" + err)
    } finally {
      loading.value = false
    }
  }

  const addUrls = async (name) => {
    loading.value = true
    try {
      const objecDoc = {
        name: name,
        short: nanoid(6),
        user: auth.currentUser.uid,
      }
      const docRef = await addDoc(collection(db, "urls"), objecDoc)
      documents.value.push({
        id: docRef.id,
        ...objecDoc,
      })
    } catch (error) {
      return error.code
    } finally {
      loading.value = false
    }

  }

  const deleteUrl = async (id) => {
    loading.value = true
    try {
      const docRef = doc(db, 'urls', id)
      const document = await getDoc(docRef)
      if(!document.exists()){
        throw new Error("No existe el documento")
      }
      if (document.data().user !== auth.currentUser.uid) {
        throw new Error("No te pertenece el documento")
      }
      await deleteDoc(docRef)
      documents.value = documents.value.filter(item => item.id != id)
    } catch (error) {
      return error.message
    } finally {
      loading.value = false
    }
  }

  const detailUrl = async (id) => {
    loading.value = true
    try {
      const docRef = doc(db, "urls", id)
      const document = await getDoc(docRef)
      if(!document.exists()){
        throw new Error("No existe el documento")
      }
      if (document.data().user !== auth.currentUser.uid) {
        throw new Error("No te pertenece el documento")
      }
      return document.data().name
    } catch (error) {
      return(error.message)
    } finally {
      loading.value = false
    }
  }

  const updateUrl = async (id, name) => {
    loading.value = true
    try {
      const docRef = doc(db, "urls", id)
      const document = await getDoc(docRef)
      
      if(!document.exists()){
        throw new Error("No existe el documento")
      }
      
      if (document.data().user !== auth.currentUser.uid) {
        throw new Error("No te pertenece el documento")
      }
      
      await updateDoc( docRef, {
        name: name
      })
      documents.value = documents.value.map(item => item.id == id ? ({...item, name:name}): item)
      router.push('/')

    } catch (error) {
      return(error.message)
    } finally {
      loading.value = false
    }
  }

  function $reset() {
    documents.value = ref([])
    loading.value   = false
  }


  return {
    documents,
    loading,
    getSomglelUrl,
    getUrls,
    addUrls,
    deleteUrl,
    detailUrl,
    updateUrl,
    $reset,
  }

})