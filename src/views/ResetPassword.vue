<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center text-gray-800">
        비밀번호 재설정
      </h2>
      <p class="text-center text-sm text-gray-500 mb-4">
        새로운 비밀번호를 설정해주세요.
      </p>
      <form @submit.prevent="handleResetPassword">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">
              새 비밀번호
            </label>
            <input
              type="password"
              v-model="password"
              required
              placeholder="새 비밀번호 입력"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">
              비밀번호 확인
            </label>
            <input
              type="password"
              v-model="confirmPassword"
              required
              placeholder="비밀번호 다시 입력"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
          <button
            type="submit"
            class="w-full py-2 px-4 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 focus:ring focus:ring-gray-300"
          >
            비밀번호 재설정
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

const password = ref("");
const confirmPassword = ref("");
const router = useRouter();
const route = useRoute();

// 쿼리 파라미터에서 토큰 추출
const token = route.query.token || ""; // 없으면 빈 문자열 반환

const handleResetPassword = async () => {
  if (password.value !== confirmPassword.value) {
    alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
    return;
  }
  console.log(token);
  try {
    const response = await axios.post(
      "http://localhost:8080/api/user/reset/confirm-password",
      {
        newPassword: password.value,
        token: token,
      }
    );

    if (response.status === 200) {
      alert("비밀번호가 성공적으로 변경되었습니다.");
      router.push("/login");
    }
  } catch (error) {
    console.error("비밀번호 재설정 실패:", error);
    alert("비밀번호 재설정에 실패했습니다. 다시 시도해주세요.");
  }
};
</script>

<style scoped>
/* TailwindCSS 기반으로 추가 스타일이 필요한 경우 작성 */
</style>
