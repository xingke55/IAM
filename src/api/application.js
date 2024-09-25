import request from '@/utils/request'
export const appFetch = (params) => {
  return request({ params, url: 'apps/fetch', method: 'get' })
}
export const protocolGet = (protocol, id) => {
  return request({ url: `apps/${protocol}/get/` + id, method: 'get' })
}

export const protocolGetUpdate = (protocol, data) => {
  return request({ url: `apps/${protocol}/update`, method: 'put', data })
}
export const protocolGetAdd = (protocol, data) => {
  return request({ url: `apps/${protocol}/add`, method: 'post', data })
}
export const protocolInit = (protocol) => {
  const url = protocol ? protocol + '/' : '/'
  return request({ url: `apps/${url}init`, method: 'get' })
}
