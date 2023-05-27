import NotFoundTemplate from "@/views/templates/NotFoundTemplate.vue";
import DashboardTemplate from "@/views/templates/DashboardTemplate.vue";
import HomeView from "@/views/dash/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "dashtemplate",
    redirect: { name: 'home' },
    component: DashboardTemplate,
    children: [
      {
        path: '',
        name: "home",
        component: HomeView
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundTemplate,
  },
];

export default routes;
