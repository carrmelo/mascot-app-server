const mongoose = require('mongoose');
const OrgModel = require('../models/org');
const PetModel = require('../models/pet');


// exports.addPet = async (ctx, next) => {
//   const newPet = new PetModel(ctx.request.body);
//   newPet.save()
//   ctx.response = 200
// }

exports.getOrgs = async (ctx, next) => {
  ctx.body = await OrgModel.find()
}

exports.getOrg = async (ctx, next) => {
  const id = ctx.request.url.split('/')[2];
  ctx.body = await OrgModel.findById(id).populate('pets queries.user queries.pet')
}

exports.addOrg = async (ctx, next) => {
  const newOrg = new OrgModel(ctx.request.body);
  newOrg.save();
  ctx.response = 200;
}

// exports.editOrg = async (ctx, next) => {
  //   console.log('editOrganization');
  
  // }
exports.adoptionRequest = async (ctx, next) => {
  await OrgModel.findByIdAndUpdate(
    ctx.request.body.org,
    { $push: { queries:
      { 
        user: ctx.request.body.user, 
        pet: ctx.request.body.pet
      }}
    });
  ctx.response = 200;
}
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