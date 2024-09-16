<template>
  <div class="list-container">
    <h1>THE LIST</h1>
    <div v-for="(item, index) in props.incidents">
      <p>Date: {{ item.data.description.event_opened }}</p>
      <p>City: {{ item.data.address.city }}</p>
      <p>Address: {{ item.data.address.address_line1 }}</p>
      <p>Responder: {{ item.data.fire_department.name }}</p>

      <p>Weather Info</p>
      <p>Average Temparature {{ averageTemps[index] }} F</p>
      <hr />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps(["incidents"]);
console.log("PROPS", props.incidents);
// console.log("PROPS", props.incidents[0].weather.data[0].tavg);
let averageTemps = ref([]);

onMounted(async () => {
  setTimeout(() => {
    props.incidents.forEach((incident, index) => {
      averageTemps.value.push(props.incidents[index].weather.data[0].tavg);
      // props.incidents[index].weather = result;
      console.log(incident.weather);
    });
  }, 400);
});

// onMounted(() => {
// props.incidents.forEach(async (incident, index) => {
// console.log("INCIDENT", incident);
//   const startDate = incident.data.description.event_opened.split("T")[0];
//   const endDate = incident.data.description.event_closed.split("T")[0];
//   const url = `https://meteostat.p.rapidapi.com/point/daily?units=imperial&lat=${incident.data.address.latitude}&lon=${incident.data.address.longitude}&alt=43&start=${startDate}&end=${endDate}`;
//   const options = {
//     method: "GET",
//     headers: {
//       "x-rapidapi-key": "2b26d22999msh777e3b4d45cf340p1c6b95jsn25357dbdfe0a", // Would definitely abstract this value out
//       "x-rapidapi-host": "meteostat.p.rapidapi.com",
//     },
//   };
//   try {
//     const response = await fetch(url, options);
//     const result = await response.text();
//     props.incidents[index].weather = result;
//     // props.incidents[index].weather = JSON.parse(result);
//     // weatherData.value.push(JSON.parse(result));
//   } catch (error) {
//     console.error(error);
//   }
//   console.log("1", incident);
//   console.log("2", props.incidents);
// });
// });
</script>

<style>
.list-container {
  padding: 1em;
}
</style>
