import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useUserStore } from "../stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const userX = useUserStore()
  const currentUser = userX.apiUser
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const hasPermission = currentUser ? to.matched.some((record) => record.meta.userType?.includes(currentUser.superadmin)) : true;

  if (requiresAuth && !currentUser) {
    next({ name: 'login' })
  } else if (!requiresAuth && currentUser) {
    next({ name: 'home' })
  } else if(hasPermission) {
    next()
  }else {
    next({ name: currentUser.superadmin ? 'sa-home' : 'home'})
  }
})

export default router
