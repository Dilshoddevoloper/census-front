<template>
  <el-avatar
    v-loading="loading"
    shape="square"
    :size="150"
    fit="cover"
    :src="image"
    element-loading-background="rgba(255, 255, 255, 0.8)"
    class="lineHeightNone"
  />
</template>

<script>
export default {
  name: 'PanThumb',
  props: {
    image: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style>
  .el-avatar > img {
    height: 100%;
    width: 100%;
  }
  .lineHeightNone {
    line-height: 0px !important;
  }
</style>
