<template>
  <div class="w-full max-w-5xl h-screen overflow-y-scroll space-y-4">
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
  </div>
</template>

<script setup>

import PostCard from "@/components/posts/PostCard.vue";

import {onMounted, ref} from "vue";
import axios from "axios";
import {useAuthStore} from "@/authStore.js";

const loading = ref(false);
const error = ref(null);
const posts = ref([])
const authStore = useAuthStore()
const fetchPosts = async () => {
  loading.value = true;
  try {
    const response = await axios.get("http://localhost:8080/api/post/list" , {headers : {Authorization: `Bearer ${authStore.accessToken}`}} );
    posts.value = response.data;
    posts.value = await Promise.all(
        response.data.map(async (post) => {
          post.profileImage = "https://via.placeholder.com/40"
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
          return post;
        })
    );
    console.log(posts.value)
  } catch (err) {
    error.value = "질문을 불러오는 데 실패했습니다.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};
const imageSrc = ref('https://via.placeholder.com/120x120')

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
    imageSrc.value = "https://via.placeholder.com/120x120";
  }
};

onMounted(()=>{
  fetchPosts()
})

defineOptions({
  name: "PostList",
});
</script>
