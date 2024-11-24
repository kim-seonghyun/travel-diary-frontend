<!-- PostCard.vue -->
<template>
  <Card
    class="w-full max-w-md m-auto border rounded-lg shadow-sm overflow-hidden"
  >
    <!-- 사용자 정보와 이미지 상단 부분 -->
    <CardHeader class="flex items-center p-4">
      <!-- 프로필 이미지 -->
      <img
        :src="profileImage"
        alt="프로필 이미지"
        class="w-10 h-10 rounded-full mr-3"
      />
      <div>
        <p class="font-semibold">{{ username }}</p>
        <p class="text-sm text-gray-500">{{ facilityName }}</p>
      </div>
    </CardHeader>

    <CardContent class="p-0">
      <img
        :src="postImage"
        alt="포스트 이미지"
        class="w-full h-80 object-cover"
      />
    </CardContent>

    <CardFooter class="p-4">

      <div class="w-full block">
        <p class="text-sm block">
          <span class="font-semibold">{{ username }}</span> {{ content.length > 20 ? content.slice(0, 20) + '...' : content  }}
          <span class="text-xs text-gray-500 mt-2 whitespace-nowrap">
            {{ timeAgo }}</span
          >
        </p>

        <button
            @click="openModal(id)"
            class="text-blue-500 underline"
        ><p class="text-xs text-gray-500 mt-2 whitespace-nowrap">자세히 보기</p></button>
      </div>


      <div class="flex items-center justify-between mb-">
        <div class="flex space-x-3">
          <button class="text-gray-600 hover:text-gray-800">❤️</button>
        </div>
      </div>
    </CardFooter>
    <PostDetail
        :isModalOpen="isModalOpen"
        :id="selectedPostId"
        :post-image="postImage"
        :content="content"
        :username="username"
        :facility-name="facilityName"
        :created-at="createdAt"
        :profile-image="profileImage"
        :time-ago="timeAgo"

        @close="isModalOpen = false"
    />
  </Card>
</template>

<script setup>
import {
  Card,
  CardHeader,

  CardContent,
  CardFooter,
} from "@/components/ui/card";
import PostDetail from "@/components/posts/PostDetail.vue";
import {ref} from "vue";
const isModalOpen = ref(false);
const selectedPostId = ref(null);

const openModal = async (id) => {
  selectedPostId.value = id;
  isModalOpen.value = true;
};

defineProps({
  id : Number,
  username : String,
  facilityName: String,
  postImage : String,
  content: String,
  timeAgo: Date,
  createdAt: Date,
  profileImage: {
    type: String,
    default: null, // 기본값 null
  },
})


</script>
