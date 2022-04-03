import request from '@/utils/request'
export function login(data) {
  return request({
    url: 'auth/login',
    method: 'post',
    data
  })
}
export function loginKadrlar(data) {
  return request({
    url: 'login/kadrlar',
    method: 'post',
    data
  })
}
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}
export function index(query) {
  return request({
    url: '/roles',
    method: 'get',
    params: query
  })
}

export function show(id) {
  return request({
    url: '/roles/' + id,
    method: 'get'
  })
}

export function store(role) {
  return request({
    url: 'roles?include=Permissions',
    method: 'post',
    data: role
  })
}

export function update(role) {
  return request({
    url: 'roles/' + role.id,
    method: 'patch',
    data: role
  })
}

export function destroy(role_id) {
  return request({
    url: '/roles/' + role_id,
    method: 'delete'
  })
}

export function bulk(type, list) {
  const dataJSON = JSON.parse(JSON.stringify(list))
  return request({
    url: '/roles/bulk?type=' + type,
    method: 'post',
    data: dataJSON
  })
}

export function getInfo() {
  return request({
    url: '/auth/me',
    method: 'post'
  })
}

