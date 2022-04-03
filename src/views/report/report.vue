<template>
  <div class="container">
    <el-button type="primary" icon="el-icon-arrow-left" @click="back">{{ $t('Орқага') }}</el-button>
    <h4 v-if="user.role.name == 'operator'" class="text-center">{{ user.fullname }}{{ $t('га аъзо депутатлар базага киритилиши бўйича') }} <br>{{ $t('МАЪЛУМОТ') }} </h4>
    <h4 v-if="user.role.name == 'region_party'" class="text-center">{{ user.party.name_uz }}{{ $t('га аъзо депутатлар') }} {{ user.fullname }}{{ $t('да базага киритилиши бўйича') }} <br>{{ $t('МАЪЛУМОТ') }} </h4>
    <h4 v-if="user.role.name === 'admin'" class="text-center">{{ $t('Халқ депутатлари кенгаши аъзолари базага киритилиши бўйича') }} <br>{{ $t('МАЪЛУМОТ')}} </h4>
    <p class="text-center"><b><img alt="logo" src="@/assets/images/small-calendar.svg" height="14px"> ( {{ today }} {{ $t('ҳолатида') }} )</b></p>
    <div class="bg-white box-shadow p-4">
      <el-button type="success" class="float-right mb-4 font-weight-bold" icon="el-icon-download" :loading="isLoading" @click="exportToXlsx()">{{ $t('Юклаб олиш') }}</el-button>
      <table class="table table-hover table-bordered" v-loading="isLoading">
        <!-- <loading
          :active.sync="isLoading"
          :can-cancel="true"
          :is-full-page="true"
          color="rgb(49, 134, 251)"
          loader="bars"
        /> -->
        <thead>
          <tr>
            <th v-if="user.role.name === 'admin'">{{ $t('Партия номи') }}</th>
            <th v-if="user.role.name === 'region_party'">{{ $t('Ҳудуд номи') }}</th>
            <th v-if="user.role.name === 'operator'">{{ $t('Ҳудудлар') }}</th>
            <th>{{ $t('Режа') }}</th>
            <th>{{ $t('Киритилди(кечаги ҳолат)') }}</th>
            <th>{{ $t('Киритилди(бугунги ҳолат)') }}</th>
            <th>{{ $t('Бугун киритилган') }}</th>
            <th>{{ $t('Режага нисбатан киритилган(%)') }}</th>
          </tr>
        </thead>
        <tbody>
          <template>
            <tr v-if="parties_report.report[0].name !== 'Жами' && !user.region_id">
              <td> {{ $t('Жaми') }} </td>
              <td>{{ formatPrice(allPlans) }}</td>
              <td>{{ formatPrice(allCountYesterday)  }}</td>
              <td>{{ formatPrice(allCountToday)  }}</td>
              <td>{{ formatPrice(getDifference(allCountToday, allCountYesterday))  }}</td>
              <td>{{ getPercent( allPlans, allCountToday ) }}</td>
            </tr>
            <tr v-for="party in parties_report.report">
              <td>{{ party.name }}</td>
              <td>{{ formatPrice(party.plan)  }}</td>
              <td>{{ formatPrice(party.yesterday) }}</td>
              <td>{{ formatPrice(party.count) }}</td>
              <td>{{ formatPrice(getDifference(party.count, party.yesterday)) }}</td>
              <td>{{ getPercent( party.plan, party.count) }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { toXlsx } from '@/utils/exports'
// import Loading from 'vue-loading-overlay'
// import 'vue-loading-overlay/dist/vue-loading.css'
// import report from "./repo.json";
export default {
  name: 'Report',
  components: {
    // Loading
  },
  data() {
    return {
      // parties_report: {
      //   report: report
      // },
      parties: [
        { id: 1, name: this.$t('Ўзбекистон Либерал демократик партияси') },
        { id: 2, name: this.$t('Ўзбекистон Халқ демократик партияси') },
        { id: 3, name: this.$t('Ўзбекистон Aдолат социал-демократик партияси') },
        { id: 4, name: this.$t('Ўзбекистон Миллий тикланиш партияси') },
        { id: 5, name: this.$t('Ўзбекистон Экологик партияси') }
      ],
      columns: [
        {
          label: ' ',
          field: 'name'
        },
        {
          label: this.$t('Режа'),
          field: 'plan',
          dataFormat: this.formatPrice
        },
        {
          label: this.$t('Киритилди(кечаги ҳолат)'),
          field: 'yesterday',
          dataFormat: this.formatPrice
        },
        {
          label: this.$t('Киритилди(бугунги ҳолат)'),
          field: 'actual',
          dataFormat: this.formatPrice
        },
        {
          label: this.$t('Фарқ'),
          field: 'difference',
          dataFormat: this.formatPrice
        },
        {
          label: this.$t('Фоиз'),
          field: 'percent'
        }
      ],
      isLoading: true,
    }
  },
  created() {
    // return this.allCounts
  },
  mounted() {
    this.setReport().then(response => {
      if (response.success) {
        this.isLoading = false
      }
    })
  },
  computed: {
    ...mapGetters({
      parties_report: 'report/GET_REPORT',
      user: 'auth/USER'
    }),
    allPlans() {
      var all = 0
      var repo = this.parties_report.report
      for (let i = 0; i < repo.length; i++) {
        all += repo[i].plan
      }
      return all
    },
    allCountYesterday() {
      var all = 0
      var repo = this.parties_report.report
      for (let i = 0; i < repo.length; i++) {
        all += repo[i].yesterday
      }
      return all
    },
    allCountToday() {
      var all = 0
      var repo = this.parties_report.report
      for (let i = 0; i < repo.length; i++) {
        all += repo[i].count
      }
      return all
    },
    // allCounts() {
    //   if (this.parties_report.report[0].name !== "Жами" && !this.user.region_id) {
    //     this.parties_report.report.unshift(
    //       {
    //         name: "Жaaми",
    //         plan: this.allPlans,
    //         yesterday: this.allCountYesterday,
    //         count: this.allCountToday,
    //       }
    //     )
    //   }
    // },
    difference() {
      var all = []
      var repo = this.parties_report.report
      for (let i = 0; i < repo.length; i++) {
        return all = repo[i].count -repo[i].yesterday
      }
    },
    today() {
      var today = new Date()
      var dd = String(today.getDate()).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
      var yyyy = today.getFullYear()
      return dd + '.' + mm + '.' + yyyy
    }
  },
  methods: {
    ...mapActions({ setReport: 'report/reportAll' }),
    getPercent(plan, actual) {
      if (actual > 0 && plan) {
        return ((actual / plan) * 100).toFixed(1) + ' %'
      } else {
        return '0%'
      }
    },
    getSum(array, prop) {
      var total = 0
      for (var i = 0; i < array.length; i++) {
        total += array[i][prop]
      }
      return total
    },
    getDifference(count, yesterday) {
      return count - yesterday
    },
    back() {
      window.history.back()
    },
    exportToXlsx() {
      this.isLoading = true
      var options = {}
      var wscols = [
        { width: 40 },
        { width: 10 },
        { width: 25 },
        { width: 25 },
        { width: 10 },
        { width: 10 }
      ]
      options['!cols'] = wscols
      options['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 3 }}
      ]
      toXlsx(
        this.exportFormat(this.parties_report),
        'Ҳисобот Partiya ARGOS',
        this.columns,
        options,
        this.user.fullname + this.$t(' аъзолари базага киритилиши бўйича МАЪЛУМОТ')
      )
      this.isLoading = false
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(0).replace(' ', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    },
    percentFormat(value) {
      return (value * 100).toFixed(1) + ' %'
    },
    exportFormat(data) {
      if (data && data.report && data.report.length) {
        const arr = []
        data.report.forEach(row => {
          arr.push({
            name: row.name,
            plan: row.plan,
            yesterday: row.yesterday,
            actual: row.count,
            difference: this.getDifference(row.count, row.yesterday),
            percent: this.getPercent(row.plan, row.count)
          })
        })
        return arr
      }
      return []
    }
  }
}
</script>
<style scoped>
  table tr:first-child td{
    font-weight: bold;
    font-size: 18px;
  }
  th{
    padding-top: 6px !important;
    padding-bottom: 6px !important;
    background: #e6e8ec;
    color: #3f3f3f
  }
  .table thead th{
    border-bottom: none
  }
  .primary, .primary:hover, .primary:active{
    background-color: #2c79e2 !important;
    color: rgb(245, 241, 241) !important
  }
</style>