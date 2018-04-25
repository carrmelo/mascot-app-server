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
  try {
    ctx.body = await UserModel.find()
    ctx.status = 200;
  } catch(e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message]
    }
  }
}

const getUser = async (ctx, next) => {
  try {
    const id = ctx.params.usr_id
    ctx.body = await UserModel.findById(id).populate('pets.pet')
  } catch(e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message]
    }
  }
}

const acceptAdoption = async (ctx, next) => {
  try {
    await UserModel.findByIdAndUpdate(ctx.params.usr_id,
      { $push: { 
        pets: { 
          org: ctx.request.body.org, 
          pet: ctx.request.body.pet
        },
        messages: {
          org: ctx.request.body.org, 
          pet: ctx.request.body.pet,
          message: "Su solicitud ha sido aprobada",
          alert: "success"
        }}
      });
    await OrganizationModel.findByIdAndUpdate(
      ctx.request.body.org, 
      { $pull:
        { queries: { _id: ctx.request.body.query },
        pets: ctx.request.body.pet }
      });
    await PetModel.findByIdAndUpdate( ctx.request.body.pet,
      { adopted: true , owner: ctx.params.usr_id });
    ctx.status = 200
  } catch(e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message]
    }
  }  
}

const rejectAdoption = async (ctx, next) => {
  try {
    await UserModel.findByIdAndUpdate(ctx.params.usr_id,
      { $push: { 
        messages: {
          org: ctx.request.body.org, 
          pet: ctx.request.body.pet,
          message: "Lo sentimos, su solicitud ha sido rechazada",
          alert: "danger"
        }}
      });
    await OrganizationModel.findByIdAndUpdate(
      ctx.request.body.org,
      { $pull:
        { queries: { _id: ctx.request.body.query } }
      });
    await PetModel.findByIdAndUpdate(
      ctx.request.body.pet, 
      { $set: { available: true } }
    );
    ctx.status = 200
  } catch(e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message]
    }
  }  
}

const markAsRead = async (ctx, next) => {
  console.log(ctx.request.body);
  try {
    await UserModel.findByIdAndUpdate(ctx.params.usr_id,
      { $pull:
        { messages: { _id: ctx.request.body._id } }
      });
    ctx.status = 200
  } catch(e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message]
    }
  }  
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

module.exports = { getUsers, acceptAdoption, getUser, rejectAdoption, markAsRead }
// module.exports = { addUser, editUser, applyForAdoption, applyForResidence, deleteUser }