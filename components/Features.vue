<script setup>
const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  items: [
    {
      title: {
        type: String,
        required: false,
      },
      description: {
        type: String,
        required: false,
      },
    },
  ],
});
</script>

<template>
  <h2 class="text-3xl font-bold text-center sm:text-4xl" v-if="title">
    {{ title }}
  </h2>
  <p class="max-w-3xl mx-auto mt-4 text-lg text-center text-zinc-600" v-if="description">
    {{ description }}
  </p>
  <div class="grid gap-8 mt-10 mb-20 md:grid-cols-2">
    <div
      v-for="item of items"
      class="p-8 border-2 border-dashed rounded sm:p-12"
    >
        <h3 class="text-2xl font-semibold" v-if="item.title">{{ item.title }}</h3>
        <p class="mt-2 leading-relaxed text-zinc-500" v-if="item.description">
          {{ item.description }}
        </p>
    </div>
  </div>
</template>
