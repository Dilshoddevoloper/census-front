<template>
  <div class="container">
    <h4 class="font-weight-bold">{{ title }}</h4>
    <div class="bg-white box-shadow p-4" v-loading="!loaded">
      <el-button v-if="user.role_id === 1 || user.role_id === 2" type="success"
                 class="float-right mb-4 font-weight-bold" icon="el-icon-download" :loading="isLoading"
                 @click="exportToXlsx()">{{ $t('Юклаб олиш') }}
      </el-button>
      <router-link :to="{name: 'Report'}">
        <el-button v-if="user.role_id === 1 || user.role_id === 2" type="success"
                   class="float-right mb-4 font-weight-bold" icon="el-icon-download">{{ $t('Ҳисобот') }}
        </el-button>
      </router-link>
      <template v-if="user.role_id === 3">
        <router-link :to="{name: 'CitizensCreate', query: { type: $route.query.type } }">
          <el-button type="success" class="float-right mb-4 font-weight-bold" icon="el-icon-plus">{{ $t('Aъзо қўшиш') }}
          </el-button>
        </router-link>
      </template>
      <el-table v-if="loaded" class="mb-1 mx-auto table-custom" :data="citizens" border>
        <el-table-column label="№" width="50" type="index" :index="indexMethod" fixed/>
        <el-table-column label="" width="220" prop="region">
          <template slot="header">
            <p>{{ $t('Ҳудуд') }}</p>
            <select v-model="filter.region_id" class="w-170" style="height: 28px" @change="sendFilterRegion">
              <option :value="null">{{ $t('Барчаси') }}</option>
              <template v-if="user.role_id === 1">
                <option v-for="region in regions" :value="region.id" @keyup="sendFilter">{{ region.name_cyrl }}</option>
              </template>
            </select>
          </template>
          <template slot-scope="scope">
            <p>{{ (scope.row.region && scope.row.region.name_cyrl) ? scope.row.region.name_cyrl : '---' }}</p>
          </template>
        </el-table-column>
        <el-table-column width="146" prop="city">
          <template slot="header">
            <p>{{ $t('Туман(Шахар)') }}</p>
            <select v-model="filter.city_id" class="w-100" @change="sendFilter" style="height: 28px">
              <option :value="null">{{ $t('Барчаси') }}</option>
              <template v-if="user.role_id === 1 || user.role_id === 2">
                <option v-for="city in cities" :value="city.id" @keyup="sendFilter">{{ city.name_cyrl }}</option>
              </template>
            </select>
          </template>
          <template slot-scope="scope">
            <p>{{ (scope.row.city && scope.row.city.name_cyrl) ? scope.row.city.name_cyrl : '---' }}</p>
          </template>
        </el-table-column>
        <el-table-column label="" width="300" prop="region">
          <template slot="header">
            <p>{{ $t('Ижтимоий ҳолати') }}</p>
            <select v-model="filter.social_areas_id" class="w-170" style="height: 28px" @change="sendFilter">
              <option :value="null">{{ $t('Барчаси') }}</option>
              <template>
                <option v-for="social in social_areas" :value="social.id" @keyup="sendFilter">{{
                    social.name_cyrl
                  }}
                </option>
              </template>
            </select>
          </template>
          <template slot-scope="scope">
            <p>{{
                (scope.row.social_areas && scope.row.social_areas.name_cyrl) ? scope.row.social_areas.name_cyrl : '---'
              }}</p>
          </template>
        </el-table-column>
        <el-table-column width="160">
          <template slot="header">
            <p>{{ $t('Фамиляси') }}</p>
            <input v-model="filter.last_name" class="form-control form-control-sm w-100">
          </template>
          <template slot-scope="scope">
            <router-link :to="{ name:'CitizensShow', params:{id: scope.row.id}, query: {type:  $route.query.type } }">
              {{ scope.row.last_name }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column width="120">
          <template slot="header">
            <p>{{ $t('Исми') }}</p>
            <input v-model="filter.first_name" class="form-control form-control-sm w-100">
          </template>
          <template slot-scope="scope">
            {{ scope.row.first_name }}
          </template>
        </el-table-column>
        <el-table-column width="140">
          <template slot="header">
            <p>{{ $t('Отасининг исми') }}</p>
            <input v-model="filter.fathers_name" class="form-control form-control-sm w-100">
          </template>
          <template slot-scope="scope">
            {{ scope.row.fathers_name }}
          </template>
        </el-table-column>

        <el-table-column prop="passport" width="120">
          <template slot="header">
            <p>{{ $t('Паспорт') }}</p>
            <input v-model="filter.passport" class="form-control form-control-sm w-100">
          </template>
        </el-table-column>
        <el-table-column width="120">
          <template slot="header">
            <el-button class="mt-3" type="primary" size="mini" @click="sendFilter()">{{ $t('Қидириш') }}</el-button>
          </template>
          <template v-if="user.role_id == 3" slot-scope="scope">
            <router-link :to="{ name:'CitizensEdit', params:{id: scope.row.id} }">
              <el-button size="mini" type="info">{{ $t('Таҳрирлаш') }}</el-button>
            </router-link>
            <el-button size="mini" class="m-1" type="danger" @click="deleteCitizen(scope.row.id)">{{
                $t('Ўчириш')
              }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          background
          :total="filter.total"
          :page-size="1 * filter.limit"
          layout="prev, pager, next"
          class="mt-3"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {parseTime} from '@/utils/'
import {toXlsx} from '@/utils/exports'
import Swal from 'sweetalert2'

export default {
  name: 'CitizenIndex',
  data() {
    return {
      filter: {
        last_name: '',
        first_name: '',
        fathers_name: '',
        region_id: null,
        city_id: null,
        social_areas_id: null,
        passport: '',
        tin: null,
        limit: 0,
        page: 0,
        total: null
      },
      loaded: false,
      columns: [
        {
          label: this.$t('ФИО'),
          field: 'full_name'
        },
        {
          label: this.$t('Паспорт'),
          field: 'passport'
        },
        {
          label: this.$t('ЖШШИР'),
          field: 'tin'
        }
      ],
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      citizens: 'citizen/GET_CITIZENS',
      citizens_pagination: 'citizen/GET_CITIZENS_PAGINATION',
      user: 'auth/USER',
      regions: 'citizen/GET_REGIONS',
      cities: 'citizen/GET_CITIES',
      social_areas: 'citizen/GET_SOCIAL_AREAS'
    }),
    title() {
      return this.$t('Фуқаролар рўйхати')
    },
    currentYear() {
      return String(new Date().getFullYear())
    },
    years() {
      var years = []
      for (var i = 1991; i <= this.currentYear; i++) {
        years.push(i)
      }
      return years
    }
  },
  mounted() {
    if (this.$route.query.emblefathers_name) {
      this.filter.emblefathers_name = this.$route.query.emblefathers_name
      this.sendFilter()
    } else {
      this.fetchCitizens().then((res) => {
        this.filter.limit = this.citizens_pagination.limit
        this.filter.page = this.citizens_pagination.page
        this.filter.total = this.citizens_pagination.total
      })
    }
    if (this.user.role_id == 1) {
      this.fetchRegions().then((res) => {
        this.sendFilter()
      })
    } else {
      this.fetchCities({region_id: this.user.region_id}).then((res) => {
        this.sendFilter()
      })
    }
    this.fetchSocialAreas().then((res) => {
      this.sendFilter()
    })
  },
  methods: {
    ...mapActions({
      fetchCitizens: 'citizen/index',
      indexFull: 'citizen/indexFull',
      fetchCities: 'citizen/cities',
      fetchRegions: 'citizen/regions',
      fetchSocialAreas: 'citizen/social_areas',
      deleteCitizenAction: 'citizen/delete'
    }),
    getTime(date) {
      return parseTime(date)
    },
    handleCurrentChange(val) {
      this.filter.limit = this.citizens_pagination.limit
      this.filter.page = val
      this.sendFilter()
    },
    handleSizeChange(val) {
      this.filter.limit = val
      this.filter.page = this.citizens_pagination.page
      this.sendFilter()
    },
    sendFilter() {
      this.filter.page = null
      this.loaded = false
      this.fetchCitizens(this.filter).then((res) => {
        this.loaded = true
        this.filter.limit = this.citizens_pagination.limit
        this.filter.page = this.citizens_pagination.page
        this.filter.total = this.citizens_pagination.total
      })
    },
    sendFilterRegion() {
      if (this.user.role_id == 1) {
        this.fetchCities({region_id: this.filter.region_id}).then((res) => {
          this.sendFilter()
          this.filter.city_id = null
        })
      }
    },
    indexMethod(index) {
      return (this.citizens_pagination.page - 1) * 50 + index + 1
    },
    deleteCitizen(id) {
      if (confirm(this.$t('Ҳақиқатан ҳам ушбу маълумотни ўчирмоқчимисиз?'))) {
        this.deleteCitizenAction(id).then((res) => {
          Swal.fire({
            title: this.$t('Муваффақиятли ўчирилди!'),
            type: 'success',
            timer: 2000,
            showConfirmButton: false,
            confirmButtonText: 'Давом этиш'
          }).finally(() => {
            this.sendFilter()
          })
        })
      }
    },
    exportToXlsx() {
      this.isLoading = true
      this.filter['getAll'] = 1
      this.indexFull(this.filter).then(data => {
        this.isLoading = false
        toXlsx(
            this.exportFormat(data.result.citizens.data),
            this.$t('Aҳоли рўйхати'),
            this.columns,
        )
      })
    },
    ToReport() {

    },
    exportFormat(data) {
      if (data && data.length) {
        let arr = []
        data.forEach(row => {
          arr.push({
            tin: row.tin,
            full_name: [row.last_name, row.first_name, row.fathers_name].join(' '),
            passport: row.passport
          })
        })
        return arr
      }
      return []
    }
  }
}
</script>
