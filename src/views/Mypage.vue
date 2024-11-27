<template>
  <div
    class="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
    style="font-family: 'Plus Jakarta Sans', 'Noto Sans', sans-serif"
  >
    <div class="layout-container flex h-full grow flex-col">
      <Header></Header>

      <div class="flex justify-center bg-gray-50">
        <!-- Main Container -->
        <div
          class="w-full max-w-7xl flex flex-col lg:flex-row min-h-screen px-8"
        >
          <!-- Left Sidebar (Navbar) -->
          <Navbar class="w-80 bg-gray-200"></Navbar>

          <!-- Main Content -->
          <main class="flex-1 p-8 lg:p-12">
            <!-- Welcome Section -->
            <section
              class="bg-gradient-to-r from-blue-500 to-blue-400 text-white p-8 rounded-xl shadow-lg mb-12"
            >
              <div class="flex items-center">
                <!-- 프로필 이미지 -->
                <img
                  :src="imageSrc || 'https://via.placeholder.com/100'"
                  alt="Profile Image"
                  class="w-36 h-36 rounded-full mr-6 object-cover shadow-lg"
                />
                <div>
                  <h2 class="text-3xl font-semibold">
                    {{ mypage.name || "사용자" }}님, 안녕하세요
                  </h2>
                  <div class="flex items-center mt-6">
                    <div class="text-5xl font-bold">{{ mypage.dotori }}</div>
                    <div class="ml-3 text-lg">개의 도토리를 수집했어요!</div>
                  </div>
                  <p class="mt-4 text-white/90">
                    도토리를 더 많이 모으고 특별한 여행을 즐겨보세요.
                  </p>
                  <button
                    @click="toggleProfileModal"
                    class="mt-6 py-3 px-10 bg-white text-blue-500 rounded-full font-semibold shadow hover:shadow-lg transition"
                  >
                    정보 변경하기
                  </button>
                </div>
              </div>
            </section>
            <!-- Travel Style Section -->
            <section class="bg-white p-10 rounded-xl shadow-lg mb-12">
              <h3 class="text-2xl font-bold text-gray-800 mb-6">
                🧳 나는 어떤 여행지를 자주 갔을까?
              </h3>
              <div v-if="isDataReady" class="flex justify-center items-center">
                <div class="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                  <PieChart :travelStyles="travelStyles" />
                </div>
              </div>
              <div v-else class="flex justify-center items-center h-48">
                <p class="text-lg text-gray-600 font-medium">
                  데이터를 불러오는 중입니다... 잠시만 기다려주세요! 🚀
                </p>
              </div>
            </section>

            <!-- Content Section -->
            <section class="space-y-8">
              <div
                class="bg-white p-8 rounded-lg shadow hover:shadow-lg transition"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="text-xl font-semibold text-gray-800">
                      결제 내역 보러가기
                    </h4>
                    <p class="text-gray-500">도토리 할인 혜택 중!</p>
                  </div>
                  <button
                    class="px-5 py-2 bg-blue-500 text-white text-sm rounded-full font-semibold hover:bg-blue-600"
                    @click="toggleModal"
                  >
                    보러가기
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      <!-- 프로필 변경 모달 -->
      <div
        v-if="isProfileModalOpen"
        class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
      >
        <div class="bg-white rounded-xl shadow-lg w-96 p-6">
          <!-- Modal Header -->
          <div class="flex justify-between items-center border-b pb-4">
            <h2 class="text-lg font-semibold text-gray-800">프로필 변경</h2>
            <button
              @click="toggleProfileModal"
              class="text-gray-500 hover:text-black focus:outline-none"
            >
              ✕
            </button>
          </div>

          <!-- Modal Content -->
          <div class="py-6">
            <div class="flex flex-col items-center">
              <img
                :src="imageSrc || 'https://via.placeholder.com/100'"
                alt="Preview"
                class="w-32 h-32 rounded-full object-cover shadow-lg"
              />
              <label
                class="mt-4 block w-full text-center text-sm text-gray-500 cursor-pointer file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              >
                이미지 업로드 하기
                <input type="file" class="hidden" @change="onFileChange" />
              </label>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="flex justify-end border-t pt-4">
            <button
              @click="saveProfile"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              저장
            </button>
            <button
              @click="toggleProfileModal"
              class="ml-3 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              취소
            </button>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div
        v-if="isModalOpen"
        class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
      >
        <div class="bg-white rounded-lg shadow-lg w-96 p-6">
          <!-- Modal Header -->
          <div class="flex justify-between items-center border-b pb-4">
            <h2 class="text-lg font-semibold text-gray-800">결제 내역</h2>
            <button
              @click="toggleModal"
              class="text-gray-500 hover:text-black focus:outline-none"
            >
              ✕
            </button>
          </div>

          <div
            class="py-4 space-y-4 overflow-y-auto"
            :style="{
              maxHeight: bills.length > 4 ? '650px' : 'auto', // 4개 초과 시 스크롤 활성화
            }"
          >
            <ul v-if="bills.length > 0" class="space-y-2">
              <li
                v-for="(bill, index) in bills"
                :key="index"
                class="p-4 bg-gray-100 rounded-lg shadow"
              >
                <div class="flex justify-between items-center">
                  <p class="text-gray-800 font-semibold">
                    상품명: {{ bill.orderName }}
                  </p>
                  <p
                    :class="[
                      'text-sm font-semibold px-2 py-1 rounded',
                      bill.status === 'DONE' ? 'bg-blue-100 text-blue-600' : '',
                      bill.status === 'CANCEL' ? 'bg-red-100 text-red-600' : '',
                    ]"
                  >
                    {{
                      bill.status === "DONE"
                        ? "결제 완료"
                        : bill.status === "CANCEL"
                        ? "결제 취소"
                        : "결제 진행 중"
                    }}
                  </p>
                </div>
                <p class="text-gray-600">금액: {{ bill.amount }}원</p>
                <p class="text-gray-500">결제 날짜: {{ bill.rechargeAt }}</p>
                <p class="text-gray-500">결제 방식: {{ bill.provider }}</p>
                <button
                  v-if="bill.status === 'DONE' && !bill.refunded"
                  @click="
                    refundBill(bill.id, bill.paymentId, '기간 내 결제 취소')
                  "
                  class="mt-2 px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  환불 요청
                </button>
                <button
                  v-else-if="bill.status === 'CANCEL' || bill.refunded"
                  class="mt-2 px-4 py-2 text-sm font-semibold text-gray-500 bg-gray-200 rounded-lg cursor-not-allowed"
                  disabled
                >
                  환불 완료
                </button>
              </li>
            </ul>
            <p v-else class="text-gray-500">결제 내역이 없습니다.</p>
          </div>
          <!-- Modal Footer -->
          <div class="flex justify-end pt-4 border-t">
            <button
              @click="toggleModal"
              class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";
import PieChart from "@/components/PieChart.vue";
import { useAuthStore } from "@/authStore";

const isDataReady = ref(false);
const bills = ref([]);
const isProfileModalOpen = ref(false);
const isModalOpen = ref(false);
const newProfileImg = ref(null); // 파일 업로드 받는 변수
const imageSrc = ref("https://via.placeholder.com/100x100"); // 기본 세팅
const authStore = useAuthStore();

// 상태 변수 정의
const mypage = ref({
  sea: 0,
  mountain: 0,
  city: 0,
  festival: 0,
  valley: 0,
  name: "",
  email: "",
  dotori: 0,
  profileImg: "", // 이미지 넣는 부분임
});

// 프로필 모달 토글
const toggleProfileModal = () => {
  isProfileModalOpen.value = !isProfileModalOpen.value;
};

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

// 파일 업로드 핸들러
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      newProfileImg.value = e.target.result; // 미리보기 이미지
    };
    reader.readAsDataURL(file);
  }
};

// 계산된 속성
const travelStyles = computed(() => [
  { name: "바다", progress: mypage.value.sea },
  { name: "산", progress: mypage.value.mountain },
  { name: "도시", progress: mypage.value.city },
  { name: "축제", progress: mypage.value.festival },
  { name: "계곡", progress: mypage.value.valley },
]);

const fetchMypage = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/user/mypage", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    mypage.value = response.data;
    mypage.value.profileImg = await fetchImage(response.data.profileImg);
    isDataReady.value = true;
  } catch (error) {
    console.error("데이터 로드 실패:", error);
  }
};

const fetchBill = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/toss/bills", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    bills.value = response.data;
  } catch (error) {
    console.error("데이터 로드 실패:", error);
  }
};

// 프로필 저장
const fetchImage = async (imageUrl) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/images/uploads/${imageUrl}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
        responseType: "blob", // 이미지를 받아오기 위해 blob 형식 사용
      }
    );
    imageSrc.value = URL.createObjectURL(response.data);
  } catch (error) {
    console.error("이미지 로드 실패:", error);
    imageSrc.value = "https://via.placeholder.com/120x120"; // 실패 시 기본 이미지 표시
  }
};

const saveProfile = async () => {
  try {
    const formData = new FormData();
    formData.append(
      "image",
      document.querySelector("input[type='file']").files[0]
    );

    const response = await axios.post(
      "http://localhost:8080/api/user/upload/image",
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    mypage.value.profileImg = response.data.profileImg; // 서버 응답으로 업데이트
    toggleProfileModal();
    fetchMypage();
    alert("프로필 이미지가 성공적으로 변경되었습니다!");
  } catch (error) {
    console.error("프로필 변경 실패:", error);
    alert("프로필 변경에 실패했습니다.");
  }
};

const refundBill = async (id, paymentId, cancelReason) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/toss/cancel",
      { id, paymentId, cancelReason },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const updatedBill = bills.value.find((bill) => bill.id === id);
    if (updatedBill) {
      updatedBill.status = "CANCEL";
    }
    alert("환불이 처리되었습니다.");
  } catch (error) {
    console.error("데이터 로드 실패:", error);
  }
};

// 데이터 로드
onMounted(() => {
  fetchMypage();
  fetchBill();
});
</script>

<style></style>
