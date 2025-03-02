<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const albums = ref([
  { title: "Album 1", color: "bg-red-500", info: "Info 1" },
  { title: "Album 2", color: "bg-blue-500", info: "Info 2" },
  { title: "Album 3", color: "bg-green-500", info: "Info 3" },
  { title: "Album 4", color: "bg-yellow-500", info: "Info 4" },
  { title: "Album 5", color: "bg-purple-500", info: "Info 5" },
]);

const scrollPosition = ref(0);
const handleScroll = (event) => {
  // Ignore vertical scroll
  if (event.deltaY !== 0) return;

  // Check for horizontal scroll (deltaX)
  const delta = event.deltaX > 0 ? 1 : (event.deltaX < 0 ? -1 : 0);
  
  // Update scroll position only if there's horizontal scroll movement
  if (delta !== 0) {
    scrollPosition.value = Math.max(0, Math.min(scrollPosition.value + delta, albums.value.length - 1));
  }
};

onMounted(() => {
  window.addEventListener("wheel", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("wheel", handleScroll);
});
</script>

<template>
  <div class="relative flex overflow-hidden w-full py-10">
    <div class="flex gap-4 mx-auto transition-transform duration-500"
      :style="`transform: translateX(-${scrollPosition * 150}px);`">
      <div 
        v-for="(album, index) in albums" :key="album.title" 
        class="relative w-40 h-40 flex items-center justify-center text-white text-lg font-bold rounded-lg shadow-lg transform transition-transform duration-500 perspective"
        :class="[album.color, { 'scale-110': index === scrollPosition }]">
        <p>{{ album.title }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.perspective {
  perspective: 1000px;
}
</style>