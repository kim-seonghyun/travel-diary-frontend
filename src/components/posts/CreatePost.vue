<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
    <!-- 폼 제목 -->
    <h1 class="text-2xl font-bold text-center mb-4">새로운 포스트 작성</h1>

    <!-- 입력 폼 -->
    <form @submit.prevent="submitPost">

      <!-- 여행 검색 입력 -->
      <div class="mb-4">
        <label for="tripSearch" class="block text-sm font-medium text-gray-700">
          여행 검색
        </label>
        <input
            type="text"
            id="tripSearch"
            v-model="tripSearchQuery"
            placeholder="여행 이름을 검색하세요"
            class="w-full mt-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <!-- 여행 선택 -->
      <div class="mb-4">
        <label for="tripId" class="block text-sm font-medium text-gray-700">
          여행 선택
        </label>
        <select
            id="tripId"
            v-model="post.tripId"
            class="w-full mt-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            required
        >
          <option value="" disabled>여행을 선택하세요</option>
          <!-- 검색된 여행 목록을 표시 -->
          <option
              v-for="trip in filteredTrips"
              :key="trip.id"
              :value="trip.id"
          >
            {{ trip.facilityName }}
          </option>
        </select>
      </div>
      <!-- 내용 입력 -->
      <div class="mb-4">
        <label for="content" class="block text-sm font-medium text-gray-700">
          내용
        </label>
        <textarea
            id="content"
            v-model="post.content"
            placeholder="내용을 입력하세요"
            class="w-full mt-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            rows="4"
            required
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="image" class="block text-sm font-medium text-gray-700">
          이미지 업로드
        </label>
        <input
            type="file"
            id="image"
            accept="image/*"
            @change="handleImageUpload"
            class="w-full mt-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <!-- 제출 버튼 -->
      <button
          type="submit"
          class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        포스트 등록
      </button>
    </form>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from "vue";
import axios from "axios";
import { useAuthStore} from "@/authStore.js";

// authStore에서 사용자 ID 가져오기
const authStore = useAuthStore();
const userId = authStore.user.id;
const imageFile = ref(null); // 선택된 이미지 파일
// 폼 데이터 및 여행 리스트 관리
const post = ref({
  tripId: "",
  content: "",
  userid: userId
});
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    console.log("이미지 파일 선택:", file.name); // 디버깅용 출력
  }
};


const trips = ref([]);
const tripSearchQuery = ref("");


const filteredTrips = computed(() => {
  const query = tripSearchQuery.value.toLowerCase();
  return trips.value.filter((trip) =>
      trip.facilityName.toLowerCase().includes(query)
  );
});

// 서버에서 여행 데이터 불러오기
const fetchTrips = async () => {

  try {
    const response = await axios.get("http://localhost:8080/api/trip/search",{
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    }); // 여행 데이터 API
    trips.value = response.data;
  } catch (error) {
    console.error("여행 데이터를 불러오는 중 오류 발생:", error);
  }
};


const submitPost = async () => {
  const user = JSON.parse(authStore.user)
  try {
    const formData = new FormData();
    const request = {
      'tripId' : post.value.tripId,
      "content" : post.value.content,
      'userId': user.id,
    }
    formData.append("request",new Blob([JSON.stringify(request)], {type: "application/json"}) )
    formData.append("image", imageFile.value);


     await axios.post("http://localhost:8080/api/post/regist", formData, {
      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${authStore.accessToken}` }
      ,
    });

    alert("포스트가 성공적으로 등록되었습니다!");
    // console.log(response.data);
  } catch (error) {
    alert("포스트 등록 중 오류가 발생했습니다.");
    console.error(error);
  }
};

// 컴포넌트 마운트 시 여행 데이터 로드
onMounted(()=>{
  fetchTrips()
});
</script>

<style>
/* TailwindCSS를 활용하므로 별도의 스타일 추가는 필요하지 않습니다. */
</style>