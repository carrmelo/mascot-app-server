const mongoose = require('mongoose');
const OrgModel = require('../models/organization');


exports.getOrganizations = async (ctx, next) => {
  ctx.body = await OrgModel.find()
}

// router.get('/organizations',OrganizationController.getOrganization);

exports.addOrganization = async (ctx, next) => {
  const newOrg = new OrgModel(ctx.request.body);
  newOrg.save();
  ctx.status = 200;
}

exports.editOrganization = async (ctx, next) => {
  console.log('editOrganization');
  
}
exports.acceptAdoption = async (ctx, next) => {
  console.log('acceptAdoption');
  
}
exports.acceptResidence = async (ctx, next) => {
  console.log('acceptResidence');
  
}
exports.rejectAdoption = async (ctx, next) => {
  console.log('rejectAdoption');
  
}
exports.rejectResidence = async (ctx, next) => {
  console.log('rejectResidence');
  
}
exports.deleteOrganization = async (ctx, next) => {
  ctx.body = await OrgModel.findOneAndRemove();  
}