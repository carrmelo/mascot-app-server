const mongoose = require('mongoose');
const PetModel = require('../models/pet');

exports.getPets = async (ctx, next) => {
  ctx.body = await PetModel.find()
}

// router.get('/pets',PetController.getPet);

exports.addPet = async (ctx, next) => {
  const newPet = new PetModel(ctx.request.body);
  newPet.save()
  ctx.status = 200
}

exports.editPet = async (ctx, next) => {
  console.log('editUser');
  
}

exports.deletePet = async (ctx, next) => {
  ctx.body = await PetModel.findOneAndRemove();
}