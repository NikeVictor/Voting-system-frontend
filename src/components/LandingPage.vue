<template>
    <div class="center-container">
      <div class="content-box">
        <h1>Welcome to</h1>
        <h2>Amauwelu Amogwu Aku Election</h2>
        <p>Enter your accredited phone number to start voting.</p>
        <form @submit.prevent="checkVotingStatus">
        <input
          v-model="phoneNumber"
          type="text"
          placeholder="Enter phone number"
          class="input-box"
          required
        />
        <button
          type="submit"
          class="vote-button"
        >
          Start Voting
        </button>
      </form>
      <p v-if="errorMessage" class="text-red-500 text-center mt-3">{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
import axios from "axios";

export default {
  data() {
    return {
      phoneNumber: "",
      errorMessage: ""
    };
  },
  methods: {
    async checkVotingStatus() {
      try {
        const response = await axios.get(`https://amauwelu-voting-backend.onrender.com/check-vote`, {
      params: {
        phoneNumber: this.phoneNumber
      }
        });
        if (response.data.hasVoted) {
          this.errorMessage = "You have already voted!";
        } else {
          this.$router.push({ name: "VotingPage", query: { phoneNumber: this.phoneNumber } });
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
      this.errorMessage = error.response.data.message; 
    } else {
      this.errorMessage = "An error occurred. Please try again.";
    }
      }
    }
  }
};
</script>

  <style scoped>
  .center-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh; 
      background-color: #f3f4f6;
      padding: 20px;
  }
  
  .content-box {
      background: white;
      padding: 40px; /* Increased padding */
      border-radius: 10px;
      text-align: center;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      width: 90%; /* Adjust width for responsiveness */
      max-width: 500px; /* Set a max width */
  }
  
  .input-box {
      width: 60%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-top: 20px; /* Adds space between input and button */
  }
  
  .vote-button {
      width: 65%;
      padding: 10px;
      margin-top: 10px; /* Adjust space between input and button */
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
  }
  
  .vote-button:hover {
      background-color: #0056b3;
  }

  @media (max-width: 400px) {
  .content-box {
    padding: 30px; /* Reduce padding on very small screens */
  }

  .input-box, .vote-button {
    font-size: 14px; /* Adjust font size for smaller screens */
  }
    }
  </style>
  