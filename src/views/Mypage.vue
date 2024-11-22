<template>
  <div
    class="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
    style="font-family: 'Plus Jakarta Sans', 'Noto Sans', sans-serif"
  >
    <div class="layout-container flex h-full grow flex-col">
      <Header></Header>

      <div class="gap-1 px-6 flex flex-1 justify-center py-5">
        <Navbar></Navbar>
        <main class="flex-1 p-10">
          <!-- Welcome Section -->
          <section class="bg-[#F2F6F6] p-6 rounded-lg shadow mb-10">
            <h2 class="text-2xl font-semibold text-[#637F96]">
              {{ mypage.name || "사용자" }}님, 안녕하세요
            </h2>
            <p class="mt-2 text-gray-700">
              현재 도토리가 {{ mypage.dotori }}개를 수집했어요!
            </p>
            <button
              class="mt-4 py-2 px-6 bg-[#637F96] text-white rounded-lg hover:bg-[#4F6878]"
            >
              정보 변경하기
            </button>
          </section>

          <!-- Progress Bar Section -->
          <section class="bg-white p-6 rounded-lg shadow mb-10">
            <h3 class="text-xl font-semibold text-gray-700 mb-4">여행 성향</h3>
            <div
              v-for="(style, index) in travelStyles"
              :key="index"
              class="mb-4"
            >
              <label class="text-gray-600">{{ style.name }}</label>
              <div
                class="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden"
              >
                <div
                  :style="{ width: style.progress + '%' }"
                  class="h-full bg-[#E74C3C] transition-width duration-300"
                ></div>
              </div>
            </div>
          </section>

          <!-- Content Section -->
          <section class="space-y-4">
            <div class="bg-white p-4 rounded-lg shadow">
              <h4 class="text-lg font-semibold text-gray-800">
                내가 구매한 컨텐츠들
              </h4>
              <p class="text-gray-500">[김성준] 도쿄여행의 모든 것!</p>
              <button
                class="mt-2 text-sm text-[#637F96] font-semibold hover:underline"
              >
                보러가기
              </button>
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
              <h4 class="text-lg font-semibold text-gray-800">
                무제한 혜택 받기
              </h4>
              <p class="text-gray-500">무제한 5,000원 지급</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue"; // computed 추가
import axios from "axios"; // axios 임포트
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";

const mypage = ref({
  sea: 0,
  mountain: 0,
  city: 0,
  festival: 0,
  valley: 0,
  name: "",
  email: "",
  dotori: 0,
});

// 컴포넌트가 마운트될 때 여행지 데이터를 가져옵니다.
onMounted(() => {
  fetchMypage();
});

// 여행지 API에서 데이터를 가져오는 함수
const fetchMypage = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/user/mypage", {
      // headers: {
      //   Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      // },
    });

    mypage.value = response.data; // 응답받은 데이터를 destinations 배열에 저장
    console.log("여행지 데이터:", response.data);
  } catch (error) {
    console.error("여행지 데이터를 가져오는 데 실패했습니다:", error);
  }
};

export default {
  components: {
    Header,
    Navbar,
  },
  setup() {
    onMounted(fetchMypage);

    // mypage 데이터가 갱신될 때마다 자동으로 travelStyles도 갱신
    const travelStyles = computed(() => [
      { name: "바다", progress: mypage.value.sea },
      { name: "산", progress: mypage.value.mountain },
      { name: "도시", progress: mypage.value.city },
      { name: "축제", progress: mypage.value.festival },
      { name: "계곡", progress: mypage.value.valley },
    ]);
    console.log(travelStyles);
    return { mypage, travelStyles };
  },
};
</script>

<style scoped>
/* PC 화면에 적합한 전체 스타일을 정의 */
</style>
