const { Organization, Pet } = require('../models');

exports.getOrgs = async ctx => {
  try {
    ctx.status = 200;
    ctx.body = await Organization.find();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message],
    };
  }
};

exports.getOrg = async ctx => {
  try {
    const { org_id: id } = ctx.params;
    ctx.status = 200;
    ctx.body = await Organization.findById(id).populate(
      'pets queries.user queries.pet',
    );
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message],
    };
  }
};

exports.adoptionRequest = async ctx => {
  const { user, pet, org } = ctx.request.body;
  try {
    await Organization.findByIdAndUpdate(org, {
      $push: {
        queries: {
          user,
          pet,
        },
      },
    });
    await Pet.findByIdAndUpdate(pet, {
      $set: { available: false },
    });
    ctx.status = 200;
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message],
    };
  }
};
