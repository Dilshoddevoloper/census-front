import { show, edit, update, index, store, passport, cities, regions, phone, confirm, destroyapplication,denyReasons,updateStatusAction,checkStatusApplication, confirmapplication } from '@/api/application'
import {social_areas} from "../../api/application";
// import application from "../../router/modules/application";
export const actions = {
  loadCitizen({ commit }, res) {
    commit('SET_APPLICATION', res.result.applications)
  },
  index({ commit }, query) {
    return new Promise((resolve, reject) => {
      index(query).then(res => {
        commit('SET_APPLICATIONS', res.result.applications)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  indexFull({}, query) {
    return new Promise((resolve, reject) => {
      index(query).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  show({ commit }, data) {
    return new Promise((resolve, reject) => {
      console.log('data' + data)
      show(data).then(res => {
        commit('SET_APPLICATION', res.result.application)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  phone({ commit }, data) {
    return new Promise((resolve, reject) => {
      phone(data).then(res => {
        commit('SET_PHONE', res.phone)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  checkStatusApplication({ commit }, query) {
    return new Promise((resolve, reject) => {
      checkStatusApplication(query).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  edit({ commit }, id) {
    return new Promise((resolve, reject) => {
      edit(id)
        .then(res => {
          resolve(res)
        })
    })
  },
  store({ commit }, { data }) {
    data.passport = data.passport.replace(' ', '')
    data.birth_date = data.birth_date.split('.').reverse().join('-')
    return new Promise((resolve, reject) => {
      store(data)
        .then(res => {
          resolve(res)
        }).catch((res) => { reject(res) })
    })
  },
  update({ commit }, data) {
    data.passport = data.passport.replace(' ', '')
    data.birth_date = data.birth_date.split('.').reverse().join('-')
    return new Promise((resolve, reject) => {
      update(data)
        .then(res => {
          resolve(res)
        }).catch(res => {
          reject(res)
        })
    })
  },
  delete({ commit }, id) {
    return new Promise((resolve, reject) => {
      destroyapplication(id)
        .then(res => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        })
    })
  },
  confirmation({ commit }, id) {
    return new Promise((resolve, reject) => {
      confirmapplication(id)
        .then(res => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        })
    })
  },
  passport({ commit }, params) {
    const data = { passport: params.passport.replace(' ', ''), birth_date: params.birth_date }
    return new Promise((resolve, reject) => {
      passport(data)
        .then(res => {
          if (res.success === false) {
            reject(res)
          } else {
            resolve(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  regions({ commit }, data) {
    return new Promise((resolve, reject) => {
      regions(data).then(res => {
        commit('SET_REGIONS', res.result.regions)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  cities({ commit }, data) {
    return new Promise((resolve, reject) => {
      cities(data).then(res => {
        commit('SET_CITIES', res.result.cities)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // checkCode({ commit }, data) {
  //   return new Promise((resolve, reject) => {
  //     checkCode(data).then(res => {
  //       commit('SET_CHECK_CODE', res.data)
  //       resolve(res)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
  confirm({ commit }, data) {
    return new Promise((resolve, reject) => {
      confirm(data)
        .then(res => {
          commit('SET_PHONE', data.phone)
          resolve(res)
        }).catch((res) => { reject(res) })
    })
  },
  social_areas({ commit }, data) {
    return new Promise((resolve, reject) => {
      social_areas(data).then(res => {
        commit('SET_SOCIAL_AREAS', res.result.social_areas)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  denyReasons({ commit }, data) {
    return new Promise((resolve, reject) => {
      denyReasons(data).then(res => {
        commit('SET_DENY_REASONS', res.result.denyReasons)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateStatusAction({ commit }, data) {
    return new Promise((resolve, reject) => {
      updateStatusAction(data)
          .then(res => {
            resolve(res)
          }).catch((res) => { reject(res) })
    })
  },
  setForm({ commit }, { form, application }) {
    if (application.id) {
      form.id = application.id
      form.birth_date = application.birth_date.split('-').reverse().join('.')
      form.first_name = application.first_name
      form.passport = application.passport
      form.last_name = application.last_name
      form.address = application.address
      form.fathers_name = application.fathers_name
      form.tin = application.tin
    } else {
      form.birth_date = application.date_birth
      form.first_name = application.first_name
      form.last_name = application.last_name
      form.fathers_name = application.fathers_name
    }
  },
  setMvdForm({ commit }, { form, application }) {
    if (application.id) {
      form.id = application.id
      form.birth_date = application.birth_date.split('-').reverse().join('.')
      form.first_name = application.first_name
      form.passport = application.passport
      form.last_name = application.last_name
      form.fathers_name = application.fathers_name
    } else {
      form.first_name = application.pSurname
      form.last_name = application.pName
      form.fathers_name = application.pPatronym
      form.gender = 1 * application.pSex
      form.pin = application.pPinpp
      form.new_passport = application.pPsp
      form.source = 2
    }
  }
}
