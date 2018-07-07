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
  const { org, pet, query } = ctx.request.body
  const usr_id = ctx.params.usr_id
  try {
    await UserModel.findByIdAndUpdate(usr_id,
      { $push: { 
        pets: { 
          org,
          pet
        },
        messages: {
          org,
          pet,
          message: "Su solicitud ha sido aprobada",
          alert: "success"
        }}
      });
    await OrganizationModel.findByIdAndUpdate(
      org, 
      { $pull:
        { queries: { _id: query },
        pets: pet }
      });
    await PetModel.findByIdAndUpdate( pet,
      { adopted: true , owner: usr_id });
    ctx.status = 200
  } catch(e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message]
    }
  }  
}

const rejectAdoption = async (ctx, next) => {
  const { org, pet, query } = ctx.request.body
  const usr_id = ctx.params.usr_id
  try {
    await UserModel.findByIdAndUpdate(usr_id,
      { $push: { 
        messages: {
          org, 
          pet,
          message: "Lo sentimos, su solicitud ha sido rechazada",
          alert: "danger"
        }}
      });
    await OrganizationModel.findByIdAndUpdate(
      org,
      { $pull:
        { queries: { _id: query } }
      });
    await PetModel.findByIdAndUpdate(
      pet, 
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
  const _id = ctx.request.body._id
  const usr_id = ctx.params.usr_id
  try {
    await UserModel.findByIdAndUpdate(usr_id,
      { $pull:
        { messages: { _id } }
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
