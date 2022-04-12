<template>
  <div class="container">
    <h4 class="text-center">{{ $t('Aҳоли маълумотларини қўшиш') }}</h4>
    <el-card class="box-card box-shadow">
      <personal-detail ref="personalForm" :form="form" />
      <el-col :span="24" class="d-flex justify-content-end mb-3">
        <el-button type="primary" icon="el-icon-check"  @click="save">{{ $t('Сақлаш') }}</el-button>
      </el-col>
    </el-card>
  </div>
</template>

<script>
import PersonalDetail from './personal-details'
import {mapActions, mapGetters} from 'vuex'
import Swal from 'sweetalert2'
import {phone} from "../../../api/application";

export default {
  name: 'CreateApplication',
  components: { PersonalDetail },
  data() {
    return {
      loading: true,
      is_disable: false,
      id: '',
      form: {
        id: '',
        passport: '',
        first_name: '',
        last_name: '',
        fathers_name: '',
        birth_date: '',
        tin: '',
        region_id: '',
        city_id : '',
        social_areas_id: '',
        phone: '',
        type: this.$route.query.type
      }
    }
  },
  computed: {
    ...mapGetters({
      phone: 'application/GET_PHONE'
    })
  },
  methods: {
    ...mapActions({
      applicationShow: 'application/show',
    }),
    save() {
      this.dialogVisible = true;
      if (this.validate()) {
        this.form.phone = this.phone
        this.storeApplication({ data: this.form })
          .then(res => {
            if (res.success) {
              this.id = this.form.id
              this.$router.push({ name: 'ApplicationsShowCode', params: { id: res.result.citizen.id }})
              Swal.fire({
                title: this.$t('Маълумот сақланди!'),
                type: 'success',
                timer: 1500,
                showConfirmButton: false,
                confirmButtonText: 'Давом этиш'
              })
            }
            else if (res.error === 'Bu ma\'lumotlar bazada mavjud') {
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
      storeApplication: 'application/store',
      updateApplication: 'application/update',
      setForm: 'application/setForm'
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
