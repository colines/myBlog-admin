<template>
  <div class="home">
    <Nav></Nav>
    <Header></Header>
    <routerView></routerView>
  </div>
</template>

<script>
  import Nav from './components/Nav'
  import Header from './components/Header'
  export default {
    components: {
      Nav,
      Header,
    }

  }

</script>

<style scoped>

</style>
