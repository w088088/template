import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NotFound from "../views/404.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "Home",
    component: () => import("@/components/HelloWorld.vue"),
  },
  { path: "/", redirect: { name: "Home" } },
  { path: "/login", component: () => import("../views/login.vue") },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
