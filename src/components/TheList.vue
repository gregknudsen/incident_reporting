<template>
  <div>
    <h1>THE LIST</h1>
    <div v-for="item in props.incidents">
      <!-- <pre>{{ item.data }}</pre> -->
      <p>{{ item.data.description.comments }}</p>
      <hr />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["incidents"]);
console.log("PROPS", props.incidents);
</script>
