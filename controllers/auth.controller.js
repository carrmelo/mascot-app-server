const bcrypt = require('bcrypt');
const { Organization } = require('../models');

exports.addOrganization = async ctx => {
  try {
    const { email, password } = ctx.request.body;

    const newOrg = new Organization(ctx.request.body);

    bcrypt.hash(password, process.env.SALTROUND, (error, hash) => {
      if (!err) {
        newOrg.password = hash;
      } else {
        throw new Error('There was an error hashing your password');
      }
    });

    newOrg.email = email.toLowerCase();
    newOrg.save();
    delete newOrg.password;
    ctx.status = 201;
    ctx.body = { data: newOrg };
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message],
    };
  }
};
