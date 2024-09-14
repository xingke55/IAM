import request from '@/utils/request'

export const fetchConnector = (params) => {
  return request({ params, url: '/historys/connectorHistory/fetch', method: 'get' })
}

export const fetchLoginApps = (params) => {
  return request({ params, url: '/historys/loginAppsHistory/fetch', method: 'get' })
}

export const fetchLogin = (params) => {
  return request({ params, url: '/historys/loginHistory/fetch', method: 'get' })
}

export const fetchSynchronizers = (params) => {
  return request({ params, url: '/historys/synchronizerHistory/fetch', method: 'get' })
}

export const fetchSystemLogs = (params) => {
  return request({ params, url: '/historys/systemLogs/fetch', method: 'get' })
}
