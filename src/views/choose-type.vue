<template>
  <div clas="h-100">
    <el-row>
     <el-row>
      <el-col :span="24" class="text-center">
        <h5>
          Ўзбекистон Республикаси Бандлик ва меҳнат муносабатлари вазирлиги<br> Ташқи меҳнат миграцияси масалалари агентлигининг <br>«Ягона миллий миграция тизими» га хуш келибсиз
        </h5>
      </el-col>
    </el-row>
      <el-row class="d-flex justify-content-around mt-100">
        <el-row>
          <el-col :xs="24" :sm="12" :lg="12" :xl="12" class="mr-10" style="padding-right:40px">
            <el-col :span="24" class="p-5" >
              <el-card class="box-card classic-style">
                <el-row class="mb-2 text-center">
                  <div class="m-1 router-link" style="font-size:18x"> <b>{{ $t('Шахсий мобил рақамингизни киритинг') }}</b></div> <br><br>
                </el-row>
                <el-input class="el-input" v-mask="'#########'" placeholder="Шахсий мобил рақамингизни киритинг" v-model="data.phone" >
                  <template slot="prepend">+998</template>
                </el-input>
                <el-row>
                  <el-button @click="showPassword()" type="primary" class="w-100">{{ $t('Юбориш') }}</el-button>
                </el-row>
                <el-input v-if="loaded" style="margin-top: 20px;  width: 130px;" v-mask="'#####'" placeholder="Кодни киритинг" v-model="data.code"></el-input>
                <el-button v-if="loaded" @click="confirmation" type="primary" class="w-100">{{ $t('Тасдиқлаш') }}</el-button>
              </el-card>
            </el-col>
          </el-col>
        </el-row>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'ChooseType',
  data() {
    return {
      data: {
        phone: '',
        checkCode: '',
        is_confirmed: false,
      },
      dialogVisible: false,
      input: '',
      // checkCode: '',
      // phone: '',
      loaded: false
    }
  },
  methods: {
    ...mapActions({
      fetchPhone: 'application/phone',
      confirmAction: 'application/confirm',
    }),
    showPassword(){
      this.loaded = true
      this.dialogVisible = true
      this.fetchPhone('+998' + this.data.phone)
    },
    confirmation() {
      if (!this.data.code) {
        this.$message.error('Kodni kiriting!')
        return false
      }
      this.loading = 'code'
      this.confirmAction({ phone: '+998' + this.data.phone, code: this.data.code }).then((res) => {
        if (res.success) {
          this.data.is_confirmed = true
          this.confirmDialog = false
          this.$router.push({ name: 'ApplicationsCreate'})
          // this.$message.success('Muvaffaqiyatli tasdiqlandi!')
          this.$emit('phoneSuccess', true)
        } else {
          this.$message.error('Kod mos emas!')
        }
      }).catch((res) => {
        this.$message.error('Kod mos emas!')
      }).finally(() => {
        this.loading = ''
      })
    },
  }
}
</script>
<style scoped>

  .box-card{
    border-radius: 10px;
    width: 450px !important;
    margin: 0 auto !important;
  }
  .router-link:hover{
    text-decoration: none !important;
  }
  a:hover {
    text-decoration: none !important;
  }
  .large-icon{
    font-size: 80px;
  }
  .mt-100 {
    margin-top: 80px;
  }
  .mt-200 {
    margin-top: 240px;
  }
  .el-input{
    margin-bottom: 20px;
  }
</style>

