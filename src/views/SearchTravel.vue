<template>
  <div
    class="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
    style="font-family: 'Plus Jakarta Sans', 'Noto Sans', sans-serif"
  >
    <div class="layout-container flex h-full grow flex-col">
      <Header></Header>

      <div class="flex min-h-screen bg-gray-50">
        <!-- Left Sidebar (Navbar) -->
        <Navbar class="w-1000 bg-gray-200"></Navbar>

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
              class="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
              @click="goDetail(destination.id)"
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
          <!-- Pagination -->

          <div class="flex justify-center items-center mt-6 space-x-2">
            <button
              @click="currentPage > 1 && currentPage--"
              :disabled="currentPage === 1"
              class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
            >
              이전
            </button>
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="page !== '...' && (currentPage = page)"
              :disabled="page === '...'"
              :class="[
                'px-4 py-2 rounded',
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : page === '...'
                  ? 'bg-transparent cursor-default'
                  : 'bg-gray-200 hover:bg-gray-300',
              ]"
            >
              {{ page }}
            </button>
            <button
              @click="currentPage < totalPages && currentPage++"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
            >
              다음
            </button>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";

import { ref, computed, onMounted, watch } from "vue"; // computed 추가
import axios from "axios"; // axios 임포트
import LocateSelect from "@/components/LocateSelect.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goDetail = (id) => {
  // ID를 기반으로 상세 페이지로 이동
  router.push({ name: "travelDetail", params: { id } });
};

// 로그인 상태 확인
const accessToken = ref(localStorage.getItem("accessToken"));
const isLoggedIn = computed(() => {
  return !!accessToken.value;
});

// 로그인 여부에 따른 라우팅 처리

const locationNumber = ref("0");
const totalPages = ref();
const currentPage = ref(1);
const filters = ref(["바다", "산", "도시", "축제"]);

watch(currentPage, () => {
  if (locationNumber.value === "0") {
    fetchDestinations();
  } else {
    fetchSearchByLocation();
  }
});

// 여행지 정보
const destinations = ref([]); // 초기 상태는 빈 배열

const visiblePages = computed(() => {
  const total = totalPages.value || 0;
  const current = currentPage.value || 1;

  if (total <= 7) {
    // If total pages are less than or equal to 7, show all pages
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = [];
  if (current <= 4) {
    pages.push(1, 2, 3, 4, 5, "...", total);
  } else if (current >= total - 3) {
    pages.push(1, "...", total - 4, total - 3, total - 2, total - 1, total);
  } else {
    pages.push(1, "...", current - 1, current, current + 1, "...", total);
  }

  return pages;
});

// 여행지 API에서 데이터를 가져오는 함수
const fetchDestinations = async () => {
  const currentPageNumber = currentPage.value;
  try {
    // 여행지 목록 API
    const response = await axios.get(
      `http://localhost:8080/api/trip/search?currentPage=${currentPageNumber}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    destinations.value = response.data; // 응답받은 데이터를 destinations 배열에 저장
    console.log("여행지 데이터:", response.data);
  } catch (error) {
    console.error("여행지 데이터를 가져오는 데 실패했습니다:", error);
  }
};

// 모든 여행지 토탈 카운트.
const fetchTotalCount = async () => {
  try {
    // 여행지 목록 API
    const response = await axios.get("http://localhost:8080/api/trip/total", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const totalCnt = response.data;
    totalPages.value = Math.ceil(totalCnt / 16);
    console.log("여행지 데이터:", response.data);
  } catch (error) {
    console.error("여행지 데이터를 가져오는 데 실패했습니다:", error);
  }
};

// 특정 지역 로케이션 카운트
const fetchTripLocationCount = async () => {
  try {
    // 여행지 목록 API
    const response = await axios.get(
      `http://localhost:8080/api/trip/total/${locationNumber.value}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const totalCnt = response.data;
    totalPages.value = Math.ceil(totalCnt / 16);
    console.log("여행지 데이터:", response.data);
  } catch (error) {
    console.error("여행지 데이터를 가져오는 데 실패했습니다:", error);
  }
};

// 여행지 API에서 데이터를 가져오는 함수
const fetchSearchByLocation = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/trip/search/locate?locationId=${locationNumber.value}&currentPage=${currentPage.value}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
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
    currentPage.value = 1;
    if (locationNumber.value == "0") {
      fetchDestinations();
      fetchTotalCount();
    } else {
      fetchTripLocationCount();
      fetchSearchByLocation();
    }
  }
});

// 컴포넌트가 마운트될 때 여행지 데이터를 가져옵니다.
onMounted(() => {
  if (!accessToken.value) {
    router.push("/login");
  }
  fetchDestinations();
  fetchTotalCount();
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

<style scoped></style>
