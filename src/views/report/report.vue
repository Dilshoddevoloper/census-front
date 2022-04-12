<template>
  <div class="container">
    <router-link :to="{ name:'CitizensIndex', query: { type: $route.query.type } }">
      <el-button icon="el-icon-arrow-left" type="primary" @click="back">{{ $t('Рўйҳатга қайтиш') }}</el-button>
    </router-link>
    <h4 class="text-center">{{ $t('Aҳолининг ижтимоий соҳаларга тақсимланиши бўйича') }} <br>{{ $t('ҲИСОБОТ') }} </h4>
    <p class="text-center"><b><img alt="logo" height="14px" src="@/assets/images/small-calendar.svg"> ( {{ today }}
      {{ $t('ҳолатида') }} )</b></p>

    <div class="bg-white table-holder  mt-4" @wheel.prevent="wheelHorizontal($event)">
      <div v-if="hasScroll" :class="{'show' : showInfo}" class="info" @touchmove.prevent="scrollHorizontal($event)">
        Scroll for more &rarr;
      </div>
      <div ref="table" class="table-responsive" @scroll.prevent="scrollHorizontal($event)">
        <div class=" box-shadow p-4">
          <table v-loading="isLoading" class="table table-hover table-bordered">
            <thead>
              <tr>
                <th> {{ $t('Т/р') }}</th>
                <th> {{ $t('Вилоятлар') }}</th>
                <th> {{ $t('Жами') }}</th>
                <th v-for="social in social_areas">{{ social.name_cyrl }}</th>
              </tr>
            </thead>
            <tbody>
              <template>
                <tr>
                  <td></td>
                  <td>{{ $t('Жами аҳоли сони') }}</td>
                  <td>{{ parties_report.report_count[0].citizens_count }}</td>
                  <td>{{ parties_report.report_count[0].count_social1 }}</td>
                  <td>{{ parties_report.report_count[0].count_social2 }}</td>
                  <td>{{ parties_report.report_count[0].count_social3 }}</td>
                  <td>{{ parties_report.report_count[0].count_social4 }}</td>
                  <td>{{ parties_report.report_count[0].count_social5 }}</td>
                  <td>{{ parties_report.report_count[0].count_social6 }}</td>
                  <td>{{ parties_report.report_count[0].count_social7 }}</td>
                  <td>{{ parties_report.report_count[0].count_social8 }}</td>
                  <td>{{ parties_report.report_count[0].count_social9 }}</td>
                  <td>{{ parties_report.report_count[0].count_social10 }}</td>
                  <td>{{ parties_report.report_count[0].count_social11 }}</td>
                  <td>{{ parties_report.report_count[0].count_social12 }}</td>
                  <td>{{ parties_report.report_count[0].count_social13 }}</td>
                  <td>{{ parties_report.report_count[0].count_social14 }}</td>
                  <td>{{ parties_report.report_count[0].count_social15 }}</td>
                  <td>{{ parties_report.report_count[0].count_social16 }}</td>
                  <td>{{ parties_report.report_count[0].count_social17 }}</td>
                  <td>{{ parties_report.report_count[0].count_social18 }}</td>
                </tr>
                <tr v-for="(social, index) in parties_report.report" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <router-link :to="{ name:'ReportCityShow', params:{id: social.region_id} }">{{ social.region_name }} </router-link>
                  </td>
                  <td> {{ social.region_count }}</td>
                  <td> {{ social.social1 }}</td>
                  <td> {{ social.social2 }}</td>
                  <td> {{ social.social3 }}</td>
                  <td> {{ social.social4 }}</td>
                  <td> {{ social.social5 }}</td>
                  <td> {{ social.social6 }}</td>
                  <td> {{ social.social7 }}</td>
                  <td> {{ social.social8 }}</td>
                  <td> {{ social.social9 }}</td>
                  <td> {{ social.social10 }}</td>
                  <td> {{ social.social11 }}</td>
                  <td> {{ social.social12 }}</td>
                  <td> {{ social.social13 }}</td>
                  <td> {{ social.social14 }}</td>
                  <td> {{ social.social15 }}</td>
                  <td> {{ social.social16 }}</td>
                  <td> {{ social.social17 }}</td>
                  <td> {{ social.social18 }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'Report',
  components: {},
  data() {
    return {
      // parties_report: {
      //   report_count: report_count
      // },
      // report_count:{
      //   report_count: report_count
      // },
      isLoading: true,
      showInfo: true,
      hasScroll: true
    }
  },
  created() {
  },
  mounted() {
    this.setReport().then(response => {
      if (response.success) {
        this.isLoading = false
      }
    })
    this.fetchSocialAreas().then((res) => {
      this.sendFilter()
    })
    this.fetchRegions().then((res) => {
      this.sendFilter()
    })
    let app = this;
    let table = this.$refs.table;
    function verifyScroll() {
      if (table.scrollWidth-60 > table.clientWidth) {
        app.hasScroll = true;
      } else {
        app.hasScroll = false;
      }
    }
    verifyScroll();
    window.addEventListener('resize', verifyScroll);
  },
  computed: {
    ...mapGetters({
      parties_report: 'report/GET_REPORT',
      report_count: 'report/GET_REPORT',
      user: 'auth/USER',
      social_areas: 'citizen/GET_SOCIAL_AREAS',
      regions: 'citizen/GET_REGIONS',
    }),
    today() {
      var today = new Date()
      var dd = String(today.getDate()).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
      var yyyy = today.getFullYear()
      return dd + '.' + mm + '.' + yyyy
    }
  },
  methods: {
    ...mapActions({
      setReport: 'report/reportAll',
      fetchSocialAreas: 'citizen/social_areas',
      fetchRegions: 'citizen/regions',
    }),
    wheelHorizontal: function(e) {
      if (e.deltaY < 0) {
        this.$refs.table.scrollLeft = this.$refs.table.scrollLeft - 50
      } else {
        this.$refs.table.scrollLeft = this.$refs.table.scrollLeft + 50
      }
    },
    scrollHorizontal: function(e) {
      if (this.$refs.table.scrollLeft > 0) {
        this.showInfo = false;
      }
      if (this.$refs.table.scrollLeft == 0) {
        this.showInfo = true;
      }
    }
  }
}
</script>
<style scoped>
table tr:first-child td {
  font-weight: bold;
  font-size: 16px;
}

th {
  padding-top: 6px !important;
  padding-bottom: 6px !important;
  background: #e6e8ec;
  color: #3f3f3f
}

.table thead th {
  border-bottom: none
}

.primary, .primary:hover, .primary:active {
  background-color: #2c79e2 !important;
  color: rgb(245, 241, 241) !important
}
/*.container {*/
/*  max-width: 768px;*/
/*}*/

.table-holder, .table-responsive {
  position: relative;
}

.table-responsive::-webkit-scrollbar {
  height: 10px;
}

.table-responsive::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px #333333;
}

.table-responsive::-webkit-scrollbar-thumb {
  background: #333333;
  outline: 1px solid #333333;
}

.info {
  position: absolute;
  width: 200px;
  height: 100%;
  background: linear-gradient(to right, transparent, #ffffff);
  top: 0;
  right: 0;
  padding: 20px;
  text-align: right;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  transition: opacity 300ms ease-in-out, visibility 300ms ease-in-out;
  opacity: 0;
  visibility: hidden;
  z-index: 1;
  pointer-events: none;
}

.show {
  opacity: 1;
  visibility: visible;
}

tr th:first-child, tr td:first-child {
  position: sticky;
  min-width: 50px;
  left: 0;
  background: white;
}

</style>
