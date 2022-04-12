export const mutations = {
  SET_APPLICATION: (state, application) => {
    state.application.id = application.id
    state.application.passport = application.passport
    state.application.first_name = application.first_name
    state.application.last_name = application.last_name
    state.application.fathers_name = application.fathers_name
    state.application.birth_date = application.birth_date
    state.application.address = application.address
    state.application.pin = application.pin
    state.application.tin = application.tin
    state.application.new_passport = application.new_passport
    state.application.region_id = application.region_id
    state.application.city = application.city
    state.application.number = application.number
    state.application.code = application.code
    state.application.region = application.region
    state.application.phone = application.phone
    state.application.social_areas = application.social_areas
    state.application.status = application.status
    state.application.city_id = application.city_id
    state.application.type = application.type
    state.application.social_areas_id = application.social_areas_id
  },
  SET_APPLICATIONS: (state, applications) => {
    state.applications.data = applications.data
    state.applications.pagination = {
      total: applications.total,
      page: applications.current_page,
      limit: applications.per_page
    }
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
  },
  SET_DENY_REASONS: (state, denyReasons) => {
    state.denyReasons = denyReasons
  }
}
