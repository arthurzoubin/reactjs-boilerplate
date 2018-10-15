import supertest from 'supertest-as-promised'
import server from 'server-instance'
import { setRoutes, rootRouter } from 'server/router'

describe('Server API', function() {
  // helpers available from test/test.setup.js
  const app = helpers.cloneApp(server)

  before(()=> {
    app.use(async function(ctx, next) {
      setRoutes({
        javascript: {},
        styles: {},
      })
      await rootRouter.routes()(ctx, next)
    })
  })

  it('should respond to ping route', (done)=> {
    const body = { test: 'body' }
    supertest(app.callback())
      .post('/api/ping')
      .send(body)
      .expect('content-type', /application\/json/)
      .expect({ pong: body })
      .end(done)
  })
})
