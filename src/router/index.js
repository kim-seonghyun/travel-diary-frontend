import { createRouter, createWebHistory } from "vue-router";

import Main from "@/views/Main.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import TravelDetail from "@/views/TravelDetail.vue";
import SearchTravel from "@/views/SearchTravel.vue";
import Mypage from "@/views/Mypage.vue";
import TravelDiary from "@/components/TravelDiary.vue";
import QuestionList from "@/components/qna/QuestionList.vue";
import QuestionDetail from "@/components/qna/QuestionDetail.vue";
import QuestionCreate from "@/components/qna/QuestionCreate.vue";
import DotoriStore from "@/views/DotoriStore.vue";
import PaymentSuccess from "@/views/PaymentSuccess.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main,
      children: [
        {
          path: "",
          component: TravelDiary,
        },
        {
          path: "question-list",
          component: QuestionList,
        },
        {
          path: "question-detail/:id",
          component: QuestionDetail,
        },
        {
          path: "question/register",
          component: QuestionCreate,
        },
      ],
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
    {
      path: "/store/dotori",
      name: "storeDotori",
      component: DotoriStore,
    },
    {
      path: "/payment/success",
      name: "paymentSuccess",
      component: PaymentSuccess,
    },
  ],
});

export default router;
