import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/parties',
    method: 'get',
    params: query
  })
}

export function show(id) {
  return request({
    url: '/parties/' + id,
    method: 'get'
  })
}

export function store(data) {
  return request({
    url: 'parties',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: 'parties/' + data.id,
    method: 'put',
    data: data
  })
}

export function destroy(id) {
  return request({
    url: '/parties/' + id,
    method: 'delete'
  })
}
