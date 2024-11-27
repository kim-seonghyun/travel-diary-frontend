<template>
  <div
    class="relative min-h-screen flex-col bg-white group/design-root overflow-x-hidden px-8 py-6"
    style="font-family: 'Plus Jakarta Sans', 'Noto Sans', sans-serif"
  >
    <PostCard
      v-for="(post, index) in posts"
      :key="index"
      :id="post.id"
      :username="post.username"
      :facilityName="post.facilityName"
      :postImage="post.postImage"
      :content="post.content"
      :timeAgo="post.timeAgo"
      :profile-image="post.profileImage"
      :created-at="post.createdAt"
      :views-count="post.viewsCount"
      :post-likes="post.postLikes"
    />
    <router-link
      to="/post/create"
      class="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 z-50"
    >
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clip-rule="evenodd"
        />
      </svg>
    </router-link>
  </div>
</template>

<script setup>
import PostCard from "@/components/posts/PostCard.vue";

import { onMounted, ref, computed } from "vue";
import axios from "axios";
import { useAuthStore } from "@/authStore.js";

// 로그인 상태 확인
import { useRouter } from "vue-router";
const router = useRouter();
const accessToken = ref(localStorage.getItem("accessToken"));
const isLoggedIn = computed(() => {
  return !!accessToken.value;
});

const props = defineProps({
  posts: {
    type: Array,
    required: false,
  },
});

const posts = ref(props.posts || []);
const loading = ref(false);
const error = ref(null);
const authStore = useAuthStore();
const fetchPosts = async () => {
  loading.value = true;
  try {
    const response = await axios.get("http://localhost:8080/api/post/list", {
      headers: { Authorization: `Bearer ${authStore.accessToken}` },
    });
    posts.value = response.data;
    posts.value = await Promise.all(
      response.data.map(async (post) => {
        post.profileImage = "https://via.placeholder.com/40";
        const now = new Date();
        const createdAtDate = new Date(post.createdAt);
        const differenceInMilliseconds = now - createdAtDate;

        const differenceInMinutes = Math.floor(
          differenceInMilliseconds / 60000
        );
        const differenceInHours = Math.floor(
          differenceInMilliseconds / 3600000
        );
        const differenceInDays = Math.floor(
          differenceInMilliseconds / 86400000
        );

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
        return post;
      })
    );
    console.log(posts.value);
  } catch (err) {
    error.value = "질문을 불러오는 데 실패했습니다.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};
const imageSrc = ref("https://via.placeholder.com/120x120");

const fetchImage = async (imageUrl) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/images/uploads/${imageUrl}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
        responseType: "blob",
      }
    );
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error("이미지 로드 실패:", error);
    imageSrc.value = "https://via.placeholder.com/120x120";
  }
};

onMounted(() => {
  if (!accessToken.value) {
    router.push("/login");
  }
  if (!posts.value.length) {
    fetchPosts();
  }
});
defineOptions({
  name: "PostList",
});
</script>
