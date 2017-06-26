import { request } from 'app/utils'

import {
  laravel,
} from 'config/config'
const {
  LARAVEL_API_VERSION,
  LARAVEL_API_KEY,
  LARAVEL_APP_KEY,
  LARAVEL_API_URL,
} = laravel

/**
 * List of possible resources to interact with.
 */
const API_URI_RESOURCES = {
  LOGIN_EMAIL: 'api/auth/signin/email',
  GET_CUSTOMER_PROFILE: 'api/customer',
}

/**
 * common headers
 */
const headers = {
  'Content-Type': 'application/json',
  'API-VERSION': LARAVEL_API_VERSION,
  'API-KEY': LARAVEL_API_KEY,
  'APP-KEY': LARAVEL_APP_KEY,
}

/**
 * Sign in with email
 * @param payload
 */
const signinWithEmail = payload => {
  const requestURL = LARAVEL_API_URL + API_URI_RESOURCES.LOGIN_EMAIL
  const requestOpt = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
    }),
  }
  return request.fetch( requestURL, requestOpt)
}

/**
 * Get customer profile by id and token
 * @param params
 */
const getCustomerProfile = params => {
  const requestURL = LARAVEL_API_URL + API_URI_RESOURCES.GET_CUSTOMER_PROFILE
  const requestOpt = {
    method: 'GET',
    headers: headers,
    params: params,
  }
  return request.fetch( requestURL, requestOpt)
}

export {
  signinWithEmail,
  getCustomerProfile,
}
