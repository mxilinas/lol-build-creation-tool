<script setup>

import { getStatsInfo, getModdedStats } from '@/utils/stats';
import { computed, watch } from "vue"

const props = defineProps({
  stats: Object,
  level: Number
});

const statsInfo = getStatsInfo(props.stats)
const moddedStats = computed(() => { return getModdedStats(statsInfo, props.level) })

console.log(props.level)

</script>

<template>
  <div v-for="(value, key) in moddedStats" :key="key">
    <span> {{ key }}</span>:
    <span> {{ value.toFixed(1) }}</span>
  </div>
</template>
