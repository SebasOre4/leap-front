import DashboardTemplate from "@/views/templates/DashboardTemplate.vue";
import HomeView from "@/views/dash/HomeView.vue"

const superadminRoutes = {
  path: "/superadmin",
  name: "superadmin",
  redirect: { name: "sa-home" },
  meta: {
    requiresAuth: true,
    userType: 1
  },
  component: DashboardTemplate,
  children: [
    {
      path: "home",
      name: "sa-home",
      component: HomeView,
      meta: {
        breadCrumb: [
          {
            label: "Dashboard",
          },
        ],
      },
    },
    {
      path: "reports",
      name: "sa-reports",
      component: HomeView,
      meta: {
        breadCrumb: [
          {
            label: "Dashboard",
            to: { name: "sa-home" },
          },
          {
            label: "Reportes",
          },
        ],
      },
    },
  ],
};

export default superadminRoutes;