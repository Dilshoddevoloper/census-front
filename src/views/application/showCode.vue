<template>
  <div class="container">
    <div  class="container d-flex justify-content-around align-items-stretch">
      <el-card class="box-card classic-style-youth">
        <p class="text-center" style="font-size: 20px; margin: 70px; font-weight: bold">
          Aризангиз қабул қилинди
        </p>
        <h6>Ҳурматли фуқаро аризангиз қабул қилинди !</h6>
        <br>
        <p>
          ИД рақам: {{ application.number }}
          <br>
          <hr>
          Код: {{ application.code }}
        </p>

        <p>Ушбу ИД рақам ва кодни сақлаб қўйинг. <br> Аризангизни текшириш жараёнида фойдаланасиз
        </p>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ApplicationsShowCode',
  computed: {
    ...mapGetters({ application: 'application/GET_APPLICATION' }),
  },
  mounted() {
    this.fetchApplication(this.$route.params.id)
  },
  methods: {
    ...mapActions({ fetchApplication: 'application/show' })
  }
}
</script>
