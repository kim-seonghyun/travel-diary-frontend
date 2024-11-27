<template>
  <div v-if="question" class="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
       style="font-family: 'Plus Jakarta Sans', 'Noto Sans', sans-serif">

      <div class="mb-6 rounded-lg bg-gray-100 p-6 shadow">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">{{ question.title }}</h1>
        <div class="text-sm text-gray-500 flex items-center space-x-4 mb-4">
          <p>카테고리: <span class="font-semibold text-gray-700">{{ question.category }}</span></p>
          <p>작성자: <span class="font-semibold text-gray-700">{{ question.username }}</span></p>
          <p>작성일: <span class="font-semibold text-gray-700">{{ formatDate(question.createdAt) }}</span></p>
        </div>
        <p class="text-base text-gray-800 mb-6">{{ question.body }}</p>
        <div v-if="imageSrc" class="mt-6">
          <img
              :src="imageSrc"
              alt="Question Image"
              class="rounded-lg w-1/3 shadow"
          />
        </div>
      </div>

      <!-- 답변 목록 -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">
          답변 목록
        </h2>
        <div
            v-for="answer in answers"
            :key="answer.id"
            class="mb-4 p-4 bg-gray-100 rounded-lg shadow"
        >
          <div class="text-sm text-gray-500 flex items-center space-x-4 mb-2">
            <p>작성자: <span class="font-semibold text-gray-700">{{ answer.username }}</span></p>
            <p>작성일: <span class="font-semibold text-gray-700">{{ formatDate(answer.createdAt) }}</span></p>
          </div>
          <p class="text-base text-gray-800">{{ answer.body }}</p>
        </div>
      </div>

      <!-- 답변 작성 -->
      <div class="p-6 bg-gray-100 rounded-lg shadow">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">답변 작성</h2>
        <form @submit.prevent="submitAnswer" class="space-y-4">
          <div>
            <textarea
                id="answerBody"
                v-model="answerBody"
                required
                class="w-full p-4 rounded-lg bg-white border border-gray-300 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="답변 내용을 입력하세요."
                rows="4"
            ></textarea>
          </div>
          <button
              type="submit"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow"
          >
            답변 작성
          </button>
        </form>
        <div v-if="answerSuccess" class="mt-4 text-green-600">
          답변이 성공적으로 작성되었습니다.
        </div>
        <div v-if="answerError" class="mt-4 text-red-600">
          {{ answerError }}
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/authStore.js";

const route = useRoute();
const id = route.params.id;

const question = ref(null);
const answers = ref([]);
const loading = ref(false);
const error = ref(null);

const answerBody = ref("");
const answerSuccess = ref(false);
const answerError = ref(null);

const imageSrc = ref("https://via.placeholder.com/120x120");

const authStore = useAuthStore();

const fetchImage = async (imageUrl) => {
  try {
    const response = await axios.get(`http://localhost:8080/images/uploads/${imageUrl}`, {
      headers: { Authorization: `Bearer ${authStore.accessToken}` },
      responseType: "blob",
    });
    imageSrc.value = URL.createObjectURL(response.data);
  } catch (error) {
    console.error("이미지 로드 실패:", error);
    imageSrc.value = "https://via.placeholder.com/120x120";
  }
};

const fetchQuestion = async () => {
  loading.value = true;
  try {
    const response = await axios.get(
        `http://localhost:8080/api/question/${id}`,
        { headers: { Authorization: `Bearer ${authStore.accessToken}` } }
    );
    question.value = response.data.question;
    await fetchImage(question.value.imageUrl);
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
  return date.toLocaleString("ko-KR", { dateStyle: "short", timeStyle: "short" });
};

const submitAnswer = async () => {
  const user = authStore.user;
  const payload = { body: answerBody.value, questionId: id, userId: user.id };
  try {
    const response = await axios.post(
        `http://localhost:8080/api/question/${id}/answer`,
        payload,
        { headers: { Authorization: `Bearer ${authStore.accessToken}` } }
    );
    answers.value.push(response.data);
    answerSuccess.value = true;
    answerError.value = null;
    answerBody.value = "";
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

<style scoped>
/* 텍스트 잘림 처리 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>