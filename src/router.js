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
  { path: '/',          component: Home, beforeEnter: requireAuth },
  { path: '/edit/:id',  component: Edit, beforeEnter: requireAuth },
  { path: '/login',     component: Login    },
  { path: '/register',  component: Register },
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router