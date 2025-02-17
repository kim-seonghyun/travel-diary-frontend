<template>
  <!-- 배경이 어두운 모달 -->
  <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white rounded-lg shadow-lg max-w-3xl w-full">
      <!-- 상단 닫기 버튼 -->
      <div class="flex justify-between items-center px-4 py-2 border-b">
        <h2 class="text-lg font-semibold">게시물 상세보기</h2>
        <button
            @click="closeModal"
            class="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <!-- 로딩 중 표시 -->
      <div v-if="isLoading" class="p-4 text-center">
        <p>데이터를 불러오는 중입니다...</p>
      </div>

      <!-- 게시물 내용 -->
      <div v-else class="flex flex-col md:flex-row">
        <!-- 왼쪽: 게시물 이미지 -->
        <div class="flex-1 md:max-w-md">
          <img
              v-if="postImage"
              :src="postImage"
              alt="게시물 이미지"
              class="w-full h-full object-cover"
          />
          <div
              v-else
              class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500"
          >
            이미지가 없습니다.
          </div>
        </div>

        <div class="flex-1 flex flex-col justify-between p-4">
          <div class="flex items-center mb-4">
            <img
                v-if="profileImage"
                :src="profileImage"
                alt="프로필 이미지"
                class="w-12 h-12 rounded-full border border-gray-300"
            />
            <div v-else class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <span class="text-gray-500 text-sm">N/A</span>
            </div>
            <div class="ml-3">
              <p class="font-semibold">{{ username }}</p>
              <p class="text-sm text-gray-500">{{ facilityName }}</p>
              <p class="text-xs text-gray-500">좋아요 : {{ postLikes }}</p>
              <p class="text-xs text-gray-500">조회수 : {{ viewsCount }}</p>
            </div>
          </div>

          <div class="mb-4">
            <p class="text-gray-700 whitespace-pre-line">{{ content }}</p>
          </div>

          <div class="mb-4">
            <p class="text-sm text-gray-500">게시 시간: {{ timeAgo }}</p>
          </div>

          <div class="flex space-x-4">
            <button
                @click="toggleCommentView"
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              댓글 보기
            </button>
            <button
                @click="toggleCommentWrite"
                class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              댓글 작성
            </button>
          </div>
        </div>
      </div>

      <div v-if="isCommentViewOpen" class="p-4 border-t">
        <h3 class="font-semibold text-lg">댓글 {{ comments.length }}</h3>
        <ul>
          <li
              v-for="(comment, index) in comments"
              :key="index"
              class="border-b py-2"
          >
            <p class="font-semibold">{{ comment.username }}</p>
            <p class="text-gray-700">{{ comment.content }}</p>
            <p class="text-xs text-gray-500">{{ new Date(comment.createdAt).toLocaleString() }}</p>
          </li>
        </ul>
        <div v-if="!comments || comments.length === 0" class="text-gray-500">
          댓글이 없습니다.
        </div>
      </div>

      <div v-if="isCommentWriteOpen" class="p-4 border-t">
        <textarea
            v-model="newComment"
            class="w-full p-2 border rounded"
            placeholder="댓글을 작성하세요..."
        ></textarea>
        <button
            @click="submitComment"
            class="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          댓글 작성
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch} from "vue";
import axios from "axios";
import {useAuthStore} from "@/authStore.js";

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    required: true,
  },
  id : Number,
  username : String,
  facilityName: String,
  postImage : String,
  content: String,
  timeAgo: Number,
  createdAt: Date,
  postLikes: Number,
  viewsCount: Number,
  profileImage: {
    type: String,
    default: null, // 기본값 null
  },
});

// 이벤트: 부모 컴포넌트로 닫기 이벤트를 전달
const emit = defineEmits(["close"]);

// 상태 변수
const comments = ref([]); // 게시물 데이터
const isLoading = ref(false); // 로딩 상태
const isCommentViewOpen = ref(false); // 댓글 보기 열림 상태
const isCommentWriteOpen = ref(false); // 댓글 작성 열림 상태
const newComment = ref(""); // 새로운 댓글 내용
// 모달 닫기
const closeModal = () => {
  emit("close");
};

// 댓글 보기 토글
const toggleCommentView = async () => {
  await fetchPostDetail();
  isCommentViewOpen.value = !isCommentViewOpen.value;
};

// 댓글 작성 토글
const toggleCommentWrite = async () => {
  await fetchPostDetail();
  isCommentWriteOpen.value = !isCommentWriteOpen.value;
};

// 서버에서 데이터를 불러오는 함수
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
const authStore = useAuthStore()
// 댓글 작성
const submitComment = async () => {
  if (!newComment.value.trim()) {
    alert("댓글 내용을 입력해주세요.");
    return;
  }
  try {
    await axios.post(`http://localhost:8080/api/comment/${props.id}/register`, {
      content: newComment.value,
      userId: authStore.user.id,
      postId: props.id
    });
    alert("댓글이 작성되었습니다.");
    newComment.value = "";
    await fetchPostDetail(); // 댓글 목록 갱신
  } catch (error) {
    console.error("댓글 작성 중 오류가 발생했습니다:", error);
    alert("댓글 작성에 실패했습니다.");
  }
};

watch(props.isModalOpen, async (newVal) => {
  if (newVal)
    await fetchPostDetail();

});


</script>

<style>
/* Tailwind CSS를 사용하기 때문에 추가적인 스타일링이 필요하지 않음 */
</style>