<script setup>
const props = defineProps({
  item_id: Number,
  item_info: Object
});

const selectItem = () => {

}
</script>

<template>
  <div class="item-card">
    <img :src="`/images/item/${item_id}.png`" :alt="item_info.name"
      style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;" />
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
  cursor: pointer;
  width: 100%;
  border-radius: 8px;
}
</style>
