<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F2F6F6] p-4">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center text-[#637F96]">회원가입</h2>
      <form @submit.prevent="handleRegister">
        <div class="space-y-4">
          <!-- 이메일 -->
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
          <!-- 사용자 이름 -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >사용자 이름</label
            >
            <input
              type="text"
              v-model="name"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#637F96]"
            />
          </div>
          <!-- 비밀번호 -->
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
          <!-- 역할 선택 -->
          <div>
            <label class="block text-sm font-medium text-gray-700">역할</label>
            <div class="flex space-x-4 mt-2">
              <label class="flex items-center text-sm text-gray-700">
                <input
                  type="radio"
                  v-model="role"
                  name="role"
                  value="user"
                  required
                  class="mr-2"
                />
                사용자
              </label>
              <label class="flex items-center text-sm text-gray-700">
                <input
                  type="radio"
                  v-model="role"
                  name="role"
                  value="admin"
                  required
                  class="mr-2"
                />
                관리자
              </label>
            </div>
          </div>
          <!-- 회원가입 버튼 -->
          <button
            type="submit"
            class="w-full py-2 px-4 bg-[#637F96] text-white rounded-lg font-semibold hover:bg-[#4F6878]"
          >
            회원가입
          </button>
        </div>
      </form>
      <p class="text-center text-sm text-gray-500 mt-4">
        이미 계정이 있으신가요?
        <a href="/login" class="text-[#E74C3C] font-medium hover:underline"
          >로그인</a
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
      name: "",
      password: "",
      role: "",
    };
  },
  methods: {
    async handleRegister() {
      // 서버에 보낼 사용자 정보 객체
      const userRequest = {
        email: this.email,
        name: this.name,
        password: this.password,
        role: this.role,
      };

      try {
        const response = await axios.post(
          "http://localhost:8080/api/user/join", // 스프링 서버의 회원가입 API 엔드포인트
          userRequest, // 서버로 보낼 데이터 (UserRequest 객체)
          {
            headers: {
              "Content-Type": "application/json", // JSON 형식으로 데이터 전송
            },
            withCredentials: true, // 쿠키 전송
          }
        );

        // 성공적으로 회원가입이 완료되면
        console.log("회원가입 성공:", response);
        // 회원가입 후 로그인 페이지로 리디렉션 (필요 시)
        this.$router.push("/login");
      } catch (error) {
        console.error(
          "회원가입 실패:",
          error.response ? error.response.data : error.message
        );
        alert("회원가입에 실패했습니다. 다시 시도해 주세요.");
      }
    },
  },
};
</script>

<style scoped>
/* 스위치 스타일 */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
}
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
}
.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
}
input:checked + .slider {
  background-color: #637f96;
}
input:checked + .slider:before {
  transform: translateX(20px);
}
</style>
