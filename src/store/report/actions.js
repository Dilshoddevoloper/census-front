import { reportAll } from '@/api/report'
import { reportCity } from '@/api/report'
import axios from 'axios'
export const actions = {
  reportAll({ commit }, query) {
    return new Promise((resolve, reject) => {
      reportAll(query).then(res => {
        commit('SET_REPORT', res.result)
        // commit('SET_REPORT', res.result.report)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  reportCity({ commit }, id) {
    return new Promise((resolve, reject) => {
      reportCity(id).then(res => {
        commit('SET_REPORT_CITY', res.result)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // async reportCity({ commit }, id) {
  //   const res = await axios.get(`http://127.0.0.1:8000/api/v1/report/${id}`)
  //   console.log(res)
  //   commit('setCity', res.data)
  // }
}
