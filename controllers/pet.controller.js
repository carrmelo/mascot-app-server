const { Organization, Pet } = require('../models');

exports.getPets = async ctx => {
  try {
    ctx.status = 200;
    ctx.body = await Pet.find();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message],
    };
  }
};

exports.getPet = async ctx => {
  try {
    const { pet_id: id } = ctx.params;
    ctx.status = 200;
    ctx.body = await Pet.findById(id).populate('organization');
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message],
    };
  }
};

exports.addPet = async ctx => {
  try {
    const { organization: id } = ctx.request.body;
    const newPet = new Pet(ctx.request.body);
    newPet.save();
    const org = await Organization.findById(id);
    org.pets.push(newPet);
    org.save();
    ctx.status = 201;
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message],
    };
  }
};
