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
    region: {},
    city: {}
  },
  citizens: {
    data: [],
    pagination: {}
  },
  regions: [],
  cities: [],
}
