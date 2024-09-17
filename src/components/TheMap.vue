<template>
  <div class="mainContainer">
    <div id="map" ref="mapContainer"></div>
    <div>
      <TheList :incidents="fileArray" id="info" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import TheList from "./TheList.vue";
import L from "leaflet";
import { getWeather } from "../api/api.service.js";

const files = import.meta.glob("../data/*", { eager: true });

const fileArray = Object.values(files).map((file) => {
  return {
    data: file.default,
  };
});

const lat = ref(0);
const lng = ref(0);
const map = ref();
const mapContainer = ref();
const data = ref([]);

onMounted(async () => {
  // Would want to generalize this location, but just using initial incident location
  map.value = L.map(mapContainer.value).setView([37.541885, -77.440624], 12);

  fileArray.forEach(async (location, index) => {
    let marker = L.marker([
      location.data.address.latitude,
      location.data.address.longitude,
    ]).addTo(map.value);

    marker.bindPopup(`
      <p>ID: ${location.data.description.incident_number}</p>
      <p>Address: ${location.data.address.address_line1}</p>
      <p>Summary: ${location.data.description.subtype}</p>
    `);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map.value);
    location.weather = await getWeather(fileArray[index]);
  });
});
</script>

<style>
.mainContainer {
  display: flex;
}

#info {
  min-width: 25%;
  justify-content: center;
}

#map {
  height: 100vh;
  min-width: 75%;
}
</style>
