<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";

const lat = ref(0);
const lng = ref(0);
const map = ref();
const mapContainer = ref();
// const marker = ref();

onMounted(() => {
  map.value = L.map(mapContainer.value).setView([37.466513, -77.428683], 13);
  L.marker([37.466513, -77.428683]).addTo(map.value)
    .on("mouseover", (e) => {
      // e.preventDefault();
      
      console.log("HOVER", e);
      
    })
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map.value);

  // marker.value = L.marker([lat.value, lng.value]).addTo(map.value)
      // .on("dragend",(event)=> {
      //   console.log(event)
      // });
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