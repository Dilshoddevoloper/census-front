<template>
  <el-form
    ref="partyForm"
    :model="form"
    :rules="rules"
    label-position="top"
    class="top-label-custom"
  >
    <el->
      <el-divider content-position="left">{{ $t('Партияга аъзолик маълумотлари') }}</el-divider>
      <!-- <el-col :span="4">
        <el-form-item label="Ҳудуд" prop="region_id">
          <el-select v-model="form.region_id" class="w-100" filterable @change="getCities()">
            <el-option v-for="region in regions" :key="region.id" :label="region.name_cyrl" :value="region.id" />
          </el-select>
        </el-form-item>
      </el-col> -->
      <el-col :span="4" v-if="$route.query.type == 2">
        <el-form-item :label="$t('Туман(Шахар)')" prop="city_id">
          <el-select v-model="form.city_id" class="w-100" filterable>
            <el-option v-for="city in cities" :key="city.id" :label="city.name_cyrl" :value="city.id" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item :label="$t('Aъзо бўлган йили')" prop="entrance_year">
          <el-select v-model="form.entrance_year" class="w-100" filterable>
            <el-option v-for="year in years" :key="year" :label="year" :value="year"/>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="$t('Чипта рақами')" prop="ticket_number">
          <el-input v-model="form.ticket_number" :aria-placeholder="$t('Chipta raqami...')"></el-input>
        </el-form-item>
      </el-col>
    </el->
  </el-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PartyDetails',
  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      rules: {
        entrance_year: [
          { required: true, message: this.$t('Aъзо бўлган йили киритилмаган'), trigger: 'change' }
        ],
        ticket_number: [
          { required: true, message: this.$t('Чипта рақами киритилмаган'), trigger: 'change' }
        ],
        city_id: [
          { required: this.$route.query.type == 2, message: this.$t('Туман(Шахар) киритилмаган'), trigger: 'change' }
        ]
      },
      validated: false
    }
  },
  computed: {
    currentYear() {
      return String(new Date().getFullYear())
    },
    years() {
      var years = []
      for (var i = 1991; i <= this.currentYear; i++) {
        years.push(i)
      }
      return years
    },
    ...mapGetters({ user: 'auth/USER', regions: 'citizen/GET_REGIONS', cities: 'citizen/GET_CITIES' }),
  },
  created() {
    this.getCities()
  },
  methods: {
    validateForm() {
      this.$refs['partyForm'].validate((valid) => {
        this.validated = valid
      })
    },
    getCities() {
      this.fetchCities({ region_id: this.user.region_id })
    },
     ...mapActions({ fetchCities: 'citizen/cities', fetchRegions: 'citizen/regions' })
  }
}
</script>
