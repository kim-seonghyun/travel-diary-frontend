<template>
  <div v-if="question">
    <div class="max-w-4xl mx-auto p-6 bg-black text-white">
      <!-- 질문 카드 -->
      <div class="mb-6 border border-gray-700 rounded-lg bg-gray-900 p-4">
        <h1 class="text-2xl font-bold mb-2">{{ question.title }}</h1>
        <div class="text-sm text-gray-400 flex items-center space-x-4 mb-4">
          <p>카테고리: {{ question.category }}</p>
          <p>작성자: {{ question.username }}</p>
          <p>작성일: {{ formatDate(question.createdAt) }}</p>
        </div>
        <p class="mb-4">{{ question.body }}</p>
        <div v-if="question.imageUrl" class="mt-4">
          <img
              :src="'http://localhost:8080/images/uploads/' + question.imageUrl"
              alt="Question Image"
              class="rounded-lg border border-gray-700 w-full"
          />
        </div>
      </div>
    </div>

    <!-- 답변 목록 -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
        답변 목록
      </h2>
      <div
          v-for="answer in answers"
          :key="answer.id"
          class="mb-4 border border-gray-700 rounded-lg bg-gray-800 p-4"
      >
        <div class="text-sm text-gray-400 flex items-center space-x-4 mb-2">
          <p>작성자: {{ answer.username }}</p>
          <p>작성일: {{ formatDate(answer.createdAt) }}</p>
        </div>
        <p class="mb-4">{{ answer.body }}</p>

      </div>
    </div>

    <!-- 답변 작성 -->
    <div class="border border-gray-700 rounded-lg bg-gray-800 p-4">
      <h2 class="text-xl font-semibold mb-4 border-b border-gray-700 pb-2 text-white">
        답변 작성
      </h2>
      <form @submit.prevent="submitAnswer" class="space-y-4">
        <div>
          <label for="answerBody" class="block text-sm font-medium mb-2 text-white">
            답변 내용
          </label>
          <textarea
              id="answerBody"
              v-model="answerBody"
              required
              class="w-full p-2 rounded-lg bg-gray-900 border border-gray-700 text-white"
              rows="4"
          ></textarea>
        </div>
        <button
            type="submit"
            class="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
        >
          답변 작성
        </button>
      </form>
      <div v-if="answerSuccess" class="mt-4 text-green-400">
        답변이 성공적으로 작성되었습니다.
      </div>
      <div v-if="answerError" class="mt-4 text-red-400">
        {{ answerError }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import {useAuthStore} from "@/authStore.js";

const route = useRoute();
const id = route.params.id;

const question = ref(null);
const answers = ref([]);
const loading = ref(false);
const error = ref(null);

const answerBody = ref("");
const answerImageUrl = ref("");
const answerSuccess = ref(false);
const answerError = ref(null);

const authStore = useAuthStore();

const fetchQuestion = async () => {
  loading.value = true;
  try {
    const response = await axios.get(
        `http://localhost:8080/api/question/${id}`
    );
    question.value = response.data.question;
    answers.value = response.data.answers;
  } catch (err) {
    error.value = "질문을 불러오는 데 실패했습니다.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const formatDate = (datetime) => {
  const date = new Date(datetime);
  return date.toLocaleString();
};

const submitAnswer = async () => {
  const user = JSON.parse(authStore.user);
  const payload = {
    body: answerBody.value,
    questionId: id,
    userId: user.id,
  };
  try {
    const response =await axios.post(
        `http://localhost:8080/api/question/${id}/answer`,
        payload
    );
    answers.value.push(response.data);
    answerSuccess.value = true;
    answerError.value = null;
    // 폼 초기화
    answerBody.value = "";
    answerImageUrl.value = "";
  } catch (err) {
    answerError.value = "답변을 작성하는 데 실패했습니다.";
    answerSuccess.value = false;
    console.error(err);
  }
};

onMounted(() => {
  fetchQuestion();
});
</script>