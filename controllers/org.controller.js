const mongoose = require('mongoose');
const OrgModel = require('../models/org');
const PetModel = require('../models/pet');


// exports.addPet = async (ctx, next) => {
//   const newPet = new PetModel(ctx.request.body);
//   newPet.save()
//   ctx.response = 200
// }

exports.getOrgs = async (ctx, next) => {
  try {
    ctx.body = await OrgModel.find()
  } catch(e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message]
    }
  }
}

exports.getOrg = async (ctx, next) => {
  try {
    const id = ctx.params.org_id;
    ctx.body = await OrgModel.findById(id).populate('pets queries.user queries.pet')
  } catch(e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message]
    }
  }
}

exports.addOrg = async (ctx, next) => {
  try {
    const newOrg = new OrgModel(ctx.request.body);
    newOrg.save();
    ctx.status = 200
  } catch(e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message]
    }
  }
}

// exports.editOrg = async (ctx, next) => {
  //   console.log('editOrganization');
  
  // }
exports.adoptionRequest = async (ctx, next) => {
  try {
    await OrgModel.findByIdAndUpdate(
      ctx.request.body.org,
      { $push: { queries:
        { 
          user: ctx.request.body.user, 
          pet: ctx.request.body.pet
        }},
      }
    );
    await PetModel.findByIdAndUpdate(
      ctx.request.body.pet, 
      { $set: { available: false } }
    );
    ctx.status = 200
  } catch(e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message]
    }
  }
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