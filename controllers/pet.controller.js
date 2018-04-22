const mongoose = require('mongoose');
const PetModel = require('../models/pet');
const OrganizationModel = require('../models/org');

exports.getPets = async (ctx, next) => {
  ctx.body = await PetModel.find()
}

exports.getPet = async (ctx, next) => {
  const id = ctx.request.url.split('/')[2];
  ctx.body = await PetModel.findById(id)
}

exports.addPet = async (ctx, next) => {
  const resp = ctx.request.header.referer.split('/')[4]
  const newPet = new PetModel(ctx.request.body);
  newPet.save()
  newPet.organizations = resp
  OrganizationModel.findById(resp)
    .populate('pets')
    .exec((err, newPet) => {
      if (err) return handleError(err);
    })
  ctx.status = 200
}

// exports.editPet = async (ctx, next) => {
//   console.log('editUser');
  
// }

// exports.deletePet = async (ctx, next) => {
//   ctx.body = await PetModel.findOneAndRemove();
// }