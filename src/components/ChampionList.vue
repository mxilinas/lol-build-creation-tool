<script setup>
import { fetchFreeChampionsLocal, fetchFreeChampions } from '@/utils/championApi.js'
import ChampionCard from "@/components/ChampionCard.vue"

import { ref, onMounted } from 'vue'

async function submit() {
  savedKey.value = inputKey.value

  loading.value = true
  error.value = null

  try {
    champions.value = await fetchFreeChampions(savedKey)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }

}

// inputKey -> savedKey on submit
const inputKey = ref('')
const savedKey = ref('')

const champions = ref([])

const loading = ref(false)
const error = ref(null)

onMounted(async () => {
  try {
    champions.value = await fetchFreeChampionsLocal()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

</script>

<template>
  <div class="main">
    <p v-if="loading">Loading...</p>
    <p v-if="error">Error: {{ error }}</p>

    <form @submit.prevent="submit">
      <input v-model="inputKey" type="text" placeholder="Enter API key" />
      <button type="submit">Submit</button>
    </form>

    <div class="champion-container">
      <ChampionCard v-for="champion in champions" :champion="champion" :key="champion.id"></ChampionCard>
    </div>

  </div>
</template>


<style scoped>
.main {
  display: flex;
  flex-direction: column;
}

.champion-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
}
</style>
