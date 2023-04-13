<template>
  <div>
    <h1>Home</h1>

    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Ingrese URL" v-model="url">
      <button type="submit">Agregar</button>
    </form>
    <p v-if="!isValidUrl"> El link no es válido</p>

    <p>{{ userStore.userData?.email }}</p>
    <p v-if="databaseStore.loading"> Cargando...</p>
    <ul v-else>
      <li v-for=" i in databaseStore.documents" :key="i.id">
        {{ i.name }}
        <button @click="databaseStore.deleteUrl(i.id)">eliminar</button>
        <button @click="router.push(`edit/${i.id}`)">editar</button>
        <!-- <router-link :to="`edit/${i.id}`">Editar</router-link> -->
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { useUserStore } from "../stores/user.js";
  import { useDatabaseStore } from "../stores/database";
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import validUrl from 'valid-url';

  const url           = ref('')
  const isValidUrl    = ref(false);
  const userStore     = useUserStore()
  const databaseStore = useDatabaseStore()
  const router        = useRouter()

  const handleSubmit = () => {
    isValidUrl.value = false;
    if (validUrl.isWebUri(url.value)) {
      isValidUrl.value = true;
      databaseStore.addUrls(url.value)
    } else {
      isValidUrl.value = false;
      console.error("Url No valida")
    }
  }

  databaseStore.getUrls()



</script>