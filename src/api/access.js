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

