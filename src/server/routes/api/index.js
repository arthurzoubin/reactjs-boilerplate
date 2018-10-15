import Router from 'koa-router';
import ping from './ping';

const apiRouter = Router({ prefix: '/api' });
const compose = (...methods) => argument => methods.forEach(method => method.call(this, argument));

compose(
  ping,
)(apiRouter);

export default apiRouter;
