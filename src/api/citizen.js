import request from '@/utils/request'

export function index(query) {
  return request({
    url: 'v1/citizens',
    method: 'get',
    params: query
  })
}

export function show(id) {
  return request({
    url: 'v1/citizens/show/' + id,
    method: 'get'
  })
}

export function store(data) {
  return request({
    url: 'v1/citizens/store',
    method: 'post',
    data
  })
}

export function edit(id) {
  return request({
    url: 'v1/citizens/show/' + id,
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: 'v1/citizens/update/' + data.id,
    method: 'put',
    data: data
  })
}

export function destroyCitizen(id) {
  return request({
    url: 'v1/citizens/destroy/' + id,
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
    url: 'citizens/passport',
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
