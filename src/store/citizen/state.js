export const state = {
  citizen: {
    id: '',
    passport: '',
    tin: '',
    first_name: '',
    last_name: '',
    fathers_name: '',
    birth_date: '',
    region_id: '',
    city_id: '',
    type: '',
    address: '',
    social_areas_id: '',
    region: {},
    city: {},
    social_area: {}
  },
  citizens: {
    data: [],
    pagination: {}
  },
  regions: [],
  cities: [],
  social_areas: [],
}
