<template>
  <el-form
    ref="personal-form"
    label-position="top"
    class="top-label-custom"
    :model="form"
    :rules="rules"
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
                v-loading="loading === 'passport'"
                :value="form.passport"
                :class="{ 'full-input': isNumberFull }"
                suffix-icon="el-icon-check"
                type="text"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('ЖШШИР')"prop="tin">
              <el-input maxlength="14" v-model="form.tin" />
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-top: 29px;" class="d-flex justify-content-end mb-3" >
            <el-button type="primary" icon="el-icon-check" :disabled="is_disable" @click="getPassport">{{ $t('Текшириш') }}</el-button>
          </el-col>
        </el-row>
        <div v-if="ispassport">
          <el-row>
            <el-col :span="6">
            <el-form-item type="date" :label="$t('Туғилган санаси')" prop="birth_date">
              <el-input
                  v-loading="loading === 'birth_date'"
                  ref="birth_date"
                  v-model="form.birth_date"
                  v-mask="'##.##.####'"
                  placeholder="01.01.2019"
              />
            </el-form-item>
          </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Фамилия')" prop="last_name">
                <el-input v-model="form.last_name" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Исм')" prop="first_name">
                <el-input v-model="form.first_name" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Отасининг исми')" prop="fathers_name">
                <el-input v-model="form.fathers_name" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('Aддресс')" prop="address">
                <el-input v-model="form.address" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Телефон рақами')" prop="address">
                <el-input v-model="form.phone" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Ижтимоий ҳолати')" prop="social_areas_id">
                <el-select v-model="form.social_areas_id" class="w-100" filterable>
                  <el-option v-for="social in social_areas" :key="social.id" :label="social.name_cyrl" :value="social.id" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
      ispassport: false,
      rules: {
      //   passport: [
      //     { required: true, message: this.$t('Паспорт киритилмаган'), trigger: 'change' }
      //   ],
      //   birth_date: [
      //     { required: true, message: this.$t('Туғилган сана киритилмаган'), trigger: 'change' }
      //   ],
      //   first_name: [
      //     { required: true, message: this.$t('Исм киритилмаган'), trigger: 'change' }
      //   ],
      //   last_name: [
      //     { required: true, message: this.$t('Фамилия киритилмаган'), trigger: 'change' }
      //   ],
      //   fathers_name: [
      //     { required: true, message: this.$t('Отасининг исми киритилмаган'), trigger: 'change' }
      //   ],
      //   address: [
      //     { required: true, message: this.$t('Aдрес киритилмаган'), trigger: 'change' }
      //   ],
      //   tin: [
      //     { required: true, message: this.$t('ЖШШИР киритилмаган'), trigger: 'change' }
      //   ],
      //   social_areas_id: [
      //     { required: true, message: this.$t('Ижтимоий ҳолати киритилмаган'), trigger: 'change' }
      //   ]
      },
      validated: true
    }
  },
  computed: {
    ...mapGetters({
      social_areas: 'citizen/GET_SOCIAL_AREAS'
    }),
    isNumberFull() {
      return (this.form.passport.length >= 10)
    },
    isBirthDateFull() {
      return (this.form.birth_date && this.form.birth_date.length >= 10)
    },
    source() {
      return this.form.source
    }
  },
  mounted() {
    this.fetchSocialAreas()
  },
  watch: {
    'form.passport'(newVal) {
      this.form.passport = newVal.toUpperCase()
    },
    // isNumberFull(newVal, oldVal) {
    //   if (newVal && newVal !== oldVal) {
    //     this.form.source = 1
    //     this.getPassport()
    //   }
    // },
    // 'isBirthDateFull'(newVal, oldVal) {
    //   if ((newVal && newVal !== oldVal) && this.source === 2) {
    //     this.getPassportMVD()
    //   }
    // }
  },
  methods: {
    ...mapActions({
      fetchSocialAreas: 'citizen/social_areas'
    }),
    getPassport() {
      this.loading = 'passport'
      this.getPassportAction({ passport: this.form.passport, tin: this.form.tin })
        .then(res => {
          if (res.result.citizen === undefined) {
            this.$message({
              message: this.$t('Маълмот топилмади'),
              type: 'warning',
              duration: 5 * 1000,
              offset: 80
            })
          } else {
            this.ispassport = true
            this.setForm({ form: this.form, citizen: res.result.citizen })
          }
          this.loading = ''
        })
        .catch(res => {
          this.birth_date_disabled = false
          this.loading = ''
          this.form.source = 2
          this.$refs.passport.focus()
        })
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
