<script setup>
const props = defineProps({
  item_id: Number,
  item_info: Object,
  is_selected: Boolean
});
</script>

<template>
  <div class="item-card">
    <img :class="{ selected: is_selected }" :src="`/lol-build-creation-tool/images/item/${item_id}.png`"
      :alt="item_info.name" />
  </div>
</template>

<style scoped>
.item-card {
  max-width: 90;
  text-align: center;
  border-radius: 8px;
  overflow: hidden;
}

.item-card img {
  filter: grayscale(100%);
  cursor: pointer;
  width: 100%;
  border-radius: 8px;
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.item-card img.selected {
  border: 4px solid orange;
  box-sizing: border-box;
  filter: grayscale(0%);
}
</style>
