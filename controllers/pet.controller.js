const mongoose = require('mongoose');
const PetModel = require('../models/pet');
const OrganizationModel = require('../models/org');

exports.getPets = async (ctx, next) => {
  ctx.body = await PetModel.find()
}

exports.getPet = async (ctx, next) => {
  const id = ctx.request.url.split('/')[2];
  ctx.body = await PetModel.findById(id).populate('organization')
}

exports.addPet = async (ctx, next) => {
  const org_id = ctx.request.body.organization;
  const newPet = new PetModel(ctx.request.body);
  newPet.save()
  const org = await OrganizationModel.findById(org_id);
  org.pets.push(newPet);
  org.save();
  ctx.status = 200
}

// exports.editPet = async (ctx, next) => {
//   console.log('editUser');
  
// }

// exports.deletePet = async (ctx, next) => {
//   ctx.body = await PetModel.findOneAndRemove();
// }