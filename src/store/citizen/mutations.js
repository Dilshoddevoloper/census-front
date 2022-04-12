export const mutations = {
  SET_CITIZEN: (state, citizen) => {
    state.citizen.id = citizen.id
    state.citizen.phone = citizen.phone
    state.citizen.passport = citizen.passport
    state.citizen.first_name = citizen.first_name
    state.citizen.last_name = citizen.last_name
    state.citizen.fathers_name = citizen.fathers_name
    state.citizen.birth_date = citizen.birth_date
    state.citizen.address = citizen.address
    state.citizen.pin = citizen.pin
    state.citizen.tin = citizen.tin
    state.citizen.new_passport = citizen.new_passport
    state.citizen.region_id = citizen.region_id
    state.citizen.city = citizen.city
    state.citizen.region = citizen.region
    state.citizen.social_areas = citizen.social_areas
    state.citizen.city_id = citizen.city_id
    state.citizen.type = citizen.type
    state.citizen.social_areas_id = citizen.social_areas_id
  },
  SET_CITIZENS: (state, citizens) => {
    state.citizens.data = citizens.data
  },
  SET_REGIONS: (state, regions) => {
    state.regions = regions
  },
  SET_CITIES: (state, cities) => {
    state.cities = cities
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  },
  SET_CHECK_CODE: (state, data) => {
    state.data = data
  },
  SET_SOCIAL_AREAS: (state, social_areas) => {
    state.social_areas = social_areas
  }
}
