import request from '@/utils/request'
export const appFetch = (params) => {
  return request({ params, url: 'apps/fetch', method: 'get' })
}
export const casGet = (id) => {
  return request({ url: 'apps/cas/get/' + id, method: 'get' })
}

export const casUpdate = (data) => {
  return request({ url: 'apps/cas/update', method: 'put', data })
}
