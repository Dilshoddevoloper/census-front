<template>
  <div v-loading="true" class="bg-white w-100 h-100" />
</template>
<script lang="js">
import { mapActions } from 'vuex'
import { setToken } from '@/utils/auth'
export default {
  created() {
    this.authLogout().then((result) => {
      const query = this.$route.query
      if (query.token) {
        setToken(query.token)
        this.setUserToken(query.token)
        this.getInfo()
          .then((data) => {
            if (data['success']) {
              this.$router.push({ name: 'ChooseType' })
            }
          })
          .catch((err) => {
            this.redirectToLogin()
          })
      } else {
        this.redirectToLogin()
      }
    })
  },
  methods: {
    ...mapActions({
      getInfo: 'auth/getInfo',
      setUserToken: 'auth/setUserToken',
      authLogout: 'auth/resetToken'
    }),
    redirectToLogin() {
      // this.$store.dispatch('alert/pushError', { message: errors[401], code: 401 })
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
