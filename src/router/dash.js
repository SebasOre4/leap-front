import DashboardTemplate from "@/views/templates/DashboardTemplate.vue";
import HomeView from "@/views/dash/HomeView.vue"
import ProfileView from "@/views/dash/profile/ProfileView.vue"
import PatientsListView from "@/views/dash/patients/PatientsList.vue"

const dashRoutes = {
  path: "/dashboard",
  name: "dashboard",
  redirect: { name: "home" },
  meta: {
    requiresAuth: true,
    userType: [0]
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
            label: "Dashboard",
          },
        ],
      },
    },
    {
      path: "reports",
      name: "reports",
      component: ProfileView,
      meta: {
        breadCrumb: [
          {
            label: "Dashboard",
            to: { name: "home" },
          },
          {
            label: "Reportes",
          },
        ],
      },
    },
    {
      path: "patients",
      name: "patients",
      component: PatientsListView,
      meta: {
        breadCrumb: [
          {
            label: "Dashboard",
            to: { name: "home" },
          },
          {
            label: "Pacientes",
          },
        ],
      },
    },
    {
      path: "treatments",
      name: "treatments",
      component: ProfileView,
      meta: {
        breadCrumb: [
          {
            label: "Dashboard",
            to: { name: "home" },
          },
          {
            label: "Tratamientos",
          },
        ],
      },
    },
    {
      path: "profile",
      name: "profile",
      component: ProfileView,
      meta: {
        userType: [0, 1],
        breadCrumb: [
          {
            label: "Dashboard",
            to: { name: "home" },
          },
          {
            label: "Mi perfil",
          },
        ],
      },
    },
  ],
};

export default dashRoutes;
