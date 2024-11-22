<template>
  <div class="max-w-6xl mx-auto p-8">
    <!-- 페이지 헤더 -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-extrabold text-white">질문 목록</h1>
      <router-link
          to="/question/register"
          class="text-sm text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
      >
        질문 등록하기
      </router-link>
    </div>

    <!-- 게시글 리스트 -->
    <div v-if="loading" class="text-center text-gray-400 text-lg">
      로딩 중...
    </div>
    <div v-if="error" class="text-center text-red-400 text-lg">
      {{ error }}
    </div>
    <ul>
      <li
          v-for="question in questions"
          :key="question.id"
          class="flex items-center justify-between bg-gray-800 p-6 mb-6 rounded-xl hover:bg-gray-700"
      >
        <router-link
            :to="`/question-detail/${question.id}`"
            class="flex items-start space-x-6 w-full"
        >
          <!-- 썸네일 이미지 -->
          <img
              :src="'http://localhost:8080/images/uploads/' + question.imageUrl || 'https://via.placeholder.com/120x120'"
              alt="Thumbnail"
              class="w-32 h-32 rounded-xl object-cover"
          />

          <!-- 게시글 정보 -->
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-white mb-2">
              {{ question.title }}
            </h2>
            <p class="text-lg text-gray-400 mb-4">{{ question.body }}</p>
            <div class="flex items-center text-sm text-gray-500 space-x-4">
              <span class="bg-gray-700 px-3 py-1 rounded-lg">{{ question.category }}</span>
              <span>{{ question.username }}</span>
              <span>{{ formatDate(question.createdAt) }}</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const questions = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchQuestions = async () => {
  loading.value = true;
  try {
    const response = await axios.get("http://localhost:8080/api/question/list");
    questions.value = response.data;
  } catch (err) {
    error.value = "질문을 불러오는 데 실패했습니다.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const formatDate = (datetime) => {
  const date = new Date(datetime);
  return date.toLocaleString("ko-KR", { dateStyle: "short", timeStyle: "short" });
};

onMounted(() => {
  fetchQuestions();
});
</script>

<style scoped>
</style>