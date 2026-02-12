<script setup>
const props = defineProps({
  champion: Object
})
</script>

<template>
  <div class="champion-card">
    <li>{{ champion.name }}</li>
    <img :src="`https://ddragon.leagueoflegends.com/cdn/16.3.1/img/champion/${champion.image.full}`"
      :alt="champion.name" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;" />
  </div>
</template>


<style scoped>
.champion-card {
  width: 120px;
  text-align: center;
  border-radius: 8px;
  overflow: hidden;
}

.champion-card img {
  width: 100%;
  border-radius: 8px;
}
</style>
