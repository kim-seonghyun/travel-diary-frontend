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

      <div class="flex justify-center items-center mt-4">
        <button
          @click="toggleModal"
          class="text-sm text-[#E74C3C] font-medium hover:underline"
        >
          비밀번호 찾기
        </button>
      </div>

      <!-- 비밀번호 찾기 모달 -->
      <div
        v-if="isModalOpen"
        class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
      >
        <div class="bg-white w-96 rounded-lg shadow-lg p-6">
          <div class="flex justify-between items-center border-b pb-4">
            <h2 class="text-lg font-semibold text-gray-800">비밀번호 찾기</h2>
            <button
              @click="toggleModal"
              class="text-gray-500 hover:text-black focus:outline-none"
            >
              ✕
            </button>
          </div>
          <div class="py-4 space-y-4">
            <p class="text-gray-600 text-sm">
              비밀번호를 재설정하려면 이메일을 입력하세요.
            </p>
            <input
              type="email"
              v-model="resetEmail"
              placeholder="이메일 입력"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#637F96]"
            />
            <button
              @click="sendPasswordResetEmail"
              class="w-full py-2 px-4 bg-[#637F96] text-white rounded-lg font-semibold hover:bg-[#4F6878]"
            >
              인증 이메일 보내기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/authStore";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const authStore = useAuthStore();
const router = useRouter();
// 입력값 선언
const email = ref("");
const password = ref("");
const isModalOpen = ref(false);
const resetEmail = ref("");

const handleLogin = async () => {
  await authStore.login(
    { email: email.value, password: password.value },
    router
  );
};

// 모달 열기/닫기
const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

// 이메일 인증 전송
const sendPasswordResetEmail = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/user/reset/password",
      {
        email: resetEmail.value,
      }
    );
    alert("이메일로 인증 링크를 보냈습니다.");
    toggleModal(); // 모달 닫기
  } catch (error) {
    console.error("인증 이메일 전송 실패:", error);
    alert("이메일 전송에 실패했습니다. 다시 시도해주세요.");
  }
};
</script>

<style scoped>
/* 추가 스타일 */
.fixed {
  position: fixed;
}
.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.bg-opacity-30 {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
