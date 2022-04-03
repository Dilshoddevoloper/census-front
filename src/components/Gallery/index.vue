<template>
  <div>
    <el-upload
      :action="mediaUrl"
      list-type="picture-card"
      name="files[]"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :headers="headers"
      :file-list="list"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
import { mediaUploadUrl, imageUrl } from '@/utils/urls'

export default {
  props: {
    medialist: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    mediaUrl() {
      return mediaUploadUrl()
    },
    headers() {
      return { 'Authorization': 'Bearer ' + getToken() }
    },
    list() {
      const list = []
      for (const i in this.medialist) {
        list[i] = {
          name: this.medialist[i].name,
          url: imageUrl(this.medialist[i]),
          response: {
            data: this.medialist[i]
          }
        }
      }
      return list
    }
  },
  methods: {
    handleRemove(file, fileList) {
      this.$emit('media:removed', file.response.data.id)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess(response, file, fileList) {
      this.$emit('media:uploaded', file.response.data.id)
    }
  }
}
</script>

<style>
.el-upload-list--picture-card .el-upload-list__item {
  width: auto !important;
}
.el-upload-list--picture-card .el-upload-list__item-thumbnail {
  width: auto !important;
  height: 150px;
}
</style>
