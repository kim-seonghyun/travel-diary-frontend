<template>
  <div class="p-6 bg-white">
    <div class="text-center text-2xl font-bold mb-6 text-black">
      지금 뜨는 포스트 &#x1F525;
    </div>

    <div class="flex justify-between">
      <!-- 최신순! -->
      <div class="w-1/2 pr-3">
        <h2 class="text-lg font-semibold mb-3 text-black">최신 순!</h2>
        <div class="flex items-center justify-between mb-6">
          <p class="text-sm text-gray-400">{{ currentTime }}</p>
          <router-link
            :to="`/post-list/trip?tripId=${tripId}`"
            class="text-blue-500 text-sm font-semibold hover:underline"
            >더보기</router-link
          >
        </div>

        <div
          v-for="(item, index) in postDataCreatedAt"
          :key="index"
          @click="openModal(item)"
          class="mb-4 p-4 bg-blue-50 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
        >
          <div class="flex items-center">
            <img :src="item.icon" alt="icon" class="w-12 h-12 mr-4" />
            <div>
              <h3 class="font-bold text-lg text-black">
                {{ item.username }}
              </h3>
              <p class="text-sm text-gray-500">{{ item.createdAt }}</p>
            </div>
          </div>
          <div class="mt-2 text-sm">
            <span class="text-gray-600">{{ item.content }}</span>
            <span class="text-red-500 font-bold ml-2">{{
              item.highlight
            }}</span>
          </div>
        </div>
      </div>

      <!-- 좋아요 -->
      <div class="w-1/2 pl-3">
        <h2 class="text-lg font-semibold mb-3 text-black">좋아요 순</h2>
        <div class="flex items-center justify-between mb-6">
          <p class="text-sm text-gray-400">{{ currentTime }}</p>
          <router-link
            :to="`/post-list/trip/like?tripId=${tripId}`"
            class="text-blue-500 text-sm font-semibold hover:underline"
            >더보기</router-link
          >
        </div>
        <div
          v-for="(item, index) in postDataLike"
          :key="index"
          @click="openModal(item)"
          class="mb-4 p-4 bg-blue-50 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
        >
          <div class="flex items-center">
            <img :src="item.icon" alt="icon" class="w-12 h-12 mr-4" />
            <div>
              <h3 class="font-bold text-lg text-black">
                {{ item.username }}
              </h3>
              <p class="text-sm text-gray-500">{{ item.createdAt }}</p>
            </div>
          </div>
          <div class="mt-2 text-sm">
            <span class="text-gray-600">{{ item.content }}</span>
            <span class="text-red-500 font-bold ml-2">{{
              item.highlight
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 모달 컴포넌트 -->
  <PostDetail
    v-if="isModalOpen"
    :isModalOpen="isModalOpen"
    :id="selectedPost?.id"
    :post-image="selectedPost?.postImage"
    :content="selectedPost?.content"
    :username="selectedPost?.username"
    :facility-name="selectedPost?.facilityName"
    :created-at="selectedPost?.createdAt"
    :profile-image="selectedPost?.profileImage"
    :time-ago="selectedPost?.timeAgo"
    :post-likes="selectedPost?.postLikes"
    :views-count="selectedPost?.viewsCount"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    @close="isModalOpen = false"
  />
</template>

<script setup>
import PostDetail from "@/components/posts/PostDetail.vue";
import { ref, onMounted } from "vue";
import axios from "axios"; // axios 임포트
import { defineProps } from "vue";

// props로 전달된 tripId를 정의합니다
const { tripId } = defineProps({
  tripId: {
    type: Number,
    required: true,
  },
});

// 데이터 선언
const postDataCreatedAt = ref([]);
const postDataLike = ref([]);
const selectedPost = ref(null);
const isModalOpen = ref(false);

// 컴포넌트가 마운트될 때 여행지 데이터를 가져옵니다.
onMounted(() => {
  fetchDomestic();
  fetchPostDataLike();
  setInterval(updateTime, 1000); // 1초마다 현재 시간 갱신
});

// 모달 열기
const openModal = (post) => {
  selectedPost.value = {
    id: post.id,
    username: post.username,
    facilityName: post.facilityName,
    postImage: post.postImage,
    content: post.content,
    timeAgo: post.timeAgo,
    createdAt: post.createdAt,
    postLikes: post.postLikes,
    viewsCount: post.viewsCount,
    profileImage: post.profileImage,
  };
  isModalOpen.value = true;
};

// 모달 닫기
const closeModal = () => {
  isModalOpen.value = false;
  selectedPost.value = null;
};

// 현재 시간을 관리하는 변수
const currentTime = ref("");

// 실시간으로 시간을 갱신하는 함수
const updateTime = () => {
  const now = new Date();
  currentTime.value = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
    now.getHours()
  ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
    now.getSeconds()
  ).padStart(2, "0")}`;
};

// 다이어리 가져오기
const fetchDomestic = async () => {
  try {
    // 여행지 목록 API
    const response = await axios.get(
      `http://localhost:8080/api/post/list/${tripId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    postDataCreatedAt.value = response.data; // 응답받은 데이터를 저장
    console.log("여행지 데이터:", response.data);
  } catch (error) {
    console.error("여행지 데이터를 가져오는 데 실패했습니다:", error);
  }
};

// post 가져오기
const fetchPostDataLike = async () => {
  try {
    // 여행지 목록 API
    const response = await axios.get(
      `http://localhost:8080/api/post/list/${tripId}/like`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    postDataLike.value = response.data; // 응답받은 데이터를 저장
    console.log("여행지 데이터:", response.data);
  } catch (error) {
    console.error("여행지 데이터를 가져오는 데 실패했습니다:", error);
  }
};
</script>

<style scoped>
body {
  font-family: "Inter", sans-serif;
}
</style>
