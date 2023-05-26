import DashboardTemplate from "@/views/templates/DashboardTemplate.vue";
import HomeView from "@/views/dash/HomeView.vue"
import ProfileView from "@/views/dash/ProfileView.vue"

const dashRoutes = {
  path: "/dashboard",
  name: "dashboard",
  redirect: { name: "home" },
  meta: {
    requiresAuth: true,
  },
  component: DashboardTemplate,
  children: [
    {
      path: "home",
      name: "home",
      component: HomeView,
      meta: {
        breadCrumb: [
          {
            label: "dashboard",
          },
        ],
      },
    },
    {
      path: "profile",
      name: "profile",
      component: ProfileView,
      meta: {
        breadCrumb: [
          {
            label: "dashboard",
            to: { name: "home" },
          },
          {
            label: "profile",
          },
        ],
      },
    },
  ],
};

export default dashRoutes;
