<template>
    <div class="project-card">
        <div class="header">{{ title }}</div>
        <div class="language">{{ lang }}</div>
    </div>
</template>

<script>

export default {
  name : "ProjectCard",
  props: ['title', 'lang', 'link']
}

</script>

<style scoped>

.project-card {
  @apply w-full rounded-lg border-aqua border-4
  px-3 py-2 cursor-pointer mb-2 bg-dark;
}

.project-card .header {
  @apply text-2xl text-aqua
}

.project-card .language {
  @apply text-sm text-white mt-4;
}

</style>
