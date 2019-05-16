const bcryptjs = require('bcryptjs');
const { Organization } = require('../models');
const { signToken } = require('../lib/jwt.js');

exports.addOrg = async ctx => {
  try {
    const { email, password } = ctx.request.body;
    const newOrg = new Organization(ctx.request.body);
    newOrg.password = await bcryptjs.hash(password, 10);
    newOrg.email = email.toLowerCase();
    newOrg.save();
    // eslint-disable-next-line no-underscore-dangle
    const token = signToken(newOrg._id);
    console.log(token);

    const data = newOrg.toObject();
    delete data.password;
    ctx.status = 201;
    ctx.body = { token, data };
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message],
    };
  }
};
