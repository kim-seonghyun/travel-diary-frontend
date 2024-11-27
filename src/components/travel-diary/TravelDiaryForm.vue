<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
    <div class="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
      <h1 class="text-2xl font-semibold text-gray-800 mb-6">여행기 작성</h1>

      <!-- Image Upload -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">이미지 업로드</label>
        <div class="border border-dashed border-gray-300 rounded-lg p-4 text-center">
          <input type="file" @change="handleImageUpload" class="hidden" ref="imageInput" />
          <button
              type="button"
              @click="$refs.imageInput.click()"
              class="px-4 py-2 bg-blue-50 text-blue-600 rounded-md font-medium"
          >
            Select Image
          </button>
          <div v-if="imageFile" class="mt-3 text-sm text-gray-500 truncate">
            {{ imageFile.name }}
          </div>
        </div>
      </div>

      <!-- Title -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
            type="text"
            v-model="formInput.title"
            placeholder="Enter title"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Description -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
            v-model="formInput.description"
            placeholder="Enter description"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <!-- Location Selection -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Select Location</label>
        <select
            v-model="formInput.locationId"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option v-for="location in locations" :key="location.id" :value="location.id">
            {{ location.name }}
          </option>
        </select>
      </div>

      <!-- Related Posts -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Related Posts</label>
        <select
            v-model="formInput.selectedPosts"
            multiple
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option v-for="post in posts" :key="post.id" :value="post.id">
            {{ post.facilityName }} ({{ post.createdAt }})
          </option>
        </select>
      </div>

      <!-- Dotori Price -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Dotori Price</label>
        <input
            type="number"
            v-model="formInput.dotoriPrice"
            placeholder="Enter price"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- For Sale -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">For Sale</label>
        <select
            v-model="formInput.forSale"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="sale">Yes</option>
          <option value="notsale">No</option>
        </select>
      </div>

      <!-- Submit Button -->
      <button
          @click="submitForm"
          class="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/authStore.js';
import {useRouter} from "vue-router";

const authStore = useAuthStore();
const posts = ref([]);
const locations = ref([]);

const formInput = ref({
  title: '',
  description: '',
  locationId: null,
  dotoriPrice: null,
  forSale: 'true',
  selectedPosts: [],
});

const imageFile = ref(null);

const fetchLocations = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/trip/locations');
    locations.value = response.data;
  } catch (error) {
    console.error('Error fetching locations:', error);
  }
};

const fetchPosts = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/post/location-list/${authStore.user.id}`);
    posts.value = response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
  }
};

const router = useRouter();
const submitForm = async () => {
  try {
    const formData = new FormData();
    const payload = {
      title: formInput.value.title,
      description: formInput.value.description,
      locationId: formInput.value.locationId,
      dotoriPrice: formInput.value.dotoriPrice,
      forSale: formInput.value.forSale,
      userId: authStore.user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    formData.append('imageName', imageFile.value);
    formData.append('payload', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
    formData.append('selectedPosts', new Blob([JSON.stringify(formInput.value.selectedPosts)], { type: 'application/json' }));

    await axios.post('http://localhost:8080/api/travel-diary/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    alert('포스트를 성공적으로 만들었습니다.');
    await router.push("/travel-diary");
  } catch (error) {
    alert('Failed to create post!');
    console.error('Error submitting form:', error);
  }
};

onMounted(() => {
  fetchLocations();
  fetchPosts();
});
</script>