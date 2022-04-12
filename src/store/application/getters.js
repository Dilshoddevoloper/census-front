import log from "../../router/middleweres/log";

export const getters = {
  GET_APPLICATION: (state) => state.application,
  GET_APPLICATIONS: (state) => state.applications.data,
  GET_APPLICATIONS_PAGINATION: (state) => state.applications.pagination,
  FULL_NAME: (state) => state.application.first_name + ' ' + state.application.last_name + ' ' + state.application.fathers_name,
  GET_REGIONS: (state) => state.regions,
  GET_CITIES: (state) => state.cities,
  GET_PHONE: (state) => state.phone,
  GET_SOCIAL_AREAS: (state) => state.social_areas,
  GET_DENY_REASONS: (state) => state.denyReasons
}
