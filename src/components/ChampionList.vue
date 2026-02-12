<script setup>
import { fetchFreeChampions } from '@/utils/championApi.js'
import ChampionCard from "@/components/ChampionCard.vue"

import { ref, onMounted } from 'vue'

const freeChampions = ref([])

const loading = ref(false)
const error = ref(null)

onMounted(async () => {
  loading.value = true
  error.value = null

  try {
    freeChampions.value = await fetchFreeChampions()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

</script>

<template>
  <div>
    <p v-if="loading">Loading...</p>
    <p v-if="error">Error: {{ error }}</p>

    <div class="champion-container">
        <ChampionCard
            v-for="champion in freeChampions"
            :champion="champion"
            :key="champion.id"
        ></ChampionCard>
    </div>

  </div>
</template>


<style scoped>
.champion-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
}
</style>
