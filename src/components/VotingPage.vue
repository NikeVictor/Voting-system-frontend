<template>
    <div class="center-container">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center mb-4 text-gray-800">Vote for Your Candidates</h1>
        <p class="text-center mb-4 text-gray-600">Choose your preferred candidate below:</p>

        <div v-for="(candidates, position) in groupedCandidates" :key="position">
          <h2 class="text-xl font-semibold mt-4 mb-2 text-green-700">{{ position }}</h2>
          <div v-for="candidate in candidates" :key="candidate.id" class="mb-3">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                v-model="selectedCandidates[position]"
                :value="candidate" 
                class="form-radio h-5 w-5 text-green-600" 
              />
              <span class="text-lg text-gray-700">{{ candidate.name }}</span>
            </label>
          </div>
        </div>
  
        <!-- Submit Button -->
        <button
          class="vote-button"
          @click="submitVote"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "Submitting..." : "Submit Vote" }}
        </button>
  
        <p v-if="errorMessage" class="text-red-500 text-center mt-3">{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        phoneNumber: this.$route.query.phoneNumber,
        candidates: [], 
        selectedCandidates: {},
        errorMessage: "",
        isSubmitting: false
      };
    },
    computed: {
  groupedCandidates() {
    const grouped = {};
    this.candidates.forEach((candidate) => {
      if (!grouped[candidate.position]) {
        grouped[candidate.position] = [];
      }
      grouped[candidate.position].push(candidate);
    });

    // Define the desired order of positions
    const positionOrder = ["President", "Vice President", "Secretary", "finsec", "Other"]; // Add other positions as needed

    return positionOrder
      .filter(position => grouped[position]) 
      .reduce((sorted, key) => {
        sorted[key] = grouped[key];
        return sorted;
      }, {});
    }
    },
    async created() {
      try {
        const response = await axios.get("https://amauwelu-voting-backend.onrender.com/candidates");
        this.candidates = response.data.data;
        console.log("Candidates fetched:", this.candidates);
      } catch (error) {
        console.error("Error fetching candidates:", error);
        this.errorMessage = "Error fetching candidates.";
      }
    },
    methods: {
      async submitVote() {
        // Check if a candidate is selected for each position
        const selectedPositions = Object.keys(this.selectedCandidates);
        if (selectedPositions.length === 0 || selectedPositions.some(pos => !this.selectedCandidates[pos])) {
          this.errorMessage = "Please select a candidate for each position.";
          return;
        }
  
        this.isSubmitting = true;
        const ids = Object.keys(this.selectedCandidates).map(i => this.selectedCandidates[i]._id)
        console.log("Ids", ids)
        try {
          await axios.post("https://amauwelu-voting-backend.onrender.com/vote", {
            phoneNumber: this.phoneNumber,
            candidateIds: ids
          });
  
          alert("Vote submitted successfully!");
          this.$router.push("/");
        } catch (error) {
          console.error("Error submitting vote:", error);
          this.errorMessage = "Error submitting vote.";
        } finally {
          this.isSubmitting = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Responsive Design */
  @media (max-width: 640px) {
    .bg-white {
      padding: 16px;
    }
  
    h1 {
      font-size: 1.5rem;
    }
  
    p {
      font-size: 0.875rem;
    }
  }
  
  .vote-button {
    width: 30%;
    padding: 10px;
    margin-top: 30px; 
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .center-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh; 
      background-color: #f3f4f6;
      padding: 50px;
  }
  </style>

