<template>
  <el-form
    ref="personal-form"
    label-position="top"
    class="top-label-custom"
    :rules="rules"
    :model="form"
  >
    <el-row>
      <el-divider content-position="left">{{ $t('Шахсий маълумотлар') }}</el-divider>
      <el-col :span="24">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('Паспорт')" prop="passport">
              <el-input
                ref="passport"
                v-model="form.passport"
                v-mask="'AA #######'"
                suffix-icon="el-icon-check"
                type="text"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item type="date" :label="$t('Туғилган куни')">
              <el-input
                ref="birth_date"
                v-loading="loading === 'birth_date'"
                v-model="form.birth_date"
                v-mask="'##.##.####'"
                placeholder="01.01.2019"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('Фамилия')">
              <el-input v-model="form.last_name"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('Исм')">
              <el-input v-model="form.first_name"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('Отасининг исми')">
              <el-input v-model="form.fathers_name"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('ЖШШИР')">
              <el-input v-model="form.tin" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('Aддресс')">
              <el-input v-model="form.address" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PersonalDetial',
  props: {
    form: {
      type: Object,
      default() {
        return { }
      }
    }
  },
  data() {
    return {
      loading: '',
      active: 0,
      rules: {
        passport: [
          { required: true, message: this.$t('Паспорт киритилмаган'), trigger: 'change' }
        ],
        birth_date: [
          { required: true, message: this.$t('Туғилган сана киритилмаган'), trigger: 'change' }
        ]
      },
      validated: false,
      birth_date_disabled: true,
      delaying: false
    }
  },
  computed: {
    isNumberFull() {
      return (this.form.passport.length >= 10)
    },
    isBirthDateFull() {
      return (this.form.birth_date.length >= 10)
    },
    source() {
      return this.form.source
    }
  },
  watch: {
    'form.passport'(newVal) {
      this.form.passport = newVal.toUpperCase()
    },
    isNumberFull(newVal, oldVal) {
      if ((newVal && newVal !== oldVal) && this.delaying) {
        this.getPassport()
      }
    },
    'isBirthDateFull'(newVal, oldVal) {
      if ((newVal && newVal !== oldVal) && this.delaying) {
        this.getPassportMVD()
      }
    }
  },
  mounted() {
    setTimeout(() => this.delaying = true, 500)
  },
  methods: {
    // getPassport() {
    //   this.loading = 'passport'
    //   this.getPassportAction({ passport: this.form.passport, birth_date: '' })
    //     .then(res => {
    //       if (res.result.citizen !== undefined) {
    //         this.setForm({ form: this.form, citizen: res.result.citizen })
    //       } else {
    //         this.clearForm()
    //         this.birth_date_disabled = false
    //         this.loading = ''
    //         this.form.source = 2
    //         this.$refs.passport.focus()
    //       }
    //       this.loading = ''
    //     })
    //     .catch(res => {
    //       this.clearForm()
    //       this.birth_date_disabled = false
    //       this.loading = ''
    //       this.form.source = 2
    //       this.$refs.passport.focus()
    //     })
    // },
    // getPassportMVD() {
    //   this.loading = 'birth_date'
    //   this.getPassportAction({ passport: this.form.passport, birth_date: this.form.birth_date })
    //     .then(res => {
    //       if (res.result.citizen.pAnswereMessage === 'Берилган критериялар бўйича фуқаро топилмади' || res.result.pAnswereMessage === 'Излашда базада ҳато' || res.result.citizen.pAnswereMessage === 'Излаш критерияларини текширида ҳато') {
    //         this.$message({
    //           message: this.$t('Маълмот топилмади'),
    //           type: 'warning',
    //           duration: 5 * 1000,
    //           offset: 80
    //         })
    //       } else {
    //         this.setMvdForm({ form: this.form, citizen: res.result.citizen })
    //       }
    //       this.loading = ''
    //     })
    //     .catch(res => {
    //       console.log(res)
    //       this.$message({
    //         message: this.$t('Маълмот топилмади'),
    //         type: 'warning',
    //         duration: 5 * 1000,
    //         offset: 80
    //       })
    //     })
    //     .finally(() => {
    //       this.loading = ''
    //     })
    // },
    clearForm() {
      this.form.birth_date = ''
      this.form.first_name = ''
      this.form.last_name = ''
      this.form.fathers_name = ''
      this.form.address = ''
      this.form.tin =''
    },
    validateForm() {
      this.$refs['personal-form'].validate((valid) => {
        this.validated = valid
      })
    },
    ...mapActions({
      getPassportAction: 'citizen/passport',
      setForm: 'citizen/setForm',
      setMvdForm: 'citizen/setMvdForm'
    })
  }
}
</script>
