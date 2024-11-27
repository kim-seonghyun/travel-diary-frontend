import { createRouter, createWebHistory } from "vue-router";

import Main from "@/views/Main.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import TravelDetail from "@/views/TravelDetail.vue";
import SearchTravel from "@/views/SearchTravel.vue";
import Mypage from "@/views/Mypage.vue";
import QuestionList from "@/components/qna/QuestionList.vue";
import QuestionDetail from "@/components/qna/QuestionDetail.vue";
import QuestionCreate from "@/components/qna/QuestionCreate.vue";
import DotoriStore from "@/views/DotoriStore.vue";
import PaymentSuccess from "@/views/PaymentSuccess.vue";
import PostList from "@/components/posts/PostList.vue";
import CreatePost from "@/components/posts/CreatePost.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import Content from "@/components/Content.vue";

import PostListByTrip from "@/components/posts/PostListByTrip.vue";
import PostListOrderLike from "@/components/posts/PostListOrderLike.vue";
import TravelDiaryForm from "@/components/travel-diary/TravelDiaryForm.vue";
import TravelDiaryDetail from "@/components/travel-diary/TravelDiaryDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main,
      children: [
        {
          path: "/",
          component: Content
        },
        {
          path: '/travel-diary/detail/:id',
          component: TravelDiaryDetail,
          name: 'TravelDiaryDetail'
        },
        {
          path: "/travel-diary/create",
          component: TravelDiaryForm
        },
        {
          path: "/travel-diary",
          component: Content,
        },
        {
          path: "/post-list",
          component: PostList,
        },
        {
          path: "/post-list/trip",
          component: PostListByTrip,
        },
        {
          path: "/post-list/trip/like",
          component: PostListOrderLike,
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
          path: "/question/register",
          component: QuestionCreate,
        },
        {
          path: "/post/create",
          component: CreatePost,
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
    {
      path: "/reset/password",
      name: "resetPassword",
      component: ResetPassword,
    },
  ],
});
export default router;
