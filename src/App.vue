<script setup>
import TheMap from "./components/TheMap.vue";
</script>

<template>
  <div class="text-center">
    <h1>Incident Reports</h1>
    <h3>Click on each marker for more detailed information</h3>
  </div>
  <main>
    <TheMap />
  </main>
</template>

<style>
main {
  height: 800px;
}

.text-center {
  text-align: center;
}
</style>
