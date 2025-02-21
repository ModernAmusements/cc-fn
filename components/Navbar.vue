<script setup>
const menuitems = [
  {
    title: "Sign up",
    url: "https://app.netlify.com/signup",
  },
  {
    title: "Log in",
    url: "https://app.netlify.com/login",
  },
];
</script>

<template>
  <Container>
    <header class="flex flex-row flex-wrap items-center justify-between my-4 gap-x-6 gap-y-4">
      <div class="flex items-center justify-between">
        <a href="/" class="text-2xl"
          ><span class="font-bold text-zinc-800"><span class="text-green-500"></span>MA™ 2025</span>
        </a>
      </div>
      <nav class="flex w-auto">
        <img
        class="rounded-lg"
        src="~/assets/img/hero.png"
        alt="Nuxt image"
        loading="eager"
        format="avif"
        width="50"
        height="50"
      />
      </nav>
    </header>
  </Container>
</template>
