const mongoose = require('mongoose');
const UserModel = require('../models/user');
const PetModel = require('../models/pet');
const OrganizationModel = require('../models/org');

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

const addUser = async (ctx, next) => {
  try {
    const newUser = new UserModel(ctx.request.body);
    newUser.save();
    ctx.status = 200
  } catch(e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message]
    }
  }
}

module.exports = { getUsers, acceptAdoption, getUser, rejectAdoption, markAsRead, addUser }