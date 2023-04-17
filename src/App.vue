<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
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
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">
        <router-view></router-view>
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          Bill is a cat.
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
  import { useUserStore } from "./stores/user";

  const userStore = useUserStore()

</script>

<style lang="scss" scoped>

</style>