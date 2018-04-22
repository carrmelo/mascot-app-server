const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const serve = require('koa-static');
const cors = require('koa-cors');

const router = require('./router');
const db = require('./db');
const conf = require('./config');

const port = 3000;

app
.use(cors())
.use(serve(conf.clientPath))
.use(bodyParser())
.use(router.routes())
.use(router.allowedMethods())

app.listen(port, () => console.log(`Server running on ${port}`));