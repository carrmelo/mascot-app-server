const mongoose = require('mongoose');
const UserModel = require('../models/user');
const PetModel = require('../models/pet');
const OrganizationModel = require('../models/org');

// exports.addPet = async (ctx, next) => {
//   const newPet = new PetModel(ctx.request.body);
//   newPet.save()
//   ctx.status = 200
// }

const getUsers = async (ctx, next) => {
  ctx.body = await UserModel.find()
}

const getUser = async (ctx, next) => {
  const id = ctx.request.url.split('/')[2];
  ctx.body = await UserModel.findById(id).populate('pets')
}

const acceptAdoption = async (ctx, next) => {
  console.log('ctx', ctx.request.body.user);
  console.log('body', ctx.request.body);
  console.log(ctx.request.body.pet, ctx.request.body.org);
  console.log('AQUI', ctx.params)

  await UserModel.findByIdAndUpdate(ctx.params.usr_id,
    { $push: { pets:
      { 
        org: ctx.request.body.org, 
        pet: ctx.request.body.pet
      }}
    });
  ctx.send('OK')
  ctx.response = 200
  OrganizationModel.update( { _id: ctx.request.body.org }, { $pullAll: { queries: [ {pet: ctx.request.body.pet}] } } )
}



// exports.addPet = async (ctx, next) => {
//   const org_id = ctx.request.body.organization;
//   const newPet = new PetModel(ctx.request.body);
//   newPet.save()
//   const org = await OrganizationModel.findById(org_id);
//   org.pets.push(newPet);
//   org.save();
//   ctx.status = 200
// }
// exports.adoptionRequest = async (ctx, next) => {
//   await OrgModel.findByIdAndUpdate(
//     ctx.request.body.org,
//     { $push: { queries:
//       { 
//         user: ctx.request.body.user, 
//         pet: ctx.request.body.pet
//       }}
//     });
//   ctx.response = 200;
// }
// // router.get('/users',PetController.getUser);

// const addUser = async (ctx, next) => {
//   const newUser = new UserModel(ctx.request.body);
//   newUser.save();
//   ctx.status = 200
// }

// const editUser = async (ctx, next) => {
//   console.log('editUser');
  
//   // const topicScore = await TopicModel.findById(ctx.params.id);
//   // topicScore.score -= 1;
//   // topicScore.save()
//   // ctx.body = topicScore;

// }

// const applyForAdoption = async (ctx, next) => {
//   console.log('applyForAdoption');
  
// }

// const applyForResidence = async (ctx, next) => {
//   console.log('applyForResidence');
  
// }

// const deleteUser = async (ctx, next) => {
//   ctx.body = await UserModel.findOneAndRemove();
// }

module.exports = { getUsers, acceptAdoption, getUser }
// module.exports = { addUser, editUser, applyForAdoption, applyForResidence, deleteUser }