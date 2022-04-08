<template>
  <div class="container">
    <h4 class="text-center">{{ $t('Aҳоли маълумотларини қўшиш') }}</h4>
<!--    <router-link :to="{ name:'CitizensIndex', query: { type: $route.query.type } }">-->
<!--      <el-button type="text" class="mb-1" icon="el-icon-arrow-left">{{ $t('Рўйхатга қайтиш') }}</el-button>-->
<!--    </router-link>-->
    <el-card class="box-card box-shadow">
      <personal-detail ref="personalForm" :form="form" />
      <el-col :span="24" class="d-flex justify-content-end mb-3">
        <el-button type="primary" icon="el-icon-check" :disabled="is_disable" @click="save">{{ $t('Сақлаш') }}</el-button>
      </el-col>
    </el-card>
  </div>
</template>

<script>
import PersonalDetail from './personal-details'
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'CreateCitizen',
  components: { PersonalDetail },
  data() {
    return {
      loading: true,
      is_disable: false,
      form: {
        id: '',
        passport: '',
        first_name: '',
        last_name: '',
        fathers_name: '',
        birth_date: '',
        tin: '',
        city_id: '',
        type: this.$route.query.type
      }
    }
  },
  methods: {
    save() {
      if (this.validate()) {
        this.is_disable = true
        this.storeCitizen({ data: this.form })
            .then(res => {
              if (res.success) {
                Swal.fire({
                  title: this.$t('Маълумот сақланди!'),
                  type: 'success',
                  timer: 1500,
                  showConfirmButton: false,
                  confirmButtonText: 'Давом этиш'
                })
                    .then(() => {
                      this.$router.push({ name: 'CitizensIndex', query: { type: this.$route.query.type } })
                    })
              } else if (res.error === 'Bu ma\'lumotlar bazada mavjud') {
                this.is_disable = false
                Swal.fire({
                  title: this.$t('Ушбу маълумотлар базада мавжуд!'),
                  type: 'error',
                  timer: 2000,
                  showConfirmButton: false,
                  confirmButtonText: 'Давом этиш'
                })
              }
            })
            .catch((res) => {
              this.is_disable = false
              Swal.fire({
                title: this.$t('Сервернинг ички хатолиги!'),
                type: 'error',
                timer: 2000,
                showConfirmButton: false,
                confirmButtonText: 'Давом этиш'
              })
            })
      }
    },
    validate() {
      this.$refs['personalForm'].validateForm()
      return this.$refs['personalForm'].validated
    },
    ...mapActions({
      storeCitizen: 'citizen/store',
      updateCitizen: 'citizen/update',
      setForm: 'citizen/setForm'
    })
  }
}
</script>

<style>
@keyframes zoominoutsinglefeatured {
  0% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}

.single-featured {
  animation: zoominoutsinglefeatured 0.5s forwards;
}
.swal2-title{
  font-size: 20px;
}
</style>
