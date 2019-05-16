const bcryptjs = require('bcryptjs');
const { Organization } = require('../models');

exports.addOrg = async ctx => {
  try {
    const { email, password } = ctx.request.body;
    const newOrg = new Organization(ctx.request.body);
    newOrg.password = await bcryptjs.hash(password, 10);
    newOrg.email = email.toLowerCase();
    newOrg.save();
    const data = newOrg.toObject();
    delete data.password;
    ctx.status = 201;
    ctx.body = { data };
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message],
    };
  }
};
