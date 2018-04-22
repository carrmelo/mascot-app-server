const mongoose = require('mongoose');
const OrgModel = require('../models/org');
const PetModel = require('../models/pet');


exports.addPet = async (ctx, next) => {
  console.log(ctx)
  const newPet = new PetModel(ctx.request.body);
  newPet.save()
  ctx.status = 200
}

exports.getOrgs = async (ctx, next) => {
  ctx.body = await OrgModel.find()
}

exports.getOrg = async (ctx, next) => {
  const id = ctx.request.url.split('/')[2];
  ctx.body = await OrgModel.findById(id)
}

exports.addOrg = async (ctx, next) => {
  const newOrg = new OrgModel(ctx.request.body);
  newOrg.save();
  ctx.status = 200;
}

// exports.editOrg = async (ctx, next) => {
//   console.log('editOrganization');
  
// }
// exports.acceptAdoption = async (ctx, next) => {
//   console.log('acceptAdoption');
  
// }
// exports.acceptResidence = async (ctx, next) => {
//   console.log('acceptResidence');
  
// }
// exports.rejectAdoption = async (ctx, next) => {
//   console.log('rejectAdoption');
  
// }
// exports.rejectResidence = async (ctx, next) => {
//   console.log('rejectResidence');
  
// }
// exports.deleteOrg = async (ctx, next) => {
//   ctx.body = await OrgModel.findOneAndRemove();  
// }