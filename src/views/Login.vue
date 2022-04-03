<template>
  <div style="min-height: 60vh" class="d-flex justify-content-around align-items-stretch">
    <div class="container d-flex justify-content-around align-items-stretch">
      <el-card
        v-loading="code != '' || loading"
        class="box-card classic-style"
      >
        <p class="text-center" style="font-size: 20px; margin: 0 0 20px;">
          {{ $t('Логин ва паролни киритинг') }}
        </p>
        <el-row>
          <el-form
            ref="login-form"
            :label-position="'top'"
            label-width="100px"
            class="login-form-custom"
          >
            <el-form-item :label="$t('Логин')" class="mb-2">
              <input v-model="form.login" @keyup.enter="checkFieldsFilled()" />
            </el-form-item>
            <el-form-item :label="$t('Парол')" class="mb-0">
              <input v-model="form.password" type="password" @keyup.enter="checkFieldsFilled()">
            </el-form-item>
          </el-form>
        </el-row>
        <hr>
        <el-row>
          <el-button type="primary" class="w-100" style="font-size: 18px; " icon="el-icon-right" @click="submitLogin()">{{('Кириш')}}</el-button>
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      form: {
        login: '',
        password: ''
      }
    }
  },
  computed: {
    code() {
      return this.$route.query.code || ''
    }
  },
  methods: {
    ...mapActions({ loginKadrlar: 'auth/loginKadrlar', login: 'auth/login' }),
    submitLogin() {
      this.loading = true
      this.login(this.form)
        .then(res => {
          this.$router.push({ name: 'CitizensIndex' })
        })
        .catch(err => {
          this.showLoginError(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    checkFieldsFilled() {
      if (this.validate()) {
        this.submitLogin()
      } else {
        this.showLoginError('empty')
      }
    },
    validate() {
      return !!((this.form.login.length > 0 && this.form.password.length > 0))
    },
    showLoginError($type) {
      var message
      if ($type === 'empty') {
        message = this.$t('Логин ёки парол киритилмади')
      } else {
        message = this.$t('Логин ёки парол хато')
      }
      this.$message({
        message: message,
        type: 'error',
        duration: 5 * 1000,
        offset: 80
      })
    }
  }
}
</script>
<style scoped>
  .box-card {
    display: block;
    width: 480px;
    margin: auto;
  }
</style>
