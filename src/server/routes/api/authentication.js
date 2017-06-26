/**
 * Authentication API
 */
import koaBody from 'koa-body'
import { signinWithEmail, getCustomerProfile } from 'app/services/api/laravel'
import CookieJar from 'server/utils/cookieHandler'

const parseBody = koaBody()

const signinController = apiRouter => {
  apiRouter
    .post(`auth/signin/email`, `/auth/signin/email`, parseBody, function * () {
      const { email, password } = this.request.body

      if (!email || !password) {
        this.status = 400
        this.response.body = { status: 'invalid request.' }
        return
      }

      const result = yield signinWithEmail({ email: email.trim(), password })
      const { code, message } = result

      if (code && message !== 'SUCCESS') {
        this.status = 200
        this.response.body = { message: message }
        return
      }

      const params = {
        customerId: result.id,
        userToken: result.sessionKey,
      }

      const profile = yield getCustomerProfile(params)

      const {
        firstName,
        lastName,
      } = profile
      const profileCookie = {
        email: email,
        firstName: firstName,
        lastName: lastName,
      }
      new CookieJar(this).updateUserAuth(Object.assign({}, profileCookie, params))
      this.status = 200
      this.response.body = result
    })
}

export default (apiRouter) => {
  signinController(apiRouter)
}
