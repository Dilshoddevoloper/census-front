export const state = {
  application: {
    id: '',
    passport: '',
    tin: '',
    first_name: '',
    last_name: '',
    fathers_name: '',
    birth_date: '',
    region_id: '',
    city_id: '',
    number: '',
    code: '',
    type: '',
    address: '',
    social_areas_id: '',
    phone: '',
    region: {},
    city: {},
    social_area: {}
  },
  applications: {
    data: [],
    pagination: {}
  },
  regions: [],
  cities: [],
  phone: '',
  data: [],
  social_areas: [],
  denyReasons: []
}
