import request from '@/utils/request'
export function reportAll() {
  return request({
    url: 'v1/citizens',
    method: 'get'
  })
}
