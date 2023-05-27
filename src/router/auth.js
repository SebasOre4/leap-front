//MODULO AUTH
import AuthTemplate from "@/views/templates/AuthTemplate.vue";
import LoginView from "@/views/auth/LoginView.vue";

const authRoutes = {
    path: "/auth",
    name: "auth",
    redirect: { name: "login" },
    component: AuthTemplate,
    children: [
      {
        path: "login",
        name: "login",
        component: LoginView,
      }
    ],
  };

export default authRoutes;
