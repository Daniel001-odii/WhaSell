<template>
    <div class="relative w-full max-w-lg">
      <!-- Search Input -->
      <input
        v-model="searchQuery"
        @keyup.enter="handleSearch"
        type="text"
        placeholder="Search..."
        class="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
  
      <!-- Search Button -->
      <button
        @click="handleSearch"
        class="absolute top-0 right-0 h-full px-4 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 transition-all"
      >
        Search
      </button>
  
      <!-- Loading Indicator -->
      <div v-if="loading" class="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500">
        <i class="bi bi-arrow-repeat animate-spin"></i>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import axios from "axios";

  export default {
    name: "SearchComponent",
  
    props: {
      apiEndpoint: {
        type: String,
        required: true,
      },
      resultsPage: {
        type: String,
        default: "/search-results",
      },
    },
  
    setup(props) {
      const searchQuery = ref("");
      const loading = ref(false);
      const router = useRouter();
  
      const handleSearch = async () => {
        if (!searchQuery.value.trim()) return;
  
        try {
            console.log("searching...")
          /* loading.value = true;
  
          // Example API Call (replace with actual API implementation)
          const response = await axios.get(`${props.apiEndpoint}?keyword=${searchQuery.value}`);
          console.log("search results: ", response);
          const results = response.data; */
  
          // Navigate to the results page with query and results as route params
          router.push({
            path: props.resultsPage,
            query: { find: searchQuery.value }, // Passing results through state (optional, depending on your use case)
          });
  
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          loading.value = false;
        }
      };
  
      return {
        searchQuery,
        loading,
        handleSearch,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Optional styles for search component */
  </style>
  