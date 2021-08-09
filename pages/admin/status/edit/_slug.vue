<template>
  <FormStatus :slug=this.$route.params.slug />
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'authenticated',
}
</script>