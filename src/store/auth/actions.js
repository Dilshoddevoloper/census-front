import { loginKadrlar, login, store, getInfo, logout } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

export const actions = {
  // user login
  login({ commit }, credientials) {
    return new Promise((resolve, reject) => {
      login(credientials)
        .then(res => {
          const result = res.result
          commit('SET_USER', result.user)
          commit('SET_USER_TOKEN', result.access_token)
          commit('SET_IS_AUTH', true)
          setToken(result.access_token)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
    })
  },
  loginKadrlar({ commit }, code) {
    const data = {
      code: code,
      client_id: process.env.VUE_APP_KADRLAR_CLIENT_ID,
      client_secret: process.env.VUE_APP_KADRLAR_CLIENT_SECRET,
      redirect_uri: process.env.VUE_APP_KADRLAR_REDIRECT_URL,
      response_type: process.env.VUE_APP_KADRLAR_RESPONSE_TYPE
    }
    return new Promise((resolve, reject) => {
      loginKadrlar(data)
        .then(res => {
          const result = res.result
          commit('SET_USER', result.user)
          commit('SET_USER_TOKEN', result.access_token)
          commit('SET_IS_AUTH', true)
          setToken(result.access_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(res => {
          commit('SET_USER_TOKEN', '')
          commit('SET_IS_AUTH', false)
          removeToken()
          resetRouter()
          resolve(res)
        }).catch(err => {
          reject(err)
        })
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_USER_TOKEN', '')
      commit('SET_IS_AUTH', false)
      removeToken()
      resolve()
    })
  },
  setUserToken({ commit }, token) {
    return new Promise(resolve => {
      commit('SET_USER_TOKEN', token)
      resolve(true)
    })
  },
  create({ commit }, user) {
    return new Promise((resolve, reject) => {
      store(user).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(res => {
          if (res.success === true) {
            commit('SET_USER', res.result.user)
            commit('SET_IS_AUTH', true)
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
