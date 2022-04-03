<template>
  <div id="footer">
    <div class="w-100">
      <div>
        <div class="text-center">{{ year }} {{ $t('ЎЗБEКИСТОН РEСПУБЛИКАСИ БАНДЛИК ВА МEҲНАТ МУНОСАБАТЛАРИ ВАЗИРЛИГИ') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
  #footer {
    background: #3186FB;
    padding: 20px 0 20px;
    width: 100%;
    color: white!important;
    font-size: 12px;
  }
</style>
