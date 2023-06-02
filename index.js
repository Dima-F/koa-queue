const Koa = require('koa');
const Router = require('@koa/router');
const koaBody = require('koa-body');
const heavyRequest = require('./lib/heavyRequest');
const requestQueue = require('./lib/requestQueue');

const app = new Koa();
const router = new Router();

app.use(koaBody());

app.use(async (ctx, next) => {
    await requestQueue.enqueue(ctx, next);
});

router.post('/', heavyRequest);

app
  .use(router.routes());

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});