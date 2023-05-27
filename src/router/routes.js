// Routes
import authRoutes from "./auth";
import dashRoutes from "./dash";
import NotFoundTemplate from "@/views/templates/NotFoundTemplate.vue";

const routes = [
  {
    path: "/",
    redirect: { name: "home" },
  },
  authRoutes,
  dashRoutes,
  {
    path: "/:pathMatch(.*)*",
    meta: {
      requiresAuth: true,
    },
    component: NotFoundTemplate,
  },
];

export default routes;
