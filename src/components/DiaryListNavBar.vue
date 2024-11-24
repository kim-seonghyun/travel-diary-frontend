<template>
  <div class="p-6 bg-white">
    <div class="text-center text-xl font-bold mb-6">지금 뜨는 카테고리</div>

    <div class="flex justify-between">
      <!-- 최신순! -->
      <div class="w-1/2 pr-3">
        <h2 class="text-lg font-semibold mb-3">최신 순!</h2>
        <p class="text-sm text-gray-500 mb-6">{{ currentTime }}</p>

        <div
          v-for="(item, index) in domestic"
          :key="index"
          class="mb-4 p-4 bg-white rounded-lg shadow"
        >
          <div class="flex items-center">
            <img :src="item.icon" alt="icon" class="w-12 h-12 mr-4" />
            <div>
              <h3 class="font-bold text-lg">제목 : {{ item.title }}</h3>
              <p class="text-sm text-gray-600">{{ item.createdAt }}</p>
            </div>
          </div>
          <div class="mt-2 text-sm">
            <span class="text-gray-500">{{ item.content }}</span>
            <span class="text-red-600 font-bold ml-2">{{
              item.highlight
            }}</span>
          </div>
        </div>
      </div>

      <!-- 해외 -->
      <div class="w-1/2 pl-3">
        <h2 class="text-lg font-semibold mb-3">좋아요 순위</h2>
        <p class="text-sm text-gray-500 mb-6">11월 22일 09:28 기준</p>
        <div
          v-for="(item, index) in overseas"
          :key="index"
          class="mb-4 p-4 bg-white rounded-lg shadow"
        >
          <div class="flex items-center">
            <img :src="item.icon" alt="icon" class="w-12 h-12 mr-4" />
            <div>
              <h3 class="font-bold text-lg">
                {{ item.rank }}위 {{ item.title }}
              </h3>
              <p class="text-sm text-gray-600">{{ item.rate }}%</p>
            </div>
          </div>
          <div class="mt-2 text-sm">
            <span class="text-gray-500">{{ item.summary }}</span>
            <span class="text-red-600 font-bold ml-2">{{
              item.highlight
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
const domestic = ref([]);
const overseas = ref([]);

// 컴포넌트가 마운트될 때 여행지 데이터를 가져옵니다.
onMounted(() => {
  fetchDomestic();
  updateTime();
});

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

    domestic.value = response.data; // 응답받은 데이터를 destinations 배열에 저장
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
