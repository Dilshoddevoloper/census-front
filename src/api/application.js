import request from '@/utils/request'

export function index(query) {
  return request({
    url: 'v1/application',
    method: 'get',
    params: query
  })
}

export function show(id) {
  return request({
    url: 'v1/application/show/' + id,
    method: 'get'
  })
}
export function showCode(id) {
  return request({
    url: 'v1/application/show/' + id,
    method: 'get'
  })
}
export function phone(phone) {
  return request({
    url: 'v1/application/getCode/' + phone,
    method: 'get'
  })
}
// export function checkCode(data) {
//   return request({
//     url: 'v1/application/checkCode/' + data.phone + '/' + data.checkCode,
//     method: 'get'
//   })
// }
export function confirm(data) {
  return request({
    url: 'v1/application/confirm-sms',
    method: 'post',
    data
  })
}
export function store(data) {
  return request({
    url: 'v1/application/store',
    method: 'post',
    data
  })
}

export function edit(id) {
  return request({
    url: 'v1/application/show/' + id,
    method: 'get'
  })
}

export function confirmapplication(id) {
  return request({
    url: 'v1/application/confirm/' + id,
    method: 'put'
  })
}

export function update(data) {
  return request({
    url: 'v1/application/update/' + data.id,
    method: 'put',
    data: data
  })
}
export function checkStatusApplication(query) {
  return request({
    url: 'v1/application/check-status-application',
    method: 'get',
    params: query
  })
}
export function destroyCitizen(id) {
  return request({
    url: 'v1/application/destroy/' + id,
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

export function passport(data) {
  return request({
    url: 'application/passport',
    method: 'post',
    data: data
  })
}
export function emblems(query) {
  return request({
    url: 'emblems/all',
    method: 'get',
    params: query
  })
}
export function regions(query) {
  return request({
    url: 'v1/resources/regions',
    method: 'get',
    params: query
  })
}
export function cities(query) {
  return request({
    url: 'v1/resources/cities',
    method: 'get',
    params: query
  })
}
export function social_areas(query) {
  return request({
    url: 'v1/resources/social_areas',
    method: 'get',
    params: query
  })
}
export function denyReasons(query) {
  return request({
    url: 'v1/resources/denyReasons',
    method: 'get',
    params: query
  })
}
export function updateStatusAction(data) {
  return request({
    url: 'v1/application/update/' + data.id,
    method: 'put',
    data
  })
}
