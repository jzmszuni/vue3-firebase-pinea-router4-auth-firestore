<template>
  <div>
    <h3>Editar</h3>
    <p v-if="databaseStore.loading"> Cargando...</p>
    <form v-else @submit.prevent="handleSubmit">
      <input 
        type="text" 
        placeholder="Ingrese URL" 
        v-model="url"
      >
      <button type="submit">Editar</button>
    </form>
  </div>
</template>

<script setup>
  import { useRoute }         from "vue-router";
  import { useDatabaseStore } from "../stores/database";
  import { onMounted, ref }   from "vue";
  import validUrl             from 'valid-url';

  const route         = useRoute()
  const url           = ref('')
  const isValidUrl    = ref(false);
  const databaseStore = useDatabaseStore()

  const handleSubmit = () => {
    isValidUrl.value = false;
    if (validUrl.isWebUri(url.value)) {
      isValidUrl.value = true;
      databaseStore.updateUrl(route.params.id, url.value)
    } else {
      isValidUrl.value = false;
      console.error("Url No valida")
    }
  }

  onMounted(async () => {
    url.value = await databaseStore.detailUrl(route.params.id)
    console.log(url)
  })
</script>

<style lang="scss" scoped>

</style>