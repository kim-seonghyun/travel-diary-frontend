<template>
  <!-- 배경이 어두운 모달 -->
  <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white rounded-2xl shadow-xl max-w-3xl w-full overflow-hidden">
      <!-- 상단 헤더 -->
      <div class="flex justify-between items-center px-6 py-4 border-b">
        <h2 class="text-xl font-bold text-gray-900">게시물 상세보기</h2>
        <button
            @click="closeModal"
            class="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- 로딩 중 표시 -->
      <div v-if="isLoading" class="p-6 text-center">
        <p class="text-gray-500">데이터를 불러오는 중입니다...</p>
      </div>

      <!-- 게시물 내용 -->
      <div v-else class="flex flex-col md:flex-row">
        <!-- 왼쪽: 게시물 이미지 -->
        <div class="flex-1 md:max-w-md bg-gray-100">
          <img
              v-if="postImage"
              :src="postImage"
              alt="게시물 이미지"
              class="w-full h-full object-cover"
          />
          <div
              v-else
              class="w-full h-full flex items-center justify-center text-gray-500"
          >
            이미지가 없습니다.
          </div>
        </div>

        <!-- 오른쪽: 게시물 상세 내용 -->
        <div class="flex-1 flex flex-col justify-between p-6">
          <!-- 사용자 정보 -->
          <div class="flex items-center mb-6">
            <img
                v-if="profileImage"
                :src="profileImage"
                alt="프로필 이미지"
                class="w-14 h-14 rounded-full mr-4"
            />
            <div v-else class="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center mr-4">
              <span class="text-gray-500 text-sm">N/A</span>
            </div>
            <div>
              <p class="font-semibold text-gray-900 text-lg">{{ username }}</p>
              <p class="text-sm text-gray-500">{{ facilityName }}</p>
            </div>
          </div>

          <!-- 게시물 내용 -->
          <div class="mb-6">  <p class="text-xs text-gray-500">좋아요 : {{ postLikes }}</p>
            <p class="text-xs text-gray-500">조회수 : {{ viewsCount }}</p>
            <p class="text-gray-800 leading-relaxed whitespace-pre-line">{{ content }}</p>
          </div>

          <!-- 게시 시간 및 액션 버튼 -->
          <div>

            <p class="text-sm text-gray-400 mb-4">게시 시간: {{ timeAgo }}</p>
            <div class="flex space-x-4">
              <button
                  @click="toggleCommentView"
                  class="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 focus:outline-none"
              >
                댓글 보기
              </button>
              <button
                  @click="toggleCommentWrite"
                  class="flex-1 px-4 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 focus:outline-none"
              >
                댓글 작성
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 댓글 보기 섹션 -->
      <div v-if="isCommentViewOpen" class="p-6 border-t max-h-64 overflow-y-auto">
        <h3 class="font-semibold text-lg text-gray-900 mb-4">댓글 {{ comments.length }}</h3>
        <ul class="space-y-4">
          <li
              v-for="(comment, index) in comments"
              :key="index"
              class="border-b pb-4"
          >
            <p class="font-semibold text-gray-800">{{ comment.username }}</p>
            <p class="text-gray-700">{{ comment.content }}</p>
            <p class="text-xs text-gray-400">{{ new Date(comment.createdAt).toLocaleString() }}</p>
          </li>
        </ul>
        <div v-if="!comments || comments.length === 0" class="text-gray-500">
          댓글이 없습니다.
        </div>
      </div>

      <!-- 댓글 작성 섹션 -->
      <div v-if="isCommentWriteOpen" class="p-6 border-t">
        <textarea
            v-model="newComment"
            class="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="댓글을 작성하세요..."
            rows="4"
        ></textarea>
        <button
            @click="submitComment"
            class="mt-4 w-full px-4 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 focus:outline-none"
        >
          댓글 작성
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import { useAuthStore } from "@/authStore.js";

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    required: true,
  },
  id: Number,
  username: String,
  facilityName: String,
  postImage: String,
  content: String,
  timeAgo: String,
  createdAt: Date,
  postLikes: Number,
  viewsCount: Number,
  profileImage: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["close"]);

const comments = ref([]);
const isLoading = ref(false);
const isCommentViewOpen = ref(false);
const isCommentWriteOpen = ref(false);
const newComment = ref("");

const closeModal = () => {
  window.location.reload();
  emit("close");
};

const toggleCommentView = async () => {
  await fetchPostDetail();
  isCommentViewOpen.value = !isCommentViewOpen.value;
  isCommentWriteOpen.value = false;
};

const toggleCommentWrite = async () => {
  isCommentWriteOpen.value = !isCommentWriteOpen.value;
  isCommentViewOpen.value = false;
};

const fetchPostDetail = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(`http://localhost:8080/api/post/detail/${props.id}`);
    comments.value = response.data.comments;
  } catch (error) {
    console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
  } finally {
    isLoading.value = false;
  }
};

const authStore = useAuthStore();

const submitComment = async () => {
  if (!newComment.value.trim()) {
    alert("댓글 내용을 입력해주세요.");
    return;
  }
  try {
    await axios.post(`http://localhost:8080/api/comment/${props.id}/register`, {
      content: newComment.value,
      userId: authStore.user.id,
      postId: props.id,
    });
    alert("댓글이 작성되었습니다.");
    newComment.value = "";
    await fetchPostDetail();
    isCommentWriteOpen.value = false;
    isCommentViewOpen.value = true;
  } catch (error) {
    console.error("댓글 작성 중 오류가 발생했습니다:", error);
    alert("댓글 작성에 실패했습니다.");
  }
};

watch(props.isModalOpen, async (newVal) => {
  if (newVal) await fetchPostDetail();
});
</script>

<style>
/* 추가적인 스타일은 필요하지 않습니다. Tailwind CSS를 활용합니다. */
</style>