<template>
  <div>
    <h1>질문 목록</h1>
    <router-link :to="'/question/register'">질문 등록하기</router-link>
    <ul>
      <li v-for="question in questions" :key="question.id">
        <router-link :to="`/question-detail/${question.id}`">
          {{ question.title }}
        </router-link>
        <span> - {{ question.category }}</span>
        <span> - {{ formatDate(question.createdAt) }}</span>
        <span> - {{ question.username }}</span>
      </li>
    </ul>
    <div v-if="loading">로딩 중...</div>
    <div v-if="error" style="color: red">{{ error }}</div>
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
  return date.toLocaleString();
};

onMounted(() => {
  fetchQuestions();
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 0.5em 0;
}
</style>
