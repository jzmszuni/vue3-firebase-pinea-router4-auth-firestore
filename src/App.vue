<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      
      <a-menu 
        v-model:selectedKeys="selectedKeys" 
        theme="dark" 
        mode="inline"
      >
      <a-menu-item key="user" v-if="userStore.userData">
          <router-link to="/">
            <a-space>
              <a-avatar :src="userStore.userData.photoURL" />
              <span> {{ userStore.userData.displayName }}</span>
            </a-space>
          </router-link>
      </a-menu-item>
      <a-menu-item key="home" v-if="userStore.userData">
          <router-link to="/">
            <desktop-outlined />
            <span>Home</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="profile" v-if="userStore.userData">
          <router-link to="/profile">
            <desktop-outlined />
            <span>Profile</span>
          </router-link>
        </a-menu-item>
        
        <a-menu-item key="login" v-if="!userStore.userData">
          <router-link to="/login">
            <user-outlined />
            <span>Login</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="register" v-if="!userStore.userData">
          <router-link to="/register">
            <file-outlined />
            <span>Register</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="logout" v-if="userStore.userData" @click="userStore.logoutUser">
          <span>logout</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>{{ userStore.userData?.email }}</a-breadcrumb-item>
        </a-breadcrumb>
        <div v-if="userStore.loading" class="box">
            <a-spin tip="Loading..." />
        </div>
        <div
          v-else 
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        HAC Packaging ©2023 Created by <b>Sergio I. Zúñiga Chávez</b> IT Analyst
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
import {
  DesktopOutlined,
  UserOutlined,
  FileOutlined,
} from "@ant-design/icons-vue";
import { useUserStore } from "./stores/user";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route         = useRoute()
const userStore     = useUserStore();
const collapsed     = ref(false);
const selectedKeys  = ref(["home"]);

watch(
  () => route.name, 
  () => {
    selectedKeys.value = [route.name]
  }
)

</script>

<style scoped>
.box {
  margin: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
