import { getToken } from '@/utils/auth'

export const state = {
  user: {
    is_auth: false,
    id: '',
    name: '',
    token: getToken(),
    region_id: 0,
    city_id: 0,
    role_id: 0,
    permissions: []
  }
}
