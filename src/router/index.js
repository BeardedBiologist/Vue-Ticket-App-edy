import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import EventView from "../views/EventView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/event/:eventId",
    name: "Event",
    component: EventView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
