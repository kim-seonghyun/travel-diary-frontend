<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4" >
    <div class="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6" :class="{ blur: isBlurred }">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">여행기 상세</h1>
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-800">제목: {{ travelDiary.title }}</h2>
        <p class="text-gray-700 mt-2">설명: {{ travelDiary.description }}</p>
        <img :src="travelDiary.imageName" alt="diary image" class="w-full h-60 object-cover rounded-md mt-4" />
        <p class="text-gray-700 mt-2">작성자: {{ travelDiary.username }}</p>
        <p class="text-gray-700 mt-2">가격: {{ travelDiary.dotoriPrice }} 도토리</p>
        <p class="text-gray-700 mt-2">작성일: {{ new Date(travelDiary.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }) }}</p>
      </div>
      <div v-if="travelDiary.posts && travelDiary.posts.length" class="mb-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">여행 기록들</h3>
        <PostList :posts="travelDiary.posts" />
      </div>

    </div>
    <button v-if="isBlurred"  @click="handlePurchase" class="purchase-button font-bold text-blue-500">
      구매하기
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';
import {useRoute} from "vue-router";
import PostList from "@/components/posts/PostList.vue";
import {useAuthStore} from "@/authStore.js";

const travelDiary = ref({});
const isBlurred = ref(false); // 페이지 블러 처리 여부
const route = useRoute()
const authStore = useAuthStore();
const fetchTravelDiary = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/travel-diary/detail/${id}`);
    travelDiary.value = {
      id: response.data.id,
      userId: response.data.userId,
      title: response.data.title,
      description: response.data.description,
      imageName: await fetchImage( response.data.imageName),
      username: response.data.username,
      dotoriPrice: response.data.dotoriPrice,
      createdAt: response.data.createdAt,
      posts:  response.data.posts,
      purchased: Boolean(response.data.purchased)
    };
    for (const post of travelDiary.value.posts) {
      const now = new Date();
      const createdAtDate = new Date(post.createdAt);
      const differenceInMilliseconds = now - createdAtDate;

      const differenceInMinutes = Math.floor(differenceInMilliseconds / 60000);
      const differenceInHours = Math.floor(differenceInMilliseconds / 3600000);
      const differenceInDays = Math.floor(differenceInMilliseconds / 86400000);

      if (differenceInMinutes < 60) {
        post.timeAgo = `${differenceInMinutes}분 전`;
      } else if (differenceInHours < 24) {
        post.timeAgo = `${differenceInHours}시간 전`;
      } else {
        post.timeAgo = `${differenceInDays}일 전`;
      }
      if (post.postImage) {
        post.postImage = await fetchImage(post.postImage);
      } else {
        post.postImage = "https://via.placeholder.com/120x120";
      }
    }
  } catch (error) {
    console.error('Error fetching travel diary:', error);
  }
};

const handleScroll = () => {
  // 현재 스크롤 위치와 페이지 전체 높이를 가져옵니다.
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const docHeight = document.body.offsetHeight;

  // 페이지의 중간 위치 계산
  const middlePosition = (docHeight - windowHeight) / 3;

  // 구매하지 않은 상태에서 스크롤이 중간을 넘으면 블러 처리
  if (!travelDiary.value.purchased && scrollTop >= middlePosition) {
    isBlurred.value = true;
  } else {
    isBlurred.value = false;
  }
};

const fetchImage = async (imageUrl) => {
  try {
    const response = await axios.get(`http://localhost:8080/images/uploads/${imageUrl}`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
      responseType: "blob",
    });
    return URL.createObjectURL(response.data)
  } catch (error) {
    console.error("이미지 로드 실패:", error);
    return "https://via.placeholder.com/120x120";
  }
};

const handlePurchase = async () => {
  try {
    await axios.post('http://localhost:8080/api/purchase/confirm', {
      traveldiaryId: travelDiary.value.id,
      userId: authStore.user.id,
      ownerId: travelDiary.value.userId,
      buyPrice: travelDiary.value.dotoriPrice,
    });
    travelDiary.value.purchased = true;
    isBlurred.value = false;
  alert('구매가 완료되었습니다!');
  } catch (error) {
    isBlurred.value = true;
    alert('구매에 실패했습니다. 다시 시도해주세요.');
    console.error('Error during purchase:', error);
  }
};

onMounted(() => {
  const id = route.params.id; // 부모 컴포넌트로부터 전달받은 id 값
  fetchTravelDiary(id);
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.blur {
  filter: blur(7px);
  pointer-events: none;
}

.purchase-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  padding: 10px 20px;
  pointer-events: auto;
}
</style>