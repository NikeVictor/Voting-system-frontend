<template>
    <div class="center-container">
        <div class="content-box">
        <h2 class="text-xl font-bold text-center">Welcome to</h2>
        <h1 class="text-2xl font-bold text-center mt-1">
          Amauwelu Amogwu Aku Election
        </h1>
        <p class="text-center text-gray-600 mt-2">
          Enter your voters details to accredite them for voting.
        </p>
  
        <form @submit.prevent="submitForm" class="mt-4">
          <div class="mb-4">
            <input
              type="text"
              v-model="name"
              placeholder="Enter full name"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div class="mb-4">
            <input
              type="tel"
              v-model="phoneNumber"
              placeholder="Enter phone number"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
  
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            :disabled="loading"
          >
            {{ loading ? "Submitting..." : "Submit" }}
          </button>
  
          <p v-if="errorMessage" class="text-red-500 text-center mt-2">
            {{ errorMessage }}
          </p>
          <p v-if="successMessage" class="text-green-500 text-center mt-2">
            {{ successMessage }}
          </p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        name: "",
        phoneNumber: "",
        loading: false,
        errorMessage: "",
        successMessage: "",
      };
    },
    methods: {
      async submitForm() {
        this.loading = true;
        this.errorMessage = "";
        this.successMessage = "";
  
        try {
          const response = await axios.post("https://amauwelu-voting-backend.onrender.com/create-user", {
            name: this.name,
            phoneNumber: this.phoneNumber,
          });
  
          this.successMessage = response.data.message || "Voter accredited successfully!";
          this.name = "";
          this.phoneNumber = "";
          this.$router.push("/accreditation");
        } catch (error) {
          this.errorMessage = error.response?.data?.message || "Failed to accredit voter.";
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
/* Centering container */
.center-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f3f4f6;
  padding: 20px;
}

/* Styling for content box */
.content-box {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

/* Input fields */
input {
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  margin-bottom: 1rem; /* Adds space between inputs */
}

input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
}

/* Button styles */
button {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1.5rem; /* Adds space between inputs and the button */
}

button:hover {
  background-color: #2563eb;
}

button:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}

/* Error and success messages */
.text-red-500 {
  color: #ef4444;
}

.text-green-500 {
  color: #10b981;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .content-box {
    padding: 1.5rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.25rem;
  }
}
</style>

  