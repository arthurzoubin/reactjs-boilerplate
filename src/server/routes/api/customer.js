/**
 * Customer API
 */
import koaBody from 'koa-body'
import { getCustomerProfile } from 'app/services/api/laravel'

const parseBody = koaBody()

const customerController = apiRouter => {
  apiRouter
    .get(`customer`, `/customer`, parseBody, function * () {
      const { id, sessionKey } = this.query

      const params = {
        customerId: id,
        userToken: sessionKey,
      }

      const result = yield getCustomerProfile(params)
      const { code, message } = result

      if (code && message !== 'SUCCESS') {
        this.status = 200
        this.response.body = { message: message }
        return
      }

      const profile = result.customer

      this.status = 200
      this.response.body = profile
    })
}

export default (apiRouter) => {
  customerController(apiRouter)
}
