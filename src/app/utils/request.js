import 'isomorphic-fetch'
import { constructUrlGetParameters } from 'app/utils/helpers'
import { merge } from 'ramda'
import debug from 'debug'
const log = debug('utils.request')

const defaultOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}

export const fetch = async (endpoint, options) => {
  log('requesting', endpoint)

  options = merge(defaultOptions, options)

  if(options && typeof options.params !== 'undefined' && options.method === 'GET') {
    endpoint = constructUrlGetParameters(endpoint, options.params)
  }

  const response = await (global || window).fetch(endpoint, options)
  log('response', { endpoint, status: response.status })

  if (response.status >= 400) {
    throw new Error(`Response error: ${endpoint}`)
  }

  const contentType = response.headers.get('content-type')

  return ~contentType.indexOf('application/json')
    ? response.json()
    : response.text()
}
