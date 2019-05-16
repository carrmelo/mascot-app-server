const Koa = require('koa');
const cors = require('@koa/cors');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
require('./db');

require('dotenv').config();

const conf = require('./config');
const router = require('./router');

const app = new Koa();
const PORT = process.env.PORT || 5000;

app
  .use(cors())
  .use(serve(conf.clientPath))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT, err => {
  if (err) return console.error('ERROR: ', err); // eslint-disable-line no-console
  return console.log(`Server running on ${PORT}`); // eslint-disable-line no-console
});
