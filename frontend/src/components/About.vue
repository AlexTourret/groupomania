<template>
  <div class="hello">
    <h3>{{ copyright }}</h3>
   </div>
</template> 

<script>
export default {
  name: 'AboutApp',
  computed: {
    copyright() {
        const currentYear = new Date().getFullYear()
        return `Copyright Groupomania ${currentYear}`
    }
  }
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
  color: #ff8080;
}
</style>