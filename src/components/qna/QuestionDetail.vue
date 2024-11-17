<template>
  <div v-if="question">
    <h1>{{ question.title }}</h1>
    <p><strong>카테고리:</strong> {{ question.category }}</p>
    <p><strong>작성자 ID:</strong> {{ question.username }}</p>
    <p><strong>작성일:</strong> {{ formatDate(question.createdAt) }}</p>
    <div v-if="question.image_url">
      <img
        :src="question.image_url"
        alt="Question Image"
        style="max-width: 100%"
      />
    </div>
    <p>{{ question.body }}</p>

    <hr />

    <h2>답변 목록</h2>
    <ul>
      <li v-for="answer in answers" :key="answer.id">
        <p><strong>작성자 ID:</strong> {{ answer.username }}</p>
        <p><strong>작성일:</strong> {{ formatDate(answer.createdAt) }}</p>
        <div v-if="answer.image_url">
          <img
            :src="answer.image_url"
            alt="Answer Image"
            style="max-width: 100%"
          />
        </div>
        <p>{{ answer.body }}</p>
      </li>
    </ul>

    <hr />

    <h2>답변 작성</h2>
    <form @submit.prevent="submitAnswer">
      <div>
        <label for="answerBody">답변 내용:</label>
        <textarea id="answerBody" v-model="answerBody" required></textarea>
      </div>
      <div>
        <label for="answerImage">이미지 URL:</label>
        <input type="url" id="answerImage" v-model="answerImageUrl" />
      </div>
      <button type="submit">답변 작성</button>
    </form>
    <div v-if="answerSuccess" style="color: green">
      답변이 성공적으로 작성되었습니다.
    </div>
    <div v-if="answerError" style="color: red">{{ answerError }}</div>
  </div>
  <div v-else-if="loading">로딩 중...</div>
  <div v-else-if="error" style="color: red">{{ error }}</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

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
  const payload = {
    body: answerBody.value,
    imageUrl: answerImageUrl.value || null,
    questionId: id,
    userId: 2,
  };
  try {
    const response = await axios.post(
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

<style scoped>
img {
  margin: 1em 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 1em 0;
  border-bottom: 1px solid #ddd;
}
form div {
  margin-bottom: 1em;
}
label {
  display: block;
  margin-bottom: 0.5em;
}
input,
textarea {
  width: 100%;
  padding: 0.5em;
  box-sizing: border-box;
}
button {
  padding: 0.5em 1em;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #369870;
}
</style>
