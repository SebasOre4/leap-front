// Routes
import authRoutes from "./auth";
import dashRoutes from "./dash";
import superadminRoutes from "./superadmin";
import NotFoundTemplate from "@/views/templates/NotFoundTemplate.vue";

const routes = [
  {
    path: "/",
    redirect: { name: "home" },
  },
  authRoutes,
  dashRoutes,
  superadminRoutes,
  {
    path: "/:pathMatch(.*)*",
    meta: {
      requiresAuth: true,
    },
    component: NotFoundTemplate,
  },
];

export default routes;
