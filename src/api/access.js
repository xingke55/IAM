import request from '@/utils/request'
export const accessSession = (params) => {
  return request({ params, url: '/access/session/fetch', method: 'get' })
}

export const accessRoles = (params) => {
  return request({ params, url: 'access/roles/fetch', method: 'get' })
}

export const memberInRole = (params) => {
  return request({ params, url: 'access/rolemembers/memberInRole', method: 'get' })
}

export const appsInRole = (params) => {
  return request({ params, url: 'access/permissions/appsInRole', method: 'get' })
}
export const permissionsDelete = (params) => {
  return request({ params, url: 'access/permissions/delete?ids=', method: 'delete' })
}

export const rolesGet = (id) => {
  return request({ url: 'access/roles/get/' + id, method: 'get' })
}
export const rolesUpdate = (data) => {
  return request({ url: 'access/roles/update', method: 'put', data })
}

export const rolesDelete = (ids) => {
  return request({ url: 'access/roles/delete?ids=' + ids, method: 'delete' })
}

export const rolemembersDelete = (ids) => {
  return request({ url: 'access/rolemembers/delete?ids=' + ids, method: 'delete' })
}
