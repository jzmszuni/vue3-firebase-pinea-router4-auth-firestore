<template>
  <div>
    <nav>
      <router-link 
        to="/" 
        v-if="userStore.userData"
      >
        Home | 
      </router-link>
      <router-link 
        to="/login" 
        v-if="!userStore.userData"
      >
        Login | 
      </router-link>
      <router-link 
        to="/register" 
        v-if="!userStore.userData"
      >
       Register | 
      </router-link>
      <button 
        @click="userStore.logoutUser" 
        v-if="userStore.userData"
      >
        logout
      </button>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
  import { useUserStore } from "./stores/user";

  const userStore = useUserStore()

</script>

<style lang="scss" scoped>

</style>