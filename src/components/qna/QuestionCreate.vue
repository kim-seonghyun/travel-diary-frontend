<template>
  <div>
    <h1>질문 작성</h1>
    <form @submit.prevent="submitQuestion">
      <input type="text" name="userid" value="1" />
      <div>
        <label for="title">제목:</label>
        <input
          type="text"
          id="title"
          v-model="title"
          required
          maxlength="200"
        />
      </div>
      <div>
        <label for="category">카테고리:</label>
        <input
          type="text"
          id="category"
          v-model="category"
          required
          maxlength="50"
        />
      </div>
      <div>
        <label for="body">내용:</label>
        <textarea id="body" v-model="body" required></textarea>
      </div>
      <div>
        <label for="image">이미지 URL:</label>
        <input type="url" id="image" v-model="image_url" />
      </div>
      <button type="submit">작성하기</button>
    </form>
    <div v-if="success" style="color: green">
      질문이 성공적으로 작성되었습니다.
    </div>
    <div v-if="error" style="color: red">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const title = ref("");
const category = ref("");
const body = ref("");
const image_url = ref("");
const success = ref(false);
const error = ref(null);

const router = useRouter();

const submitQuestion = async () => {
  const payload = {
    title: title.value,
    category: category.value,
    body: body.value,
    image_url: image_url.value || null,
    userId: 1,
  };
  try {
    await axios.post("http://localhost:8080/api/question/register", payload);
    success.value = true;
    error.value = null;

    title.value = "";
    category.value = "";
    body.value = "";
    image_url.value = "";

    router.push("/question-list");
  } catch (err) {
    error.value = "질문을 작성하는 데 실패했습니다.";
    success.value = false;
    console.error(err);
  }
};
</script>

<style scoped>
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
