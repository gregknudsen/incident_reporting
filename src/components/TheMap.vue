<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";

const lat = ref(0);
const lng = ref(0);
const map = ref();
const mapContainer = ref();

onMounted(() => {
  map.value = L.map(mapContainer.value).setView([51.505, -0.09], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map.value);
});


</script>

<template>
  <div id="map" ref="mapContainer"></div>
</template>

<style>

#map {
  height: 100vh;
  width: 1000px;
}
</style>