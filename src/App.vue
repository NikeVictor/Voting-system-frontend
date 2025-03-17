<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/" class="voting-stats-link">Home</RouterLink>
        <RouterLink to="/stats" class="voting-stats-link">Result</RouterLink>
        <RouterLink to="/accreditation" class="voting-stats-link">Accreditation</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  background-color: #f8f9fa; /* Optional: Set a background color for the header */
  padding: 10px 0; /* Add some padding to the header */
}

.wrapper {
  display: flex;
  justify-content: flex-end; /* Align items to the right */
  padding-top: 20px; /* Add gap from the top edge */
}

.voting-stats-link {
  text-decoration: none; /* Remove underline from the link */
  color: #007bff; /* Optional: Set link color */
  font-weight: bold; /* Optional: Make the link bold */
  margin-right: 20px
}

.voting-stats-link:hover {
  text-decoration: underline; /* Optional: Underline on hover */
}
</style>