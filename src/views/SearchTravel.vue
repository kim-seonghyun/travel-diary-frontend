<<template>
    <div class="flex min-h-screen bg-gray-50">
      <!-- Sidebar -->
      <aside class="w-64 bg-white shadow-md p-4">
        <h1 class="text-2xl font-semibold mb-8">Travel Explorer</h1>
        <nav>
          <ul>
            <li v-for="item in menuItems" :key="item.name" class="mb-4">
              <a :href="item.href" class="flex items-center space-x-2 text-gray-600 hover:text-black">
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
          <h2 class="text-3xl font-semibold">Popular Destinations</h2>
          <div class="relative">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search destinations"
              class="w-64 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            />
            <button @click="searchDestinations" class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
              🔍
            </button>
          </div>
        </div>
  
        <!-- Filter Tags -->
        <div class="flex space-x-4 mb-8">
          <button
            v-for="filter in filters"
            :key="filter"
            @click="applyFilter(filter)"
            :class="{
              'bg-blue-500 text-white': selectedFilter === filter,
              'bg-gray-200 text-gray-700': selectedFilter !== filter
            }"
            class="px-4 py-2 rounded-full text-sm hover:bg-blue-400 hover:text-white transition"
          >
            {{ filter }}
          </button>
        </div>
  
        <!-- Destinations Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="destination in filteredDestinations" :key="destination.id" class="bg-white shadow-lg rounded-lg overflow-hidden">
            <img :src="destination.image" alt="destination" class="w-full h-40 object-cover" />
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-2">{{ destination.name }}</h3>
              <p class="text-sm text-gray-500">{{ destination.location }}</p>
              <p class="mt-2 font-bold text-gray-800">{{ destination.price | currency }}</p>
              <p class="text-xs text-gray-400">{{ destination.rating }} / 5 ({{ destination.reviews }} reviews)</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
import { ref, computed } from 'vue';
  
  const menuItems = ref([
    { name: 'Home', href: '#', icon: 'icon-home' },
    { name: 'Popular', href: '#', icon: 'icon-star' },
    { name: 'Canned Goods', href: '#', icon: 'icon-archive' },
    { name: 'Fresh Produce', href: '#', icon: 'icon-leaf' },
    { name: 'Checkout', href: '#', icon: 'icon-cart' },
  ]);
  
  const searchQuery = ref('');
  const selectedFilter = ref('');
  const filters = ref(['Beach', 'Mountain', 'City', 'Countryside']);
  const destinations = ref([
    {
      id: 1,
      name: 'Sunny Beach',
      location: 'Malibu, CA',
      price: 299,
      rating: 4.5,
      reviews: 230,
      image: 'https://example.com/beach.jpg',
    },
    {
      id: 2,
      name: 'Mountain Escape',
      location: 'Aspen, CO',
      price: 199,
      rating: 4.8,
      reviews: 180,
      image: 'https://example.com/mountain.jpg',
    },
    // Add more destination data as needed
  ]);
  
  const searchDestinations = () => {
    // Implement search functionality
  };
  
  const applyFilter = (filter) => {
    selectedFilter.value = filter;
  };
  
  const filteredDestinations = computed(() => {
    return destinations.value.filter((destination) =>
      destination.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  </script>
  
  <style scoped>
  .icon-home::before {
    content: '🏠';
  }
  .icon-star::before {
    content: '⭐';
  }
  .icon-archive::before {
    content: '📦';
  }
  .icon-leaf::before {
    content: '🍃';
  }
  .icon-cart::before {
    content: '🛒';
  }
  </style>