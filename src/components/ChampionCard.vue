<script setup>
import { useRouter } from "vue-router"

const props = defineProps({
  champion: Object
})

const router = useRouter()

const goToChampion = () => {
  router.push(`/champion/${props.champion.id}`)
}

</script>

<template>
  <div class="champion-card" @click="goToChampion">
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
  cursor: pointer;
  width: 100%;
  border-radius: 8px;
}
</style>
