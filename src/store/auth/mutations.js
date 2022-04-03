export const mutations = {
  SET_ID: (state, id) => (state.user.id = id),
  SET_FULL_NAME: (state, name) => (state.user.fullname = name),
  SET_USER_PARTY: (state, party) => (state.user.party = party),
  SET_USER: (state, user) => {
    // console.log('user',user)
    state.user.id = user.id
    state.user.name = user.name
    state.user.region_id = user.region_id
    state.user.city_id = user.city_id
    state.user.region_id = user.region_id
    state.user.role_id = user.role_id
  },
  SET_USER_TOKEN: (state, token) => (state.user.token = token),
  SET_IS_AUTH: (state, condition) => (state.user.is_auth = condition)
}
