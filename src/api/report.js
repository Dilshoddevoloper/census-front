import request from '@/utils/request'
export function reportAll(query) {
  return request({
    url: 'v1/report',
    method: 'get',
    params: query
  })
}
export function reportCity(id) {
  return request({
    url: 'v1/report/' + id,
    method: 'get'
  })
}
