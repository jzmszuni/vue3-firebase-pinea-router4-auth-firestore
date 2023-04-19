import { createRouter, createWebHistory } from "vue-router";
// store
import { useUserStore } from "./stores/user.js";

import  Home      from "./views/Home.vue";
import  Edit      from "./views/Edit.vue";
import  Login     from "./views/Login.vue";
import  Register  from "./views/Register.vue";

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore()
  const user = await userStore.currentUser()
  if (user) {
    next()
  } else {
    next("/login")
  }
}

const routes = [
  { path: '/',          component: Home, beforeEnter: requireAuth, name:"home" },
  { path: '/edit/:id',  component: Edit, beforeEnter: requireAuth, name:"edit" },
  { path: '/login',     component: Login,     name:"login" },
  { path: '/register',  component: Register,  name:"register" },
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router