<template>
  <el-row>
    <el-col :span="24">
      <pan-thumb :image="image" :loading="loading" />
      <el-button type="primary" style="width: 150px;" @click="imagecropperShow=true">Upload <i class="el-icon-upload el-icon-right" /></el-button>
      <image-cropper
        v-show="imagecropperShow"
        :key="imagecropperKey"
        :width="300"
        :height="300"
        :field="'files[]'"
        :headers="headers"
        :url="mediaUrl"
        lang-type="en"
        @close="close"
        @crop-upload-success="cropSuccess"
        @crop-upload-starting="loading=true"
      />
    </el-col>
  </el-row>

</template>

<script>

import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import { getToken } from '@/utils/auth'
import { mediaUploadUrl } from '@/utils/urls'

export default {
  name: 'CoverImageUploader',
  components: { ImageCropper, PanThumb },
  props: {
    image: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      loading: false
    }
  },
  computed: {
    headers: function() {
      return { 'Authorization': 'Bearer ' + getToken() }
    },
    mediaUrl() {
      return mediaUploadUrl()
    }
  },
  methods: {
    cropSuccess(resData) {
      this.loading = false
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.$emit('image:uploaded', resData)
    },
    close() {
      this.imagecropperShow = false
    },
    setLoading() {
      this.loading = true
    }
  }
}
</script>
