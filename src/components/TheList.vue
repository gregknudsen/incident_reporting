<template>
  <div class="list-container">
    <h1>INCIDENT LIST</h1>
    <div v-for="(item, index) in props.incidents">
      <p>Date: {{ item.data.description.event_opened }}</p>
      <p>City: {{ item.data.address.city }}</p>
      <p>Address: {{ item.data.address.address_line1 }}</p>
      <p>Responder: {{ item.data.fire_department.name }}</p>

      <p class="bold-text">Weather Info</p>
      <p>Average Temparature {{ averageTemps[index] }} °F</p>
      <p>Average Precipitation {{ averagePrecipitations[index] }}"</p>
      <hr />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps(["incidents"]);
console.log("PROPS", props.incidents);
let averageTemps = ref([]);
let averagePrecipitations = ref([]);

onMounted(async () => {
  // artificial use of setTimeout to sync weather data with incident data
  setTimeout(() => {
    props.incidents.forEach((incident, index) => {
      averageTemps.value.push(props.incidents[index].weather.data[0].tavg);
      averagePrecipitations.value.push(props.incidents[index].weather.data[0].prcp);
    });
  }, 400);
});
</script>

<style>
.list-container {
  padding: 1em;
}
</style>
