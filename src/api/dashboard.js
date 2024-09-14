import request from '@/utils/request'
export const dashBoard = (params) => {
  return request({ params, url: '/dashboard', method: 'get' })
}
