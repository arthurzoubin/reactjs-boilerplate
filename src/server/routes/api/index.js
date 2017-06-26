import Router from 'koa-router'
import ping from './ping'
import authentication from './authentication'
import customer from './customer'

const apiRouter = Router({ prefix: '/api' })
const compose = (...methods) => argument => methods.forEach(method => method.call(this, argument))

compose(
  ping,
  authentication,
  customer
)(apiRouter)

export default apiRouter
