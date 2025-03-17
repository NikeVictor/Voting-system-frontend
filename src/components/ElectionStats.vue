<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const electionStats = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchElectionStats = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/voting-stats`); // Adjust API URL
    electionStats.value = response.data;
    console.log("response", response.data)
  } catch (err) {
    error.value = "Failed to fetch election stats.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchElectionStats);
</script>

<template>
  <div class="max-w-3xl mx-auto p-4">
    <h2 class="text-3xl font-bold text-center mb-6 text-blue-700">Election Statistics</h2>

    <div v-if="loading" class="text-center text-gray-500 text-lg animate-pulse">
      Loading...
    </div>

    <div v-else-if="error" class="text-center text-red-500 text-lg font-semibold">
      {{ error }}
    </div>

    <div v-else>
      <!-- Registered Voters Count -->
      <div class="bg-blue-500 text-white p-6 rounded-lg shadow-md text-center mb-6">
        <h3 class="text-xl font-semibold">Number of Registered Voters</h3>
        <p class="text-4xl font-bold mt-2">{{ electionStats.numberOfRegisteredVoters }}</p>
      </div>

      <!-- Candidates by Position -->
      <div v-for="(candidates, position) in electionStats.candidatesByPosition" :key="position" class="mb-6">
        <h3 class="text-2xl font-semibold text-blue-600 mb-3 border-b pb-2">{{ position }}</h3>
        
        <div class="bg-white shadow-lg rounded-lg p-4">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-100">
                <th class="border px-4 py-2 text-left">Name</th>
                <th class="border px-4 py-2 text-center">Votes</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="candidate in candidates" :key="candidate.name" class="hover:bg-gray-50">
                <td class="border px-4 py-2">{{ candidate.name }}</td>
                <td class="border px-4 py-2 text-center font-semibold">{{ candidate.votes }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure table adapts well on smaller screens */
table {
  width: 100%;
}

th, td {
  padding: 0.75rem;
  border: 1px solid #ddd;
}

/* Make sure text is readable on all screen sizes */
@media (max-width: 640px) {
  th, td {
    font-size: 0.9rem;
    padding: 0.5rem;
  }
}
</style>
