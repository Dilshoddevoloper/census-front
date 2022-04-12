<template>
  <div>
    <div v-if="!isShow" class="container d-flex justify-content-around align-items-stretch">
      <el-card class="box-card classic-style-youth">
        <p class="text-center" style="font-size: 20px; margin: 70px;">
          Ariza holatini tekshirish
        </p>
        <hr>
        <el-row>
          <el-form
            ref="application-check-form"
            :rules="rules"
            :model="form"
            :label-position="'top'"
            label-width="100px"
            class="login-form-custom"
          >
            <el-form-item label="Ariza ID raqami" prop="number" class="mb-2">
              <input v-model="form.number" v-mask="'########'" type="number">
            </el-form-item>
            <el-form-item label="Tekshirish kodi" prop="code" class="mb-0">
              <input v-model="form.code" v-mask="'#####'" type="number">
            </el-form-item>
          </el-form>
        </el-row>
        <hr>
        <el-row>
          <el-button
            type="primary"
            class="w-100 btn-youth-color"
            style="font-size: 18px; "
            :loading="isLoading"
            @click="applicationCheck()"
          >Tekshirish</el-button>
        </el-row>
      </el-card>
    </div>

    <div v-if="isShow" class="container containerDesktop">
      <div class="applicationCheckTable">
        <div class="applicationCheckBackButton" @click="backRoute()">
          &#8592; Orqaga qaytish
        </div>
        <p class="text-center" style="color: #004A80;font-size: 32px; margin: 32px 0 32px;"> {{ application.fullname }} </p>
        <div class="hrLine" />
        <div>
          <table class="tableAppCheck" width="918px">
            <tr>
              <td><b>Manzil:</b></td>
              <td>{{ application.address }}</td>
            </tr>
            <tr>
              <td><b>Ariza holati:</b></td>
              <td>{{ (application.status == 1 ) ? '"Yoshlar daftari" ga muvaffaqiyatli kiritildingiz' :
                (application.status == 2 ? 'Sizning "Yoshlar daftari" ga kirish to\'g\'risidagi arizangiz rad etildi' :
                  'Sizning "Yoshlar daftari" ga kirish to\'g\'risidagi arizangiz mutaxassislar tomonidan ko\'rib chiqilyapti') }}</td>
            </tr>
            <tr v-if="application.status == 2">
              <td><b>Rad etish sababi:</b></td>
              <td>{{ application.application_deny_reason ? application.application_deny_reason.name : '-' }}</td>
            </tr>
            <tr v-if="application.status == 2">
              <td><b>Izoh:</b></td>
              <td>{{ application.deny_reason }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'
export default {
  name: 'AppCheck',
  data() {
    return {
      isLoading: false,
      isShow: false,
      form: {
        code: '',
        number: ''
      },
      application: {
        fullname: '',
        address: '',
        status: null,
        confirmed_by_name: '',
        confirmed_at: '',
        deny_reason: '',
        application_deny_reason: null,
        comment: ''
      },
      rules: {
        number: [
          { required: true, message: 'ID ni kiriting', trigger: 'change' }
        ],
        code: [
          { required: true, message: 'Kodni kiriting', trigger: 'change' }
        ]
      },
      validated: false
    }
  },

  computed: {
    ...mapGetters({ user: 'auth/USER', regions: 'application/GET_REGIONS' })
  },
  watch: {
    'isBirthDateFull'(newVal, oldVal) {
      if ((newVal && newVal !== oldVal) && this.source === 2) {
        this.getCitizenMVD()
      }
    }

  },
  methods: {
    clearForm() {
      this.form.code = ''
      this.form.number = ''
    },
    backRoute() {
      this.$router.push({ name: 'ApplicationCheckYouth' })
      this.isShow = false
    },
    applicationCheck() {
      if (this.validateForm()) {
        this.isLoading = true
        this.checkStatusApplication(this.form).then(res => {
          if (res.result.application) {
            this.isShow = true
            const application = res.result.application
            this.application.status = application.status
            this.application.fullname = [application.surname, application.firstname, application.patronymic].join(' ')
            this.application.address = (application.region ? application.region.name_uz : '') + ', ' + (application.city ? application.city.name_uz : '') + ', ' + (application.makhalla ? application.makhalla.name : '') + ', ' + (application.makhalla ? application.makhalla.city_sector + '-sektor' : '')
            this.application.confirmed_by_name = application.confirmed_by_name
            this.application.confirmed_at = application.confirmed_at ? application.confirmed_at.split('-').reverse().join('.') : '-'
            this.application.deny_reason = application.deny_reason ? application.deny_reason : '-'
            this.application.application_deny_reason = application.application_deny_reason
          } else {
            Swal.fire({
              title: 'Ma\'lumot topilmadi. ID yoki kodni tekshirib qaytadan kiriting',
              type: 'error',
              timer: 4000,
              showConfirmButton: true,
              confirmButtonText: 'Qaytadan kiritish'
            })
          }
          this.isLoading = false
        })
          .catch(() => {
            this.isLoading = false
            this.$message({
              type: 'error',
              message: 'Ma\'lumot topilmadi.',
              duration: 3000
            })
          })
      }
    },
    validateForm() {
      this.$refs['application-check-form'].validate((valid) => {
        this.validated = valid
      })
      return this.validated
    },
    ...mapActions({
      checkStatusApplication: 'application/checkStatusApplication',
      fetchCities: 'resource/getCities'
    })
  }
}
</script>
<style scoped>
  .applicationCheckTable{
    flex-direction: column;
    align-items: flex-start;
    padding: 24px 0px;
    position: static;
    width: 1108px;
    min-height: 497px;
    left: 166px;
    top: 222px;
    background: #FFFFFF;
    border-radius: 4px;
    flex: none;
    order: 1;
    flex-grow: 0;
    margin: 88px 0px;
  }
  .applicationCheckTableMobile{
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 12px 24px;
    position: static;
    width: 290px;
    min-height: 404px;
    left: 15px;
    top: 108px;
    background: #FFFFFF;
    border-radius: 8px;
    flex: none;
    order: 1;
    flex-grow: 0;
    margin: 32px auto;
  }
  .applicationCheckBackButton {
    position: static;
    width: 170px;
    height: 24px;
    left: 70px;
    top: 0px;
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.2px;
    color: #0083FC;
    flex: none;
    order: 1;
    flex-grow: 0;
    margin: 0px 6px;
  }
  .applicationCheckBackButtonMobile {
    position: static;
    width: 100px;
    height: 17px;
    left: 24px;
    top: 0.5px;

    /* Small Medium */

    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 17px;
    /* identical to box height, or 142% */

    text-align: center;
    letter-spacing: 0.2px;

    /* color/blue */

    color: #0083FC;

    /* Inside Auto Layout */

    flex: none;
    order: 1;
    flex-grow: 0;
    margin: 0px 6px;
  }
  .hrLine{
    width: 1108px;
    height: 0px;
    left: 0px;
    top: 72px;
    opacity: 0.2;
    border: 1px solid #66BFFF;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
    margin: 32px 0px;
  }
  table, td, th {
    border: 1px solid #99D4FF;
    text-align: left;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    padding: 24px;
  }
  .tableAppCheck{
    margin: 24px 95px 24px 95px;
    width: 918px;
  }
  .checkLabelMobile{
    width: 120px;
    height: 14px;
    left: 0px;
    top: 0px;

    /* 10PX Medium */

    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    /* identical to box height, or 140% */

    letter-spacing: 0.2px;
    font-feature-settings: 'pnum' on, 'lnum' on;

    /* $-gray/$-gray-400 */

    color: #858585;

    /* Inside Auto Layout */

    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 6px 0px;
  }
</style>
