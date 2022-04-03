import { show, update, index, destroy, store } from '@/api/party'
export const actions = {
  index({ commit }, query) {
    return new Promise((resolve, reject) => {
      index(query).then(res => {
        commit('SET_PARTIES', res.result.parties)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  show({ commit }, party_id) {
    return new Promise((resolve, reject) => {
      show(party_id).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  store({ commit }, { data }) {
    return new Promise((resolve, reject) => {
      store(data)
        .then(res => {
          resolve(res)
        }).catch((res) => { reject(res) })
    })
  },
  update({ commit }, data) {
    return new Promise((resolve, reject) => {
      update(data)
        .then(res => {
          resolve(res)
        }).catch(res => {
          reject(res)
        })
    })
  },
  destroy({ commit }, id) {
    return new Promise((resolve, reject) => {
      destroy(id)
        .then(res => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        })
    })
  }
}
