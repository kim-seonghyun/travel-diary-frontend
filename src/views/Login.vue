<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F2F6F6] p-4">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center text-[#637F96]">로그인</h2>
      <form @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >이메일</label
            >
            <input
              type="email"
              v-model="email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#637F96]"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >비밀번호</label
            >
            <input
              type="password"
              v-model="password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#637F96]"
            />
          </div>
          <button
            type="submit"
            class="w-full py-2 px-4 bg-[#637F96] text-white rounded-lg font-semibold hover:bg-[#4F6878]"
          >
            로그인
          </button>
        </div>
      </form>
      <p class="text-center text-sm text-gray-500 mt-4">
        계정이 없으신가요?
        <a href="/register" class="text-[#E74C3C] font-medium hover:underline"
          >회원가입</a
        >
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/user/login?email=${this.email}&password=${this.password}`,
          {}, // POST 요청의 body 부분을 비워둡니다
          { withCredentials: true }
        );

        console.log("로그인 성공:", response.data);
        // 로그인 성공 후 메인 페이지로 라우팅
        this.$router.push("/"); // '/' 경로는 홈 페이지로 라우팅
      } catch (error) {
        console.error(
          "로그인 실패:",
          error.response ? error.response.data : error.message
        );
      }
    },
  },
};
</script>

<style scoped>
/* 추가적인 스타일이 필요한 경우 여기에 작성하세요 */
</style>
