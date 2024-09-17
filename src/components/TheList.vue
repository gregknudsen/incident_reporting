<template>
  <div class="list-container">
    <h1>INCIDENT LIST</h1>
    <div v-for="(item, index) in props.incidents">
      <hr />
      <p>
        <span class="bold-text"> Incident No.</span>
        {{ item.data.description.incident_number }}
      </p>
      <p><span class="bold-text"> Date</span> {{ item.data.description.event_opened }}</p>
      <p><span class="bold-text"> City</span> {{ item.data.address.city }}</p>
      <p><span class="bold-text"> Address</span> {{ item.data.address.address_line1 }}</p>
      <p>
        <span class="bold-text"> Responder</span> {{ item.data.fire_department.name }}
      </p>
      <p>
        <span class="bold-text"> Incident Summary</span>
        {{ item.data.description.subtype }}
      </p>
      <div class="weather-section bg-grey">
        <p class="bold-text">Weather Info</p>
        <p>
          <span class="bold-text"> Average Temparature</span> {{ averageTemps[index] }} °F
        </p>
        <p>
          <span class="bold-text"> Average Precipitation</span>
          {{ averagePrecipitations[index] }}"
        </p>
      </div>
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
  }, 500);
});
</script>

<style>
.list-container {
  padding: 1em;
  /* overflow-y: scroll;  in case there are many incidents */
}

.weather-section p {
  margin: 0;
}
</style>
