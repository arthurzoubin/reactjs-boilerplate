import koaBody from 'koa-body'

const parseBody = koaBody()

export default function(apiRouter) {
  apiRouter
    .all('ping', '/ping', parseBody, function * () {
      this.response.body = { pong: this.request.body }
    })
}
