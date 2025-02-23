<script setup>
const { data: page } = await useAsyncData("index", () =>
  queryContent("/").findOne()
);

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

definePageMeta({
  layout: "default",
});

// Import the Music Player Component
import MusicPlayer from "~/components/MusicPlayer.vue";
</script>

<template>
  <Container>
    <Hero
      :title="page.hero.title"
      :description="page.hero.description"
      :buttons="page.hero.buttons"
    ></Hero>

    <!-- 🎵 Add Music Player Below Hero Section -->

      <MusicPlayer />


    <!-- Optional: Uncomment other sections if needed -->
    <!-- <Logos :title="page.logos.title" :icons="page.logos.icons"></Logos>
    <Features
      :title="page.features.title"
      :description="page.features.description"
      :items="page.features.items"
    >
    </Features>
    <Cta
      :title="page.cta.title"
      :description="page.cta.description"
      :buttons="page.cta.buttons"
    ></Cta> -->
  </Container>
</template>