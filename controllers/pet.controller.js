const mongoose = require('mongoose');
const PetModel = require('../models/pet');
const OrganizationModel = require('../models/org');

exports.getPets = async (ctx, next) => {
  try {
    ctx.body = await PetModel.find()
  } catch(e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message]
    }
  }
}

exports.getPet = async (ctx, next) => {
  try {
    const id = ctx.params.pet_id
    ctx.body = await PetModel.findById(id).populate('organization')
  } catch(e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message]
    }
  }
}

exports.addPet = async (ctx, next) => {
  try {
    const org_id = ctx.request.body.organization;
    const newPet = new PetModel(ctx.request.body);
    newPet.save()
    const org = await OrganizationModel.findById(org_id);
    org.pets.push(newPet);
    org.save();
    ctx.status = 200
  } catch(e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message]
    }
  }
}