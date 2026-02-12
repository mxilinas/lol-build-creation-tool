<script setup>

  const props = defineProps({ id: String })

  import { ref, onMounted } from "vue"
  import { useRoute } from "vue-router"
  import { fetchChampionInfo } from "@/utils/championApi.ts"
  import { fetchAllItemsLocal } from "@/utils/itemsApi.ts"
  import  ItemCard  from "@/components/ItemCard.vue"

  const championId = props.id

  const champion = ref(null)
  const items = ref([])

  const loading = ref(true)
  const error = ref(null)

  onMounted(async () => {
    try {
      const championInfo = await fetchChampionInfo()
      items.value = await fetchAllItemsLocal()
      champion.value = Object.values(championInfo).find(champion => champion.id === championId)
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
      <img :src="`https://ddragon.leagueoflegends.com/cdn/16.3.1/img/champion/${champion.image.full}`" :alt="champion.name" />
    </div>

    <div class="items-container">
    <ItemCard
        v-for="(item, key) in items"
        :item_id="Number(key)"
        :item_info="item"
        :key="key"
      />
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
