import request from '@/utils/request'
export const orgsFetch = (params) => {
  return request({ params, url: 'orgs/fetch', method: 'get' })
}

export const orgsGet = (id) => {
  return request({ url: 'orgs/get/' + id, method: 'get' })
}
export const orgUpdate = (data) => {
  return request({ url: 'orgs/update/', method: 'put', data })
}
export const orgsDelete = (ids) => {
  return request({ url: 'orgs/delete?ids=' + ids, method: 'delete' })
}
