<script setup>

const props = defineProps({ id: String })

import { ref, onMounted } from "vue"
import StatsView from "@/components/StatsView.vue"
import { fetchChampionInfo } from "@/utils/championApi.ts"
import { fetchAllItemsLocal } from "@/utils/itemsApi.ts"
import ItemCard from "@/components/ItemCard.vue"

const championId = props.id
const champion = ref(null)

const items = ref([])

const level = ref(1)

const selectedItems = ref([])

function toggleSelect(item) {
  const index = selectedItems.value.findIndex(i => i.name === item.name)
  if (index === -1) {
    selectedItems.value.push(item)
  } else {
    selectedItems.value.splice(index, 1)
  }
}

const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const championInfo = await fetchChampionInfo()
    const itemData = await fetchAllItemsLocal()
    items.value = itemData

    champion.value = Object.values(championInfo).find(c => c.id === championId)

    if (!champion.value) throw new Error("Champion not found!")


  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

</script>

<template>
  <div>
    <p v-if="loading">Loading champion...</p>
    <p v-if="error">Error: {{ error }}</p>

    <div v-if="champion">
      <h1>{{ champion.name }}</h1>
      <h2>{{ champion.title }}</h2>
      <img :src="`https://ddragon.leagueoflegends.com/cdn/16.3.1/img/champion/${champion.image.full}`"
        :alt="champion.name" />
    </div>

    <div>
      <label for="level">Level: {{ level }}</label>
      <input type="range" id="level" v-model="level" :min="1" :max="30" />
    </div>

    <div class="stats-container">
      <StatsView v-if="champion && champion.stats" :stats="champion.stats" :level="Number(level)"
        :selectedItems="selectedItems">
      </StatsView>
    </div>

    <div class="items-container">
      <ItemCard v-for="(item, key) in items" :item_id="Number(key)" :item_info="item" :key="key"
        @click="toggleSelect(item)" :is_selected="selectedItems.includes(item)" />
    </div>

  </div>
</template>


<style scoped>
.items-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
}
</style>
