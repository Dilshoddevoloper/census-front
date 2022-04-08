import log from "../../router/middleweres/log";

export const getters = {
  GET_CITIZEN: (state) => state.citizen,
  GET_CITIZENS: (state) => state.citizens.data,
  GET_CITIZENS_PAGINATION: (state) => state.citizens.pagination,
  FULL_NAME: (state) => state.citizen.first_name + ' ' + state.citizen.last_name + ' ' + state.citizen.fathers_name,
  GET_REGIONS: (state) => state.regions,
  GET_CITIES: (state) => state.cities,
  GET_PHONE: (state) => state.phone,
  GET_SOCIAL_AREAS: (state) => state.social_areas,
}
