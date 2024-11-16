import { createRouter, createWebHistory } from "vue-router";

import Main from "@/views/Main.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import TravelDetail from "@/views/TravelDetail.vue";
import SearchTravel from "@/views/SearchTravel.vue";
import Mypage from "@/views/Mypage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/travel/detail/:id",
      name: "travelDetail",
      component: TravelDetail,
    },
    {
      path: "/travel/search",
      name: "travelSearch",
      component: SearchTravel,
    },
    {
      path: "/user/mypage",
      name: "userMypage",
      component: Mypage,
    },
  ],
});

export default router;
