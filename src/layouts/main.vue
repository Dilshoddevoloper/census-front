<template>
  <div>
    <Header />
    <div class="m-2 m-md-5 mt-120">
      <router-view />
    </div>
  </div>
</template>
<script>
import Header from './components/header'
export default {
  name: 'Main',
  components: { Header }
}
</script>

<style>
  .mt-120 {
    margin-top: 140px!important;
  }
</style>
