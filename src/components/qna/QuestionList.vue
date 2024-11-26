<template>
  <div
    class="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
    style="font-family: 'Plus Jakarta Sans', 'Noto Sans', sans-serif"
  >
    <!-- 헤더 -->
    <div class="bg-gray-100 rounded-xl p-8 shadow-sm">
      <h1 class="text-3xl font-bold text-gray-900">질문 게시판</h1>
      <p class="text-base text-gray-600 mt-2">
        최근 등록된 질문 목록을 확인하고 답변해보세요.
      </p>
      <div class="mt-4 text-right">
        <router-link
          to="/question/register"
          class="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow"
        >
          질문 등록
        </router-link>
      </div>
    </div>

    <!-- 로딩 및 에러 메시지 -->
    <div v-if="loading" class="text-center text-gray-500 text-lg">
      로딩 중...
    </div>
    <div v-if="error" class="text-center text-red-500 text-lg">{{ error }}</div>

    <!-- 질문 목록 -->
    <div v-if="!loading && !error" class="space-y-4">
      <div
        v-for="question in questions"
        :key="question.id"
        class="flex items-start bg-white rounded-lg shadow hover:shadow-md transition"
      >
        <!-- 이미지 -->
        <img
          :src="question.imageSrc"
          alt="Thumbnail"
          class="w-32 h-32 object-cover rounded-lg flex-shrink-0"
        />

        <!-- 질문 정보 -->
        <div class="ml-4 flex-1">
          <div class="flex items-center space-x-2">
            <!-- 카테고리 -->
            <div
              class="px-3 py-1 text-sm font-medium rounded-full"
              :class="categoryClasses[question.category]"
            >
              {{ question.category }}
            </div>
            <!-- 작성자 -->
            <span class="text-sm text-gray-500">{{ question.username }}</span>
          </div>

          <!-- 제목 -->
          <router-link
            :to="`/question-detail/${question.id}`"
            class="block text-lg font-semibold text-gray-800 hover:text-blue-500 mt-2"
          >
            {{ question.title }}
          </router-link>

          <!-- 본문 -->
          <p class="text-sm text-gray-600 mt-2 line-clamp-2">
            {{ question.body }}
          </p>

          <!-- 작성일 -->
          <span class="text-xs text-gray-400 mt-2 block">
            {{ formatDate(question.createdAt) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useAuthStore } from "@/authStore.js";

// 로그인 상태 확인
import { useRouter } from "vue-router";
const router = useRouter();
const accessToken = ref(localStorage.getItem("accessToken"));
const isLoggedIn = computed(() => {
  return !!accessToken.value;
});

const questions = ref([]);
const loading = ref(false);
const error = ref(null);
const authStore = useAuthStore();

const fetchQuestions = async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      "http://localhost:8080/api/question/list",
      {
        headers: { Authorization: `Bearer ${authStore.accessToken}` },
      }
    );
    questions.value = await Promise.all(
      response.data.map(async (question) => {
        if (question.imageUrl) {
          question.imageSrc = await fetchImage(question.imageUrl);
        } else {
          question.imageSrc = "https://via.placeholder.com/120x120";
        }
        return question;
      })
    );
  } catch (err) {
    error.value = "질문을 불러오는 데 실패했습니다.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const fetchImage = async (imageUrl) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/images/uploads/${imageUrl}`,
      {
        responseType: "blob",
      }
    );
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error("이미지 로드 실패:", error);
    return "https://via.placeholder.com/120x120";
  }
};

const formatDate = (datetime) => {
  const date = new Date(datetime);
  return date.toLocaleString("ko-KR", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

// 카테고리별 색상 스타일
const categoryClasses = {
  기술: "bg-blue-100 text-blue-600",
  일반: "bg-green-100 text-green-600",
  기타: "bg-gray-100 text-gray-600",
};
onMounted(() => {
  if (!accessToken.value) {
    router.push("/login");
  }
  fetchQuestions();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
