<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md p-4">
      <h1 class="text-2xl font-semibold mb-8">#dotori</h1>
      <nav>
        <ul>
          <li v-for="item in menuItems" :key="item.name" class="mb-4">
            <a
              :href="item.href"
              class="flex items-center space-x-2 text-gray-600 hover:text-black"
            >
              <span :class="item.icon"></span>
              <span>{{ item.name }}</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8">
      <!-- Header with Search -->
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-semibold">여행을 떠나보아요!</h2>

        <LocateSelect v-model="locationNumber" />

        <div class="relative">
          <input
            type="text"
            placeholder="Search destinations"
            class="w-64 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            @click="searchDestinations"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            🔍
          </button>
        </div>
      </div>

      <!-- Filter Tags -->

      <!-- Destinations Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="destination in destinations"
          :key="destination.id"
          class="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <img
            :src="destination.webPageUrl"
            alt="destination"
            class="w-full h-40 object-cover"
          />
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">
              {{ destination.facilityName }}
            </h3>
            <p class="text-sm text-gray-500">{{ destination.location }}</p>
            <p class="mt-2 font-bold text-gray-800">
              {{ destination.roadAddress }}
            </p>
            <p class="text-xs text-gray-400">
              {{ destination.phoneNumber }}
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue"; // computed 추가
import axios from "axios"; // axios 임포트
import LocateSelect from "@/components/LocateSelect.vue";

// 메뉴 항목들
const menuItems = ref([
  { name: "Home", href: "#", icon: "icon-home" },
  { name: "Popular", href: "#", icon: "icon-star" },
  { name: "Canned Goods", href: "#", icon: "icon-archive" },
  { name: "Fresh Produce", href: "#", icon: "icon-leaf" },
  { name: "Checkout", href: "#", icon: "icon-cart" },
]);

// 검색 및 필터 관련 데이터
const locationNumber = ref("");
const filters = ref(["바다", "산", "도시", "축제"]);

// 여행지 정보
const destinations = ref([]); // 초기 상태는 빈 배열

// 여행지 API에서 데이터를 가져오는 함수
const fetchDestinations = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/trip/search"); // 여기에 실제 API URL을 사용하세요
    destinations.value = response.data; // 응답받은 데이터를 destinations 배열에 저장
    console.log("여행지 데이터:", response.data);
  } catch (error) {
    console.error("여행지 데이터를 가져오는 데 실패했습니다:", error);
  }
};

// 여행지 API에서 데이터를 가져오는 함수
const fetchSearchByLocation = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/trip/search/locate?locateId=${locationNumber.value}`
    ); // 여기에 실제 API URL을 사용하세요
    destinations.value = response.data; // 응답받은 데이터를 destinations 배열에 저장
    console.log("여행지 데이터:", response.data);
  } catch (error) {
    console.error("여행지 데이터를 가져오는 데 실패했습니다:", error);
  }
};

// locationNumber가 변경될 때마다 fetchDestinations 호출
watch(locationNumber, () => {
  if (locationNumber.value) {
    fetchSearchByLocation();
  }
});

// 컴포넌트가 마운트될 때 여행지 데이터를 가져옵니다.
onMounted(() => {
  fetchDestinations();
});

// 필터 적용
const applyFilter = (filter) => {
  selectedFilter.value = filter;
};

// 검색 기능 구현 (검색 버튼 클릭 시)
const searchDestinations = () => {
  // 실제 검색 로직을 구현할 수 있습니다.
  console.log("검색 실행:", searchQuery.value);
};
</script>

<style scoped>
.icon-home::before {
  content: "🏠";
}
.icon-star::before {
  content: "⭐";
}
.icon-archive::before {
  content: "📦";
}
.icon-leaf::before {
  content: "🍃";
}
.icon-cart::before {
  content: "🛒";
}
</style>
