<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <input 
        type="email" 
        placeholder="email"
        v-model.trim="email"
      > 
      <input 
        type="password" 
        placeholder="password" 
        autocomplete="on"
        v-model.trim="password"
      >
      <button type="submit" :disabled="userStore.error"> Acceder</button>
    </form>
  </div>
</template>

<script setup>
  import { ref }          from "vue"
  import { useUserStore } from "../stores/user.js";

  const email     = ref('')
  const password  = ref('')
  const userStore = useUserStore()

  const handleSubmit = async () => {
    if (!email.value || password.value.length < 6) {
      return alert("Llena los campos")
    }
    await userStore.loginUser(email.value, password.value)
  }

</script>

<style lang="scss" scoped>

</style>