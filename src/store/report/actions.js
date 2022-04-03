import { reportAll } from '@/api/report'
export const actions = {
  reportAll({ commit }, query) {
    return new Promise((resolve, reject) => {
      reportAll(query).then(res => {
        commit('SET_REPORT', res.result.report)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
