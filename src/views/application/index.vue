<template>
  <div class="container">
    <h4 class="font-weight-bold">{{ title }}</h4>
    <div class="bg-white box-shadow p-4" v-loading="!loaded">
      <div>
        <el-radio-group v-model="filter.status" @change="sendFilter">
          <el-radio-button :value="0" label="0">Янги</el-radio-button>
          <el-radio-button :value="1" label="1">Тасдиқланган</el-radio-button>
          <el-radio-button :value="2" label="2 ">Рад етилган</el-radio-button>
        </el-radio-group>
      </div>
      <el-table v-if="loaded" class="mb-1 mx-auto table-custom" :data="applications" border>
        <el-table-column label="№" width="45" type="index" :index="indexMethod" fixed/>
        <el-table-column label="" width="138" prop="region">
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
        <el-table-column label="" width="390" prop="region">
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
            <router-link :to="{ name:'ApplicationsShow', params:{id: scope.row.id}, query: {type:  $route.query.type } }">
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
          <template v-if="user.role_id == 3 && scope.row.status == 0" slot-scope="scope">
<!--            <router-link :to="{ name:'CitizensEdit', params:{id: scope.row.id} }">-->
            <el-button size="mini" type="success" @click="ConfirmationApplication(scope.row.id)">{{ $t('Тасдиқлаш') }}</el-button>
<!--             </router-link>-->
            <el-button size="mini" class="m-1" type="danger" @click="showDialog(scope.row)">{{ $t('Рад этиш') }}
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
      <el-dialog :visible.sync="dialogVisible" width="30%">
        <template slot="title"><h4>Рад этиш</h4></template>
        <div>
          <label for="deny_reason_id">Рад этиш сабаби</label>
          <el-select id="deny_reason_id" v-model="form.deny_reason_id" class="w-100">
            <el-option v-for="item in denyReasons" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </div>
        <br><br>
        <div>
          <label for="deny_reason">Изоҳ</label>
          <el-input id="deny_reason" v-model="form.deny_reason" />
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button type="text" @click="dialogVisible = false">Бекор қилиш</el-button>
        <el-button type="danger" @click="updateStatus(form.id, 2)">Рад этиш</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {parseTime} from '@/utils/'
import {toXlsx} from '@/utils/exports'
import Swal from 'sweetalert2'

export default {
  name: 'ApplicationIndex',
  data() {
    return {
      form: {
        id: null,
        deny_reason_id: null,
        deny_reason: ''
      },
      filter: {
        last_name: '',
        first_name: '',
        fathers_name: '',
        region_id: null,
        city_id: null,
        social_areas_id: null,
        status: 0,
        passport: '',
        tin: null,
        limit: 0,
        page: 0,
        total: null
      },
      statuses: [
        { id: 0, name: 'Янги' },
        { id: 1, name: 'Тасдиқланган' },
        { id: 2, name: 'Рад етилган' },
      ],
      loaded: false,
      dialogVisible: false,
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
      applications: 'application/GET_APPLICATIONS',
      applications_pagination: 'application/GET_APPLICATIONS_PAGINATION',
      user: 'auth/USER',
      regions: 'application/GET_REGIONS',
      cities: 'application/GET_CITIES',
      social_areas: 'application/GET_SOCIAL_AREAS',
      denyReasons: 'application/GET_DENY_REASONS'
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
      this.fetchApplications().then((res) => {
        this.filter.limit = this.applications_pagination.limit
        this.filter.page = this.applications_pagination.page
        this.filter.total = this.applications_pagination.total
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
    this.fetchDenyReasons().then((res) => {
      this.sendFilter()
    })
  },
  methods: {
    ...mapActions({
      fetchApplications: 'application/index',
      indexFull: 'application/indexFull',
      fetchCities: 'application/cities',
      fetchRegions: 'application/regions',
      fetchSocialAreas: 'application/social_areas',
      fetchDenyReasons: 'application/denyReasons',
      deleteApplicationAction: 'application/delete',
      confirmationApplicationAction: 'application/confirmation',
      updateStatusAction: 'application/updateStatusAction',
    }),
    updateStatus(application_id, status) {
      const msg = (status === 1) ? 'Ушбу аризани тасдиқлайсизми?' : 'Ушбу аризани рад этмоқчимисиз?'
      if (status === 2 && (!this.form.deny_reason || this.form.deny_reason === '' || !this.form.deny_reason_id)) {
        this.$message.error('Майдонларни тўлдиринг')
        return false
      }
      if (status === 1) {
        this.$confirm(msg, 'Эътибор беринг', { confirmButtonText: 'Тасдиқлаш', cancelButtonText: 'Бекор қилиш', type: 'warning' }).then(() => {
          this.update(application_id, status)
        })
      } else {
        this.update(application_id, status)
      }
    },
    update(application_id, status) {
      this.updateStatusAction({ id: application_id, status, deny_reason: this.form.deny_reason, deny_reason_id: this.form.deny_reason_id }).then((res) => {
        this.dialogVisible = false
        if (res.success) {
          Swal.fire({
            title: 'Маълумот сақланди!',
            type: 'success',
            timer: 1500,
            showConfirmButton: false,
            confirmButtonText: 'Давом этиш'
          }).then(() => {
            this.getCount()
            this.sendFilter()
          })
        } else {
          Swal.fire({
            title: typeof res.error === 'string' ? res.error : 'ERROR',
            type: 'warning',
            timer: 2500,
            showConfirmButton: false,
            confirmButtonText: 'Давом этиш'
          })
        }
      })
    },
    getTime(date) {
      return parseTime(date)
    },
    showDialog(item) {
      this.item = item
      this.form.id = item.id
      this.dialogVisible = true
    },
    handleCurrentChange(val) {
      this.filter.limit = this.applications_pagination.limit
      this.filter.page = val
      this.sendFilter()
    },
    handleSizeChange(val) {
      this.filter.limit = val
      this.filter.page = this.applications_pagination.page
      this.sendFilter()
    },
    sendFilter() {
      this.filter.page = null
      this.loaded = false
      this.fetchApplications(this.filter).then((res) => {
        this.loaded = true
        this.filter.limit = this.applications_pagination.limit
        this.filter.page = this.applications_pagination.page
        this.filter.total = this.applications_pagination.total
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
      return (this.applications_pagination.page - 1) * 50 + index + 1
    },
    ConfirmationApplication(id){
      if (confirm(this.$t('Ҳақиқатан ҳам ушбу маълумотни тасдиқламоқчимисиз?'))) {
        this.confirmationApplicationAction(id).then((res) => {
          this.sendFilter()
        })
      }
    },
    deleteApplication(id) {
      if (confirm(this.$t('Ҳақиқатан ҳам ушбу маълумотни ўчирмоқчимисиз?'))) {
        this.deleteApplicationAction(id).then((res) => {
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
