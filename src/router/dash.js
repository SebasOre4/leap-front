import DashboardTemplate from "@/views/templates/DashboardTemplate.vue";
import HomeView from "@/views/dash/dashboard/HomeView.vue"
import ProfileView from "@/views/dash/profile/ProfileView.vue"
import ReportsView from "@/views/dash/reports/ReportsView.vue"
import TreatmentsView from "@/views/dash/treatments/TreatmentsView.vue"
import PatientsListView from "@/views/dash/patients/PatientsList.vue"
import NewPatientView from "@/views/dash/patients/NewPatient.vue"
import PatientDetailView from "@/views/dash/patients/PatientDetail.vue"

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
      component: ReportsView,
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
      path: "new-patient",
      name: "new-patient",
      component: NewPatientView,
      meta: {
        breadCrumb: [
          {
            label: "Dashboard",
            to: { name: "home" },
          },
          {
            label: "Pacientes",
            to: { name: "patients" },
          },
          {
            label: "Internar Paciente",
          },
        ],
      },
    },
    {
      path: "patient/:id",
      name: "patient-detail",
      component: PatientDetailView,
      meta: {
        breadCrumb: [
          {
            label: "Dashboard",
            to: { name: "home" },
          },
          {
            label: "Pacientes",
            to: { name: "patients" },
          },
          {
            label: "Detalle de Paciente",
          },
        ],
      },
    },
    {
      path: "treatments",
      name: "treatments",
      component: TreatmentsView,
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
