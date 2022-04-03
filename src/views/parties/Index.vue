<template>
  <div class="container">
    <el-button type="primary" icon="el-icon-arrow-left" @click="back">{{ $t('Орқага') }}</el-button>
    <h4 class="text-center">Партиялар <br></h4>
    <div class="bg-white box-shadow p-4">
      <el-button v-if="user.role.name == 'admin'" type="primary" @click="create()">{{ $t('Яратиш') }}</el-button>
      <br>
      <br>
      <table class="table table-hover table-bordered">
        <loading
          :active.sync="isLoading"
          :can-cancel="true"
          :is-full-page="true"
          color="rgb(49, 134, 251)"
          loader="bars"
        />
        <thead>
          <tr>
            <th>№</th>
            <th>{{ $t('Партия номи (uz)') }}</th>
            <th>{{ $t('Партия номи (рус)') }}</th>
            <th>{{ $t('Режа') }}</th>
            <th>{{ $t('Амаллар') }}</th>
          </tr>
        </thead>
        <tbody>
          <template>
            <tr v-for="(party, index) in parties" :key="index">
              <td>{{ party.id }}</td>
              <td>{{ party.name_uz }}</td>
              <td>{{ party.name_ru }}</td>
              <td>{{ party.plan }}</td>
              <td>
                <el-button v-if="user.role.name == 'admin'" type="primary" size="mini" @click="edit(party.id)"><i class="el-icon-edit" /></el-button>
                <el-button v-if="user.role.name == 'admin'" type="danger" size="mini" @click="deleteParty(party.id)"><i class="el-icon-delete" /></el-button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item :label="$t('Партия номи (русча)')" :label-width="formLabelWidth">
          <el-input v-model="form.name_ru" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('Партия номи (узб)')" :label-width="formLabelWidth">
          <el-input v-model="form.name_uz" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('Режа')" :label-width="formLabelWidth">
          <el-input v-model="form.plan" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('Бекор килиш') }}</el-button>
        <el-button type="primary" @click="save()">{{ $t('Саклаш') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import Swal from 'sweetalert2'

// import report from "./repo.json";
export default {
  name: 'Report',
  components: {
    Loading
  },
  data() {
    return {
      isLoading: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name_ru: '',
        name_uz: '',
        plan: null,
        id: null
      },
      title: '',
      formLabelWidth: '180px',
      parties: []
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/USER'
    })
  },
  created() {
    // return this.allCounts
  },
  mounted() {
    this.isLoading = false
    this.allParties().then(res => {
      this.parties = res.result.parties
    })
  },
  methods: {
    ...mapActions({ show: 'parties/show', update: 'parties/update', store: 'parties/store', allParties: 'parties/index', destroy: 'parties/destroy' }),
    back() {
      window.history.back()
    },
    create() {
      this.form.name_ru = ''
      this.form.name_uz = ''
      this.form.plan = null
      this.form.id = null
      this.dialogFormVisible = true
      this.title = this.$t('Партия яратиш')
    },
    edit(id) {
      this.title = this.$t('Партия янгилаш')
      this.form.name_ru = ''
      this.form.name_uz = ''
      this.form.plan = null
      this.form.id = null
      this.dialogFormVisible = true
      this.show(id)
        .then(res => {
          this.form.name_ru = res.result.party.name_ru
          this.form.name_uz = res.result.party.name_uz
          this.form.plan = res.result.party.plan
          this.form.id = id
        })
    },
    save() {
      this.dialogFormVisible = false

      if (this.user.role.name === 'admin') {
        if (!this.form.id) {
          this.store(this.form).then(res => {
            Swal.fire({
              title:this.$t('Маълумот сақланди!'),
              type: 'success',
              timer: 1500,
              showConfirmButton: false,
              confirmButtonText: 'Давом этиш'
            })
          }).catch(err => {
            console.log(err)
            Swal.fire({
              title: this.$t('Маълумот сақланмади!'),
              type: 'danger',
              timer: 1500,
              showConfirmButton: false,
              confirmButtonText: 'Давом этиш'
            })
          })
        } else {
          this.update(this.form).then(res => {
            Swal.fire({
              title:this.$t('Маълумот сақланди!'),
              type: 'success',
              timer: 1500,
              showConfirmButton: false,
              confirmButtonText: 'Давом этиш'
            })
          }).catch(err => {
            console.log(err)
            Swal.fire({
              title: this.$t('Маълумот сақланмади!'),
              type: 'danger',
              timer: 1500,
              showConfirmButton: false,
              confirmButtonText: 'Давом этиш'
            })
          })
        }
      } else {
        Swal.fire({
          title: this.$t('Сизда хуқуқ йўқ!'),
          type: 'success',
          timer: 1500,
          showConfirmButton: false,
          confirmButtonText: 'Давом этиш'
        })
      }
    },
    deleteParty(id) {
      console.log(id)
      if (this.user.role.name === 'admin') {
        this.destroy(id).then(res => {
          this.allParties().then(res => {
            this.parties = res.result.parties
          })
          Swal.fire({
            title: this.$t('Маълумот ўчирилди!'),
            type: 'success',
            timer: 1500,
            showConfirmButton: false,
            confirmButtonText: 'Давом этиш'
          })
        }).catch(err => {
          console.log(err)
          Swal.fire({
            title: this.$t('Маълумот ўчирилмади!'),
            type: 'danger',
            timer: 1500,
            showConfirmButton: false,
            confirmButtonText: 'Давом этиш'
          })
        })
      } else {
        Swal.fire({
          title: this.$t('Сизда хуқуқ йўқ!'),
          type: 'success',
          timer: 1500,
          showConfirmButton: false,
          confirmButtonText: 'Давом этиш'
        })
      }
    }
  }
}
</script>
<style scoped>

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
