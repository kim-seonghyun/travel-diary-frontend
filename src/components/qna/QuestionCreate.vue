<template>
  <div
      class="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style="font-family: 'Plus Jakarta Sans', 'Noto Sans', sans-serif"
  >
      <h1 class="text-2xl font-bold text-gray-900 mb-6">질문 작성</h1>

      <form @submit.prevent="submitQuestion" class="space-y-6">
        <!-- 제목 입력 -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 mb-2">제목</label>
          <input
              type="text"
              id="title"
              v-model="title"
              required
              maxlength="200"
              class="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2"
              placeholder="질문의 제목을 입력하세요"
          />
        </div>

        <!-- 카테고리 선택 -->
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
          <select
              id="category"
              v-model="category"
              required
              class="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2"
          >
            <option value="" disabled>카테고리를 선택하세요</option>
            <option value="여행">여행</option>
            <option value="결제">결제</option>
            <option value="자유">자유</option>
          </select>
        </div>

        <!-- 내용 입력 -->
        <div>
          <label for="body" class="block text-sm font-medium text-gray-700 mb-2">내용</label>
          <textarea
              id="body"
              v-model="body"
              required
              class="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2"
              placeholder="질문의 내용을 작성하세요"
          ></textarea>
        </div>

        <!-- 첨부파일 -->
        <div>
          <label for="image" class="block text-sm font-medium text-gray-700 mb-2">첨부파일</label>
          <input
              type="file"
              id="image"
              @change="handleFileChange"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:bg-gray-100 hover:file:bg-gray-200 file:text-gray-700"
          />
        </div>

        <!-- 작성 버튼 -->
        <button
            type="submit"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
          작성하기
        </button>
      </form>

      <!-- 성공 메시지 -->
      <div v-if="success" class="mt-4 text-green-600 text-sm">
        질문이 성공적으로 작성되었습니다.
      </div>

      <!-- 에러 메시지 -->
      <div v-if="error" class="mt-4 text-red-600 text-sm">
        {{ error }}
      </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/authStore.js";

const title = ref("");
const category = ref("");
const body = ref("");
const selectedFile = ref(null);
const success = ref(false);
const error = ref(null);
const authStore = useAuthStore();
const router = useRouter();

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};

const submitQuestion = async () => {
  const user = authStore.user;
  const formData = new FormData();

  formData.append("file", selectedFile.value);
  formData.append(
      "data",
      new Blob(
          [
            JSON.stringify({
              title: title.value,
              category: category.value,
              body: body.value,
              userId: user.id,
            }),
          ],
          { type: "application/json" }
      )
  );

  try {
    await axios.post("http://localhost:8080/api/question/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    success.value = true;
    error.value = null;

    title.value = "";
    category.value = "";
    body.value = "";
    selectedFile.value = "";

    await router.push("/question-list");
  } catch (err) {
    error.value = "질문을 작성하는 데 실패했습니다.";
    success.value = false;
    console.error(err);
  }
};
</script>

<style scoped>
/* Custom style for the file input */
.file\:mr-4 {
  margin-right: 1rem;
}
.file\:py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.file\:px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.file\:rounded-lg {
  border-radius: 0.5rem;
}
.file\:border {
  border-width: 1px;
}
.file\:bg-gray-100 {
  background-color: #f3f4f6;
}
.file\:text-gray-700 {
  color: #374151;
}
.hover\:file\:bg-gray-200:hover {
  background-color: #e5e7eb;
}
</style>