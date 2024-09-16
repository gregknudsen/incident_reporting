<script setup>
import { onMounted, ref } from "vue";
import TheList from "./TheList.vue";
import L from "leaflet";
const files = import.meta.glob("../data/*", { eager: true });

const fileArray = Object.values(files).map((file) => {
  return {
    data: file.default,
  };
});

console.log(fileArray);

const lat = ref(0);
const lng = ref(0);
const map = ref();
const mapContainer = ref();
const data = ref([]);

onMounted(() => {
  map.value = L.map(mapContainer.value).setView([37.466513, -77.428683], 13);
  L.marker([37.466513, -77.428683])
    .addTo(map.value)
    .on("mouseover", (e) => {
      // e.preventDefault();

      console.log("HOVER", e);
    });
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map.value);
});
</script>

<template>
  <div class="mainContainer">
    <div id="map" ref="mapContainer"></div>
    <TheList incidents="fileArray" id="info" />
  </div>
</template>

<style>
.mainContainer {
  display: flex;
}

#map {
  height: 100vh;
  width: 1000px;
}
</style>
