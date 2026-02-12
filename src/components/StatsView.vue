<script setup>

import { getStatsInfo, getModdedStats } from '@/utils/stats';
import { computed, watch } from "vue"

const props = defineProps({
  stats: Object,
  level: Number,
  selectedItems: Array,
});

const moddedStats = computed(() => {
  return getModdedStats(props.stats, props.level, props.selectedItems)
})

</script>

<template>
  <div v-for="(value, key) in moddedStats" :key="key">
    <span> {{ key }}</span>:
    <span> {{ value.toFixed(1) }}</span>
  </div>
</template>
