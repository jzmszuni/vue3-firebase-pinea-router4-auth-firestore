import { createRouter, createWebHistory } from "vue-router";
// store
import { useUserStore } from "./stores/user.js";
import { useDatabaseStore } from "./stores/database.js";

import  Home      from "./views/Home.vue";
import  Profile   from "./views/Profile.vue";
import  Edit      from "./views/Edit.vue";
import  Login     from "./views/Login.vue";
import  Register  from "./views/Register.vue";
import  NotFound  from "./views/NotFound.vue";

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore()
  userStore.loading = true
  const user = await userStore.currentUser()
  if (user) {
    next()
  } else {
    next("/login")
  }
  userStore.loading = false
}

const redirect = async (to, from, next) => {
  const userStore = useUserStore()
  userStore.loading = true
  const databaseStore = useDatabaseStore()
  const name = await databaseStore.getSomglelUrl(to.params.pathMatch[0])
  if (!name) {
    next()
    userStore.loading = false
  } else {
    window.location.href = name
    userStore.loading = true
    next()
  }
}

const routes = [
  { path: '/',                component: Home,     name:"home",     beforeEnter: requireAuth, },
  { path: '/edit/:id',        component: Edit,     name:"edit",     beforeEnter: requireAuth, },
  { path: '/profile',         component: Profile,  name:"profile",  beforeEnter: requireAuth, },
  { path: '/login',           component: Login,    name:"login" },
  { path: '/register',        component: Register, name:"register" },
  { path: '/:pathMatch(.*)*', component: NotFound, name:"404",      beforeEnter: redirect},
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router