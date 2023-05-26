import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useUserStore } from "../stores/user";
import { useUtilsStore } from "../stores/utils";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const userX = useUserStore()
  const utilsX = useUtilsStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const currentUser = userX.apiUser
  utilsX.setCrumbDetail('')

  if (requiresAuth && !currentUser) {
    next({ name: 'login' })
  } else if (!requiresAuth && currentUser) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
