import koaBody from 'koa-body';

const parseBody = koaBody();

export default function(apiRouter) {
  apiRouter
    .all('ping', '/ping', parseBody, async (ctx) => {
      ctx.response.body = { pong: ctx.request.body };
    });
}
