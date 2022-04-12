import { show, edit, update, index, store, passport, cities, regions, phone, confirm, destroyCitizen } from '@/api/citizen'
import {social_areas} from "../../api/citizen";
export const actions = {
  loadCitizen({ commit }, res) {
    commit('SET_CITIZEN', res.result.citizen)
  },
  index({ commit }, query) {
    return new Promise((resolve, reject) => {
      index(query).then(res => {
        commit('SET_CITIZENS', res.result.citizens)
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
  show({ commit }, citizen_id) {
    return new Promise((resolve, reject) => {
      show(citizen_id).then(res => {
        commit('SET_CITIZEN', res.result.citizen)
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
      destroyCitizen(id)
        .then(res => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        })
    })
  },
  passport({ commit }, params) {
    const data = { passport: params.passport.replace(' ', ''), tin: params.tin }
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
  setForm({ commit }, { form, citizen }) {
    if (citizen.id) {
      form.id = citizen.id
      form.birth_date = citizen.birth_date.split('-').reverse().join('.')
      form.first_name = citizen.first_name
      form.passport = citizen.passport
      form.last_name = citizen.last_name
      form.address = citizen.address
      form.phone = citizen.phone
      form.fathers_name = citizen.fathers_name
      form.tin = citizen.tin
    } else {
      form.birth_date = citizen.date_birth
      form.first_name = citizen.first_name
      form.last_name = citizen.last_name
      form.fathers_name = citizen.fathers_name
    }
  },
  setMvdForm({ commit }, { form, citizen }) {
    if (citizen.id) {
      form.id = citizen.id
      form.birth_date = citizen.birth_date.split('-').reverse().join('.')
      form.first_name = citizen.first_name
      form.passport = citizen.passport
      form.last_name = citizen.last_name
      form.fathers_name = citizen.fathers_name
    } else {
      form.first_name = citizen.pSurname
      form.last_name = citizen.pName
      form.fathers_name = citizen.pPatronym
      form.gender = 1 * citizen.pSex
      form.pin = citizen.pPinpp
      form.new_passport = citizen.pPsp
      form.source = 2
    }
    try {
      const entrance_year = citizen.entrance_year
      if (entrance_year) {
        form.party_details.entrance_year = citizen.entrance_year
        form.party_details.ticket_number = citizen.ticket_number
      }
    } catch (exp) {
      form.party_details.entrance_year = ''
      form.party_details.ticket_number = ''
    }
  }
}
