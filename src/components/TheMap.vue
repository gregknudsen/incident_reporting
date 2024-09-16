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

const lat = ref(0);
const lng = ref(0);
const map = ref();
const mapContainer = ref();
const data = ref([]);

onMounted(() => {
  // Would want to generalize this location, but just using initial incident location
  map.value = L.map(mapContainer.value).setView([37.541885, -77.440624], 12);

  fileArray.forEach((location) => {
    L.marker([location.data.address.latitude, location.data.address.longitude])
      .addTo(map.value)
      .on("click", (e) => {
        // e.preventDefault();

        console.log(`You just clicked ${location.data.description.comments}`);
      });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map.value);
  });
});
</script>

<template>
  <div class="mainContainer">
    <div id="map" ref="mapContainer"></div>
    <div>
      <TheList :incidents="fileArray" id="info" />
    </div>
  </div>
</template>

<style>
.mainContainer {
  display: flex;
  /* justify-content: center; */
}

#map {
  height: 100vh;
  min-width: 1000px;
}
</style>
